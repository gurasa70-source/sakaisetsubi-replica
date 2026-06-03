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
          <a href="/#about" onClick={() => handleNavigation('/#about')} className="text-gray-700 hover:text-blue-600 font-medium">
            会社紹介
          </a>
          <a href="/#business" onClick={() => handleNavigation('/#business')} className="text-gray-700 hover:text-blue-600 font-medium">
            事業内容
          </a>
          <a href="/design" onClick={() => handleNavigation('/design')} className="text-gray-700 hover:text-blue-600 font-medium">
            設計・申請
          </a>
          <a href="/works" onClick={() => handleNavigation('/works')} className="text-gray-700 hover:text-blue-600 font-medium">
            施工実績
          </a>
          <a
            href="https://sakaisetsubi-rct.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            求人・採用
          </a>
          <a href="/#contact" onClick={() => handleNavigation('/#contact')} className="text-gray-700 hover:text-blue-600 font-medium">
            お問い合わせ
          </a>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col gap-4 p-4">
            <a href="/#about" onClick={() => handleNavigation('/#about')} className="text-gray-700 font-medium">
              会社紹介
            </a>
            <a href="/#business" onClick={() => handleNavigation('/#business')} className="text-gray-700 font-medium">
              事業内容
            </a>
            <a href="/design" onClick={() => handleNavigation('/design')} className="text-gray-700 font-medium">
              設計・申請
            </a>
            <a href="/works" onClick={() => handleNavigation('/works')} className="text-gray-700 font-medium">
              施工実績
            </a>
            <a
              href="https://sakaisetsubi-rct.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 font-medium"
            >
              求人・採用
            </a>
            <a href="/#contact" onClick={() => handleNavigation('/#contact')} className="text-gray-700 font-medium">
              お問い合わせ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
