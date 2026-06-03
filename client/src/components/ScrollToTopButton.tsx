import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // スクロール位置を監視（hysteresis: 320px以上で表示、280px以下で非表示）
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else if (window.scrollY < 280) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // トップへスクロール
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn fixed bottom-8 right-8 z-40 transition-all duration-300 outline-none focus:outline-none"
          aria-label="トップへ戻る"
          style={{ outline: 'none', boxShadow: 'none' }}
        >
          {/* 水滴型ボタン */}
          <svg
            width="60"
            height="70"
            viewBox="0 0 60 70"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* グラデーション定義 */}
            <defs>
              <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00A8E8', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#0052CC', stopOpacity: 1 }} />
              </linearGradient>

            </defs>

            {/* 水滴の形状 */}
            <path
              d="M 30 5 C 30 5, 15 25, 15 35 C 15 48, 21 55, 30 55 C 39 55, 45 48, 45 35 C 45 25, 30 5, 30 5 Z"
              fill="url(#dropGradient)"
              stroke="#0052CC"
              strokeWidth="0.5"
            />

            {/* 上矢印 */}
            <g transform="translate(30, 30)">
              <line
                x1="0"
                y1="8"
                x2="0"
                y2="-4"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <polyline
                points="0,-4 -4,0 0,-4 4,0"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      )}
    </>
  );
}
