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
  location: varchar("location", { length: 64 }).notNull().default("静岡市"),
  workContent: text("workContent").notNull(),
  requestContent: text("requestContent").notNull(),
  cause: text("cause").notNull(),
  method: text("method").notNull(),
  comment: text("comment").notNull(),
  imageUrl: text("imageUrl"),
  beforeImageUrl: text("beforeImageUrl"),
  beforeImageLabel: varchar("beforeImageLabel", { length: 32 }).default("施工前").notNull(),
  afterImageUrl: text("afterImageUrl"),
  afterImageLabel: varchar("afterImageLabel", { length: 32 }).default("施工後").notNull(),
  designInvolved: int("designInvolved").default(0).notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Work = typeof works.$inferSelect;
export type InsertWork = typeof works.$inferInsert;

// 設計・申請実績テーブル
export const designProjects = mysqlTable("designProjects", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  building: varchar("building", { length: 255 }).notNull(), // 建物（例：新築戸建）
  businessContent: text("businessContent").notNull(), // 業務内容（例：給排水設備設計・水道申請）
  scope: text("scope").notNull(), // 対応範囲（例：図面作成～申請提出）
  description: text("description").notNull(), // 説明文
  imageUrl: text("imageUrl"), // メイン画像
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DesignProject = typeof designProjects.$inferSelect;
export type InsertDesignProject = typeof designProjects.$inferInsert;

// ブログ記事テーブル
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(), // URL用スラッグ
  content: text("content").notNull(), // マークダウン形式
  category: varchar("category", { length: 64 }).notNull(), // ブログカテゴリー
  excerpt: text("excerpt"), // 概要（一覧表示用）
  imageUrl: text("imageUrl"), // アイキャッチ画像
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  views: int("views").default(0).notNull(), // 閲覧数
  publishedAt: timestamp("publishedAt"), // 公開日
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// アクセス解析ログテーブル
export const analyticsEvents = mysqlTable("analyticsEvents", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 128 }).notNull(),
  path: varchar("path", { length: 512 }).notNull(),
  referrer: text("referrer"),
  searchQuery: varchar("searchQuery", { length: 255 }),
  device: varchar("device", { length: 64 }).notNull().default("Desktop"), // Mobile, Tablet, Desktop
  userAgent: text("userAgent"),
  eventType: varchar("eventType", { length: 64 }).notNull().default("page_view"),
  eventLabel: varchar("eventLabel", { length: 255 }),
  durationSeconds: int("durationSeconds").default(0).notNull(),
  isBounce: int("isBounce").default(1).notNull(), // 1: 直帰, 0: 非直帰
  userName: varchar("userName", { length: 128 }),
  userEmail: varchar("userEmail", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;

// 問い合わせテーブル
export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  message: text("message").notNull(),
  sourcePath: varchar("sourcePath", { length: 512 }).notNull().default("/"),
  status: mysqlEnum("status", ["new", "reviewing", "completed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;
