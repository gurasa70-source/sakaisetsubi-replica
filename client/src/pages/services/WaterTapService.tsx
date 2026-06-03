import { useState } from "react";
import { Link } from "wouter";

export default function WaterTapService() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "分水工事にはどのくらい時間がかかりますか？",
      answer: "工事の規模によって異なりますが、通常1～3日程度が目安です。詳しくはご相談ください。"
    },
    {
      question: "分水申請の手続きをサポートしてもらえますか？",
      answer: "はい、サポートいたします。指定給水装置工事事業者として、水道局への申請手続きを代行いたします。"
    },
    {
      question: "道路掘削が必要な場合、許可申請は対応していますか？",
      answer: "はい、対応いたします。道路掘削に必要な許可申請も一貫して実施いたします。"
    },
    {
      question: "新築住宅への給水引込工事も対応していますか？",
      answer: "はい、対応いたします。新築住宅への給水引込工事も、設計段階からのご相談に対応いたします。"
    }
  ];

  const relatedWorks = [
    {
      id: "water-1",
      title: "給水引込工事",
      category: "分水工事",
      image: "/manus-storage/placeholder_work.jpg"
    },
    {
      id: "water-2",
      title: "分水申請工事",
      category: "分水工事",
      image: "/manus-storage/placeholder_work.jpg"
    },
    {
      id: "water-3",
      title: "道路掘削工事",
      category: "分水工事",
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
              分水工事
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              給水引込・分水申請・道路掘削工事に対応
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
        {/* 対応内容 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ color: "#0052CC" }}>
              対応内容
            </h2>
            <p className="text-gray-600 text-center mb-16 text-lg">
              給水引込から分水申請まで、一貫対応いたします
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: "💧",
                  title: "給水引込",
                  description: "水道本管からの給水引込工事、新築敷地への給水配管"
                },
                {
                  icon: "📋",
                  title: "分水申請",
                  description: "水道局への分水申請手続き、指定工事事業者による対応"
                },
                {
                  icon: "🔨",
                  title: "道路掘削",
                  description: "道路掘削から給水配管敷設まで、交通安全に配慮した施工"
                },
                {
                  icon: "✅",
                  title: "各種許可申請",
                  description: "道路掘削許可申請、各種官庁申請対応"
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

        {/* 対応エリア */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ color: "#0052CC" }}>
              対応エリア
            </h2>
            <p className="text-gray-600 text-center mb-16 text-lg">
              静岡市内を中心に対応いたします
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {["清水区", "葵区", "駿河区", "焼津市"].map((area, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-100">
                  <div className="text-5xl font-bold mb-4" style={{ color: "#0052CC" }}>📍</div>
                  <h3 className="text-2xl font-bold text-gray-800">{area}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
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
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
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
              分水工事はお任せください
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              給水引込から申請手続きまで、一貫して対応いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:054-348-2286" className="inline-block">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition">
                  📞 054-348-2286
                </button>
              </a>
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
