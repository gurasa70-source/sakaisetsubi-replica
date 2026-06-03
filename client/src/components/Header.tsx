import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { useLoading } from "@/contexts/LoadingContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { showLoading } = useLoading();

  const handleNavigation = (href: string) => {
    if (href.startsWith('/') && !href.startsWith('/#')) {
      showLoading();
    }
    setMobileMenuOpen(false);
  };

  // ナビゲーション項目の定義
  const navItems = [
    { href: '/#about', label: '会社紹介' },
    { href: '/#business', label: '事業内容' },
    { href: '/design', label: '設計・申請' },
    { href: '/works', label: '施工実績' },
    { href: '/#contact', label: 'お問い合わせ' },
  ];

  // 外部リンク
  const externalLink = {
    href: 'https://sakaisetsubi-rct.com/',
    label: '求人・採用',
  };

  // 現在のページを判定する関数
  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      // アンカーリンクの場合、ページが'/'で、ハッシュが一致するか確認
      if (location === '/' || location === '') {
        return location.includes(href.split('#')[1]);
      }
      return false;
    } else {
      // ページリンクの場合、完全一致または部分一致
      return location === href || location.startsWith(href + '/');
    }
  };

  const getLinkClass = (href: string) => {
    const baseClass = "font-medium transition-colors duration-200";
    const activeClass = "text-blue-600 border-b-2 border-blue-600";
    const inactiveClass = "text-gray-700 hover:text-blue-600";
    
    return isActive(href) ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" onClick={() => handleNavigation('/')} className="flex items-center gap-3">
            <img
              src="/manus-storage/logo_c1bdfbde.png"
              alt="株式会社 堺設備"
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold" style={{ color: "#0052CC" }}>
                株式会社 堺設備
              </h1>
              <p className="text-xs text-gray-600">静岡市の水廻りのトラブルスピード対応</p>
            </div>
          </a>
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
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavigation(item.href)}
              className={getLinkClass(item.href)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            {externalLink.label}
          </a>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`${isActive(item.href) ? 'text-blue-600 font-bold' : 'text-gray-700'} font-medium transition-colors duration-200`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 font-medium"
            >
              {externalLink.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
