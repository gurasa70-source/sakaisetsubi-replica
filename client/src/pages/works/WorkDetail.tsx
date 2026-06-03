import { useRoute } from 'wouter';
import { trpc } from '@/lib/trpc';
import { ChevronLeft } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';
import FavoriteButton from '@/components/FavoriteButton';
import { useFavorites } from '@/hooks/useFavorites';

const categoryIconMap: Record<string, string> = {
  '漏水修理': '💧',
  '水回りリフォーム': '🛁',
  '機器交換工事': '🔧',
  '新築給排水工事': '🏗️',
  '下水道切替工事': '🔄',
  '分水工事': '💧',
};

const categoryServiceMap: Record<string, { name: string; url: string }> = {
  '漏水修理': { name: '漏水修理', url: '/service/leak-repair' },
  '水回りリフォーム': { name: '水回りリフォーム', url: '/service/remodel' },
  '機器交換工事': { name: '機器交換工事', url: '/service/equipment' },
  '新築給排水工事': { name: '新築給排水工事', url: '/service/new-construction' },
  '下水道切替工事': { name: '下水道切替工事', url: '/service/sewer' },
  '分水工事': { name: '分水工事', url: '/service/water-tap' },
};

export default function WorkDetail() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [match, params] = useRoute('/works/:id');

  const workId = params?.id ? parseInt(params.id as string) : null;
  const { data: work, isLoading } = trpc.works.getById.useQuery(workId || 0, {
    enabled: workId !== null && !isNaN(workId),
  });

  if (!match) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-slate-600 text-lg">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">施工実績が見つかりません</h1>
          <a href="/works" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
            <ChevronLeft size={20} />
            施工実績一覧に戻る
          </a>
        </div>
      </div>
    );
  }

  const serviceInfo = categoryServiceMap[work.category];
  const categoryIcon = categoryIconMap[work.category] || '📋';

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー - TOPページと統一 */}
      <header className="pt-24 pb-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <a 
            href="/works" 
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition"
          >
            <ChevronLeft size={20} />
            施工実績一覧に戻る
          </a>
          
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">{categoryIcon}</span>
            <div>
              <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-4">
                {work.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                {work.title}
              </h1>
              <p className="text-slate-300 mt-4 flex items-center gap-2">
                <span>📅</span>
                {work.date}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* メイン画像 */}
        {work.imageUrl && (
          <div className="mb-16">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-96 md:h-[500px]">
              <img
                src={work.imageUrl}
                alt={work.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* コンテンツグリッド */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* メインコンテンツ */}
          <div className="md:col-span-2 space-y-12">
            {/* 工事内容 */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                <span className="text-4xl">📋</span>
                工事内容
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
                {work.workContent}
              </p>
            </section>

            {/* シェアボタン */}
            <section className="pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <ShareButtons 
                  title={work.title}
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  description={work.workContent}
                />
                <FavoriteButton
                  workId={String(workId)}
                  isFavorite={isFavorite(String(workId))}
                  onToggle={toggleFavorite}
                  className="ml-4"
                />
              </div>
            </section>

            {/* ご依頼内容 */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                <span className="text-4xl">📞</span>
                ご依頼内容
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
                {work.requestContent}
              </p>
            </section>

            {/* 原因 */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                <span className="text-4xl">🔍</span>
                原因
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
                {work.cause}
              </p>
            </section>

            {/* 施工方法 */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                <span className="text-4xl">🔧</span>
                施工方法
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
                {work.method}
              </p>
            </section>

            {/* ビフォー・アフター */}
            {(work.beforeImageUrl || work.afterImageUrl) && (
              <section>
                <h2 className="text-3xl font-bold mb-8 text-slate-900 flex items-center gap-3">
                  <span className="text-4xl">📸</span>
                  施工写真
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {work.beforeImageUrl && (
                    <div className="group">
                      <div className="mb-4 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
                        <h3 className="text-lg font-bold text-slate-900">施工前</h3>
                      </div>
                      <div className="relative overflow-hidden rounded-xl shadow-lg h-64">
                        <img
                          src={work.beforeImageUrl}
                          alt="施工前"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                  {work.afterImageUrl && (
                    <div className="group">
                      <div className="mb-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                        <h3 className="text-lg font-bold text-slate-900">施工後</h3>
                      </div>
                      <div className="relative overflow-hidden rounded-xl shadow-lg h-64">
                        <img
                          src={work.afterImageUrl}
                          alt="施工後"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* サイドバー */}
          <aside className="md:col-span-1 space-y-6">
            {/* 担当者コメント */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border-l-4 border-blue-500 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-slate-900 flex items-center gap-2">
                <span className="text-2xl">💬</span>
                担当者コメント
              </h3>
              <p className="text-slate-700 leading-relaxed italic">
                {work.comment}
              </p>
            </div>

            {/* 対応サービス */}
            {serviceInfo && (
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-slate-900">
                  この工事に対応するサービス
                </h3>
                <a
                  href={serviceInfo.url}
                  className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {serviceInfo.name}
                  <span>→</span>
                </a>
              </div>
            )}

            {/* 関連リンク */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">その他の施工実績</h3>
              <a
                href="/works"
                className="inline-flex items-center justify-center gap-2 w-full bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition"
              >
                一覧を見る
                <span>→</span>
              </a>
            </div>
          </aside>
        </div>

        {/* CTA セクション */}
        <section className="relative overflow-hidden rounded-3xl p-12 md:p-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          {/* 背景装飾 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              同様のお悩みはございませんか？
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              堺設備の専門スタッフがお客様のご要望にお応えします。
              まずはお気軽にご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:054-348-2286"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                📞 電話する
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                📧 お問い合わせ
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
