import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, works, InsertWork, Work } from "../drizzle/schema";
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
  return getAllWorks("published");
}

export async function getDraftWorks(): Promise<Work[]> {
  return getAllWorks("draft");
}
