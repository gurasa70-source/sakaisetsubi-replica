import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, works, InsertWork, Work, designProjects, InsertDesignProject, DesignProject, blogPosts, InsertBlogPost, BlogPost } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// 施工実績クエリヘルパー
export async function createWork(work: InsertWork): Promise<Work | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create work: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(works).values(work);
    const workId = (result[0] as any).insertId;
    const created = await db.select().from(works).where(eq(works.id, workId as number)).limit(1);
    return created.length > 0 ? created[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to create work:", error);
    throw error;
  }
}

export async function getWorkById(id: number): Promise<Work | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get work: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(works).where(eq(works.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get work:", error);
    throw error;
  }
}

export async function getAllWorks(status?: string): Promise<Work[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get works: database not available");
    return [];
  }

  try {
    let query: any = db.select().from(works);
    if (status) {
      query = query.where(eq(works.status, status as any));
    }
    const result = await query.orderBy(desc(works.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get works:", error);
    throw error;
  }
}

export async function updateWork(id: number, updates: Partial<InsertWork>): Promise<Work | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update work: database not available");
    return undefined;
  }

  try {
    await db.update(works).set(updates).where(eq(works.id, id));
    return getWorkById(id);
  } catch (error) {
    console.error("[Database] Failed to update work:", error);
    throw error;
  }
}

export async function deleteWork(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete work: database not available");
    return;
  }

  try {
    await db.delete(works).where(eq(works.id, id));
  } catch (error) {
    console.error("[Database] Failed to delete work:", error);
    throw error;
  }
}

export async function getPublishedWorks(): Promise<Work[]> {
  const works = await getAllWorks("published");
  // 年月でソート（新しい順）
  // 「2024年12月」形式の文字列を解析してソート
  return works.sort((a, b) => {
    const parseDate = (dateStr: string): number => {
      // "2024年12月" -> [2024, 12]
      const match = dateStr.match(/(\d{4})年(\d{1,2})月/);
      if (match) {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        return year * 100 + month; // 202412 のような数値に変換
      }
      return 0;
    };
    return parseDate(b.date) - parseDate(a.date);
  });
}

export async function getDraftWorks(): Promise<Work[]> {
  return getAllWorks("draft");
}

export async function getWorksByCategory(category: string): Promise<Work[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get works: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(works)
      .where(eq(works.category, category))
      .orderBy(desc(works.createdAt));
    // 年月でソート（新しい順）
    // 「2024年12月」形式の文字列を解析してソート
    return result.sort((a, b) => {
      const parseDate = (dateStr: string): number => {
        const match = dateStr.match(/(\d{4})年(\d{1,2})月/);
        if (match) {
          const year = parseInt(match[1], 10);
          const month = parseInt(match[2], 10);
          return year * 100 + month;
        }
        return 0;
      };
      return parseDate(b.date) - parseDate(a.date);
    });
  } catch (error) {
    console.error("[Database] Failed to get works by category:", error);
    throw error;
  }
}

// 設計・申請実績クエリヘルパー
export async function createDesignProject(project: InsertDesignProject): Promise<DesignProject | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create design project: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(designProjects).values(project);
    const projectId = (result[0] as any).insertId;
    const created = await db.select().from(designProjects).where(eq(designProjects.id, projectId as number)).limit(1);
    return created.length > 0 ? created[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to create design project:", error);
    throw error;
  }
}

export async function getDesignProjectById(id: number): Promise<DesignProject | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get design project: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(designProjects).where(eq(designProjects.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get design project:", error);
    throw error;
  }
}

export async function getAllDesignProjects(status?: string): Promise<DesignProject[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get design projects: database not available");
    return [];
  }

  try {
    let query: any = db.select().from(designProjects);
    if (status) {
      query = query.where(eq(designProjects.status, status as any));
    }
    const result = await query.orderBy(desc(designProjects.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get design projects:", error);
    throw error;
  }
}

export async function updateDesignProject(id: number, updates: Partial<InsertDesignProject>): Promise<DesignProject | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update design project: database not available");
    return undefined;
  }

  try {
    await db.update(designProjects).set(updates).where(eq(designProjects.id, id));
    return getDesignProjectById(id);
  } catch (error) {
    console.error("[Database] Failed to update design project:", error);
    throw error;
  }
}

export async function deleteDesignProject(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete design project: database not available");
    return;
  }

  try {
    await db.delete(designProjects).where(eq(designProjects.id, id));
  } catch (error) {
    console.error("[Database] Failed to delete design project:", error);
    throw error;
  }
}

export async function getPublishedDesignProjects(): Promise<DesignProject[]> {
  return getAllDesignProjects("published");
}

export async function getDraftDesignProjects(): Promise<DesignProject[]> {
  return getAllDesignProjects("draft");
}

// ブログ記事クエリヘルパー
export async function createBlogPost(post: InsertBlogPost): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create blog post: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(blogPosts).values(post);
    const postId = (result[0] as any).insertId;
    const created = await db.select().from(blogPosts).where(eq(blogPosts.id, postId as number)).limit(1);
    return created.length > 0 ? created[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to create blog post:", error);
    throw error;
  }
}

export async function getBlogPostById(id: number): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get blog post: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get blog post:", error);
    throw error;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get blog post: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get blog post by slug:", error);
    throw error;
  }
}

export async function getAllBlogPosts(status?: string): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get blog posts: database not available");
    return [];
  }

  try {
    let query: any = db.select().from(blogPosts);
    if (status) {
      query = query.where(eq(blogPosts.status, status as any));
    }
    const result = await query.orderBy(desc(blogPosts.publishedAt || blogPosts.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get blog posts:", error);
    throw error;
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  return getAllBlogPosts("published");
}

export async function getDraftBlogPosts(): Promise<BlogPost[]> {
  return getAllBlogPosts("draft");
}

export async function updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update blog post: database not available");
    return undefined;
  }

  try {
    await db.update(blogPosts).set(updates).where(eq(blogPosts.id, id));
    return getBlogPostById(id);
  } catch (error) {
    console.error("[Database] Failed to update blog post:", error);
    throw error;
  }
}

export async function deleteBlogPost(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete blog post: database not available");
    return;
  }

  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  } catch (error) {
    console.error("[Database] Failed to delete blog post:", error);
    throw error;
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get blog posts: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.category, category))
      .orderBy(desc(blogPosts.publishedAt || blogPosts.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get blog posts by category:", error);
    throw error;
  }
}
