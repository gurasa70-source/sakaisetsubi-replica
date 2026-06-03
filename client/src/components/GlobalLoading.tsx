import { useLoading } from '@/contexts/LoadingContext';
import WaterTapLoader from './WaterTapLoader';

export default function GlobalLoading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl">
        <WaterTapLoader />
      </div>
    </div>
  );
}
