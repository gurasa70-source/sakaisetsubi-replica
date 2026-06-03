export default function WaterTapLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <style>{`
        @keyframes waterDrop {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(40px);
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
          animation: waterDrop 1.2s ease-in infinite;
        }

        .water-drop-1 {
          animation-delay: 0s;
        }

        .water-drop-2 {
          animation-delay: 0.4s;
        }

        .water-drop-3 {
          animation-delay: 0.8s;
        }

        .tap-handle {
          animation: handleRotate 2s ease-in-out infinite;
          transform-origin: 50px 50px;
        }

        .tap-shadow {
          filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.15));
        }
      `}</style>

      <div className="relative w-64 h-48 flex items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full tap-shadow"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 蛇口の背景（壁） */}
          <rect
            x="0"
            y="0"
            width="200"
            height="200"
            fill="#F5F5F5"
            rx="8"
          />

          {/* 蛇口の取付部分 */}
          <rect
            x="70"
            y="30"
            width="60"
            height="15"
            fill="#A0A0A0"
            stroke="#808080"
            strokeWidth="1"
            rx="3"
          />

          {/* 蛇口の本体（メイン） */}
          <g>
            {/* 上部の接続部 */}
            <rect
              x="85"
              y="45"
              width="30"
              height="20"
              fill="#C0C0C0"
              stroke="#808080"
              strokeWidth="1.5"
              rx="2"
            />

            {/* 蛇口の先端（下向き） */}
            <path
              d="M 90 65 L 88 85 Q 88 90 92 92 L 108 92 Q 112 90 112 85 L 110 65 Z"
              fill="#B8B8B8"
              stroke="#808080"
              strokeWidth="1.5"
            />

            {/* 蛇口の先端（グラデーション効果） */}
            <ellipse
              cx="100"
              cy="92"
              rx="10"
              ry="4"
              fill="#D0D0D0"
              stroke="#808080"
              strokeWidth="1"
            />

            {/* 蛇口の内部（リアルな質感） */}
            <path
              d="M 92 70 L 90 85 Q 90 88 93 90"
              stroke="#E8E8E8"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
          </g>

          {/* ハンドル（回転） */}
          <g className="tap-handle">
            {/* ハンドルの根元 */}
            <circle
              cx="70"
              cy="50"
              r="8"
              fill="#A0A0A0"
              stroke="#808080"
              strokeWidth="1"
            />

            {/* ハンドルの棒 */}
            <rect
              x="62"
              y="48"
              width="16"
              height="4"
              fill="#4A90E2"
              stroke="#2E5C8A"
              strokeWidth="1"
              rx="2"
            />

            {/* ハンドルの先端 */}
            <circle
              cx="62"
              cy="50"
              r="4"
              fill="#5BA3F5"
              stroke="#2E5C8A"
              strokeWidth="1"
            />
          </g>

          {/* 水の流れ - 複数の水滴 */}
          <g>
            {/* 水滴1 */}
            <ellipse
              cx="100"
              cy="105"
              rx="2.5"
              ry="4"
              fill="#00A8E8"
              opacity="0.9"
              className="water-drop water-drop-1"
            />

            {/* 水滴2 */}
            <ellipse
              cx="100"
              cy="105"
              rx="2.5"
              ry="4"
              fill="#00A8E8"
              opacity="0.7"
              className="water-drop water-drop-2"
            />

            {/* 水滴3 */}
            <ellipse
              cx="100"
              cy="105"
              rx="2.5"
              ry="4"
              fill="#00A8E8"
              opacity="0.5"
              className="water-drop water-drop-3"
            />
          </g>

          {/* 水が溜まる部分 */}
          <ellipse
            cx="100"
            cy="155"
            rx="25"
            ry="10"
            fill="#E0F7FF"
            stroke="#00A8E8"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* 水の波紋 */}
          <circle
            cx="100"
            cy="155"
            r="15"
            fill="none"
            stroke="#00A8E8"
            strokeWidth="0.5"
            opacity="0.3"
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
