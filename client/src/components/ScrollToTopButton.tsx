import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // スクロール位置を監視
  useEffect(() => {
    const toggleVisibility = () => {
      // ページが300px以上スクロールされたら表示
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
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
      <style>{`
        @keyframes dropPulse {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
          }
        }

        @keyframes dropFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .scroll-to-top-btn {
          animation: dropFloat 3s ease-in-out infinite;
          box-shadow: none !important;
        }

        .scroll-to-top-btn:hover {
          animation: dropPulse 0.6s ease-in-out;
          box-shadow: none !important;
        }

        .scroll-to-top-btn:focus {
          box-shadow: none !important;
        }

        .scroll-to-top-btn:active {
          transform: scale(0.95);
          box-shadow: none !important;
        }
      `}</style>

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
