import type { Request, Response } from "express";
import { jwtVerify, SignJWT } from "jose";
import { getSessionCookieOptions } from "./cookies";

export const ADMIN_SESSION_COOKIE = "sakai_admin_session";
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000;

function getSecret() {
  return new TextEncoder().encode(process.env.JWT_SECRET || "sakai-admin-session-fallback-secret");
}

function getCookieValue(req: Request, name: string) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return undefined;
  const entry = cookieHeader.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : undefined;
}

export async function hasAdminSession(req: Request) {
  const token = getCookieValue(req, ADMIN_SESSION_COOKIE);
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function loginAdmin(password: string, req: Request, res: Response) {
  const expectedPassword = process.env.ADMIN_PASSWORD || "sakai2024admin";
  if (password !== expectedPassword) return false;

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSecret());

  res.cookie(ADMIN_SESSION_COOKIE, token, {
    ...getSessionCookieOptions(req),
    maxAge: SESSION_MAX_AGE_MS,
  });
  return true;
}

export function logoutAdmin(req: Request, res: Response) {
  res.clearCookie(ADMIN_SESSION_COOKIE, getSessionCookieOptions(req));
}
