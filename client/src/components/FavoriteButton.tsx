import { Heart } from 'lucide-react';
import { useCallback, useState, useEffect } from 'react';

interface FavoriteButtonProps {
  workId: string;
  isFavorite: boolean;
  onToggle: (workId: string) => void;
  className?: string;
}

export default function FavoriteButton({
  workId,
  isFavorite,
  onToggle,
  className = '',
}: FavoriteButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      setIsAnimating(true);
      onToggle(workId);
      
      // アニメーション終了後にリセット
      setTimeout(() => setIsAnimating(false), 600);
    },
    [workId, onToggle]
  );

  return (
    <button
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center transition-all duration-300 ${className}`}
      aria-label={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
    >
      {/* ハートアイコン */}
      <Heart
        size={24}
        className={`transition-all duration-300 ${
          isFavorite
            ? 'fill-red-500 text-red-500'
            : 'text-slate-400 hover:text-red-500'
        } ${isAnimating ? 'scale-125' : 'scale-100'}`}
      />

      {/* パルスアニメーション */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-pulse" />
      )}
    </button>
  );
}
