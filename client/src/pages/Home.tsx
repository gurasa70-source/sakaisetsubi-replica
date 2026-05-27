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
    const mailtoLink = `mailto:sakai-setubi@eagle.ocn.ne.jp?subject=お問い合わせ：${formData.name}&body=お名前：${formData.name}%0D%0Aメールアドレス：${formData.email}%0D%0A電話番号：${formData.phone}%0D%0Aメッセージ：${formData.message}`;
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
      <section className="pt-24 pb-32 relative overflow-hidden bg-gradient-to-r from-blue-50 to-white">
        <div className="absolute inset-0 z-0">
          {/* Light Background Image */}
          <img
            src="/manus-storage/company_building_real_d2e0ace2.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          {/* Light Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-blue-50 opacity-85" />
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
            <div className="text-gray-800">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: "#0052CC" }}>
                静岡市を中心に新築・リフォーム給排水設備工事に対応
              </h1>
              <p className="text-base md:text-lg mb-4 leading-relaxed text-gray-700 font-semibold">
                戸建・アパート・小規模店舗の施工から
                <br />
                設計・申請業務まで一括対応可能
              </p>
              <p className="text-base md:text-lg mb-8 leading-relaxed text-gray-700">
                応援・請負・協力業者様もご相談ください
              </p>

              {/* Urgent Call Section */}
              <div className="hidden md:block mb-8">
                <p className="text-sm font-semibold mb-3" style={{ color: "#0052CC" }}>お急ぎの方はお電話ください</p>
                <div className="flex items-center gap-4 mb-3">
                  <a
                    href="tel:054-348-2286"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-lg"
                    style={{ backgroundColor: "#00A8E8" }}
                  >
                    <Phone size={24} />
                    054-348-2286
                  </a>
                </div>
                <p className="text-xs text-gray-700">
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
                src="/manus-storage/company_building_real_d2e0ace2.jpg"
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
                <div>
                  <p className="text-sm text-gray-600 font-semibold">認定</p>
                  <p className="text-lg text-gray-800">
                    <a
                      href="https://www.city.shizuoka.lg.jp/s9872/s001191.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      静岡市上下水道局指定工事店
                    </a>
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
                <div className="mb-6 overflow-hidden rounded-lg shadow-lg bg-gray-200 h-80 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">代表者写真</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                  現代表者
                </h4>
                <p className="text-sm font-semibold mb-4" style={{ color: "#0052CC" }}>
                  堺 貴央
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  先代の想いと技術を引き継ぎ、現在会社を率いています。地域密着で迅速かつ丁寧な対応を心がけ、お客様の信頼を守り続けています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section
        id="business"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#0052CC" }}
            >
              事業内容
            </h2>
            <p className="text-gray-600 text-lg">
              新築配管工事から改修工事まで、幅広く対応しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "新築配管工事",
                description: "新築住宅の給排水配管工事、大手ハウスメーカー案件にも対応",
                icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-new-pipe-work-H5eZ4ckQ4dmsPx5AMaPjfe.webp",
              },
              {
                title: "リフォーム配管",
                description: "キッチン・浴室・トイレなどの水廻り工事に対応",
                icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-remodel-pipe-6h2NHqV4uftiukYNdRC2e6.webp",
              },
              {
                title: "その他配管等",
                description: "配管の漏水修理から交換工事まで迅速に対応",
                icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-other-piping-aoxytiYtfoC7oHfyKtb69p.webp",
              },
              {
                title: "器具取付",
                description: "水栓や各種給排水器具の取付工事に対応",
                icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-fixture-installation-VaGWvDnHpFJYZfBdnXTTS8.webp",
              },
              {
                title: "給排水設備設計",
                description: "給排水設備の設計から施工まで一貫対応",
                icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-water-design-fYtNvfAJGUNTPTf5AkAgMZ.webp",
              },
              {
                title: "各種水道局申請・竣工図作成",
                description: "水道局への各種申請業務と竣工図作成に対応",
                icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663684517894/M2oiogqSNWEY6apf2zbddq/pictogram-water-application-8svMFpkkhtPd32gLVM3Yhu.webp",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-center"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3 className="text-lg font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section (01-05) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {[
              {
                number: "01",
                title: "設計・申請から施工まで一括対応",
                description: "設計・申請業務から施工まで一貫対応。工事ごとに業者を分ける必要がなく、スムーズな現場進行をサポートします。",
              },
              {
                number: "02",
                title: "新築・リフォームどちらも対応可能",
                description: "戸建・アパート・小規模店舗まで幅広く対応。新築配管から改修工事まで、現場状況に合わせた柔軟な施工を行います。",
              },
              {
                number: "03",
                title: "静岡エリア密着の迅速対応",
                description: "静岡市を中心に地域密着で対応。フットワークを活かし、迅速で丁寧な対応を心がけています。",
              },
              {
                number: "04",
                title: "現場目線の丁寧な施工",
                description: "見えなくなる配管部分まで丁寧に施工。安全性・使いやすさ・メンテナンス性を考慮した工事を行います。",
              },
              {
                number: "05",
                title: "応援・請負・協力業者相談可能",
                description: "現場応援や請負工事、協力業者様との連携にも対応。継続的なお付き合いができる体制づくりを大切にしています。",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-8 items-start">
                <div
                  className="text-4xl font-bold flex-shrink-0 w-24 text-center"
                  style={{ color: "#0052CC" }}
                >
                  {item.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
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

      {/* News Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#0052CC" }}
            >
              ニュース
            </h2>
            <p className="text-gray-600 text-lg">最新のお知らせ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                date: "2024年5月",
                title: "新しい施工事例が増えました",
                description: "最近の施工事例をブログで紹介しています。",
                link: "https://sakaisetsubi-rct.com/blog/p/1/",
              },
              {
                date: "2024年4月",
                title: "スタッフブログを更新しました",
                description: "スタッフの日常や施工風景をお届けしています。",
                link: "https://sakaisetsubi-rct.com/blog/p/1/",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
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
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 rounded font-semibold text-white"
                  style={{ backgroundColor: "#0052CC" }}
                >
                  詳しく見る
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#0052CC" }}
            >
              お問い合わせ
            </h2>
            <p className="text-gray-600 text-lg">
              ご不明な点やご相談がございましたら、お気軽にお問い合わせください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
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
                    className="text-2xl font-bold"
                    style={{ color: "#0052CC" }}
                  >
                    054-348-2286
                  </a>
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

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
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
                    className="text-lg font-semibold"
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
          <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 p-8 rounded-lg">
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
