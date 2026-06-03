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
            box-shadow: 0 10px 30px rgba(0, 168, 232, 0.3);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 168, 232, 0.5);
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
        }

        .scroll-to-top-btn:hover {
          animation: dropPulse 0.6s ease-in-out;
        }

        .scroll-to-top-btn:active {
          transform: scale(0.95);
        }
      `}</style>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn fixed bottom-8 right-8 z-40 transition-all duration-300"
          aria-label="トップへ戻る"
        >
          {/* 水滴型ボタン */}
          <svg
            width="60"
            height="70"
            viewBox="0 0 60 70"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* グラデーション定義 */}
            <defs>
              <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00A8E8', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#0052CC', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* 水滴の形状 */}
            <path
              d="M 30 5 C 30 5, 15 25, 15 35 C 15 48, 21 55, 30 55 C 39 55, 45 48, 45 35 C 45 25, 30 5, 30 5 Z"
              fill="url(#dropGradient)"
              filter="url(#dropShadow)"
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
