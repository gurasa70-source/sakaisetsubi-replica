import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function AnalyticsTracker() {
  const [location] = useLocation();
  const recordMutation = trpc.analytics.record.useMutation();
  const startTimeRef = useRef(Date.now());
  const sessionIdRef = useRef("");

  useEffect(() => {
    if (!sessionIdRef.current) {
      let sId = sessionStorage.getItem("sakai_session_id");
      if (!sId) {
        sId = "sess_" + Math.random().toString(36).substring(2) + "_" + Date.now();
        sessionStorage.setItem("sakai_session_id", sId);
      }
      sessionIdRef.current = sId;
    }

    startTimeRef.current = Date.now();
    const sessionId = sessionIdRef.current;
    const path = location || window.location.pathname;
    const referrer = document.referrer || "";
    const userAgent = navigator.userAgent;

    // Detect device
    let device = "Desktop";
    const ua = userAgent.toLowerCase();
    if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
      device = "Mobile";
    } else if (/ipad|tablet|kindle/i.test(ua)) {
      device = "Tablet";
    }

    // Detect search query from referrer
    let searchQuery = "";
    if (referrer.includes("google.")) {
      const urlParams = new URLSearchParams(new URL(referrer || "https://google.com").search);
      searchQuery = urlParams.get("q") || "";
    } else if (referrer.includes("search.yahoo.co.jp")) {
      const urlParams = new URLSearchParams(new URL(referrer || "https://yahoo.co.jp").search);
      searchQuery = urlParams.get("p") || "";
    }

    // Record initial page view
    recordMutation.mutate({
      sessionId,
      path,
      referrer,
      searchQuery: searchQuery || undefined,
      device,
      userAgent,
      durationSeconds: 0,
      isBounce: 1,
    });

    // Send duration on unmount or navigation
    return () => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      try {
        const body = JSON.stringify({
          0: {
            json: {
              sessionId,
              path,
              referrer,
              searchQuery: searchQuery || undefined,
              device,
              userAgent,
              durationSeconds: duration,
              isBounce: duration < 10 ? 1 : 0,
            },
          },
        });
        navigator.sendBeacon?.("/api/trpc/analytics.record", new Blob([body], { type: "application/json" }));
      } catch {
        // Fallback or ignore
      }
    };
  }, [location]);

  return null;
}
