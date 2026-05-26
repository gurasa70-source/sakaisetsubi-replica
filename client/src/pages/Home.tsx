import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

/**
 * Design Philosophy: Modern Professional with Blue Gradient
 * - Primary Color: #4DB8E8 (bright cyan)
 * - Secondary Color: #5B5FDE (deep purple)
 * - Layout: Diagonal cuts with gradient backgrounds
 * - Typography: Noto Sans JP for Japanese readability
 */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold" style={{ color: "#4DB8E8" }}>
              株式会社 堺設備
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-gray-700 hover:text-blue-500 transition">
              トップ
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-500 transition">
              私たちについて
            </a>
            <a href="#business" className="text-gray-700 hover:text-blue-500 transition">
              事業内容
            </a>
            <a href="#jobs" className="text-gray-700 hover:text-blue-500 transition">
              採用情報
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 py-4 px-4 flex flex-col gap-4">
            <a href="#" className="text-gray-700 hover:text-blue-500">
              トップ
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-500">
              私たちについて
            </a>
            <a href="#business" className="text-gray-700 hover:text-blue-500">
              事業内容
            </a>
            <a href="#jobs" className="text-gray-700 hover:text-blue-500">
              採用情報
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-0 relative overflow-hidden">
        <div className="relative h-96 md:h-screen flex items-center">
          {/* Hero Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/manus-storage/image_14dcef46_2c6a0a53.jpg')",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay with gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(77, 184, 232, 0.7) 0%, rgba(91, 95, 222, 0.7) 100%)",
              }}
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                静岡で<br />
                暮らしを<br />
                支える。
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                地域の信頼を守るプロフェッショナル
              </p>
            </div>
          </div>

          {/* Diagonal Cut */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 bg-white"
            style={{
              clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
            }}
          />
        </div>
      </section>

      {/* Interview Section */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: "#4DB8E8" }}
            >
              INTERVIEW
            </h2>
            <p className="text-gray-500 text-lg">インタビュー</p>
          </div>

          {/* Interview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/manus-storage/image_5972f865_7d50a816.jpg"
                alt="社員A"
                className="w-full h-64 object-cover"
              />
              <div
                className="p-6"
                style={{ backgroundColor: "#4DB8E8" }}
              >
                <p className="text-white font-bold text-lg">社員Aさん</p>
                <p className="text-white text-sm">配管工／正社員</p>
                <button className="mt-4 text-white hover:underline text-sm font-semibold">
                  詳細を見る →
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/manus-storage/image_854b38fe_c69ad7cc.jpg"
                alt="O さん"
                className="w-full h-64 object-cover"
              />
              <div
                className="p-6"
                style={{ backgroundColor: "#4DB8E8" }}
              >
                <p className="text-white font-bold text-lg">Oさん</p>
                <p className="text-white text-sm">事務員／正社員</p>
                <button className="mt-4 text-white hover:underline text-sm font-semibold">
                  詳細を見る →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal Cut */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 md:h-32"
          style={{
            background: "linear-gradient(135deg, #4DB8E8 0%, #5B5FDE 100%)",
            clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 100%)",
          }}
        />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 md:py-24 relative"
        style={{
          background: "linear-gradient(135deg, #4DB8E8 0%, #5B5FDE 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ABOUT US
              </h2>
              <p className="text-white text-lg mb-4 opacity-90">私たちについて</p>
              <div className="text-white space-y-4 text-base leading-relaxed">
                <p>
                  1970年の創業以来、静岡市清水区を拠点に地域の暮らしを支え続けてきました。2014年に株式会社堺設備として法人化し、現在11名のスタッフが一丸となって、お客様の快適な生活環境づくりに貢献しています。
                </p>
                <p>
                  社員同士の風通しが良く、チームワークを大切にしながら、確かな技術と丁寧な対応でお客様からの信頼をいただいております。
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src="/manus-storage/image_e550ef60_3e211f4d.jpg"
                alt="安全ヘルメット"
                className="w-full max-w-sm rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Diagonal Cut */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-white"
          style={{
            clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      </section>

      {/* Business Section */}
      <section id="business" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="flex justify-center order-2 md:order-1">
              <img
                src="/manus-storage/image_e64da131_ed584703.jpg"
                alt="配管工事"
                className="w-full max-w-sm rounded-lg shadow-lg"
              />
            </div>

            {/* Text Content */}
            <div className="order-1 md:order-2">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: "#4DB8E8" }}
              >
                BUSINESS
              </h2>
              <p className="text-gray-500 text-lg mb-6">事業内容</p>
              <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                <p>
                  一般住宅の給排水工事を中心に、リフォームに伴う水廻り工事、配管の点検・調査、修繕工事まで幅広く対応しています。
                </p>
                <p>
                  新設工事から老朽化した設備の更新、緊急のトラブル対応まで、地域のライフラインを守るプロフェッショナルとして、お客様の「困った」に迅速かつ丁寧にお応えしています。
                </p>
                <p>
                  長年培った技術と経験で、安心・安全な施工をお約束します。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal Cut */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 md:h-32"
          style={{
            background: "linear-gradient(135deg, #4DB8E8 0%, #5B5FDE 100%)",
            clipPath: "polygon(0 0, 100% 30%, 100% 100%, 0 100%)",
          }}
        />
      </section>

      {/* Brand Repeat Section */}
      <section
        className="py-12 md:py-16 text-center"
        style={{
          background: "linear-gradient(135deg, #4DB8E8 0%, #5B5FDE 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-white text-2xl md:text-4xl font-bold opacity-80 break-words">
            SAKAI SETSUBI SAKAI SETSUBI SAKAI SETSUBI SAKAI SETSUBI SAKAI SETSUBI
          </p>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="jobs" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: "#4DB8E8" }}
            >
              JOB LIST
            </h2>
            <p className="text-gray-500 text-lg">募集職種</p>
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job 1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="/manus-storage/image_17cce777_f9430112.jpg"
                alt="作業車"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span
                    className="px-3 py-1 text-white text-xs font-semibold rounded"
                    style={{ backgroundColor: "#4DB8E8" }}
                  >
                    正社員
                  </span>
                  <span
                    className="px-3 py-1 text-white text-xs font-semibold rounded"
                    style={{ backgroundColor: "#5B5FDE" }}
                  >
                    静岡市
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  水道設備・配管工スタッフ
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  ♢配管工×正社員♢ 静岡市清水区エリアにて大募集♪
                  未経験大歓迎！【週休2日制（日祝）賞与年1回】
                  作業服支給／資格支援制度など、充実した福利厚生があります！
                </p>
                <Button
                  className="w-full"
                  style={{
                    backgroundColor: "#4DB8E8",
                    color: "white",
                  }}
                >
                  VIEW MORE
                </Button>
              </div>
            </div>

            {/* Job 2 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className="w-full h-48 flex items-center justify-center"
                style={{ backgroundColor: "#F0F4F8" }}
              >
                <p className="text-gray-400 text-center">設計事務</p>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span
                    className="px-3 py-1 text-white text-xs font-semibold rounded"
                    style={{ backgroundColor: "#4DB8E8" }}
                  >
                    正社員
                  </span>
                  <span
                    className="px-3 py-1 text-white text-xs font-semibold rounded"
                    style={{ backgroundColor: "#5B5FDE" }}
                  >
                    静岡市清水区
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  設計事務
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  ♢配管工×正社員♢ 静岡市清水区エリアにて大募集♪
                  未経験OK・経験者歓迎！【完全週休2日制（土・日祝）賞与年1回】
                </p>
                <Button
                  className="w-full"
                  style={{
                    backgroundColor: "#4DB8E8",
                    color: "white",
                  }}
                >
                  VIEW MORE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: "#4DB8E8" }}
          >
            COMPANY
          </h2>
          <p className="text-gray-500 text-lg mb-8">会社概要</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <p className="font-semibold text-gray-800 mb-2">会社名</p>
              <p className="mb-6">株式会社 堺設備</p>

              <p className="font-semibold text-gray-800 mb-2">住所</p>
              <p className="mb-6">
                〒424-0063<br />
                静岡市清水区能島285-1
              </p>

              <p className="font-semibold text-gray-800 mb-2">電話番号</p>
              <p className="mb-2">054-348-2286（TEL）</p>
              <p className="mb-6">054-348-2287（FAX）</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800 mb-2">代表者名</p>
              <p className="mb-6">堺 貴央</p>

              <p className="font-semibold text-gray-800 mb-2">事業内容</p>
              <p className="mb-6">
                一般住宅の給排水工事、<br />
                リフォームに伴う水廻り工事など
              </p>

              <p className="font-semibold text-gray-800 mb-2">設立年月日</p>
              <p className="mb-6">2014年11月1日</p>

              <p className="font-semibold text-gray-800 mb-2">従業員数</p>
              <p>11人</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="text-lg font-bold mb-4 md:mb-0">
              株式会社 堺設備
            </div>
            <nav className="flex gap-6 text-sm">
              <a href="#" className="hover:text-blue-400 transition">
                トップ
              </a>
              <a href="#about" className="hover:text-blue-400 transition">
                私たちについて
              </a>
              <a href="#business" className="hover:text-blue-400 transition">
                事業内容
              </a>
              <a href="#jobs" className="hover:text-blue-400 transition">
                採用情報
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                プライバシーポリシー
              </a>
            </nav>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2024 株式会社 堺設備. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 hover:opacity-100"
        style={{
          backgroundColor: "#4DB8E8",
          color: "white",
        }}
        aria-label="トップへ戻る"
      >
        ↑
      </button>
    </div>
  );
}
