import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

/**
 * Design Philosophy: Clean Professional with Blue & White
 * - Primary Color: #0052CC (deep blue)
 * - Secondary Color: #FFFFFF (white)
 * - Accent: #FF4444 (red from logo)
 * - Typography: Noto Sans JP for Japanese readability
 * - Layout: Clean, minimal, professional
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
    // Create mailto link with form data
    const mailtoLink = `mailto:sakai@example.com?subject=お問い合わせ：${formData.name}&body=お名前：${formData.name}%0D%0Aメールアドレス：${formData.email}%0D%0A電話番号：${formData.phone}%0D%0Aメッセージ：${formData.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/logo_c1bdfbde.png"
              alt="株式会社 堺設備"
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold" style={{ color: "#0052CC" }}>
                株式会社 堺設備
              </h1>
              <p className="text-xs text-gray-600">給排水工事・配管工事</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              会社紹介
            </a>
            <a
              href="#business"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              事業内容
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              お問い合わせ
            </a>
            <a
              href="https://sakaisetsubi-rct.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg font-medium transition"
              style={{ backgroundColor: "#0052CC", color: "white" }}
            >
              採用情報
            </a>
          </nav>

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
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 py-4 px-4 flex flex-col gap-4">
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              会社紹介
            </a>
            <a
              href="#business"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              事業内容
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              お問い合わせ
            </a>
            <a
              href="https://sakaisetsubi-rct.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg font-medium text-white text-center transition"
              style={{ backgroundColor: "#0052CC" }}
            >
              採用情報
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                style={{ color: "#0052CC" }}
              >
                地域の暮らしを
                <br />
                支える
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                1970年の創業以来、静岡市清水区を拠点に、給排水工事から配管工事まで、地域のライフラインを守るプロフェッショナルとして、お客様の信頼を積み重ねてきました。
              </p>
              <div className="flex gap-4">
                <a
                  href="#contact"
                  className="px-8 py-3 rounded-lg font-bold text-white transition hover:shadow-lg"
                  style={{ backgroundColor: "#0052CC" }}
                >
                  お問い合わせ
                </a>
                <a
                  href="#business"
                  className="px-8 py-3 rounded-lg font-bold transition border-2"
                  style={{ borderColor: "#0052CC", color: "#0052CC" }}
                >
                  事業内容を見る
                </a>
              </div>
            </div>

            {/* Right Logo */}
            <div className="flex justify-center">
              <img
                src="/manus-storage/logo_c1bdfbde.png"
                alt="会社ロゴ"
                className="w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0052CC" }}
          >
            会社紹介
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  私たちについて
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  1970年の創業以来、静岡市清水区を拠点に地域の暮らしを支え続けてきました。2014年に株式会社堺設備として法人化し、現在11名のスタッフが一丸となって、お客様の快適な生活環境づくりに貢献しています。
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  私たちの特徴
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span
                      className="font-bold text-lg"
                      style={{ color: "#0052CC" }}
                    >
                      ✓
                    </span>
                    <span className="text-gray-700">
                      社員同士の風通しが良く、チームワークを大切にしています
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="font-bold text-lg"
                      style={{ color: "#0052CC" }}
                    >
                      ✓
                    </span>
                    <span className="text-gray-700">
                      確かな技術と丁寧な対応でお客様からの信頼を得ています
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="font-bold text-lg"
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
            </div>

            {/* Company Details */}
            <div
              className="p-8 rounded-lg"
              style={{ backgroundColor: "#F0F7FF" }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">会社概要</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">会社名</p>
                  <p className="text-lg text-gray-800">株式会社 堺設備</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    代表者名
                  </p>
                  <p className="text-lg text-gray-800">堺 貴央</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    設立年月日
                  </p>
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
                  <p className="text-sm text-gray-600 font-semibold">
                    電話番号
                  </p>
                  <p className="text-lg text-gray-800">
                    054-348-2286（TEL）
                    <br />
                    054-348-2287（FAX）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0052CC" }}
          >
            経営陣
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Founder */}
            <div className="text-center">
              <div
                className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-4xl font-bold"
                style={{ backgroundColor: "#0052CC" }}
              >
                創
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">創業者</h3>
              <p
                className="text-sm font-semibold mb-4"
                style={{ color: "#0052CC" }}
              >
                現 会長
              </p>
              <p className="text-gray-700 leading-relaxed">
                1970年に千葉県から静岡へ移住し、一人で事業を開始。「地域の方々の役に立ちたい」という想いを大切に、一つひとつの現場と向き合ってきました。
              </p>
            </div>

            {/* Second Generation President */}
            <div className="text-center">
              <div
                className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-4xl font-bold"
                style={{ backgroundColor: "#FF4444" }}
              >
                二
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                二代目社長
              </h3>
              <p className="text-sm font-semibold mb-4" style={{ color: "#FF4444" }}>
                創業者の長男
              </p>
              <p className="text-gray-700 leading-relaxed">
                創業者の想いと技術を受け継ぎ、現場を何より大切にしていました。「丁寧な仕事をすること」を何より大切にし、職人たちと一緒に動き、お客様から厚い信頼を得ていました。
              </p>
            </div>

            {/* Current Representative */}
            <div className="text-center">
              <div
                className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-4xl font-bold"
                style={{ backgroundColor: "#0052CC" }}
              >
                堺
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                堺 貴央
              </h3>
              <p className="text-sm font-semibold mb-4" style={{ color: "#0052CC" }}>
                現 代表取締役
              </p>
              <p className="text-gray-700 leading-relaxed">
                先代社長から受け継いだ「現場を大切にすること」「丁寧な仕事をすること」「人との繋がりを大切にすること」という想いを大切にしながら、地域の暮らしを支えています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section
        id="business"
        className="py-16 md:py-24"
        style={{ backgroundColor: "#F0F7FF" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0052CC" }}
          >
            事業内容
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  給排水工事
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  一般住宅の給排水工事を中心に、新設工事から老朽化した設備の更新まで、幅広く対応しています。
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  リフォーム工事
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  リフォームに伴う水廻り工事、配管の点検・調査、修繕工事まで、お客様のご要望に応じて対応いたします。
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  緊急対応
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  緊急のトラブル対応にも迅速かつ丁寧にお応えします。地域のライフラインを守るプロフェッショナルとして、お客様の「困った」に対応いたします。
                </p>
              </div>

              <a
                href="#contact"
                className="inline-block px-6 py-3 rounded-lg font-bold text-white transition hover:shadow-lg"
                style={{ backgroundColor: "#0052CC" }}
              >
                工事のご相談はこちら
              </a>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                <div
                  className="text-4xl font-bold mb-3"
                  style={{ color: "#FF4444" }}
                >
                  01
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  給水工事
                </h4>
                <p className="text-gray-600">
                  安全で清潔な水をお届けする給水管工事
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                <div
                  className="text-4xl font-bold mb-3"
                  style={{ color: "#FF4444" }}
                >
                  02
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  排水工事
                </h4>
                <p className="text-gray-600">
                  快適な生活環境を実現する排水管工事
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                <div
                  className="text-4xl font-bold mb-3"
                  style={{ color: "#FF4444" }}
                >
                  03
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  修繕工事
                </h4>
                <p className="text-gray-600">
                  老朽化した配管の修繕・更新工事
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0052CC" }}
          >
            お問い合わせ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  お気軽にお問い合わせください
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  給排水工事のご相談、お見積もり、緊急のトラブル対応など、お気軽にお問い合わせください。
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Phone size={24} style={{ color: "#0052CC" }} />
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">
                      電話番号
                    </p>
                    <p className="text-lg text-gray-800 font-bold">
                      054-348-2286
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail size={24} style={{ color: "#0052CC" }} />
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">
                      メールアドレス
                    </p>
                    <p className="text-lg text-gray-800 font-bold">
                      sakai@example.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin size={24} style={{ color: "#0052CC" }} />
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">住所</p>
                    <p className="text-lg text-gray-800 font-bold">
                      〒424-0063
                      <br />
                      静岡市清水区能島285-1
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  お名前 <span style={{ color: "#FF4444" }}>*</span>
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
                  メールアドレス <span style={{ color: "#FF4444" }}>*</span>
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
                  メッセージ <span style={{ color: "#FF4444" }}>*</span>
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
                className="w-full px-6 py-3 rounded-lg font-bold text-white transition hover:shadow-lg"
                style={{ backgroundColor: "#0052CC" }}
              >
                送信する
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">株式会社 堺設備</h3>
              <p className="text-gray-400 text-sm">
                給排水工事・配管工事のプロフェッショナル。
                <br />
                地域の暮らしを支えます。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">メニュー</h3>
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
                  <a href="#contact" className="text-gray-400 hover:text-white">
                    お問い合わせ
                  </a>
                </li>
                <li>
                  <a
                    href="https://sakaisetsubi-rct.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    採用情報
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">お問い合わせ</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>
                  <span className="font-semibold">電話：</span>
                  054-348-2286
                </p>
                <p>
                  <span className="font-semibold">住所：</span>
                  <br />
                  静岡市清水区能島285-1
                </p>
              </div>
            </div>
          </div>

          <div
            className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400"
            style={{ borderColor: "#333" }}
          >
            <p>&copy; 2024 株式会社 堺設備. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
