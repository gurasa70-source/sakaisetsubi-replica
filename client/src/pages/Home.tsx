import { Mail, Phone, MapPin, Menu, X, ChevronLeft, ChevronRight, AlertCircle, Briefcase, Star, Users } from "lucide-react";
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
  const displayWorks = latestWorks.slice(0, 2);

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:sakai-setubi@eagle.ocn.ne.jp?subject=お問い合わせ：${formData.name}&body=お名前：${formData.name}%0D%0Aメールアドレス：${formData.email}%0D%0A電話番号：${formData.phone}%0D%0Aメッセージ：${formData.message}`;
    window.location.href = mailtoLink;
  }, [formData]);

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* Mobile Fixed Call Button */}
      <div 
        className="fixed bottom-20 left-4 z-40 md:hidden transition-opacity duration-300"
        style={{ opacity: isScrolling ? 0.3 : 1 }}
      >
        <a
          href="tel:054-348-2286"
          className="flex items-center justify-center w-14 h-14 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
          style={{ backgroundColor: "#00A8E8" }}
        >
          <Phone size={24} />
        </a>
      </div>

      {/* Mobile Fixed Contact Button */}
      <div 
        className="fixed bottom-4 left-4 z-40 md:hidden transition-opacity duration-300"
        style={{ opacity: isScrolling ? 0.3 : 1 }}
      >
        <a
          href="#contact"
          className="flex items-center justify-center w-14 h-14 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
          style={{ backgroundColor: "#FF4444" }}
        >
          <Mail size={24} />
        </a>
      </div>

      {/* ① Hero Section - Slideshow */}
      <section className="pt-24 pb-0 relative overflow-hidden bg-gray-900">
        <div className="relative w-full h-96 md:h-screen max-h-screen">
          {/* Slideshow Container */}
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
                  loading={index === currentSlide ? "eager" : "lazy"}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-center mb-8 max-w-2xl">
              {currentSlide === 0 && "戸建・アパート・小規模店舗対応"}
              {currentSlide === 1 && "設計・各種申請業務も一括対応"}
              {currentSlide === 2 && "応援・請負・協力業者相談可能"}
              {currentSlide === 3 && "丁寧な施工で信頼を築く"}
            </p>

            {/* CTA Buttons - 3つ配置 */}
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
              <a
                href="/works"
                className="px-8 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: "#0052CC" }}
              >
                施工実績を見る
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-lg font-bold text-white"
                style={{ backgroundColor: "#FF6B6B" }}
              >
                見積もり相談
              </a>
              <a
                href="#recruitment"
                className="px-8 py-3 rounded-lg font-bold text-white border-2 border-white hover:bg-white/10 transition-all"
              >
                求人応募
              </a>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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
        </div>
      </section>

      {/* ② 緊急性セクション - 困りごと訴求 */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#FF6B6B" }}>
              こんなお困りごとありませんか？
            </h2>
            <p className="text-gray-600 text-lg">
              静岡市での給排水トラブルはすぐにご相談ください
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💧", title: "水漏れしている", description: "給水管からの水漏れ、蛇口からのポタポタ" },
              { icon: "🚰", title: "排水が流れない", description: "トイレの詰まり、キッチンシンクの流れが悪い" },
              { icon: "🔧", title: "水道管が古い", description: "築年数が古く、配管の劣化が心配" },
              { icon: "⚡", title: "すぐ直したい", description: "緊急対応が必要な水道トラブル" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="tel:054-348-2286"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: "#FF6B6B" }}
            >
              <Phone size={20} />
              今すぐお電話ください
            </a>
          </div>
        </div>
      </section>

      {/* ③ 施工実績セクション - 信頼獲得（上位配置） */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0052CC" }}
          >
            施工実績
          </h2>

          {/* Latest Works Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {worksLoading ? (
              <p className="text-gray-600 col-span-full text-center py-8">
                施工実績を取得中です...
              </p>
            ) : displayWorks.length > 0 ? (
              displayWorks.map((work) => (
                <a
                  key={work.id}
                  href={`/works/${work.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow block"
                >
                  {work.imageUrl && (
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <p
                      className="text-sm font-semibold mb-2"
                      style={{ color: "#0052CC" }}
                    >
                      {work.date}
                    </p>
                    <h4 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
                      {work.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {work.workContent}
                    </p>
                    <span
                      className="inline-block px-4 py-2 rounded text-sm font-semibold text-white"
                      style={{ backgroundColor: "#0052CC" }}
                    >
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

          <div className="text-center">
            <a
              href="/works"
              className="inline-block px-8 py-3 rounded font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#0052CC" }}
            >
              すべての施工実績を見る →
            </a>
          </div>
        </div>
      </section>

      {/* ④ サービス内容 */}
      <section id="business" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            style={{ color: "#0052CC" }}
          >
            サービス内容
          </h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            新築配管工事から改修工事まで、幅広く対応しています。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "給水工事", description: "新築・リフォーム給水配管" },
              { title: "排水工事", description: "排水管・下水道工事" },
              { title: "漏水修理", description: "漏水調査・修理対応" },
              { title: "リフォーム配管", description: "水回りリフォーム工事" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/design"
              className="inline-block px-8 py-3 rounded font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#0052CC" }}
            >
              サービス詳細を見る →
            </a>
          </div>
        </div>
      </section>

      {/* ⑤ 選ばれる理由 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0052CC" }}
          >
            選ばれる理由
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: "📍", title: "地元密着", description: "静岡市を中心に地域に根ざした対応" },
              { icon: "⚡", title: "緊急対応可能", description: "水道トラブルは迅速に対応" },
              { icon: "👨‍🔧", title: "経験豊富な職人", description: "50年以上の実績と信頼" },
              { icon: "💰", title: "明確な見積もり", description: "事前に詳細な見積書をご提示" },
              { icon: "🏆", title: "高品質施工", description: "丁寧な仕事で信頼を築く" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥ お客様の声 */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            style={{ color: "#0052CC" }}
          >
            お客様からの評価
          </h2>
          <p className="text-gray-600 text-center mb-12 text-lg">
            Google口コミで多くのお客様からご好評をいただいています
          </p>

          {/* Google Maps Embed */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.8894537894006!2d138.45718612346848!3d35.02401743525127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601a3450c8406f03%3A0x722027aac56fa27f!2z5pil5pil6YeR5bGx!5e0!3m2!1sja!2sjp!4v1717857600000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.google.com/maps/place/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE+%E5%A0%BA%E8%A8%AD%E5%82%099/@35.0239184,138.4571861,18.75z/data=!4m6!3m5!1s0x601a3450c8406f03:0x722027aac56fa27f!8m2!3d35.0240174!4d138.4575712!16s%2Fg%2F11b7syh1mn?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: "#0052CC" }}
            >
              <span>📍</span>
              Google口コミをもっと見る
            </a>
          </div>
        </div>
      </section>

      {/* ⑦ お知らせ・コラム */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0052CC" }}
          >
            お知らせ・コラム
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsLoading ? (
              <p className="text-gray-600 col-span-full text-center py-8">
                ブログ記事を取得中です...
              </p>
            ) : newsData.length > 0 ? (
              newsData.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow block"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <p
                    className="text-sm font-semibold mb-2"
                    style={{ color: "#5B5FDE" }}
                  >
                    {item.date}
                  </p>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <span
                    className="inline-block px-6 py-2 rounded font-semibold text-white"
                    style={{ backgroundColor: "#5B5FDE" }}
                  >
                    詳しく見る
                  </span>
                </a>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center py-8">
                記事を取得できませんでした
              </p>
            )}
          </div>

          <div className="text-center mt-8">
            <a
              href="/blog"
              className="inline-block px-8 py-3 rounded font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#5B5FDE" }}
            >
              すべてのお知らせ・コラムを見る →
            </a>
          </div>
        </div>
      </section>

      {/* ⑧ 求人セクション */}
      <section id="recruitment" className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            style={{ color: "#0052CC" }}
          >
            一緒に働きませんか？
          </h2>
          <p className="text-gray-600 text-center mb-12 text-lg">
            堺設備では、やる気のある仲間を募集しています
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: "✨", title: "未経験OK", description: "丁寧な研修で一から学べます" },
              { icon: "🏗️", title: "現場の仕事紹介", description: "様々な施工現場で経験を積める" },
              { icon: "📈", title: "キャリア形成", description: "技術を身につけて成長できる環境" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/recruit"
              className="inline-block px-8 py-3 rounded font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#0052CC" }}
            >
              求人詳細を見る →
            </a>
          </div>
        </div>
      </section>

      {/* ⑨ 会社情報 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0052CC" }}
          >
            会社情報
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">株式会社堺設備</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin size={24} style={{ color: "#0052CC" }} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">住所</p>
                    <p className="text-gray-600">静岡県静岡市清水区押切1273</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone size={24} style={{ color: "#0052CC" }} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">電話番号</p>
                    <a href="tel:054-348-2286" className="text-blue-600 hover:underline">054-348-2286</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail size={24} style={{ color: "#0052CC" }} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">メール</p>
                    <a href="mailto:sakai-setubi@eagle.ocn.ne.jp" className="text-blue-600 hover:underline">sakai-setubi@eagle.ocn.ne.jp</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">対応エリア</h3>
              <p className="text-gray-600 mb-4">
                静岡市を中心に、以下のエリアに対応しています：
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ 静岡市葵区</li>
                <li>✓ 静岡市駿河区</li>
                <li>✓ 静岡市清水区</li>
                <li>✓ 焼津市</li>
                <li>✓ 島田市（一部）</li>
                <li>✓ その他エリアもご相談ください</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ⑩ Contact Section */}
      <section id="contact" className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
              style={{ color: "#0052CC" }}
            >
              給排水設備工事のご相談
            </h2>
            <p className="text-gray-600 text-lg">
              新築・リフォーム・設計申請・応援
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  ご相談内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="工事内容、ご質問などをお聞かせください"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg font-bold text-white text-lg transition-all hover:scale-105"
                style={{ backgroundColor: "#FF6B6B" }}
              >
                送信する
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              または直接お電話ください
            </p>
            <a
              href="tel:054-348-2286"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: "#00A8E8" }}
            >
              <Phone size={20} />
              054-348-2286
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
