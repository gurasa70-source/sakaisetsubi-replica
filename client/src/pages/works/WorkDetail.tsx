import { useRoute } from 'wouter';

export default function WorkDetail() {
  const [match, params] = useRoute('/works/:slug');

  // 施工実績データ
  const worksData: Record<string, any> = {
    'leak-repair-1': {
      title: '清水区○○ 給水管漏水修理',
      date: '2024年11月',
      category: '漏水修理',
      categoryColor: 'blue',
      image: 'https://via.placeholder.com/800x600?text=給水管漏水修理',
      content: {
        workContent: 'キッチン下の給水管からの漏水修理',
        requestContent: 'キッチン下から水が漏れており、水道料金も高くなっているとのご相談でした。',
        cause: '給水管の接続部分が経年劣化により、微細な亀裂が入っていました。',
        method: '漏水調査機器で正確な漏水箇所を特定した後、給水管を新しい配管に交換いたしました。',
        comment: '迅速な調査と修理により、お客様の不安を解消できました。定期的なメンテナンスをお勧めします。',
        service: '漏水修理',
        serviceUrl: '/service/leak-repair',
      },
    },
    'leak-repair-2': {
      title: '清水区△△ 漏水調査',
      date: '2024年10月',
      category: '漏水修理',
      categoryColor: 'blue',
      image: 'https://via.placeholder.com/800x600?text=漏水調査',
      content: {
        workContent: '水道料金増加の原因調査',
        requestContent: '前月と比べて水道料金が急に2倍以上に上がったため、漏水の有無を調査してほしいとのご相談でした。',
        cause: '蛇口のパッキンが劣化し、常に微量の水が漏れていました。',
        method: '全ての蛇口を調査し、劣化していたパッキンを交換いたしました。',
        comment: '早期の発見により、無駄な水道料金の支払いを防ぐことができました。',
        service: '漏水修理',
        serviceUrl: '/service/leak-repair',
      },
    },
    'leak-repair-3': {
      title: '清水区□□ 埋設管漏水修理',
      date: '2024年9月',
      category: '漏水修理',
      categoryColor: 'blue',
      image: 'https://via.placeholder.com/800x600?text=埋設管漏水修理',
      content: {
        workContent: '庭の埋設管からの漏水修理',
        requestContent: '庭の一部が常に湿った状態になっており、水道料金も高くなっているとのご相談でした。',
        cause: '地中の埋設管が経年劣化により、複数箇所で亀裂が入っていました。',
        method: '漏水調査機器で埋設管の漏水箇所を特定し、掘削工事を行い、配管を新しい配管に交換いたしました。',
        comment: '大規模な掘削工事でしたが、スムーズに完了し、お客様の満足を得られました。',
        service: '漏水修理',
        serviceUrl: '/service/leak-repair',
      },
    },
    'remodel-toilet': {
      title: 'トイレ交換工事',
      date: '2024年11月',
      category: '水回りリフォーム',
      categoryColor: 'green',
      image: 'https://via.placeholder.com/800x600?text=トイレ交換',
      content: {
        workContent: '老朽化したトイレの交換',
        requestContent: 'トイレが古くなり、使いづらくなってきたため、新しいトイレに交換してほしいとのご相談でした。',
        cause: 'トイレが20年以上前のモデルで、機能が古く、水漏れのリスクもありました。',
        method: '最新の節水型トイレ（温水洗浄便座付き）に交換いたしました。',
        comment: '快適性と省エネ性が大幅に向上し、お客様にご満足いただけました。',
        service: '水回りリフォーム',
        serviceUrl: '/service/remodel',
      },
    },
    'remodel-sink': {
      title: '洗面台交換工事',
      date: '2024年10月',
      category: '水回りリフォーム',
      categoryColor: 'green',
      image: 'https://via.placeholder.com/800x600?text=洗面台交換',
      content: {
        workContent: '古い洗面台の交換',
        requestContent: '洗面台が古くなり、デザインも古いため、新しい洗面台に交換してほしいとのご相談でした。',
        cause: '洗面台が15年以上前のモデルで、収納も少なく、使いづらい状態でした。',
        method: '新しいデザインの洗面台に交換し、収納力も大幅に向上させました。',
        comment: '洗面所の雰囲気が大きく変わり、朝の準備がより快適になったとお客様からお喜びの声をいただきました。',
        service: '水回りリフォーム',
        serviceUrl: '/service/remodel',
      },
    },
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
    'remodel-kitchen': {
      title: 'キッチン改修工事',
      date: '2024年9月',
      category: '水回りリフォーム',
      categoryColor: 'green',
      image: 'https://via.placeholder.com/800x600?text=キッチン改修',
      content: {
        workContent: '古いキッチンの全面改修',
        requestContent: 'キッチンが古くなり、調理スペースも狭いため、新しいシステムキッチンに改修してほしいとのご相談でした。',
        cause: 'キッチンが20年以上前のモデルで、調理スペースが狭く、使い勝手が悪い状態でした。',
        method: '最新のシステムキッチンに改修し、調理スペースを大幅に拡張いたしました。',
        comment: '調理スペースが広がり、使い勝手が大幅に改善されました。お客様から「料理がより楽しくなった」とお喜びの声をいただきました。',
        service: '水回りリフォーム',
        serviceUrl: '/service/remodel',
      },
    },
    'equipment-toilet': {
      title: 'トイレ交換工事',
      date: '2024年11月',
      category: '機器交換工事',
      categoryColor: 'orange',
      image: 'https://via.placeholder.com/800x600?text=トイレ交換',
      content: {
        workContent: '老朽化したトイレの交換',
        requestContent: 'トイレが古くなり、使いづらくなってきたため、新しいトイレに交換してほしいとのご相談でした。',
        cause: 'トイレが20年以上前のモデルで、機能が古く、水漏れのリスクもありました。',
        method: '最新の節水型トイレ（温水洗浄便座付き）に交換いたしました。',
        comment: '快適性が大幅に向上し、お客様にご満足いただけました。',
        service: '機器交換工事',
        serviceUrl: '/service/equipment',
      },
    },
    'equipment-pump': {
      title: '井戸ポンプ交換工事',
      date: '2024年10月',
      category: '機器交換工事',
      categoryColor: 'orange',
      image: 'https://via.placeholder.com/800x600?text=井戸ポンプ交換',
      content: {
        workContent: '動かなくなった井戸ポンプの交換',
        requestContent: '井戸ポンプが動かなくなり、水が出ないため、新しいポンプに交換してほしいとのご相談でした。',
        cause: '井戸ポンプが30年以上前のモデルで、経年劣化により動作不能になっていました。',
        method: '最新型の井戸ポンプに交換いたしました。',
        comment: '効率性と信頼性が大幅に向上し、お客様から「安心して使える」とお喜びの声をいただきました。',
        service: '機器交換工事',
        serviceUrl: '/service/equipment',
      },
    },
    'new-construction-2': {
      title: '葵区△△ 新築設備工事',
      date: '2024年10月',
      category: '新築給排水工事',
      categoryColor: 'purple',
      image: 'https://via.placeholder.com/800x600?text=新築設備工事',
      content: {
        workContent: '中規模新築物件の給排水設備工事',
        requestContent: '中規模新築物件の給排水設備工事を一貫して対応してほしいとのご相談でした。',
        cause: '複数のテナント対応の給排水配管が必要でした。',
        method: '複数のテナント対応の給排水配管を一括施工いたしました。',
        comment: '複雑な配管設計でしたが、スムーズに完了し、建築会社様からご満足いただけました。',
        service: '新築給排水工事',
        serviceUrl: '/service/new-construction',
      },
    },
    'sewer-conversion': {
      title: '浄化槽から下水道へ',
      date: '2024年11月',
      category: '下水道切替',
      categoryColor: 'teal',
      image: 'https://via.placeholder.com/800x600?text=下水道切替',
      content: {
        workContent: '浄化槽から下水道への切替工事',
        requestContent: '浄化槽から下水道への切替工事を実施してほしいとのご相談でした。',
        cause: '地域の下水道整備が完了し、浄化槽から下水道への切替が可能になりました。',
        method: '浄化槽の撤去から下水道への接続まで、一貫して実施いたしました。',
        comment: '補助金の申請手続きもサポートし、お客様の負担を軽減することができました。',
        service: '下水道切替工事',
        serviceUrl: '/service/sewer',
      },
    },
    'water-tap-completion': {
      title: '分水工事完了',
      date: '2024年11月',
      category: '分水工事',
      categoryColor: 'cyan',
      image: 'https://via.placeholder.com/800x600?text=分水工事',
      content: {
        workContent: '新築敷地への給水引込工事',
        requestContent: '新築敷地への給水引込工事を実施してほしいとのご相談でした。',
        cause: '新しい敷地への給水配管が必要でした。',
        method: '分水申請から道路掘削、配管敷設まで一貫して対応いたしました。',
        comment: '複雑な申請手続きもスムーズに完了し、工事も予定通り完了いたしました。',
        service: '分水工事',
        serviceUrl: '/service/water-tap',
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
