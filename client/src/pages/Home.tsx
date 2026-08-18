import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { ChevronLeft, ChevronRight, ClipboardList, MessageCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useSchemaOrg } from "@/hooks/useSchemaOrg";
import { generateLocalBusinessDetailSchema, generateWebsiteSchema } from "@/lib/schema";
import ServiceIcon, { type ServiceIconName } from "@/components/ServiceIcon";

/**
 * Design Philosophy: Modern Professional with Gradient & Photos
 * - Primary Color: #0052CC (deep blue)
 * - Secondary Color: #1D4ED8 (supporting blue)
 * - Accent: #0F172A (navy)
 * - Typography: Noto Sans JP for Japanese readability
 * - Layout: Diagonal cuts, gradient backgrounds, photo-rich
 * - Inspiration: Recruitment site design elements
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
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
      }, 500); // スクロール停止後500msで透明度を戻す
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
  const displayWorks = latestWorks.slice(0, 2); // Show only 2 latest works

  // Hero Slideshow Images - メモ化
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle form submission here
      console.log("Form submitted:", formData);
    },
    [formData]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Slideshow */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Slides */}
        <div className="relative w-full h-full">
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
                fetchPriority={index === currentSlide ? "high" : "low"}
                decoding="async"
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
          <p className="text-lg md:text-2xl text-white text-center mb-8">
            戸建・アパート・小規模店舗対応
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/works"
              className="px-8 py-3 rounded font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#0052CC" }}
            >
              <ClipboardList className="w-5 h-5" />施工実績を見る
            </a>
            <a
              href="/#contact"
              className="px-8 py-3 rounded font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#1D4ED8" }}
            >
              <MessageCircle className="w-5 h-5" />見積もり相談
            </a>
            <a
              href="https://sakaisetsubi-rct.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#0052CC" }}
            >
              求人応募
            </a>
          </div>
          </div>

          {/* Slide Navigation */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all"
          >
            <ChevronLeft aria-label="前のスライド" className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all"
          >
            <ChevronRight aria-label="次のスライド" className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Services Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 flex items-center">
            <span className="inline-block w-1 h-10 bg-blue-600 mr-4"></span>
            主なサービス
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "漏水修理", icon: "leak" as ServiceIconName, description: "水漏れ・つまりの迅速対応" },
              { title: "水回りリフォーム", icon: "reform" as ServiceIconName, description: "キッチン・トイレ・浴室" },
              { title: "給排水工事", icon: "new-construction" as ServiceIconName, description: "新築・増改築対応" },
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-blue-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-5 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <ServiceIcon name={service.icon} className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 flex items-center">
            <span className="inline-block w-1 h-10 bg-blue-600 mr-4"></span>
            施工実績
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="p-6">
                    <p
                      className="text-sm font-semibold mb-2"
                      style={{ color: "#0052CC" }}
                    >
                      {work.category}
                    </p>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                      {truncateText(work.title, 50)}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {truncateText(work.workContent, 100)}
                    </p>
                    <span
                      className="inline-block px-6 py-2 rounded font-semibold text-white"
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
          <div className="text-center mt-8">
            <a
              href="/works"
              className="inline-block px-8 py-3 rounded font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#0052CC" }}
            >
              すべての施工実績を見る <ChevronRight className="inline-block ml-1 w-4 h-4 align-text-bottom" />
            </a>
          </div>
        </section>

        {/* Latest Blog Section - Simplified with Title Only */}
        <section className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 flex items-center">
            <span className="inline-block w-1 h-10 bg-blue-600 mr-4"></span>
            お知らせ・コラム
          </h3>
          <div className="space-y-3">
            {newsLoading ? (
              <p className="text-gray-600 text-center py-8">
                ブログ記事を取得中です...
              </p>
            ) : newsData.length > 0 ? (
              newsData.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all group border-l-4"
                  style={{ borderLeftColor: "#0052CC" }}
                >
                  {item.image && (
                    <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="flex-grow min-w-0">
                    <p
                      className="text-xs font-semibold mb-1"
                      style={{ color: "#0052CC" }}
                    >
                      {item.date}
                    </p>
                    <h4 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </a>
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">
                記事を取得できませんでした
              </p>
            )}
          </div>
          <div className="text-center mt-8">
            <a
              href="/blog"
              className="inline-block px-8 py-3 rounded font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#0052CC" }}
            >
              すべてのお知らせ・コラムを見る <ChevronRight className="inline-block ml-1 w-4 h-4 align-text-bottom" />
            </a>
          </div>
        </section>

        {/* Company Info Section */}
        <section id="about" className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 flex items-center">
            <span className="inline-block w-1 h-10 bg-blue-600 mr-4"></span>
            会社紹介
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                株式会社堺設備は、静岡市・焼津市の上下水道指定工事店として、給排水設備工事・水道工事・リフォームを行う設備工事会社です。
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                水漏れ修理、トイレ詰まり、排水詰まり、井戸ポンプ交換など、水回りのトラブルに迅速に対応します。
              </p>
              <p className="text-gray-700 leading-relaxed">
                経験豊富な職人による丁寧な施工と、明確な見積もりで、お客様の信頼を得ています。
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-800">会社情報</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-semibold">会社名</p>
                  <p>株式会社堺設備</p>
                </div>
                <div>
                  <p className="font-semibold">電話番号</p>
                  <p>054-348-2286</p>
                </div>
                <div>
                  <p className="font-semibold">住所</p>
                  <p>静岡県静岡市清水区押切1273</p>
                </div>
                <div>
                  <p className="font-semibold">対応エリア</p>
                  <p>静岡市・焼津市</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Team */}
        <section id="leadership" className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: "#0052CC" }}>
            経営者紹介
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Founder */}
            <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden mb-6">
                <img
                  src="/manus-storage/president_founder_a7e618f0.png"
                  alt="会長 堺 乙雄"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: "#0052CC" }}>会長</p>
              <h3 className="text-xl font-bold mb-3 text-gray-800">堺　乙雄</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                1970年の創業以来、千葉県から静岡へ移住し、何もないところから一人で仕事を始めました。「地域の方々の役に立ちたい」という想いを大切に、地域の暮らしを支え続けています。
              </p>
            </div>

            {/* Second Generation President */}
            <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden mb-6">
                <img
                  src="/manus-storage/sakai_shigitake_president2_6b9bf572.webp"
                  alt="前社長 堺 滋岳"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: "#0052CC" }}>前社長</p>
              <h3 className="text-xl font-bold mb-3 text-gray-800">堺　滋岳</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                創業者の長男として、その想いと技術を受け継ぎ、現場を大切にしながら地域の暮らしを支え続けてきました。丁寧な仕事をすることを何より大切にしていました。
              </p>
            </div>

            {/* Current President */}
            <div className="bg-gradient-to-b from-blue-100 to-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-40 bg-gradient-to-br from-blue-200 to-slate-200 rounded-lg flex items-center justify-center mb-6">
                <span className="text-6xl font-bold" style={{ color: "#0052CC" }}>堺</span>
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: "#0052CC" }}>代表取締役</p>
              <h3 className="text-xl font-bold mb-3 text-gray-800">堺　貴央</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                3代目に就任。多くの国家資格を所有し、確かな技術と専門知識をもとに対応いたします。創業からの想いを受け継ぎながら、地域の暮らしを支え続けています。
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-20 bg-white p-12 rounded-lg border-2 border-blue-600">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center">
            <span className="inline-block w-1 h-10 bg-blue-600 mr-4"></span>
            お問い合わせ・見積もり相談
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">お名前</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded border-2 border-gray-300 focus:border-blue-600 focus:outline-none text-gray-800 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">メールアドレス</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded border-2 border-gray-300 focus:border-blue-600 focus:outline-none text-gray-800 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">電話番号</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded border-2 border-gray-300 focus:border-blue-600 focus:outline-none text-gray-800 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">メッセージ</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 rounded border-2 border-gray-300 focus:border-blue-600 focus:outline-none text-gray-800 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-blue-600 font-bold py-3 rounded hover:bg-gray-100 transition-colors"
            >
              送信する
            </button>
          </form>
        </section>

        {/* Map Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="inline-block w-1 h-10 bg-blue-600 mr-4"></span>
            アクセス・会社案内
          </h2>
          <p className="text-gray-600 mb-6">
            株式会社堺設備（静岡市清水区押切1273）｜静岡市・焼津市の上下水道指定工事店
          </p>
          <iframe
            width="100%"
            height="400"
            frameBorder="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.8894537894006!2d138.45718612346848!3d35.02401743525127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601a3450c8406f03%3A0x722027aac56fa27f!2z5pil5pil6YeR5bGx!5e0!3m2!1sja!2sjp!4v1717857600000"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </div>
    </div>
  );
}
