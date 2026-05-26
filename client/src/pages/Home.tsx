import { Mail, Phone, MapPin, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:sakai@example.com?subject=お問い合わせ：${formData.name}&body=お名前：${formData.name}%0D%0Aメールアドレス：${formData.email}%0D%0A電話番号：${formData.phone}%0D%0Aメッセージ：${formData.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/logo_c1bdfbde.png"
              alt="株式会社 堺設備"
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold" style={{ color: "#0052CC" }}>
                株式会社 堺設備
              </h1>
              <p className="text-xs text-gray-600">給排水工事・配管工事</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} style={{ color: "#0052CC" }} />
            ) : (
              <Menu size={24} style={{ color: "#0052CC" }} />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
              会社紹介
            </a>
            <a href="#business" className="text-gray-700 hover:text-blue-600 font-medium">
              事業内容
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
              お問い合わせ
            </a>
            <a
              href="https://sakaisetsubi-rct.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded font-medium text-white"
              style={{ backgroundColor: "#0052CC" }}
            >
              採用情報
            </a>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col gap-4 p-4">
              <a href="#about" className="text-gray-700 font-medium">
                会社紹介
              </a>
              <a href="#business" className="text-gray-700 font-medium">
                事業内容
              </a>
              <a href="#contact" className="text-gray-700 font-medium">
                お問い合わせ
              </a>
              <a
                href="https://sakaisetsubi-rct.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded font-medium text-white text-center"
                style={{ backgroundColor: "#0052CC" }}
              >
                採用情報
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Urgent Call Button - Fixed */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <a
          href="tel:054-348-2286"
          className="flex items-center gap-2 px-4 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
          style={{ backgroundColor: "#FF4444" }}
        >
          <Phone size={20} />
          <span>電話する</span>
        </a>
      </div>

      {/* Hero Section with Diagonal Cut */}
      <section className="pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/manus-storage/hero-video_e8043571.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          {/* Bottom Wave */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            style={{ transform: "scaleY(-1)" }}
          >
            <polygon points="0,0 1200,0 1200,100 0,50" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                地域の暮らしを
                <br />
                支える。
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-95 leading-relaxed">
                1970年の創業以来、静岡市清水区を拠点に、給排水工事から配管工事まで、地域のライフラインを守るプロフェッショナルとして、お客様の信頼を積み重ねてきました。
              </p>

              {/* Urgent Call Section */}
              <div className="hidden md:block bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg mb-8 border border-white border-opacity-30">
                <p className="text-sm font-semibold mb-3 opacity-90">お急ぎの方はお電話ください</p>
                <div className="flex items-center gap-4 mb-3">
                  <a
                    href="tel:054-348-2286"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-lg"
                    style={{ backgroundColor: "#FF4444" }}
                  >
                    <Phone size={24} />
                    054-348-2286
                  </a>
                </div>
                <p className="text-xs opacity-80">
                  平日 8:00～17:30 対応
                  <br />
                  （日祝・第2・4土曜 休み）
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href="#contact"
                  className="px-8 py-3 rounded-lg font-bold text-white"
                  style={{ backgroundColor: "#FF4444" }}
                >
                  お問い合わせ
                </a>
                <a
                  href="#business"
                  className="px-8 py-3 rounded-lg font-bold text-blue-600 bg-white hover:bg-gray-100"
                >
                  事業内容を見る
                </a>
              </div>
            </div>

            <div className="relative h-96 hidden md:block rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/manus-storage/company_building_01f1aff4.webp"
                alt="Company Building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            style={{ color: "#0052CC" }}
          >
            会社紹介
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">私たちについて</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                1970年の創業以来、静岡市清水区を拠点に地域の暮らしを支え続けてきました。2014年に株式会社堺設備として法人化し、現在11名のスタッフが一丸となって、お客様の快適な生活環境づくりに貢献しています。
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">私たちの特徴</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "#0052CC" }}
                  >
                    ✓
                  </span>
                  <span className="text-gray-700">
                    社員同士の風通しが良く、チームワークを大切にしています
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "#0052CC" }}
                  >
                    ✓
                  </span>
                  <span className="text-gray-700">
                    確かな技術と丁寧な対応でお客様からの信頼を得ています
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "#0052CC" }}
                  >
                    ✓
                  </span>
                  <span className="text-gray-700">
                    長年培った技術と経験で、安心・安全な施工をお約束します
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">会社概要</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">会社名</p>
                  <p className="text-lg text-gray-800">株式会社 堺設備</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">代表者名</p>
                  <p className="text-lg text-gray-800">堺 貴央</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">設立年月日</p>
                  <p className="text-lg text-gray-800">2014年11月1日</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">従業員数</p>
                  <p className="text-lg text-gray-800">11人</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">住所</p>
                  <p className="text-lg text-gray-800">
                    〒424-0063
                    <br />
                    静岡市清水区能島285-1
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">電話番号</p>
                  <p className="text-lg text-gray-800">
                    054-348-2286（TEL）
                    <br />
                    054-348-2287（FAX）
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership Section */}
          <div className="mt-20 pt-16 border-t-2 border-gray-200">
            <h3
              className="text-3xl font-bold mb-12 text-center"
              style={{ color: "#0052CC" }}
            >
              経営陣
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Founder */}
              <div className="text-center">
                <div className="mb-6 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/manus-storage/president_founder_a7e618f0.png"
                    alt="創業者"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">創業者</h4>
                <p
                  className="text-sm font-semibold mb-4"
                  style={{ color: "#0052CC" }}
                >
                  現 会長
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  1970年に千葉県から静岡へ移住し、一人で事業を開始。「地域の方々の役に立ちたい」という想いを大切に、一つひとつの現場と向き合ってきました。
                </p>
              </div>

              {/* Second Generation President */}
              <div className="text-center">
                <div className="mb-6 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/manus-storage/president_second_f6239422.jpg"
                    alt="二代目社長"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                  二代目社長
                </h4>
                <p className="text-sm font-semibold mb-4" style={{ color: "#FF4444" }}>
                  創業者の長男
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  創業者の想いと技術を受け継ぎ、現場を何より大切にしていました。「丁寧な仕事をすること」を何より大切にし、職人たちと一緒に動き、お客様から厚い信頼を得ていました。
                </p>
              </div>

              {/* Current Representative */}
              <div className="text-center">
                <div
                  className="mb-6 w-full h-80 rounded-lg shadow-lg flex items-center justify-center text-white text-6xl font-bold"
                  style={{ backgroundColor: "#0052CC" }}
                >
                  堺
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                  堺 貴央
                </h4>
                <p className="text-sm font-semibold mb-4" style={{ color: "#0052CC" }}>
                  現 代表取締役
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  先代社長から受け継いだ「現場を大切にすること」「丁寧な仕事をすること」「人との繋がりを大切にすること」という想いを大切にしながら、地域の暮らしを支えています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Section with Diagonal */}
      <section id="business" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute top-0 left-0 w-full"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,50 1200,0 1200,100 0,100" fill="#F0F7FF" />
          </svg>
        </div>

        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(to bottom, #F0F7FF 0%, #E8F2FF 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            style={{ color: "#0052CC" }}
          >
            事業内容
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">給排水工事</h3>
              <p className="text-gray-700 leading-relaxed">
                一般住宅の給排水工事を中心に、新設工事から老朽化した設備の更新まで、幅広く対応しています。
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                リフォーム工事
              </h3>
              <p className="text-gray-700 leading-relaxed">
                リフォームに伴う水廻り工事、配管の点検・調査、修繕工事まで、お客様のご要望に応じて対応いたします。
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">緊急対応</h3>
              <p className="text-gray-700 leading-relaxed">
                緊急のトラブル対応にも迅速かつ丁寧にお応えします。地域のライフラインを守るプロフェッショナルとして、お客様の「困った」に対応いたします。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="text-5xl font-bold mb-4"
                style={{ color: "#0052CC" }}
              >
                01
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">給水工事</h4>
              <p className="text-gray-600">
                安全で清潔な水をお届けする給水管工事
              </p>
            </div>

            <div className="text-center">
              <div
                className="text-5xl font-bold mb-4"
                style={{ color: "#5B5FDE" }}
              >
                02
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">排水工事</h4>
              <p className="text-gray-600">
                快適な生活環境を実現する排水管工事
              </p>
            </div>

            <div className="text-center">
              <div
                className="text-5xl font-bold mb-4"
                style={{ color: "#FF4444" }}
              >
                03
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">修繕工事</h4>
              <p className="text-gray-600">
                老朽化した配管の修繕・更新工事
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="#contact"
              className="px-8 py-3 rounded-lg font-bold text-white inline-block"
              style={{ backgroundColor: "#0052CC" }}
            >
              工事のご相談はこちら
            </a>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
              ニュース
            </h2>
            <p className="text-gray-600 text-lg">
              最新の情報をお知らせします
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Article 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">2026.05.25</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  静岡市清水区の配管工求人｜"長く続けられる現場"を大切にしています
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  静岡市清水区で配管工・設備工事経験者を募集。株式会社堺設備では、新築配管工事を中心に大手ハウスメーカー案件にも対応しています。
                </p>
                <a
                  href="https://sakaisetsubi-rct.com/blog/202605251253/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  詳しく見る
                </a>
              </div>
            </div>

            {/* Article 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">2026.05.22</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  創業の想いを受け継ぎ、地域と歩み続けてきた二代目社長
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  株式会社堺設備の二代目社長について。創業者の長男として想いと技術を受け継ぎ、現場を大切にしながら地域の暮らしを支え続けてきました。
                </p>
                <a
                  href="https://sakaisetsubi-rct.com/blog/202605222027/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  詳しく見る
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://sakaisetsubi-rct.com/blog/p/1/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              すべての記事を見る
            </a>
          </div>
        </div>
      </section>

      {/* Urgent Call Banner - Desktop */}
      <section className="hidden md:block py-6 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">お急ぎの方はお電話ください</h3>
            <p className="text-sm opacity-90">
              平日 8:00～17:30 対応（日祝・第2・4土曜 休み）
            </p>
          </div>
          <a
            href="tel:054-348-2286"
            className="flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-red-600 bg-white hover:bg-gray-100 transition-colors text-lg"
          >
            <Phone size={28} />
            <span>054-348-2286</span>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            style={{ color: "#0052CC" }}
          >
            お問い合わせ
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            給排水工事のご相談、お見積もり、緊急のトラブル対応など、お気軽にお問い合わせください。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <Phone size={24} style={{ color: "#0052CC" }} />
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">
                      電話番号
                    </p>
                    <a
                      href="tel:054-348-2286"
                      className="text-lg font-bold text-blue-600 hover:underline"
                    >
                      054-348-2286
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      平日 8:00～17:30（日祝・第2・4土曜 休み）
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Mail size={24} style={{ color: "#0052CC" }} />
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">
                      メールアドレス
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      sakai@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin size={24} style={{ color: "#0052CC" }} />
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">住所</p>
                    <p className="text-lg font-bold text-gray-800">
                      〒424-0063
                      <br />
                      静岡市清水区能島285-1
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-bold text-white text-lg"
                style={{ backgroundColor: "#0052CC" }}
              >
                送信する
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 text-white"
        style={{
          background: "linear-gradient(135deg, #0052CC 0%, #5B5FDE 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">株式会社 堺設備</h3>
              <p className="text-sm opacity-90">
                給排水工事・配管工事のプロフェッショナル。
                <br />
                地域の暮らしを支えます。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">メニュー</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="hover:opacity-80">
                    会社紹介
                  </a>
                </li>
                <li>
                  <a href="#business" className="hover:opacity-80">
                    事業内容
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:opacity-80">
                    お問い合わせ
                  </a>
                </li>
                <li>
                  <a
                    href="https://sakaisetsubi-rct.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80"
                  >
                    採用情報
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">お問い合わせ</h3>
              <p className="text-sm">電話：054-348-2286</p>
              <p className="text-sm">
                住所：
                <br />
                静岡市清水区能島285-1
              </p>
            </div>
          </div>

          <div className="border-t border-white border-opacity-20 pt-8 text-center text-sm">
            <p>© 2024 株式会社 堺設備. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
