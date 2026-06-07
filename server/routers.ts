import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import axios from "axios";
import * as cheerio from "cheerio";
import { generateSitemap } from "./sitemap";
import { createWork, getWorkById, getAllWorks, updateWork, deleteWork, getPublishedWorks, createDesignProject, getDesignProjectById, getAllDesignProjects, updateDesignProject, deleteDesignProject, getPublishedDesignProjects } from "./db";
import { InsertWork, InsertDesignProject } from "../drizzle/schema";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Sitemap router
  sitemap: router({
    generate: publicProcedure.query(({ ctx }) => {
      const protocol = ctx.req.protocol || 'https';
      const host = ctx.req.get('host') || 'sakaireplica-m2oiogqs.manus.space';
      const baseUrl = `${protocol}://${host}`;
      return generateSitemap(baseUrl);
    }),
  }),

  // Works (施工実績) router
  works: router({
    getPublished: publicProcedure.query(async () => {
      return await getPublishedWorks();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getWorkById(input);
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        category: z.string(),
        date: z.string(),
        location: z.string().default("静岡市"),
        workContent: z.string(),
        requestContent: z.string(),
        cause: z.string(),
        method: z.string(),
        comment: z.string(),
        imageUrl: z.string().optional(),
        beforeImageUrl: z.string().optional(),
        afterImageUrl: z.string().optional(),
        status: z.enum(["draft", "published"]).default("draft"),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admin can create works");
        }
        return await createWork(input as InsertWork);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        category: z.string().optional(),
        date: z.string().optional(),
        location: z.string().optional(),
        workContent: z.string().optional(),
        requestContent: z.string().optional(),
        cause: z.string().optional(),
        method: z.string().optional(),
        comment: z.string().optional(),
        imageUrl: z.string().optional(),
        beforeImageUrl: z.string().optional(),
        afterImageUrl: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admin can update works");
        }
        const { id, ...updates } = input;
        return await updateWork(id, updates as Partial<InsertWork>);
      }),
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admin can delete works");
        }
        await deleteWork(input);
        return { success: true };
      }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Only admin can view all works");
      }
      return await getAllWorks();
    }),
    getByCategory: publicProcedure.input(z.string()).query(async ({ input }) => {
      const works = await getPublishedWorks();
      return works.filter(work => work.category === input).slice(0, 3);
    }),
    getFiltered: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        year: z.string().optional(),
        location: z.string().optional(),
        page: z.number().int().min(1).default(1),
        pageSize: z.number().int().min(1).max(100).default(12),
      }))
      .query(async ({ input }) => {
        const works = await getPublishedWorks();
        const filtered = works.filter(work => {
          const categoryMatch = !input.category || work.category === input.category;
          const yearMatch = !input.year || work.date?.startsWith(input.year);
          const locationMatch = !input.location || work.location === input.location;
          return categoryMatch && yearMatch && locationMatch;
        });
        
        const totalCount = filtered.length;
        const totalPages = Math.ceil(totalCount / input.pageSize);
        const startIndex = (input.page - 1) * input.pageSize;
        const endIndex = startIndex + input.pageSize;
        const items = filtered.slice(startIndex, endIndex);
        
        return {
          items,
          totalCount,
          totalPages,
          currentPage: input.page,
          pageSize: input.pageSize,
        };
      }),
  }),

  // Blog news router
  blog: router({
    getLatestNews: publicProcedure.query(async () => {
      try {
        // Fetch from external blog
        const response = await axios.get("https://sakaisetsubi-rct.com/blog/p/1/", {
          timeout: 10000,
        });
        
        const html = response.data;
        const $ = cheerio.load(html);
        
        const articles: Array<{
          date: string;
          title: string;
          description: string;
          image: string;
          link: string;
        }> = [];
        
        // Extract articles from the page
        // Each article is in a div.innerBox with photoBox and textBox
        $("div.innerBox").each((index, element) => {
          if (articles.length >= 2) return; // Only get first 2 articles
          
          const $box = $(element);
          
          // Get image from background-image style
          const photoBox = $box.find("div.photoBox");
          const bgImageStyle = photoBox.attr("style") || "";
          const imageMatch = bgImageStyle.match(/url\((https?:\/\/[^)]+)\)/);
          const image = imageMatch ? imageMatch[1] : "";
          
          // Get title from h3.headLine03
          const title = $box.find("h3.headLine03").text().trim();
          
          // Get description from p.txt
          const description = $box.find("p.txt").text().trim();
          
          // Get link from a href in comMore
          const link = $box.find("div.comMore a").attr("href") || "";
          const fullLink = link ? `https://sakaisetsubi-rct.com${link}` : "";
          
          // Extract date from link URL (format: /blog/202605251253/)
          let date = "";
          if (link) {
            const dateMatch = link.match(/\/blog\/(\d{4})(\d{2})(\d{2})/);
            if (dateMatch) {
              const year = dateMatch[1];
              const month = dateMatch[2];
              const day = dateMatch[3];
              date = `${year}年${month}月${day}日`;
            }
          }
          
          if (title && description) {
            articles.push({
              date: date || "日付不明",
              title,
              description,
              image,
              link: fullLink,
            });
          }
        });
        
        return articles;
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        // Return empty array on error
        return [];
      }
    }),
  }),

  // Design Projects (設計・申請実績) router
  designProjects: router({
    getPublished: publicProcedure.query(async () => {
      return await getPublishedDesignProjects();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getDesignProjectById(input);
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        building: z.string(),
        businessContent: z.string(),
        scope: z.string(),
        description: z.string(),
        imageUrl: z.string().optional(),
        status: z.enum(["draft", "published"]).default("draft"),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admin can create design projects");
        }
        return await createDesignProject(input as InsertDesignProject);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        building: z.string().optional(),
        businessContent: z.string().optional(),
        scope: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admin can update design projects");
        }
        const { id, ...updates } = input;
        return await updateDesignProject(id, updates as Partial<InsertDesignProject>);
      }),
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admin can delete design projects");
        }
        await deleteDesignProject(input);
        return { success: true };
      }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Only admin can view all design projects");
      }
      return await getAllDesignProjects();
    }),
  }),
});

export type AppRouter = typeof appRouter;
