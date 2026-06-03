import { Mail, Phone, MapPin, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

/**
 * Design Philosophy: Modern Professional with Gradient & Photos
 * - Primary Color: #0052CC (deep blue)
 * - Secondary Color: #5B5FDE (purple)
 * - Accent: #FF4444 (red from logo)
 * - Typography: Noto Sans JP for Japanese readability
 * - Layout: Diagonal cuts, gradient backgrounds, photo-rich
 * - Inspiration: Recruitment site design elements
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  const { user, loading, error, isAuthenticated, logout } = useAuth();


  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Fetch latest news from blog
  const { data: newsData = [], isLoading: newsLoading } = trpc.blog.getLatestNews.useQuery();

  // Hero Slideshow Images - メモ化
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
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <a
          href="tel:054-348-2286"
          className="flex items-center justify-center w-14 h-14 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
          style={{ backgroundColor: "#00A8E8" }}
        >
          <Phone size={24} />
        </a>
      </div>

      {/* Mobile Fixed Contact Button */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <a
          href="#contact"
          className="flex items-center justify-center w-14 h-14 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
          style={{ backgroundColor: "#FF4444" }}
        >
          <Mail size={24} />
        </a>
      </div>

      {/* Hero Section - Slideshow */}
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:054-348-2286"
                className="px-8 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: "#00A8E8" }}
              >
                <Phone size={20} />
                電話する
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-lg font-bold text-white"
                style={{ backgroundColor: "#FF4444" }}
              >
                お問い合わせ
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

      {/* About Section - 50 Years Trust */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
              style={{ color: "#0052CC" }}
            >
              地域密着で50年以上
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              1970年の創業以来、静岡市を拠点に地域の暮らしを支え続けてきました。2014年に株式会社堺設備として法人化し、現在11名のスタッフが一丸となって、お客様の快適な生活環境づくりに貢献しています。
            </p>
          </div>

          {/* Stats Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-lg text-center">
              <p className="text-2xl font-bold" style={{ color: "#0052CC" }}>
                100件以上
              </p>
              <p className="text-gray-700 font-semibold mt-2">年間新築施工実績</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-lg text-center">
              <p className="text-4xl font-bold" style={{ color: "#0052CC" }}>
                戸建・アパート・店舗
              </p>
              <p className="text-gray-700 font-semibold mt-2">対応</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-lg text-center">
              <p className="text-4xl font-bold" style={{ color: "#0052CC" }}>
                設計・申請
              </p>
              <p className="text-gray-700 font-semibold mt-2">業務対応</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-lg text-center">
              <p className="text-4xl font-bold" style={{ color: "#0052CC" }}>
                応援・請負
              </p>
              <p className="text-gray-700 font-semibold mt-2">相談可能</p>
            </div>
          </div>

          {/* Executive Team */}
          <div className="mb-12 md:mb-16">
            <h3
              className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center"
              style={{ color: "#0052CC" }}
            >
              経営者紹介
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Founder */}
              <div className="bg-gradient-to-b from-blue-50 to-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-56 md:h-64 bg-gray-200 rounded-lg overflow-hidden mb-4 md:mb-6">
                  <img
                    src="/manus-storage/sakai_otsurao_founder_correct_ecc6ddc1.webp"
                    alt="会長"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-semibold mb-2" style={{ color: "#0052CC" }}>会長</p>
                <h4 className="text-xl font-bold mb-3">堺　乙雄</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  1970年の創業以来、千葉県から静岡へ移住し、何もないところから一人で仕事を始めました。「地域の方々の役に立ちたい」という想いを大切に、地域の暮らしを支え続けています。
                </p>
              </div>

              {/* Second Generation President */}
              <div className="bg-gradient-to-b from-purple-50 to-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-56 md:h-64 bg-gray-200 rounded-lg overflow-hidden mb-4 md:mb-6">
                  <img
                    src="/manus-storage/sakai_otsurao_founder_a6c41900.webp"
                    alt="前社長"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-sm font-semibold mb-2" style={{ color: "#5B5FDE" }}>前社長</p>
                <h4 className="text-xl font-bold mb-3">堺　滋岳</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  創業者の長男として、その想いと技術を受け継ぎ、現場を大切にしながら地域の暮らしを支え続けてきました。丁寧な仕事をすることを何より大切にしていました。
                </p>
              </div>

              {/* Current President */}
              <div className="bg-gradient-to-b from-blue-100 to-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-56 md:h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg flex items-center justify-center mb-4 md:mb-6">
                  <span className="text-6xl font-bold" style={{ color: "#0052CC" }}>堺</span>
                </div>
                <p className="text-sm font-semibold mb-2" style={{ color: "#0052CC" }}>代表取締役</p>
                <h4 className="text-xl font-bold mb-3">堺　貴央</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  3代目に就任。多くの国家資格を所有し、確かな技術と専門知識をもとに対応いたします。創業からの想いを受け継ぎながら、地域の暮らしを支え続けています。
                </p>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-12 rounded-lg">
            <h3
              className="text-3xl font-bold mb-4 text-center"
              style={{ color: "#0052CC" }}
            >
              保有資格・許可
            </h3>
            <p className="text-gray-700 text-center mb-8">
              確かな技術と国家資格をもとに、設計・申請から施工まで責任を持って対応いたします。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl" style={{ color: "#0052CC" }}>✓</span>
                <span className="text-gray-700">給水装置工事主任技術者</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl" style={{ color: "#0052CC" }}>✓</span>
                <span className="text-gray-700">排水設備工事責任技術者</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl" style={{ color: "#0052CC" }}>✓</span>
                <span className="text-gray-700">2級管工事施工管理技士</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl" style={{ color: "#0052CC" }}>✓</span>
                <span className="text-gray-700">2級配管技能士</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl" style={{ color: "#0052CC" }}>✓</span>
                <span className="text-gray-700">産業廃棄物収集運搬業許可</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl" style={{ color: "#0052CC" }}>✓</span>
                <span className="text-gray-700">その他各種国家資格保有</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            style={{ color: "#0052CC" }}
          >
            選ばれる理由
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            {[
              {
                number: "01",
                title: "設計・申請から施工まで一括対応",
                description:
                  "給排水設備の設計・各種申請業務から施工まで一貫対応。スムーズな現場進行をサポートします。",
              },
              {
                number: "02",
                title: "新築・リフォームどちらも対応可能",
                description:
                  "戸建・アパート・小規模店舗まで幅広く対応。現場状況に合わせた柔軟な施工を行います。",
              },
              {
                number: "03",
                title: "静岡エリア密着の迅速対応",
                description:
                  "静岡市周辺を中心に地域密着で対応。フットワークを活かし迅速に対応します。",
              },
              {
                number: "04",
                title: "見えない部分まで丁寧に施工",
                description:
                  "見えなくなる配管部分まで丁寧に施工。安全性・使いやすさ・メンテナンス性を考慮しています。",
              },
              {
                number: "05",
                title: "協力業者・応援相談可能",
                description:
                  "応援・請負・協力業者様との連携にも対応。継続的なお付き合いを大切にしています。",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 md:gap-8">
                <div
                  className="text-4xl md:text-5xl font-bold flex-shrink-0"
                  style={{ color: "#0052CC" }}
                >
                  {item.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="business" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            style={{ color: "#0052CC" }}
          >
            事業内容
          </h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            新築配管工事から改修工事まで、幅広く対応しています。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "漏水修理",
                description: "漏水調査・給水管修理・埋設管修理に対応",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-other-piping-aoxytiYtfoC7oHfyKtb69p.webp",
                link: "/service/leak-repair",
              },
              {
                title: "水回りリフォーム",
                description: "トイレ・洗面・キッチン・浴室などの水廻り工事に対応",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-remodel-pipe-6h2NHqV4uftiukYNdRC2e6.webp",
                link: "/service/remodel",
              },
              {
                title: "機器交換工事",
                description: "トイレ・洗面台・水栓・井戸ポンプ交換に対応",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-fixture-installation-VaGWvDnHpFJYZfBdnXTTS8.webp",
                link: "/service/equipment",
              },
              {
                title: "新築給排水工事",
                description: "新築住宅の給排水配管工事、大手ハウスメーカー案件にも対応",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-new-pipe-work-H5eZ4ckQ4dmsPx5AMaPjfe.webp",
                link: "/service/new-construction",
              },
              {
                title: "下水道切替工事",
                description: "浄化槽から下水道への切替工事、補助金対応",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-water-design-fYtNvfAJGUNTPTf5AkAgMZ.webp",
                link: "/service/sewer",
              },
              {
                title: "分水工事",
                description: "給水引込・分水申請・道路掘削工事に対応",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-water-application-8svMFpkkhtPd32gLVM3Yhu.webp",
                link: "/service/water-tap",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 mx-auto mb-6 object-contain"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
                <span className="text-blue-600 font-semibold mt-4 inline-block text-sm">詳細を見る →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0052CC" }}
          >
            ニュース
          </h2>

          {/* News Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsLoading ? (
              <p className="text-gray-600 col-span-full text-center py-8">
                外部ブログから最新記事を取得中です...
              </p>
            ) : newsData.length > 0 ? (
              newsData.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
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
                    style={{ color: "#0052CC" }}
                  >
                    {item.date}
                  </p>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <span
                    className="inline-block px-6 py-2 rounded font-semibold text-white"
                    style={{ backgroundColor: "#0052CC" }}
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
              style={{ color: "#0052CC" }}
            >
              給排水設備工事のご相談
            </h2>
            <p className="text-gray-600 text-lg">
              新築・リフォーム・設計申請・応援依頼など、お気軽にご相談ください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                お電話でのお問い合わせ
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    電話番号
                  </p>
                  <a
                    href="tel:054-348-2286"
                    className="text-3xl font-bold"
                    style={{ color: "#0052CC" }}
                  >
                    054-348-2286
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    FAX
                  </p>
                  <p className="text-3xl font-bold" style={{ color: "#0052CC" }}>
                    054-348-2287
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    受付時間
                  </p>
                  <p className="text-gray-700">平日 8:00～17:30</p>
                  <p className="text-gray-700">（日祝・第2・4土曜 休み）</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                メールでのお問い合わせ
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    メールアドレス
                  </p>
                  <a
                    href="mailto:sakai-setubi@eagle.ocn.ne.jp"
                    className="text-lg font-semibold break-all"
                    style={{ color: "#0052CC" }}
                  >
                    sakai-setubi@eagle.ocn.ne.jp
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    対応時間
                  </p>
                  <p className="text-gray-700">24時間受付</p>
                  <p className="text-xs text-gray-600 mt-2">
                    ※返信は営業時間内となります
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              お問い合わせフォーム
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="山田太郎"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="example@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  電話番号
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="090-1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  メッセージ <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="ご相談内容をお聞かせください"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 rounded-lg font-bold text-white text-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#0052CC" }}
              >
                送信する
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4">株式会社 堺設備</h4>
              <p className="text-gray-400 text-sm">
                静岡市清水区の給排水工事・配管工事のプロフェッショナル
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">お問い合わせ</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="tel:054-348-2286" className="text-gray-400 hover:text-white">
                    TEL: 054-348-2286
                  </a>
                </li>
                <li>
                  <p className="text-gray-400">FAX: 054-348-2287</p>
                </li>
                <li>
                  <a href="mailto:sakai-setubi@eagle.ocn.ne.jp" className="text-gray-400 hover:text-white">
                    sakai-setubi@eagle.ocn.ne.jp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">リンク</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    会社紹介
                  </a>
                </li>
                <li>
                  <a href="#business" className="text-gray-400 hover:text-white">
                    事業内容
                  </a>
                </li>
                <li>
                  <a href="https://sakaisetsubi-rct.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    採用情報
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400 text-sm">
              &copy; 2024 株式会社 堺設備. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
