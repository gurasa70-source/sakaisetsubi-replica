import { Link } from "wouter";
import { useSchemaOrg } from "@/hooks/useSchemaOrg";
import { generateServiceSchema, generateFAQSchema } from "@/lib/schema";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { CheckCircle2, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import { useConversionTracking } from "@/components/AnalyticsTracker";

export default function LeakRepairService() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const trackConversion = useConversionTracking();
  const { data: relatedWorks = [] } = trpc.works.getByCategory.useQuery("漏水修理");

  const faqs = [
    {
      question: "漏水調査にはどのくらい時間がかかりますか？",
      answer: "通常、簡易調査は30分～1時間程度です。詳細な調査が必要な場合は、別途お見積もりさせていただきます。"
    },
    {
      question: "夜間や休日の対応は可能ですか？",
      answer: "緊急の場合は、お気軽にお電話ください。対応可能な場合は対応いたします。"
    },
    {
      question: "修理費用の目安は？",
      answer: "漏水箇所や修理内容によって異なります。お見積もりをご希望の場合は、調査内容と必要費用をご案内したうえで、対応内容のお見積もりをご提示します。内容にご納得いただいてから施工します。"
    },
    {
      question: "保証はありますか？",
      answer: "施工不良が原因である場合、保証をさせていただきます。詳しくはお問い合わせください。"
    }
  ];

  // Schema.org 構造化データを追加
  useSchemaOrg(
    generateServiceSchema({
      name: '漏水修理',
      description: '静岡市・焼津市の漏水修理。水漏れの調査、修理を一体的に対応。',
      url: 'https://sakaireplica-m2oiogqs.manus.space/service/leak-repair',
    }),
    'service-leak-repair-schema'
  );

  useSchemaOrg(
    generateFAQSchema(faqs),
    'faq-leak-repair-schema'
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="relative h-96 md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800"
          style={{
            backgroundImage: "linear-gradient(135deg, #0F172A 0%, #0052CC 100%)"
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl font-bold leading-[1.2] text-balance text-white mb-4 sm:text-5xl md:text-6xl">
              <span className="flex items-center gap-3"><ServiceIcon name="leak" className="w-10 h-10 shrink-0 sm:w-12 sm:h-12" />漏水修理</span>
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-pretty text-blue-100 mb-6 sm:text-xl md:text-2xl">
              迅速に漏水を特定・修理いたします
            </p>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a href="tel:0543482286" onClick={() => trackConversion("phone_click", "漏水修理：電話で相談")} className="flex min-h-12 w-full items-center justify-center bg-white px-6 py-3 rounded-lg font-semibold text-blue-600 transition hover:bg-blue-50 sm:w-auto">
                <Phone className="inline-block mr-2 w-5 h-5" />電話する
              </a>
              <a href="/#contact" onClick={() => trackConversion("contact_click", "漏水修理：お問い合わせ")} className="flex min-h-12 w-full items-center justify-center border-2 border-white px-6 py-3 rounded-lg font-semibold text-white transition hover:bg-white hover:bg-opacity-10 sm:w-auto">
                <Mail className="inline-block mr-2 w-5 h-5" />お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* サービス内容 */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ color: "#0052CC" }}>
            サービス内容
          </h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            水漏れの原因を特定し、迅速に修理いたします
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">漏水調査</h3>
              <p className="text-gray-600 mb-4">
                最新の機器を使用して、水漏れの原因を正確に特定します。壁の中や床下の漏水も検出可能です。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />調査内容・費用の事前案内</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />最新の検査機器</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />正確な原因特定</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">漏水修理</h3>
              <p className="text-gray-600 mb-4">
                調査結果に基づいて、最適な修理方法を提案・実施いたします。
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />迅速な対応</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />確実な修理</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />アフターサービス完備</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 対応エリア */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ color: "#0052CC" }}>
            対応エリア
          </h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            静岡市・焼津市の上下水道指定工事店として対応いたします
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {["静岡市", "焼津市"].map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-lg border border-blue-100">
                <MapPin className="w-10 h-10 mx-auto mb-4 text-blue-700" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-800">{area}</h3>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-slate-900 to-blue-800 text-white px-12 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition">
                <Mail className="inline-block mr-2 w-5 h-5" />対象エリア内のお見積り・ご相談はこちら
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ color: "#0052CC" }}>
            よくある質問
          </h2>

          <div className="space-y-4 mt-12">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 bg-white hover:bg-gray-50 flex items-center justify-between transition"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <span className="text-2xl" style={{ color: "#0052CC" }}>
                    {expandedFAQ === index ? "−" : "+"}
                  </span>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 py-4 bg-blue-50 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 関連施工実績 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ color: "#0052CC" }}>
            関連施工実績
          </h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            実際の施工事例をご紹介します
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedWorks.map((work) => (
              <Link key={work.id} href={`/works/${work.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <img
                    src={work.imageUrl || "/manus-storage/placeholder_work.jpg"}
                    alt={work.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-2">
                      {work.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{work.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{work.workContent}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/works">
              <button className="bg-gradient-to-r from-slate-900 to-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition">
                すべての施工実績を見る <ChevronRight className="inline-block ml-1 w-5 h-5 align-text-bottom" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            漏水でお困りですか？
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            緊急の場合はお気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:054-348-2286" className="inline-block">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition">
                <Phone className="inline-block mr-2 w-5 h-5" />054-348-2286
              </button>
            </a>
            <button className="bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition">
              <Mail className="inline-block mr-2 w-5 h-5" />お問い合わせ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
