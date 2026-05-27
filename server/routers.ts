import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import axios from "axios";

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

  // Blog news router
  blog: router({
    getLatestNews: publicProcedure.query(async () => {
      try {
        // Fetch from external blog - using a simple HTML scraping approach
        const response = await axios.get("https://sakaisetsubi-rct.com/", {
          timeout: 5000,
        });
        
        // For now, return a placeholder structure
        // In production, you would parse the HTML or use an API
        const latestPosts = [
          {
            date: "2026年5月25日",
            title: "新しい施工事例が増えました",
            description: "最近の施工事例をブログで紹介しています。",
            image: "",
            link: "https://sakaisetsubi-rct.com/blog/",
          },
          {
            date: "2026年5月22日",
            title: "スタッフブログを更新しました",
            description: "スタッフの日常や施工風景をお届けしています。",
            image: "",
            link: "https://sakaisetsubi-rct.com/blog/",
          },
        ];
        
        return latestPosts;
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        // Return empty array on error
        return [];
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
