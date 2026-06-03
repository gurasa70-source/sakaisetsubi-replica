import { useState, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { ChevronRight } from 'lucide-react';

export default function Works() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: '漏水修理', name: '漏水修理', icon: '💧' },
    { id: '水回りリフォーム', name: '水回りリフォーム', icon: '🛁' },
    { id: '機器交換工事', name: '機器交換工事', icon: '🔧' },
    { id: '新築給排水工事', name: '新築給排水工事', icon: '🏗️' },
    { id: '下水道切替工事', name: '下水道切替工事', icon: '🔄' },
    { id: '分水工事', name: '分水工事', icon: '💧' },
  ];

  // データベースから公開済みの施工実績を取得
  const { data: works = [] } = trpc.works.getPublished.useQuery();

  // メモ化してパフォーマンス向上
  const filteredWorks = useMemo(() => {
    return selectedCategory
      ? works.filter(work => work.category === selectedCategory)
      : works;
  }, [works, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー - TOPページと統一 */}
      <header className="pt-24 pb-16 relative overflow-hidden bg-gray-900">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "#0052CC" }}></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "#5B5FDE" }}></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold">
              施工実績
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            堺設備の<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #00A8E8, #5B5FDE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              施工実績
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            静岡市で50年以上、地域の暮らしを支えてきた堺設備の実績をご紹介します。
            新築から改修まで、幅広い工事に対応しています。
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-6xl mx-auto px-4 py-16">
        {/* カテゴリーフィルター - モダンなデザイン */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">カテゴリーから探す</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === null
                  ? 'text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              style={selectedCategory === null ? { backgroundColor: "#0052CC" } : {}}
            >
              すべて
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={selectedCategory === category.id ? { backgroundColor: "#0052CC" } : {}}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* 施工実績グリッド - 高性能レイアウト */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">
            {selectedCategory
              ? categories.find(c => c.id === selectedCategory)?.name
              : 'すべての施工実績'}
          </h2>

          {filteredWorks.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredWorks.map((work, index) => (
                <a
                  key={work.id}
                  href={`/works/${work.id}`}
                  className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* 画像コンテナ */}
                  <div className="relative h-56 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                    {work.imageUrl ? (
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <span className="text-6xl">📸</span>
                      </div>
                    )}
                    {/* カテゴリーバッジ */}
                    <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1 text-white text-xs font-bold rounded-full" style={{ backgroundColor: "#0052CC" }}>
                    {work.category}
                  </span>
                    </div>
                  </div>

                  {/* コンテンツ */}
                  <div className="p-6">
                    <p className="text-sm text-slate-500 font-semibold mb-3 flex items-center gap-2">
                      <span>📅</span>
                      {work.date}
                    </p>
                    <h3 className="text-lg font-bold mb-3 text-slate-900 line-clamp-2 group-hover:text-blue-600 transition">
                      {work.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                      {work.workContent}
                    </p>
                    <div className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all" style={{ color: "#0052CC" }}>
                      詳細を見る
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-slate-500 text-lg">
                このカテゴリーの施工実績はまだありません。
              </p>
            </div>
          )}
        </section>

        {/* CTA セクション - TOPと統一 */}
        <section className="relative overflow-hidden rounded-3xl p-12 md:p-16 bg-gray-900">
          {/* 背景装飾 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "#0052CC" }}></div>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ご不明な点やご質問がございましたら
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              堺設備の専門スタッフがお客様のご要望にお応えします。
              お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:054-348-2286"
                className="inline-flex items-center justify-center gap-2 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 bg-white"
              >
                📞 電話する
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: "#FF4444" }}
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
