import { Phone, MessageCircle } from "lucide-react";
import { useConversionTracking } from "@/components/AnalyticsTracker";

export default function MobileConversionBar() {
  const trackConversion = useConversionTracking();

  return (
    <>
      <nav aria-label="お問い合わせ" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-blue-100 bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.14)] backdrop-blur md:hidden">
        <a
          href="tel:0543482286"
          onClick={() => trackConversion("phone_click", "モバイル固定CTA：電話で相談")}
          className="flex min-h-14 items-center justify-center gap-2 bg-slate-900 px-3 text-sm font-bold text-white transition-colors active:scale-[0.98]"
        >
          <Phone aria-hidden="true" className="h-4 w-4" />
          電話で相談
        </a>
        <a
          href="/#contact"
          onClick={() => trackConversion("contact_click", "モバイル固定CTA：見積もり相談")}
          className="flex min-h-14 items-center justify-center gap-2 bg-blue-600 px-3 text-sm font-bold text-white transition-colors active:scale-[0.98]"
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          見積もり相談
        </a>
      </nav>
      <aside aria-label="お問い合わせ" className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 overflow-hidden rounded-l-xl shadow-[0_10px_30px_rgba(15,23,42,0.22)] md:block">
        <a href="tel:0543482286" onClick={() => trackConversion("phone_click", "デスクトップ固定CTA：電話で相談")} className="flex w-16 flex-col items-center gap-2 bg-slate-900 px-2 py-4 text-xs font-bold text-white transition-colors hover:bg-slate-800"><Phone aria-hidden="true" className="h-5 w-5" /><span className="[writing-mode:vertical-rl]">電話で相談</span></a>
        <a href="/#contact" onClick={() => trackConversion("contact_click", "デスクトップ固定CTA：見積もり相談")} className="flex w-16 flex-col items-center gap-2 bg-blue-600 px-2 py-4 text-xs font-bold text-white transition-colors hover:bg-blue-700"><MessageCircle aria-hidden="true" className="h-5 w-5" /><span className="[writing-mode:vertical-rl]">見積もり相談</span></a>
      </aside>
    </>
  );
}
