export default function NewConstructionService() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            新築給排水工事
          </h1>
          <p className="text-xl text-purple-100">
            工務店様・建築会社様向けの給排水設備工事
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* 対応内容セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">💧 給水設備</h3>
              <p className="text-gray-700 leading-relaxed">
                水道本管からの引き込み工事、配管設計・施工、給水ポンプ設置など、給水に関する全ての工事に対応いたします。
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">🌊 排水設備</h3>
              <p className="text-gray-700 leading-relaxed">
                排水管の配管設計・施工、下水道への接続工事、グリストラップ設置など、排水に関する全ての工事に対応いたします。
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">🔧 屋外配管</h3>
              <p className="text-gray-700 leading-relaxed">
                屋外の給排水配管工事。最適な配管ルートを提案し、建築スケジュールに合わせた施工を実現します。
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">📋 申請業務</h3>
              <p className="text-gray-700 leading-relaxed">
                水道局への申請・届け出を代行いたします。指定給水装置工事事業者として、法令に基づいた適切な対応を実施します。
              </p>
            </div>
          </div>
        </section>

        {/* 対応エリアセクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応エリア</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">清水区</h3>
              <p className="text-gray-700">全域対応</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">葵区</h3>
              <p className="text-gray-700">対応可能</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">駿河区</h3>
              <p className="text-gray-700">対応可能</p>
            </div>
          </div>
          <p className="text-gray-700 mt-6">
            上記以外のエリアでも対応可能な場合がございます。お気軽にお問い合わせください。
          </p>
        </section>

        {/* よくある質問セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">よくある質問</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 設計段階からの相談は可能ですか？</h3>
              <p className="text-gray-700">
                A. もちろんです。設計段階からのご相談に対応いたします。最適な給排水配管設計をご提案させていただきます。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 水道局への申請は代行してもらえますか？</h3>
              <p className="text-gray-700">
                A. はい。指定給水装置工事事業者として、水道局への申請・届け出を代行いたします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 建築スケジュールが変わった場合、対応可能ですか？</h3>
              <p className="text-gray-700">
                A. 可能な限り対応いたします。建築スケジュールの変更があれば、お気軽にご相談ください。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 大規模なプロジェクトにも対応可能ですか？</h3>
              <p className="text-gray-700">
                A. はい。建設業許可を取得しており、大規模な給排水工事にも対応可能です。
              </p>
            </div>
          </div>
        </section>

        {/* 関連施工実績セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">施工実績</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/works/new-construction-1" className="bg-white p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">清水区○○ 新築給排水工事</h3>
              <p className="text-sm text-gray-600 mb-3">住宅新築の給排水工事</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                新築住宅の給排水配管工事。設計段階からの相談、施工、検査まで一貫して実施しました。
              </p>
              <span className="text-purple-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
            <a href="/works/new-construction-2" className="bg-white p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">葵区△△ 新築設備工事</h3>
              <p className="text-sm text-gray-600 mb-3">中規模新築物件の設備工事</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                中規模新築物件の給排水設備工事。複数のテナント対応の給排水配管を一括施工しました。
              </p>
              <span className="text-purple-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">新築給排水工事はお任せください</h2>
          <p className="text-xl mb-8">
            工務店様・建築会社様との信頼の実績で、確実な施工を実現します
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0220122-1817" className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
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
