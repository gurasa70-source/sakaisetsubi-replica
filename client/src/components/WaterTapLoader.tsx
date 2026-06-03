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
            transform: translateX(50px);
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
            transform: translateX(50px);
          }
        }

        @keyframes handleRotate {
          0%, 100% {
            transform: rotateZ(-20deg);
          }
          50% {
            transform: rotateZ(20deg);
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
          transform-origin: 50px 35px;
        }
      `}</style>

      <div className="relative w-56 h-40 flex items-center justify-center">
        <svg
          viewBox="0 0 200 140"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 水栓の本体（横向き） */}
          <g>
            {/* メイン本体 */}
            <rect
              x="30"
              y="50"
              width="80"
              height="35"
              rx="8"
              fill="#D3D3D3"
              stroke="#999999"
              strokeWidth="2"
            />

            {/* 蛇口の先端 */}
            <path
              d="M 110 55 Q 130 50 140 65 Q 130 80 110 75 Z"
              fill="#C0C0C0"
              stroke="#999999"
              strokeWidth="2"
            />

            {/* 蛇口の先端（内部） */}
            <ellipse
              cx="140"
              cy="65"
              rx="6"
              ry="10"
              fill="#A9A9A9"
              stroke="#808080"
              strokeWidth="1"
            />

            {/* ハンドル（横向き） */}
            <g className="tap-handle">
              <circle
                cx="50"
                cy="35"
                r="12"
                fill="#87CEEB"
                stroke="#4A90E2"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="35"
                r="7"
                fill="#B0E0E6"
                stroke="#4A90E2"
                strokeWidth="1"
              />
            </g>

            {/* 接続部分 */}
            <rect
              x="28"
              y="58"
              width="8"
              height="20"
              fill="#B0B0B0"
              stroke="#808080"
              strokeWidth="1"
            />
          </g>

          {/* 水の流れ - 複数の水滴（横方向） */}
          <g>
            {/* 水滴1 */}
            <ellipse
              cx="155"
              cy="65"
              rx="4"
              ry="6"
              fill="#00B4D8"
              opacity="0.8"
              className="water-drop water-drop-1"
            />

            {/* 水滴2 */}
            <ellipse
              cx="155"
              cy="65"
              rx="4"
              ry="6"
              fill="#00B4D8"
              opacity="0.6"
              className="water-drop water-drop-2"
            />

            {/* 水滴3 */}
            <ellipse
              cx="155"
              cy="65"
              rx="4"
              ry="6"
              fill="#00B4D8"
              opacity="0.4"
              className="water-drop water-drop-3"
            />
          </g>

          {/* 水が溜まる部分 */}
          <ellipse
            cx="175"
            cy="68"
            rx="14"
            ry="12"
            fill="#E0F7FF"
            stroke="#00B4D8"
            strokeWidth="1.5"
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
