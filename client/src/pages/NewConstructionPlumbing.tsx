export default function NewConstructionPlumbing() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            新築給排水設備工事
          </h1>
          <p className="text-xl text-purple-100">
            工務店様・建築会社様向け。確実で信頼できる給排水設備工事
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* 概要セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">新築給排水設備工事について</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            新築住宅やビルの建設には、安全で確実な給排水設備工事が不可欠です。堺設備は、50年以上の実績を持つ指定給水装置工事事業者として、工務店様・建築会社様と連携し、高品質な給排水設備工事を提供しています。
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            設計段階からの相談、施工、検査まで、一貫したサービスを提供いたします。建築スケジュールに合わせた柔軟な対応と、確実な施工品質で、お客様の信頼を得ています。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            新築プロジェクトの給排水設備工事は、堺設備にお任せください。
          </p>
        </section>

        {/* 対応内容セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">給水設備工事</h3>
              <p className="text-gray-700 leading-relaxed">
                水道本管からの引き込み工事、配管設計・施工、給水ポンプ設置など、給水に関する全ての工事に対応いたします。建築基準法に基づいた安全な施工を実施します。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">排水設備工事</h3>
              <p className="text-gray-700 leading-relaxed">
                排水管の配管設計・施工、下水道への接続工事、グリストラップ設置など、排水に関する全ての工事に対応いたします。適切な勾配と材質を選定し、確実な施工を行います。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">配管設計・施工</h3>
              <p className="text-gray-700 leading-relaxed">
                建築図面に基づいた給排水配管の設計・施工。最適な配管ルートを提案し、建築スケジュールに合わせた施工を実現します。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">給水装置工事</h3>
              <p className="text-gray-700 leading-relaxed">
                指定給水装置工事事業者として、水道局への申請・届け出を代行いたします。法令に基づいた適切な給水装置工事を実施します。
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">検査・試験</h3>
              <p className="text-gray-700 leading-relaxed">
                施工完了後、水圧試験、通水試験、漏水検査など、各種検査を実施いたします。確実な施工品質を保証し、竣工後のトラブルを防ぎます。
              </p>
            </div>
          </div>
        </section>

        {/* 対応エリアセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応エリア</h2>
          <div className="bg-purple-50 p-8 rounded-lg">
            <p className="text-gray-700 mb-6 leading-relaxed">
              当社は、静岡市清水区を中心に、周辺地域での新築給排水工事に対応しています。工務店様・建築会社様との連携実績が豊富です。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">主要対応エリア</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ 静岡市清水区</li>
                  <li>✓ 静岡市葵区</li>
                  <li>✓ 静岡市駿河区</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">周辺対応エリア</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ 富士市</li>
                  <li>✓ 焼津市</li>
                  <li>✓ 藤枝市</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mt-6">
              上記以外のエリアでも対応可能な場合がございます。お気軽にお問い合わせください。
            </p>
          </div>
        </section>

        {/* 資格・認定セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">資格・認定</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">指定給水装置工事事業者</h3>
                <p className="text-gray-700">
                  水道局の指定を受けた給水装置工事事業者。法令に基づいた適切な給水装置工事を実施いたします。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">建設業許可</h3>
                <p className="text-gray-700">
                  建設業許可を取得しており、大規模な給排水工事にも対応可能です。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">技術者資格</h3>
                <p className="text-gray-700">
                  給水装置工事主任技術者、排水設備工事責任技術者など、各種資格を保有するスタッフが施工にあたります。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 堺設備の特徴セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">堺設備の特徴</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">50年以上の実績</h3>
                <p className="text-gray-700">
                  創業以来、多くの新築プロジェクトに携わってきました。工務店様・建築会社様からの信頼が厚いです。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">建築スケジュール対応</h3>
                <p className="text-gray-700">
                  建築スケジュールに合わせた柔軟な対応が可能。工期短縮にも協力いたします。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">設計段階からの相談</h3>
                <p className="text-gray-700">
                  設計段階からのご相談に対応。最適な給排水配管設計をご提案いたします。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">確実な施工品質</h3>
                <p className="text-gray-700">
                  各種検査を実施し、確実な施工品質を保証。竣工後のトラブルを防ぎます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 工事の流れセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">工事の流れ</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">設計相談・提案</h3>
                <p className="text-gray-700">
                  建築図面に基づいて、給排水配管の設計をご提案いたします。最適なルートと材質をご相談させていただきます。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">水道局への申請</h3>
                <p className="text-gray-700">
                  指定給水装置工事事業者として、給水装置工事の申請・届け出を代行いたします。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">施工実施</h3>
                <p className="text-gray-700">
                  建築スケジュールに合わせて、給排水配管工事を実施いたします。品質管理を徹底して行います。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">検査・試験</h3>
                <p className="text-gray-700">
                  水圧試験、通水試験、漏水検査など、各種検査を実施いたします。水道局の検査にも対応いたします。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">竣工・引き渡し</h3>
                <p className="text-gray-700">
                  工事完了後、竣工検査を実施いただきます。確実な施工品質を確認いただけます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
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
                A. はい。建設業許可を取得しており、大規模な給排水工事にも対応可能です。複数のチームで対応することも可能です。
              </p>
            </div>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">新築プロジェクトの給排水工事はお任せください</h2>
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
