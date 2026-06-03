import { useLocation } from 'wouter';
import { Phone, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingHeader() {
  const [, navigate] = useLocation();

  return (
    <div className="fixed top-0 right-0 z-50 flex items-center gap-3 p-4 bg-white shadow-md rounded-bl-lg">
      {/* ホームボタン */}
      <Button
        onClick={() => navigate('/')}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
      >
        <Home size={18} />
        <span className="hidden sm:inline">ホーム</span>
      </Button>

      {/* 電話ボタン */}
      <a
        href="tel:054-348-2286"
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Phone size={18} />
        <span className="hidden sm:inline">電話する</span>
      </a>
    </div>
  );
}
