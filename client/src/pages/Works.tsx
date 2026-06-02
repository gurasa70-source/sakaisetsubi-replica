import { useState } from 'react';

export default function Works() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'leak-repair', name: '漏水修理', color: 'blue' },
    { id: 'remodel', name: '水回りリフォーム', color: 'green' },
    { id: 'equipment', name: '機器交換工事', color: 'orange' },
    { id: 'new-construction', name: '新築給排水工事', color: 'purple' },
    { id: 'sewer', name: '下水道切替', color: 'teal' },
    { id: 'water-tap', name: '分水工事', color: 'cyan' },
  ];

  const works = [
    // 漏水修理
    {
      id: 'leak-repair-1',
      category: 'leak-repair',
      title: '清水区○○ 給水管漏水修理',
      date: '2024年11月',
      image: 'https://via.placeholder.com/400x300?text=給水管漏水修理',
      description: 'キッチン下の給水管から漏水が発生。調査機器で漏水箇所を特定し、配管を交換いたしました。',
    },
    {
      id: 'leak-repair-2',
      category: 'leak-repair',
      title: '清水区△△ 漏水調査',
      date: '2024年10月',
      image: 'https://via.placeholder.com/400x300?text=漏水調査',
      description: '水道料金が急に上がったため、漏水調査を実施。蛇口のパッキン劣化が原因で、交換いたしました。',
    },
    {
      id: 'leak-repair-3',
      category: 'leak-repair',
      title: '清水区□□ 埋設管漏水修理',
      date: '2024年9月',
      image: 'https://via.placeholder.com/400x300?text=埋設管漏水修理',
      description: '庭の埋設管からの漏水により、水道料金が大幅に増加。掘削工事を行い、配管を交換いたしました。',
    },
    // 水回りリフォーム
    {
      id: 'remodel-toilet',
      category: 'remodel',
      title: 'トイレ交換工事',
      date: '2024年11月',
      image: 'https://via.placeholder.com/400x300?text=トイレ交換',
      description: '老朽化したトイレを最新の温水洗浄便座付きトイレに交換。快適性と省エネ性が大幅に向上しました。',
    },
    {
      id: 'remodel-sink',
      category: 'remodel',
      title: '洗面台交換工事',
      date: '2024年10月',
      image: 'https://via.placeholder.com/400x300?text=洗面台交換',
      description: '古い洗面台を新しいデザインの洗面台に交換。洗面所の雰囲気が大きく変わり、使い勝手も向上しました。',
    },
    {
      id: 'remodel-kitchen',
      category: 'remodel',
      title: 'キッチン改修工事',
      date: '2024年9月',
      image: 'https://via.placeholder.com/400x300?text=キッチン改修',
      description: '古いキッチンを最新のシステムキッチンに改修。調理スペースが広がり、使い勝手が大幅に改善されました。',
    },
    // 機器交換工事
    {
      id: 'equipment-toilet',
      category: 'equipment',
      title: 'トイレ交換工事',
      date: '2024年11月',
      image: 'https://via.placeholder.com/400x300?text=トイレ交換',
      description: '老朽化したトイレを最新の温水洗浄便座付きトイレに交換。快適性が大幅に向上しました。',
    },
    {
      id: 'equipment-pump',
      category: 'equipment',
      title: '井戸ポンプ交換工事',
      date: '2024年10月',
      image: 'https://via.placeholder.com/400x300?text=井戸ポンプ交換',
      description: '動かなくなった井戸ポンプを最新型に交換。効率性と信頼性が大幅に向上しました。',
    },
    // 新築給排水工事
    {
      id: 'new-construction-1',
      category: 'new-construction',
      title: '清水区○○ 新築給排水工事',
      date: '2024年11月',
      image: 'https://via.placeholder.com/400x300?text=新築給排水工事',
      description: '新築住宅の給排水配管工事。設計段階からの相談、施工、検査まで一貫して実施しました。',
    },
    {
      id: 'new-construction-2',
      category: 'new-construction',
      title: '葵区△△ 新築設備工事',
      date: '2024年10月',
      image: 'https://via.placeholder.com/400x300?text=新築設備工事',
      description: '中規模新築物件の給排水設備工事。複数のテナント対応の給排水配管を一括施工しました。',
    },
    // 下水道切替
    {
      id: 'sewer-conversion',
      category: 'sewer',
      title: '浄化槽から下水道へ',
      date: '2024年11月',
      image: 'https://via.placeholder.com/400x300?text=下水道切替',
      description: '浄化槽から下水道への切替工事を実施。補助金の申請手続きもサポートし、お客様の負担を軽減しました。',
    },
    // 分水工事
    {
      id: 'water-tap-completion',
      category: 'water-tap',
      title: '分水工事完了',
      date: '2024年11月',
      image: 'https://via.placeholder.com/400x300?text=分水工事',
      description: '新築敷地への給水引込工事を実施。分水申請から道路掘削、配管敷設まで一貫して対応しました。',
    },
  ];

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
                    src={work.image}
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
                    {work.description}
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
