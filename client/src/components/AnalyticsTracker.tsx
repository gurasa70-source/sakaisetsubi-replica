import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export type ConversionEventType =
  | "phone_click"
  | "contact_click"
  | "contact_submit"
  | "recruit_click"
  | "service_symptom_click"
  | "works_contact_click";

type AnalyticsEventType = ConversionEventType | "page_view" | "page_exit";

function getSessionId() {
  const key = "sakai_session_id";
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = `sess_${crypto.randomUUID?.() ?? `${Math.random().toString(36).slice(2)}_${Date.now()}`}`;
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
}

function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/ipad|tablet|kindle/i.test(userAgent)) return "Tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

function getSearchQuery(referrer: string) {
  try {
    const referrerUrl = new URL(referrer);
    if (referrerUrl.hostname.includes("google.")) return referrerUrl.searchParams.get("q") || undefined;
    if (referrerUrl.hostname.includes("search.yahoo.co.jp")) return referrerUrl.searchParams.get("p") || undefined;
  } catch {
    return undefined;
  }
  return undefined;
}

function createEvent(path: string, eventType: AnalyticsEventType, eventLabel?: string, durationSeconds = 0, isBounce = 1) {
  const referrer = document.referrer || undefined;
  return {
    sessionId: getSessionId(),
    path,
    referrer,
    searchQuery: referrer ? getSearchQuery(referrer) : undefined,
    device: detectDevice(),
    userAgent: navigator.userAgent,
    eventType,
    eventLabel,
    durationSeconds,
    isBounce,
  };
}

export function useConversionTracking() {
  const { mutate } = trpc.analytics.record.useMutation();

  return useCallback(
    (eventType: ConversionEventType, eventLabel: string) => {
      mutate(createEvent(`${window.location.pathname}${window.location.search}`, eventType, eventLabel, 0, 0));
    },
    [mutate]
  );
}

export default function AnalyticsTracker() {
  const [location] = useLocation();
  const { mutate } = trpc.analytics.record.useMutation();
  const pageStartRef = useRef(Date.now());

  useEffect(() => {
    pageStartRef.current = Date.now();
    const path = location || window.location.pathname;
    mutate(createEvent(path, "page_view", path));

    return () => {
      const durationSeconds = Math.max(0, Math.round((Date.now() - pageStartRef.current) / 1000));
      mutate(createEvent(path, "page_exit", path, durationSeconds, durationSeconds < 10 ? 1 : 0));
    };
  }, [location, mutate]);

  return null;
}
