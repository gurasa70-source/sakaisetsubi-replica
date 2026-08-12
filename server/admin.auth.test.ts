import { describe, expect, it } from "vitest";
import type { Request, Response } from "express";
import { hasAdminSession, loginAdmin } from "./_core/adminAuth";

function requestWithCookie(cookie?: string) {
  return {
    protocol: "https",
    headers: cookie ? { cookie } : {},
  } as Request;
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
