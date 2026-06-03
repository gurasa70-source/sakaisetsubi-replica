import express from "express";
import { createServer } from "http";
import net from "net";
import multer from "multer";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { generateSitemap } from "../sitemap";
import { storagePut } from "../storage";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ limit: "100mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  
  // File upload endpoint
  const upload = multer({ storage: multer.memoryStorage() });
  app.post('/api/upload', upload.single('file'), async (req: any, res: any) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];

      // File extension validation as fallback for incorrect MIME types
      const originalName = req.file.originalname.toLowerCase();
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.pdf', '.doc', '.docx', '.xls', '.xlsx'];
      const hasValidExtension = allowedExtensions.some((ext: string) => originalName.endsWith(ext));

      if (!allowedTypes.includes(req.file.mimetype) && !hasValidExtension) {
        return res.status(400).json({ error: `Invalid file type: ${req.file.mimetype}. Allowed types: JPEG, PNG, GIF, WebP, SVG, PDF, DOC, DOCX, XLS, XLSX` });
      }

      // Sanitize filename
      const sanitizedName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
      const fileName = `${Date.now()}-${sanitizedName}`;

      // Use actual MIME type or infer from extension if MIME type is incorrect
      let mimeType = req.file.mimetype;
      if (mimeType === 'application/octet-stream') {
        const ext = req.file.originalname.toLowerCase().split('.').pop();
        const mimeTypeMap: { [key: string]: string } = {
          'webp': 'image/webp',
          'svg': 'image/svg+xml',
          'pdf': 'application/pdf',
          'doc': 'application/msword',
          'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'xls': 'application/vnd.ms-excel',
          'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };
        mimeType = mimeTypeMap[ext || ''] || 'application/octet-stream';
      }

      const { url } = await storagePut(fileName, req.file.buffer, mimeType);

      res.json({ url });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}` });
    }
  });

  // Sitemap endpoint
  app.get('/sitemap.xml', (req, res) => {
    const protocol = req.protocol || 'https';
    const host = req.get('host') || 'sakaireplica-m2oiogqs.manus.space';
    const baseUrl = `${protocol}://${host}`;
    const sitemap = generateSitemap(baseUrl);
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
