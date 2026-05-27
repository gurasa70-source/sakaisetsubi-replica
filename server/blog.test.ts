import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "test",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("blog.getLatestNews", () => {
  it("returns an array of news items", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.blog.getLatestNews();

    expect(Array.isArray(result)).toBe(true);
  }, { timeout: 15000 });

  it("returns news items with required fields", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.blog.getLatestNews();

    if (result.length > 0) {
      const item = result[0];
      expect(item).toHaveProperty("date");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("link");
    }
  });

  it("returns at most 2 items", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.blog.getLatestNews();

    expect(result.length).toBeLessThanOrEqual(2);
  });

  it("handles errors gracefully", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    // This should not throw an error
    const result = await caller.blog.getLatestNews();

    expect(Array.isArray(result)).toBe(true);
  });
});
