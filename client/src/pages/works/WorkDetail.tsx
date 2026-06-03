import { useRoute } from 'wouter';
import { trpc } from '@/lib/trpc';

const categoryColorMap: Record<string, string> = {
  '漏水修理': 'blue',
  '水回りリフォーム': 'green',
  '機器交換工事': 'orange',
  '新築給排水工事': 'purple',
  '下水道切替工事': 'teal',
  '分水工事': 'cyan',
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
  const [match, params] = useRoute('/works/:id');

  const workId = params?.id ? parseInt(params.id as string) : null;
  const { data: work, isLoading } = trpc.works.getById.useQuery(workId || 0, {
    enabled: workId !== null && !isNaN(workId),
  });

  if (!match) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">施工実績が見つかりません</h1>
          <a href="/works" className="text-blue-600 hover:text-blue-800 font-semibold">
            施工実績一覧に戻る →
          </a>
        </div>
      </div>
    );
  }

  const categoryColor = categoryColorMap[work.category] || 'gray';
  const serviceInfo = categoryServiceMap[work.category];

  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-800' },
    green: { bg: 'bg-green-100', text: 'text-green-800' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-800' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-800' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-800' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
    gray: { bg: 'bg-gray-100', text: 'text-gray-800' },
  };

  const colors = colorClasses[categoryColor] || colorClasses.gray;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <a href="/works" className="text-gray-300 hover:text-white mb-4 inline-block">
            ← 施工実績一覧に戻る
          </a>
          <h1 className="text-4xl font-bold mb-4">{work.title}</h1>
          <div className="flex items-center gap-4">
            <span className={`px-4 py-2 rounded-lg font-semibold ${colors.bg} ${colors.text}`}>
              {work.category}
            </span>
            <span className="text-gray-300">{work.date}</span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-12">
        {/* メイン画像 */}
        {work.imageUrl && (
          <div className="mb-12">
            <img
              src={work.imageUrl}
              alt={work.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* 工事内容 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">工事内容</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{work.workContent}</p>
        </section>

        {/* ご依頼内容 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">ご依頼内容</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{work.requestContent}</p>
        </section>

        {/* 原因 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">原因</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{work.cause}</p>
        </section>

        {/* 施工方法 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">施工方法</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{work.method}</p>
        </section>

        {/* ビフォー・アフター */}
        {(work.beforeImageUrl || work.afterImageUrl) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">施工写真</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {work.beforeImageUrl && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">施工前</h3>
                  <img
                    src={work.beforeImageUrl}
                    alt="施工前"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
              {work.afterImageUrl && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">施工後</h3>
                  <img
                    src={work.afterImageUrl}
                    alt="施工後"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* 担当者コメント */}
        <section className="mb-12 bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">担当者コメント</h2>
          <p className="text-lg text-gray-700 leading-relaxed italic">{work.comment}</p>
        </section>

        {/* 対応サービス */}
        {serviceInfo && (
          <section className="mb-12 bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">この工事に対応するサービス</h2>
            <a
              href={serviceInfo.url}
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {serviceInfo.name}について詳しく見る →
            </a>
          </section>
        )}

        {/* CTA */}
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
