import { useRoute } from 'wouter';

export default function WorkDetail() {
  const [match, params] = useRoute('/works/:slug');

  // 施工実績データ
  const worksData: Record<string, any> = {


    'new-construction-1': {
      title: '清水区 新築給排水工事 外部配管',
      date: '2024年12月',
      category: '新築給排水工事',
      categoryColor: 'purple',
      image: '/manus-storage/shinchiku_5aefcb85.jpg',
      content: {
        workContent: '新築給排水工事（外部配管）',
        requestContent: '新築住宅の外部配管工事',
        cause: '新築工事に伴う給排水配管設置',
        method: '屋外の給排水配管を適切に敷設し、各接続部を確実に施工',
        comment: '新築工事での外部配管は、今後の住宅の快適性を左右する重要な工程です。当社では、設計段階からの綿密な打ち合わせにより、最適な配管ルートを提案し、確実な施工を心がけています。この現場でも、厳しい品質管理のもと、すべての接続部を丁寧に施工いたしました。',
        service: '新築給排水工事',
        serviceUrl: '/service/new-construction',
      },
    },


    'equipment-tap': {
      title: '清水区 水栓交換 M様邑',
      date: '2024年12月',
      category: '機器交換工事',
      categoryColor: 'orange',
      image: '/manus-storage/suisen_after_28ed95c8.jpg',
      content: {
        workContent: '水栓交換工事',
        requestContent: 'キッチンの水栓が古くなり、水漏れを起こしているとのご相談でした。',
        cause: '水栓が経年劣化し、接続部から水漏れが発生していました。',
        method: '旧い水栓を取り外し、新しい水栓に交換いたしました。',
        comment: '水栓の交換は、毎日の群活に大きな影響を与える重要な工事です。当社では、詳細な施工を心がけ、水漏れのない確実な接続を実現しています。この現場でも、新しい水栓が安定して動作し、お客様から「水の出が良くなった」とお喜びの声をいただきました。',
        service: '機器交換工事',
        serviceUrl: '/service/equipment',
      },
    },

    'new-construction-2': {
      title: '葛区 新築給排水配管 某社モデルハウス',
      date: '2024年11月',
      category: '新築給排水工事',
      categoryColor: 'purple',
      image: '/manus-storage/shinchiku2_9cc46fc4.jpg',
      content: {
        workContent: '新築給排水配管（モデルハウス）',
        requestContent: '某社モデルハウスの新築給排水配管工事',
        cause: 'モデルハウスの新築工事に伴う給排水配管設置',
        method: '複数の洋室、洋事場、洋台所に対応した給排水配管を一括施工。給水管と排水管を詳細に敷設し、各接続部を確実に施工',
        comment: 'モデルハウスの複数の洋室、洋事場、洋台所に対応した給排水配管は、設計段階からの綿密な打ち合わせが不可欠です。当社では、建築会社様と綸密に打ち合わせをし、最適な配管ルートを提案し、確実な施工を心がけています。この現場でも、厳しい品質管理のもと、すべての接続部を丁寧に施工いたしました。',
        service: '新築給排水工事',
        serviceUrl: '/service/new-construction',
      },
    },


  };

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">施工実績が見つかりません</p>
      </div>
    );
  }

  const work = worksData[params?.slug];

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">施工実績が見つかりません</p>
      </div>
    );
  }

  const colorMap: Record<string, string> = {
    blue: 'from-blue-600 to-blue-800',
    green: 'from-green-600 to-green-800',
    orange: 'from-orange-600 to-orange-800',
    purple: 'from-purple-600 to-purple-800',
    teal: 'from-teal-600 to-teal-800',
    cyan: 'from-cyan-600 to-cyan-800',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className={`bg-gradient-to-r ${colorMap[work.categoryColor]} text-white py-16`}>
        <div className="container max-w-4xl mx-auto px-4">
          <p className="text-sm text-gray-200 mb-2">{work.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{work.title}</h1>
          <p className="text-lg text-gray-100">{work.date}</p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* 施工実績画像 */}
        <section className="mb-16">
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* 施工実績詳細 */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">工事内容</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{work.content.workContent}</p>

              <h2 className="text-2xl font-bold mb-6 text-gray-800">ご依頼内容</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{work.content.requestContent}</p>

              <h2 className="text-2xl font-bold mb-6 text-gray-800">原因</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{work.content.cause}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">施工方法</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{work.content.method}</p>

              <h2 className="text-2xl font-bold mb-6 text-gray-800">担当者コメント</h2>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-700 leading-relaxed">{work.content.comment}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 対応サービス */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">この工事に対応するサービス</h2>
          <a
            href={work.content.serviceUrl}
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {work.content.service} →
          </a>
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">同様のお悩みはございませんか？</h2>
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
