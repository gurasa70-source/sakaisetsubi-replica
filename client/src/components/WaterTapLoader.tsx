export default function WaterTapLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <style>{`
        @keyframes waterFlow {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(60px);
          }
        }

        @keyframes waterFlowDelay {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(60px);
          }
        }

        @keyframes tapRotate {
          0%, 100% {
            transform: rotateZ(-5deg);
          }
          50% {
            transform: rotateZ(5deg);
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
          animation: tapRotate 2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      <div className="relative w-32 h-40 flex items-center justify-center">
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 水栓の本体 */}
          <rect
            x="35"
            y="20"
            width="30"
            height="40"
            rx="4"
            fill="#C0C0C0"
            stroke="#808080"
            strokeWidth="1"
          />

          {/* 水栓の先端 */}
          <ellipse cx="50" cy="55" rx="12" ry="8" fill="#A9A9A9" stroke="#808080" strokeWidth="1" />

          {/* ハンドル */}
          <g className="tap-handle">
            <rect
              x="48"
              y="8"
              width="4"
              height="12"
              rx="2"
              fill="#4A90E2"
              stroke="#2E5C8A"
              strokeWidth="0.5"
            />
            <circle cx="50" cy="8" r="3" fill="#5BA3F5" stroke="#2E5C8A" strokeWidth="0.5" />
          </g>

          {/* 水の流れ - 複数の水滴 */}
          <g>
            {/* 水滴1 */}
            <ellipse
              cx="50"
              cy="70"
              rx="3"
              ry="5"
              fill="#00A8E8"
              opacity="0.8"
              className="water-drop water-drop-1"
            />

            {/* 水滴2 */}
            <ellipse
              cx="50"
              cy="70"
              rx="3"
              ry="5"
              fill="#00A8E8"
              opacity="0.6"
              className="water-drop water-drop-2"
            />

            {/* 水滴3 */}
            <ellipse
              cx="50"
              cy="70"
              rx="3"
              ry="5"
              fill="#00A8E8"
              opacity="0.4"
              className="water-drop water-drop-3"
            />
          </g>

          {/* 水が溜まる部分 */}
          <ellipse
            cx="50"
            cy="110"
            rx="18"
            ry="6"
            fill="#E8F4F8"
            stroke="#00A8E8"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* ローディングテキスト */}
      <div className="text-center">
        <p className="text-slate-700 font-semibold">読み込み中</p>
        <div className="flex justify-center gap-1 mt-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}
