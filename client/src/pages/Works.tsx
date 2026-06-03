import { useState } from 'react';
import { trpc } from '@/lib/trpc';

export default function Works() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: '漏水修理', name: '漏水修理', color: 'blue' },
    { id: '水回りリフォーム', name: '水回りリフォーム', color: 'green' },
    { id: '機器交換工事', name: '機器交換工事', color: 'orange' },
    { id: '新築給排水工事', name: '新築給排水工事', color: 'purple' },
    { id: '下水道切替工事', name: '下水道切替工事', color: 'teal' },
    { id: '分水工事', name: '分水工事', color: 'cyan' },
  ];

  // データベースから公開済みの施工実績を取得
  const { data: works = [] } = trpc.works.getPublished.useQuery();

  const filteredWorks = selectedCategory
    ? works.filter(work => work.category === selectedCategory)
    : works;

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      green: 'bg-green-100 text-green-800 hover:bg-green-200',
      orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      teal: 'bg-teal-100 text-teal-800 hover:bg-teal-200',
      cyan: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            施工実績
          </h1>
          <p className="text-xl text-gray-300">
            堺設備の実績をご紹介します
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-6xl mx-auto px-4 py-16">
        {/* カテゴリーフィルター */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">カテゴリーから探す</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === null
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              すべて
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === category.id
                    ? `bg-gray-800 text-white`
                    : getColorClass(category.color)
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* 施工実績グリッド */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">
            {selectedCategory
              ? categories.find(c => c.id === selectedCategory)?.name
              : 'すべての施工実績'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {filteredWorks.map(work => (
              <a
                key={work.id}
                href={`/works/${work.id}`}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={work.imageUrl || '/placeholder.jpg'}
                    alt={work.title}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{work.date}</p>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 line-clamp-2">
                    {work.title}
                  </h3>
                  <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                    {work.workContent}
                  </p>
                  <span className="text-blue-600 font-semibold inline-block hover:text-blue-800">
                    詳細を見る →
                  </span>
                </div>
              </a>
            ))}
          </div>
          {filteredWorks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                このカテゴリーの施工実績はまだありません。
              </p>
            </div>
          )}
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">ご不明な点やご質問がございましたら</h2>
          <p className="text-xl mb-8">
            お気軽にお問い合わせください
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0220122-1817" className="bg-white text-gray-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
              📞 電話する
            </a>
            <a 
              href="/#contact"
              className="bg-red-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition inline-block"
            >
              📧 お問い合わせ
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
