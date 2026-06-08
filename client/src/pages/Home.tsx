import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useSchemaOrg } from "@/hooks/useSchemaOrg";
import { generateLocalBusinessDetailSchema, generateWebsiteSchema } from "@/lib/schema";

/**
 * Design Philosophy: Conversion-Focused Layout
 * - Primary Goal: Maximize inquiries and job applications
 * - Information Flow: Problem Recognition → Trust Building → Action
 * - Primary Color: #0052CC (deep blue)
 * - Secondary Color: #FF6B6B (red - urgency)
 * - Typography: Noto Sans JP for Japanese readability
 */

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  // Schema.org 構造化データを追加
  useSchemaOrg(generateLocalBusinessDetailSchema(), 'local-business-schema');
  useSchemaOrg(generateWebsiteSchema(), 'website-schema');

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // スクロール状態を管理
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Fetch latest news from blog
  const { data: newsData = [], isLoading: newsLoading } = trpc.blog.getLatestNews.useQuery();
  
  // Fetch latest works
  const { data: latestWorks = [], isLoading: worksLoading } = trpc.works.getPublished.useQuery();
  const displayWorks = latestWorks.slice(0, 3); // Show 3 latest works for trust

  const heroSlides = useMemo(() => [
    {
      image: "/manus-storage/sakaisetsubi_main03_ea74aaa0.jpg",
      title: "静岡市の新築・リフォーム給排水設備工事",
    },
    {
      image: "/manus-storage/sakaisetsubi_hero2_50ed2cb7.jpg",
      title: "戸建・アパート・小規模店舗対応",
    },
    {
      image: "/manus-storage/company_building_real_d2e0ace2.jpg",
      title: "設計・各種申請業務も一括対応",
    },
    {
      image: "/manus-storage/construction_example_01_edfdea19.jpg",
      title: "応援・請負・協力業者相談可能",
    },
  ], []);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      // TODO: Connect to backend
      alert("お問い合わせありがとうございます。確認後、ご連絡させていただきます。");
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    [formData]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ==================== ① ファーストビュー（最重要） ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Slideshow Background */}
        <div className="absolute inset-0 w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            株式会社堺設備
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-semibold">
            静岡市の給排水設備・水道工事
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-200">
            水漏れ・詰まり・配管工事・リフォーム対応
          </p>

          {/* CTA Buttons - 3つ */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a
              href="/works"
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 bg-blue-600 text-white hover:bg-blue-700"
            >
              施工実績を見る
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 bg-red-600 text-white hover:bg-red-700"
            >
              見積もり相談
            </a>
            <a
              href="#recruit"
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 bg-green-600 text-white hover:bg-green-700"
            >
              求人応募
            </a>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ==================== ② 緊急性セクション ==================== */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            こんなお困りごと、ありませんか？
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💧", title: "水漏れしている", desc: "天井や壁からの水漏れ、蛇口からのポタポタ" },
              { icon: "🚫", title: "排水が流れない", desc: "トイレが詰まった、キッチンの排水が悪い" },
              { icon: "🔧", title: "水道管が古い", desc: "築年数が古い、配管の劣化が心配" },
              { icon: "⚡", title: "すぐ直したい", desc: "今すぐ対応してほしい、緊急の場合" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-block px-10 py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-all hover:scale-105"
            >
              今すぐ相談する →
            </a>
          </div>
        </div>
      </section>

      {/* ==================== ③ 施工実績セクション（上位配置・信頼獲得） ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="inline-block w-1 h-10 bg-red-600 mr-4"></span>
            施工実績
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            静岡市での豊富な施工経験。ビフォーアフターで信頼を実証します。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {worksLoading ? (
              <p className="text-gray-600 col-span-full text-center py-8">
                施工実績を取得中です...
              </p>
            ) : displayWorks.length > 0 ? (
              displayWorks.map((work) => (
                <a
                  key={work.id}
                  href={`/works/${work.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 block"
                >
                  {work.imageUrl && (
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <p className="text-sm font-semibold mb-2 text-blue-600">
                      {work.date}
                    </p>
                    <h4 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
                      {work.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {work.workContent}
                    </p>
                    <span className="inline-block px-4 py-2 rounded text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700">
                      詳しく見る
                    </span>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center py-8">
                施工実績がまだありません
              </p>
            )}
          </div>

          <div className="text-center mt-12">
            <a
              href="/works"
              className="inline-block px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
            >
              すべての施工実績を見る →
            </a>
          </div>
        </div>
      </section>

      {/* ==================== ④ サービス内容（簡潔） ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            提供サービス
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "給水工事", desc: "新規配管、給水管交換、増設対応" },
              { title: "排水工事", desc: "排水管工事、下水道接続、改修" },
              { title: "漏水修理", desc: "水漏れ診断、修理、配管交換" },
              { title: "リフォーム配管", desc: "キッチン、浴室、トイレ配管" },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl font-bold text-blue-600 mb-4">0{index + 1}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ⑤ 選ばれる理由 ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            堺設備が選ばれる理由
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: "地元密着", desc: "静岡市を中心に20年以上の実績。地域を知り尽くした職人です。" },
              { title: "緊急対応可能", desc: "水漏れなど緊急時も対応。早朝・夜間も相談可能です。" },
              { title: "経験豊富な職人", desc: "ベテラン職人が丁寧に施工。質の高い仕上がりを保証します。" },
              { title: "明確な見積もり", desc: "追加費用なし。事前に詳しく説明し、納得いただいてから工事開始。" },
              { title: "各種申請対応", desc: "設計・各種申請業務も一括対応。手続きの手間を削減できます。" },
              { title: "協力業者相談可", desc: "応援・請負・協力業者のご相談も可能。柔軟に対応します。" },
            ].map((reason, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{reason.title}</h3>
                  <p className="text-gray-600">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ⑥ お客様の声 ==================== */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            お客様からの評価
          </h2>

          <div className="max-w-4xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3251.5893819365!2d138.45718612346068!3d35.02401873456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601a3450c8406f03%3A0x722027aac56fa27f!2z5pil5pil6YeR5bqc!5e0!3m2!1sja!2sjp!4v1717858800000"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="text-center mt-8">
              <a
                href="https://www.google.com/maps/place/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE+%E5%A0%BA%E8%A8%AD%E5%82%99/@35.0239184,138.4571861,18.75z/data=!4m6!3m5!1s0x601a3450c8406f03:0x722027aac56fa27f!8m2!3d35.0240174!4d138.4575712!16s%2Fg%2F11b7syh1mn?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
              >
                Google口コミをもっと見る →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ⑦ お知らせ・コラム ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="inline-block w-1 h-10 bg-purple-600 mr-4"></span>
            お知らせ・コラム
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            水道工事の知識や現場情報をお届けします。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsLoading ? (
              <p className="text-gray-600 col-span-full text-center py-8">
                お知らせを取得中です...
              </p>
            ) : newsData.length > 0 ? (
              newsData.slice(0, 2).map((news, idx) => (
                <a
                  key={idx}
                  href={news.link || '#'}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow block"
                >
                  <div className="p-6">
                    <p className="text-sm font-semibold mb-2 text-purple-600">
                      {news.date}
                    </p>
                    <h4 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {news.description}
                    </p>
                    <span className="inline-block px-4 py-2 rounded text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700">
                      読む
                    </span>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center py-8">
                お知らせがまだありません
              </p>
            )}
          </div>

          <div className="text-center mt-12">
            <a
              href="/blog"
              className="inline-block px-10 py-4 bg-purple-600 text-white font-bold text-lg rounded-lg hover:bg-purple-700 transition-all hover:scale-105"
            >
              すべてのお知らせを見る →
            </a>
          </div>
        </div>
      </section>

      {/* ==================== ⑧ 求人セクション ==================== */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            一緒に働きませんか？
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            堺設備では、やる気のある人材を募集しています。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {[
              { icon: "🎓", title: "未経験OK", desc: "丁寧な研修制度で、初心者からベテランまで育成します。" },
              { icon: "🏗️", title: "現場の仕事紹介", desc: "給水工事、排水工事など、様々な現場を経験できます。" },
              { icon: "📈", title: "キャリア形成", desc: "技術習得後は独立支援も。あなたの成長を応援します。" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#recruit-form"
              className="inline-block px-10 py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-all hover:scale-105"
            >
              応募する →
            </a>
          </div>
        </div>
      </section>

      {/* ==================== ⑨ 会社情報 ==================== */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            会社情報
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">住所</h3>
              <p className="text-gray-300">
                〒424-0065<br />
                静岡県静岡市清水区押切1273
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">電話番号</h3>
              <a href="tel:0543482286" className="text-blue-400 hover:text-blue-300 text-lg font-bold">
                054-348-2286
              </a>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">対応エリア</h3>
              <p className="text-gray-300">
                静岡市・焼津市<br />
                周辺地域
              </p>
            </div>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400">
              © 2024 株式会社堺設備. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 問い合わせフォーム ==================== */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            お問い合わせ・見積もり相談
          </h2>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-gray-800 font-bold mb-2">
                お名前 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="山田太郎"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-bold mb-2">
                電話番号 <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="090-1234-5678"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-bold mb-2">
                メールアドレス <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="example@example.com"
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-800 font-bold mb-2">
                ご相談内容 <span className="text-red-600">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="水漏れしている、見積もりが欲しい、など..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
            >
              送信する
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
