import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useLoading } from "@/contexts/LoadingContext";

const LOADING_DURATION_MS = 320;

function isModifiedClick(event: MouseEvent) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export default function InternalNavigationLoading() {
  const [, setLocation] = useLocation();
  const { showLoading, hideLoading } = useLoading();
  const hideTimer = useRef<number | undefined>(undefined);

  const showLoadingForTransition = useCallback(() => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
    }

    showLoading();
    hideTimer.current = window.setTimeout(hideLoading, LOADING_DURATION_MS);
  }, [hideLoading, showLoading]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#") || /^(mailto:|tel:|sms:|javascript:)/i.test(rawHref)) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const nextPath = `${destination.pathname}${destination.search}`;
      const currentPath = `${window.location.pathname}${window.location.search}`;
      const nextUrl = `${nextPath}${destination.hash}`;
      const currentUrl = `${currentPath}${window.location.hash}`;
      if (nextUrl === currentUrl) return;

      event.preventDefault();
      showLoadingForTransition();

      if (nextPath !== currentPath) {
        setLocation(nextPath);
      }

      if (destination.hash) {
        window.setTimeout(() => {
          window.location.hash = destination.hash;
        }, 0);
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
      }
    };
  }, [setLocation, showLoadingForTransition]);

  return null;
}
