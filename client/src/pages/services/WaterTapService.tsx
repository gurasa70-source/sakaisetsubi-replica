export default function WaterTapService() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            分水工事
          </h1>
          <p className="text-xl text-cyan-100">
            給水引込・分水申請・道路掘削工事
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* 対応内容セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cyan-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-cyan-600">💧 給水引込</h3>
              <p className="text-gray-700 leading-relaxed">
                水道本管からの給水引込工事。新築住宅や新しい敷地への給水配管工事を実施いたします。
              </p>
            </div>
            <div className="bg-cyan-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-cyan-600">📋 分水申請</h3>
              <p className="text-gray-700 leading-relaxed">
                水道局への分水申請手続きを代行いたします。指定給水装置工事事業者として、法令に基づいた適切な対応を実施します。
              </p>
            </div>
            <div className="bg-cyan-50 p-6 rounded-lg md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-cyan-600">🔨 道路掘削</h3>
              <p className="text-gray-700 leading-relaxed">
                道路掘削から給水配管の敷設まで、一貫して対応いたします。交通安全に配慮した施工を実施いたします。
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
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 分水工事にはどのくらい時間がかかりますか？</h3>
              <p className="text-gray-700">
                A. 工事の規模によって異なりますが、通常1～3日程度が目安です。詳しくはご相談ください。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 分水申請の手続きをサポートしてもらえますか？</h3>
              <p className="text-gray-700">
                A. はい、サポートいたします。指定給水装置工事事業者として、水道局への申請手続きを代行いたします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 道路掘削が必要な場合、許可申請は対応していますか？</h3>
              <p className="text-gray-700">
                A. はい、対応いたします。道路掘削に必要な許可申請も一貫して実施いたします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 新築住宅への給水引込工事も対応していますか？</h3>
              <p className="text-gray-700">
                A. はい、対応いたします。新築住宅への給水引込工事も、設計段階からのご相談に対応いたします。
              </p>
            </div>
          </div>
        </section>

        {/* 関連施工実績セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">施工実績</h2>
          <div className="grid md:grid-cols-1 gap-6">
            <a href="/works/water-tap-completion" className="bg-white p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">分水工事完了</h3>
              <p className="text-sm text-gray-600 mb-3">新築敷地への給水引込工事</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                新築敷地への給水引込工事を実施。分水申請から道路掘削、配管敷設まで一貫して対応しました。
              </p>
              <span className="text-cyan-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">分水工事はお任せください</h2>
          <p className="text-xl mb-8">
            新築敷地への給水引込から申請手続きまで、一貫して対応いたします
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0220122-1817" className="bg-white text-cyan-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
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
