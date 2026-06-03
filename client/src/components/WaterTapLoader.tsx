export default function WaterTapLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .water-tap-image {
          animation: bounce 1.5s ease-in-out infinite;
        }

        .spinner {
          animation: rotate 2s linear infinite;
        }
      `}</style>

      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* 背景 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>

        {/* スピナー */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-300 spinner"></div>

        {/* イラスト */}
        <img
          src="/manus-storage/water-tap-loader_343d43ff.png"
          alt="Loading"
          className="w-32 h-32 object-contain water-tap-image relative z-10"
        />
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
