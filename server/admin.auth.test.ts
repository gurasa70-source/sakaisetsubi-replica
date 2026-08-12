import { describe, expect, it } from "vitest";
import type { Request, Response } from "express";
import { hasAdminSession, loginAdmin } from "./_core/adminAuth";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function requestWithCookie(cookie?: string) {
  return {
    protocol: "https",
    headers: cookie ? { cookie } : {},
  } as Request;
}

function unauthenticatedContext(): TrpcContext {
  return {
    user: null,
    adminAuthenticated: false,
    req: requestWithCookie(),
    res: {} as Response,
  };
}

describe("independent admin password authentication", () => {
  it("creates a valid admin session with the configured password", async () => {
    let token = "";
    const response = {
      cookie: (_name: string, value: string) => {
        token = value;
      },
    } as unknown as Response;

    const success = await loginAdmin("sakai2024admin", requestWithCookie(), response);
    expect(success).toBe(true);
    expect(token).not.toBe("");
    expect(await hasAdminSession(requestWithCookie(`sakai_admin_session=${encodeURIComponent(token)}`))).toBe(true);
  });

  it("rejects unauthenticated access to every admin list procedure", async () => {
    const caller = appRouter.createCaller(unauthenticatedContext());
    await expect(caller.works.getAll()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller.designProjects.getAll()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller.blog.getAll()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("rejects an incorrect password", async () => {
    let cookieCalled = false;
    const response = {
      cookie: () => {
        cookieCalled = true;
      },
    } as unknown as Response;

    const success = await loginAdmin("wrong-password", requestWithCookie(), response);
    expect(success).toBe(false);
    expect(cookieCalled).toBe(false);
  });
});
