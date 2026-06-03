import { useState } from "react";
import { Link } from "wouter";
import { useSchemaOrg } from "@/hooks/useSchemaOrg";
import { generateServiceSchema, generateFAQSchema } from "@/lib/schema";

export default function LeakRepairService() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "漏水調査にはどのくらい時間がかかりますか？",
      answer: "通常、簡易調査は30分～1時間程度です。詳細な調査が必要な場合は、別途お見積もりさせていただきます。"
    },
    {
      question: "夜間や休日の対応は可能ですか？",
      answer: "はい、24時間対応可能です。緊急の場合はお気軽にお電話ください。"
    },
    {
      question: "修理費用の目安は？",
      answer: "漏水箇所や修理内容によって異なります。まずは無料調査でお見積もりさせていただきます。"
    },
    {
      question: "保証はありますか？",
      answer: "施工内容に応じて、1年～5年の保証をさせていただきます。詳しくはお問い合わせください。"
    }
  ];

  // Schema.org 構造化データを追加
  useSchemaOrg(
    generateServiceSchema({
      name: '漏水修理',
      description: '静岡市清水区の漏水修理。水漏れの調査、修理を一体的に対応。',
      url: 'https://sakaireplica-m2oiogqs.manus.space/service/leak-repair',
    }),
    'service-leak-repair-schema'
  );

  useSchemaOrg(
    generateFAQSchema(faqs),
    'faq-leak-repair-schema'
  );

  const relatedWorks = [
    {
      id: "leak-1",
      title: "清水区○○で漏水修理",
      category: "漏水修理",
      image: "/manus-storage/placeholder_work.jpg"
    },
    {
      id: "leak-2",
      title: "清水区△△で埋設管漏水修理",
      category: "漏水修理",
      image: "/manus-storage/placeholder_work.jpg"
    },
    {
      id: "leak-3",
      title: "清水区□□で漏水調査",
      category: "漏水修理",
      image: "/manus-storage/placeholder_work.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="relative h-96 md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800"
          style={{
            backgroundImage: "linear-gradient(135deg, #0052CC 0%, #5B5FDE 100%)"
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              漏水修理
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              24時間対応で迅速に漏水を特定・修理いたします
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                📞 電話する
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition">
                📧 お問い合わせ
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main>
        {/* こんな症状ありませんか？ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ color: "#0052CC" }}>
              こんな症状ありませんか？
            </h2>
            <p className="text-gray-600 text-center mb-16 text-lg">
              以下のような症状がある場合は、漏水の可能性があります
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "💧",
                  title: "水道料金が高い",
                  description: "前月と比べて水道料金が急に上がった。使用量に心当たりがない場合は、漏水の可能性があります。"
                },
                {
                  icon: "🌊",
                  title: "地面が濡れている",
                  description: "庭や駐車場の地面が常に濡れている。埋設管からの漏水の可能性があります。"
                },
                {
                  icon: "⚙️",
                  title: "メーターが回る",
                  description: "蛇口を全て閉じているのに、水道メーターが回り続けている。漏水の可能性が高いです。"
                }
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-100 hover:shadow-lg transition">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 対応内容 */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ color: "#0052CC" }}>
              対応内容
            </h2>
            <p className="text-gray-600 text-center mb-16 text-lg">
              漏水の調査から修理まで、すべてに対応いたします
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "漏水調査",
                  description: "最新の機器を使用して、漏水箇所を正確に特定します。"
                },
                {
                  number: "02",
                  title: "給水管修理",
                  description: "給水管の漏水箇所を修理または交換いたします。"
                },
                {
                  number: "03",
                  title: "埋設管修理",
                  description: "地中の埋設管の漏水にも対応いたします。"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <div className="text-4xl font-bold mb-4" style={{ color: "#0052CC" }}>{item.number}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              ))}
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
              静岡市内を中心に対応いたします
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {["清水区", "葵区", "駿河区"].map((area, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-100">
                  <div className="text-5xl font-bold mb-4" style={{ color: "#0052CC" }}>📍</div>
                  <h3 className="text-2xl font-bold text-gray-800">{area}</h3>
                </div>
              ))}
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
                    <span className="text-lg font-semibold text-gray-800 text-left">{faq.question}</span>
                    <span className="text-2xl" style={{ color: "#0052CC" }}>
                      {expandedFAQ === index ? "−" : "+"}
                    </span>
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 py-4 bg-blue-50 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
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
                <Link key={work.id} href={`/works/${work.id}`} className="group cursor-pointer block">
                  <div className="bg-gray-200 h-64 rounded-lg overflow-hidden mb-4 relative">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition" />
                  </div>
                  <p className="text-sm font-semibold mb-2" style={{ color: "#0052CC" }}>
                    {work.category}
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition">
                    {work.title}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/works" className="inline-block px-8 py-3 rounded-lg font-semibold transition" style={{ backgroundColor: "#0052CC", color: "white" }}>
                すべての施工実績を見る →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              漏水でお困りですか？
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              24時間対応で迅速に対応いたします。お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition">
                📞 0120-XXX-XXX
              </button>
              <button className="bg-red-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition">
                📧 お問い合わせ
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
