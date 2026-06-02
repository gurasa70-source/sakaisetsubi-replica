import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import axios from "axios";
import * as cheerio from "cheerio";
import { generateSitemap } from "./sitemap";

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
});

export type AppRouter = typeof appRouter;
