import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure, adminSessionProcedure } from "./_core/trpc";
import { loginAdmin, logoutAdmin } from "./_core/adminAuth";
import axios from "axios";
import * as cheerio from "cheerio";
import { generateSitemap } from "./sitemap";
import { createWork, getWorkById, getAllWorks, updateWork, deleteWork, getPublishedWorks, createDesignProject, getDesignProjectById, getAllDesignProjects, updateDesignProject, deleteDesignProject, getPublishedDesignProjects, createBlogPost, getBlogPostById, getBlogPostBySlug, getAllBlogPosts, getPublishedBlogPosts, updateBlogPost, deleteBlogPost, getBlogPostsByCategory, incrementBlogPostViews, getPopularBlogPosts, recordAnalyticsEvent, getAnalyticsEvents } from "./db";
import { InsertWork, InsertDesignProject, InsertBlogPost } from "../drizzle/schema";
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
    create: adminSessionProcedure
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
        beforeImageLabel: z.string().default("施工前"),
        afterImageUrl: z.string().optional(),
        afterImageLabel: z.string().default("施工後"),
        status: z.enum(["draft", "published"]).default("draft"),
      }))
      .mutation(async ({ input }) => {
        return await createWork(input as InsertWork);
      }),
    update: adminSessionProcedure
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
        beforeImageLabel: z.string().optional(),
        afterImageUrl: z.string().optional(),
        afterImageLabel: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        return await updateWork(id, updates as Partial<InsertWork>);
      }),
    delete: adminSessionProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        await deleteWork(input);
        return { success: true };
      }),
    getAll: adminSessionProcedure.query(async () => {
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

  // Independent admin password authentication
  admin: router({
    login: publicProcedure
      .input(z.object({ password: z.string().min(1) }))
      .mutation(async ({ input, ctx }) => ({ success: await loginAdmin(input.password, ctx.req, ctx.res) })),
    logout: publicProcedure.mutation(({ ctx }) => {
      logoutAdmin(ctx.req, ctx.res);
      return { success: true };
    }),
    session: publicProcedure.query(({ ctx }) => ({ authenticated: ctx.adminAuthenticated })),
  }),

  // Blog news router
  blog: router({
    getLatestNews: publicProcedure.query(async () => {
      const posts = await getPublishedBlogPosts();
      return posts.slice(0, 4).map(post => ({
        date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('ja-JP') : '日付不明',
        title: post.title,
        description: post.excerpt || '',
        image: post.imageUrl || '',
        link: `/blog/${post.slug}`,
      }));
    }),
    getPublished: publicProcedure.query(async () => {
      return await getPublishedBlogPosts();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getBlogPostById(input);
    }),
    getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
      return await getBlogPostBySlug(input);
    }),
    create: adminSessionProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        category: z.string(),
        excerpt: z.string().optional(),
        imageUrl: z.string().optional(),
        status: z.enum(["draft", "published"]).default("draft"),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const publishedAt = input.status === "published" ? (input.publishedAt || new Date()) : input.publishedAt;
        return await createBlogPost({ ...input, publishedAt });
      }),
    update: adminSessionProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        content: z.string().optional(),
        category: z.string().optional(),
        excerpt: z.string().optional(),
        imageUrl: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        const normalizedUpdates = updates.status === "published" && !updates.publishedAt
          ? { ...updates, publishedAt: new Date() }
          : updates;
        return await updateBlogPost(id, normalizedUpdates as Partial<InsertBlogPost>);
      }),
    delete: adminSessionProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        await deleteBlogPost(input);
        return { success: true };
      }),
    getAll: adminSessionProcedure.query(async () => {
      return await getAllBlogPosts();
    }),
    getByCategory: publicProcedure.input(z.string()).query(async ({ input }) => {
      return await getBlogPostsByCategory(input);
    }),
    incrementViews: publicProcedure.input(z.number()).mutation(async ({ input }) => {
      await incrementBlogPostViews(input);
      return { success: true };
    }),
    getPopular: publicProcedure.query(async () => {
      return await getPopularBlogPosts(5);
    }),
  }),

  // Analytics router
  analytics: router({
    record: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        path: z.string(),
        referrer: z.string().optional(),
        searchQuery: z.string().optional(),
        device: z.string().default("Desktop"),
        userAgent: z.string().optional(),
        durationSeconds: z.number().default(0),
        isBounce: z.number().default(1),
        userName: z.string().optional(),
        userEmail: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await recordAnalyticsEvent(input);
        return { success: true };
      }),
    getAll: adminSessionProcedure.query(async () => {
      return await getAnalyticsEvents();
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
    create: adminSessionProcedure
      .input(z.object({
        title: z.string(),
        building: z.string(),
        businessContent: z.string(),
        scope: z.string(),
        description: z.string(),
        imageUrl: z.string().optional(),
        status: z.enum(["draft", "published"]).default("draft"),
      }))
      .mutation(async ({ input }) => {
        return await createDesignProject(input as InsertDesignProject);
      }),
    update: adminSessionProcedure
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
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        return await updateDesignProject(id, updates as Partial<InsertDesignProject>);
      }),
    delete: adminSessionProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        await deleteDesignProject(input);
        return { success: true };
      }),
    getAll: adminSessionProcedure.query(async () => {
      return await getAllDesignProjects();
    }),
  }),
});

export type AppRouter = typeof appRouter;
