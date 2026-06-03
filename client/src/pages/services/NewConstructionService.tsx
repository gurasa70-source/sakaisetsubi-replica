import { useState } from "react";
import { Link } from "wouter";

export default function NewConstructionService() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "設計段階からの相談は可能ですか？",
      answer: "はい、設計段階からご相談いただけます。最適な配管設計をご提案いたします。"
    },
    {
      question: "大手ハウスメーカーとの協力実績はありますか？",
      answer: "はい、複数の大手ハウスメーカーとの協力実績があります。"
    },
    {
      question: "各種申請業務も対応していますか？",
      answer: "はい、給水装置工事主任技術者による申請業務も一貫対応いたします。"
    },
    {
      question: "工事期間はどのくらい？",
      answer: "物件の規模によって異なりますが、通常は1～2週間程度です。"
    }
  ];

  const relatedWorks = [
    {
      id: "new-1",
      title: "新築給排水工事",
      category: "新築給排水工事",
      image: "/manus-storage/placeholder_work.jpg"
    },
    {
      id: "new-2",
      title: "新築設備工事",
      category: "新築給排水工事",
      image: "/manus-storage/placeholder_work.jpg"
    },
    {
      id: "new-3",
      title: "給排水配管工事",
      category: "新築給排水工事",
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
              新築給排水工事
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              新築住宅の給排水配管工事、大手ハウスメーカー案件にも対応
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
              新築物件の給排水工事を一貫対応いたします
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: "💧",
                  title: "給水設備",
                  description: "給水配管の設計・施工、給水器具の取付"
                },
                {
                  icon: "🌊",
                  title: "排水設備",
                  description: "排水配管の設計・施工、排水器具の取付"
                },
                {
                  icon: "🔧",
                  title: "屋外配管",
                  description: "屋外の給排水配管工事、引込管工事"
                },
                {
                  icon: "📋",
                  title: "申請業務",
                  description: "各種水道局申請、竣工図作成"
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
              新築給排水工事はお任せください
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              設計段階からのご相談もお気軽にどうぞ。
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
