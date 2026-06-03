import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLineShare = () => {
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(`${title}\n${url}`)}`;
    window.open(lineUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
        <Share2 size={16} />
        シェア:
      </div>

      {/* LINE */}
      <button
        onClick={handleLineShare}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-300 hover:shadow-lg"
        title="LINEでシェア"
        aria-label="LINEでシェア"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349-1.352.349-2.703.349-4.054 0-3.863-3.071-7-6.857-7H3.429C1.543 0 0 1.52 0 3.38v13.077c0 1.862 1.543 3.38 3.429 3.38h2.285v3.862c0 .571.349 1.09.92 1.09.349 0 .697-.19.92-.476l2.285-3.476h6.857c1.886 0 3.429-1.52 3.429-3.38v-1.52c.571.095 1.143.19 1.715.19 3.071 0 5.714-2.28 5.714-5.14 0-2.57-1.886-4.757-4.343-4.99zm-8.571 5.14H8.571v-1.52h2.223v1.52zm4.343 0h-2.223v-1.52h2.223v1.52z"/>
        </svg>
      </button>

      {/* Twitter */}
      <button
        onClick={handleTwitterShare}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-all duration-300 hover:shadow-lg"
        title="Twitterでシェア"
        aria-label="Twitterでシェア"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-1.5 9-5.5v-1c3.05-2.25 4.5-5.5 4.5-5.5"/>
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={handleFacebookShare}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
        title="Facebookでシェア"
        aria-label="Facebookでシェア"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z"/>
        </svg>
      </button>

      {/* URLコピー */}
      <button
        onClick={handleCopyUrl}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-300 text-slate-700 hover:bg-slate-400 transition-all duration-300 hover:shadow-lg"
        title="URLをコピー"
        aria-label="URLをコピー"
      >
        {copied ? (
          <Check size={20} className="text-green-600" />
        ) : (
          <Copy size={20} />
        )}
      </button>
    </div>
  );
}
