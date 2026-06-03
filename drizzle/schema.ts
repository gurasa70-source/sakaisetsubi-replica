import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// 施工実績テーブル
export const works = mysqlTable("works", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  date: varchar("date", { length: 64 }).notNull(),
  workContent: text("workContent").notNull(),
  requestContent: text("requestContent").notNull(),
  cause: text("cause").notNull(),
  method: text("method").notNull(),
  comment: text("comment").notNull(),
  imageUrl: text("imageUrl"),
  beforeImageUrl: text("beforeImageUrl"),
  afterImageUrl: text("afterImageUrl"),
  designInvolved: int("designInvolved").default(0).notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Work = typeof works.$inferSelect;
export type InsertWork = typeof works.$inferInsert;