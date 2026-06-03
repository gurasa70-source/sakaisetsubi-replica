export default function WaterTapLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <style>{`
        @keyframes waterFlow {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(60px);
          }
        }

        @keyframes waterFlowDelay {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          20% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(60px);
          }
        }

        @keyframes handleRotate {
          0%, 100% {
            transform: rotateZ(-15deg);
          }
          50% {
            transform: rotateZ(15deg);
          }
        }

        .water-drop {
          animation: waterFlow 1.5s ease-in infinite;
        }

        .water-drop-1 {
          animation-delay: 0s;
        }

        .water-drop-2 {
          animation-delay: 0.5s;
        }

        .water-drop-3 {
          animation-delay: 1s;
        }

        .tap-handle {
          animation: handleRotate 2s ease-in-out infinite;
          transform-origin: 20px 50px;
        }
      `}</style>

      <div className="relative w-48 h-32 flex items-center justify-center">
        <svg
          viewBox="0 0 180 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 水栓の本体（横向き） */}
          <rect
            x="20"
            y="35"
            width="60"
            height="30"
            rx="6"
            fill="#FF6B6B"
            stroke="#E63946"
            strokeWidth="2"
          />

          {/* 水栓の先端（蛇口） */}
          <path
            d="M 80 45 Q 95 40 100 50 Q 95 60 80 55 Z"
            fill="#FF8787"
            stroke="#E63946"
            strokeWidth="2"
          />

          {/* 蛇口の先端 */}
          <ellipse
            cx="100"
            cy="50"
            rx="5"
            ry="8"
            fill="#FFB3B3"
            stroke="#E63946"
            strokeWidth="1"
          />

          {/* ハンドル（ポップなデザイン） */}
          <g className="tap-handle">
            <circle
              cx="40"
              cy="30"
              r="10"
              fill="#4ECDC4"
              stroke="#2A9D8F"
              strokeWidth="2"
            />
            <circle
              cx="40"
              cy="30"
              r="6"
              fill="#95E1D3"
              stroke="#2A9D8F"
              strokeWidth="1"
            />
          </g>

          {/* 水の流れ - 複数の水滴（横方向） */}
          <g>
            {/* 水滴1 */}
            <ellipse
              cx="110"
              cy="50"
              rx="5"
              ry="3"
              fill="#00D9FF"
              opacity="0.8"
              className="water-drop water-drop-1"
            />

            {/* 水滴2 */}
            <ellipse
              cx="110"
              cy="50"
              rx="5"
              ry="3"
              fill="#00D9FF"
              opacity="0.6"
              className="water-drop water-drop-2"
            />

            {/* 水滴3 */}
            <ellipse
              cx="110"
              cy="50"
              rx="5"
              ry="3"
              fill="#00D9FF"
              opacity="0.4"
              className="water-drop water-drop-3"
            />
          </g>

          {/* 水が溜まる部分 */}
          <ellipse
            cx="145"
            cy="52"
            rx="12"
            ry="10"
            fill="#E0F7FF"
            stroke="#00D9FF"
            strokeWidth="1.5"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* ローディングテキスト */}
      <div className="text-center">
        <p className="text-slate-700 font-semibold">読み込み中</p>
        <div className="flex justify-center gap-1 mt-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}
