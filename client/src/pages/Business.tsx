import { ArrowRight, Bath, Building2, ClipboardCheck, Droplets, FileText, Phone, ShieldCheck, Wrench } from "lucide-react";
import { useConversionTracking } from "@/components/AnalyticsTracker";

const services = [
  {
    title: "水漏れ・排水トラブル対応",
    description: "蛇口や配管からの水漏れ、トイレつまり、排水不良など、水回りの気になる症状をご相談いただけます。状況を確認し、必要な修理内容をご案内します。",
    icon: Droplets,
    href: "/service/leak-repair",
    label: "漏水修理の詳細を見る",
  },
  {
    title: "水回りリフォーム",
    description: "キッチン・浴室・トイレ・洗面所など、水回りの使い勝手や設備の状態に合わせたリフォームをご相談いただけます。",
    icon: Bath,
    href: "/service/remodel",
    label: "水回りリフォームの詳細を見る",
  },
  {
    title: "新築・増改築の給排水設備工事",
    description: "戸建住宅、アパート、小規模店舗などの新築・増改築に伴う給水・排水設備工事に対応します。現場条件に応じた配管計画をご提案します。",
    icon: Building2,
    href: "/service/new-construction",
    label: "新築給排水工事の詳細を見る",
  },
  {
    title: "設備交換・水栓工事",
    description: "水栓、洗面台、給湯まわりなど、水回り設備の交換や部分的な修理をご相談いただけます。",
    icon: Wrench,
    href: "/service/equipment",
    label: "設備交換工事の詳細を見る",
  },
  {
    title: "下水道切替・排水設備工事",
    description: "下水道への切替、排水設備の整備、排水マスまわりの工事など、生活環境に必要な排水設備工事に対応します。",
    icon: ShieldCheck,
    href: "/service/sewer",
    label: "下水道切替工事の詳細を見る",
  },
  {
    title: "設計・水道申請",
    description: "一般住宅から学校などの公共工事まで、給排水設備の設計図書作成、水道申請、道路使用・占用に関する手続きをご相談いただけます。",
    icon: FileText,
    href: "/corporate",
    label: "設計・申請の詳細を見る",
  },
];

const steps = [
  ["01", "お問い合わせ", "電話またはフォームから、症状や工事のご予定をお知らせください。"],
  ["02", "現地確認・お見積もり", "お見積もりをご希望の場合は、必要に応じて現地状況を確認し、対応内容と必要費用をご案内します。"],
  ["03", "工事・お引き渡し", "お見積もり内容にご納得いただいたうえで施工し、完了後にご確認いただきます。"],
];

export default function Business() {
  const trackConversion = useConversionTracking();

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-20 md:pt-24">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 py-20 text-white sm:px-6 md:py-28">
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold tracking-[0.24em] text-blue-200">BUSINESS</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">水回りの困りごとから<br />給排水設備・設計申請まで</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">株式会社堺設備は、日常の水漏れ・排水トラブルから、新築・リフォーム時の給排水設備工事、設計・各種申請まで、内容に合わせてご相談を承ります。</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="/#contact" onClick={() => trackConversion("contact_click", "事業内容詳細：見積もり相談")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 font-bold text-blue-900 transition-colors hover:bg-blue-50"><ClipboardCheck className="h-5 w-5" />お問い合わせ・見積もり相談</a>
            <a href="tel:0543482286" onClick={() => trackConversion("phone_click", "事業内容詳細：電話で相談")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/50 px-6 py-3 font-bold text-white transition-colors hover:bg-white/10"><Phone className="h-5 w-5" />電話で相談する</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-bold tracking-[0.18em] text-blue-700">SERVICE MENU</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">対応できる主な内容</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">ご相談内容に近い項目を選ぶと、詳しい対応内容をご確認いただけます。緊急性が高い水漏れ・つまりなどは、お電話でのご相談も承ります。</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <a key={service.title} href={service.href} onClick={() => trackConversion("service_symptom_click", `事業内容詳細：${service.title}`)} className="group flex min-h-72 flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-700"><Icon aria-hidden="true" className="h-6 w-6" /></div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{service.description}</p>
                <span className="mt-6 inline-flex items-center text-sm font-bold text-blue-700">{service.label}<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="border-y border-blue-100 bg-white px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold tracking-[0.18em] text-blue-700">PROCESS</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">ご相談から工事までの流れ</h2>
            <p className="mt-5 leading-8 text-slate-600">症状や工事内容がまだはっきり決まっていない場合も、まずはお気軽にご相談ください。内容を整理したうえで、必要な対応をご案内します。</p>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map(([number, title, description]) => (
              <li key={number} className="rounded-xl bg-slate-50 p-6">
                <span className="text-2xl font-black text-blue-700">{number}</span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-10 text-center text-white shadow-xl md:px-12 md:py-14">
          <h2 className="text-3xl font-bold md:text-4xl">水回り・給排水設備のご相談はこちら</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-blue-100">水漏れやつまりの対応、設備交換、リフォーム、新築時の給排水工事、設計・申請まで、内容に合わせてお問い合わせください。</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="tel:0543482286" onClick={() => trackConversion("phone_click", "事業内容詳細：下部電話CTA")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-7 py-3 font-bold text-blue-800 transition-colors hover:bg-blue-50"><Phone className="h-5 w-5" />054-348-2286</a>
            <a href="/#contact" onClick={() => trackConversion("contact_click", "事業内容詳細：下部見積もりCTA")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/70 px-7 py-3 font-bold text-white transition-colors hover:bg-white/10"><ClipboardCheck className="h-5 w-5" />お問い合わせ・見積もり相談</a>
          </div>
        </div>
      </section>
    </main>
  );
}
