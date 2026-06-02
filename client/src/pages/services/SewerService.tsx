export default function SewerService() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            下水道切替工事
          </h1>
          <p className="text-xl text-teal-100">
            浄化槽から下水道への切替工事
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* 対応内容セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-teal-600">🔄 浄化槽切替</h3>
              <p className="text-gray-700 leading-relaxed">
                浄化槽から下水道への切替工事。既存の浄化槽を撤去し、下水道に接続する配管工事を実施いたします。
              </p>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-teal-600">🔗 本管接続</h3>
              <p className="text-gray-700 leading-relaxed">
                下水道本管への接続工事。道路掘削から本管接続まで、一貫して対応いたします。
              </p>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-teal-600">💰 補助金対応</h3>
              <p className="text-gray-700 leading-relaxed">
                下水道切替工事に対する補助金の申請手続きをサポートいたします。詳しくはお問い合わせください。
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
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 下水道切替工事にはどのくらい時間がかかりますか？</h3>
              <p className="text-gray-700">
                A. 工事の規模によって異なりますが、通常3～5日程度が目安です。詳しくはご相談ください。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 浄化槽の撤去も対応していますか？</h3>
              <p className="text-gray-700">
                A. はい、対応いたします。浄化槽の撤去から下水道接続まで、一貫して実施いたします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 補助金の申請手続きをサポートしてもらえますか？</h3>
              <p className="text-gray-700">
                A. はい、サポートいたします。補助金の申請手続きについて、詳しくはお問い合わせください。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 工事中、トイレが使えなくなりますか？</h3>
              <p className="text-gray-700">
                A. 工事内容によって異なります。事前にご相談させていただき、対応方法をご説明いたします。
              </p>
            </div>
          </div>
        </section>

        {/* 関連施工実績セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">施工実績</h2>
          <div className="grid md:grid-cols-1 gap-6">
            <a href="/works/sewer-conversion" className="bg-white p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">浄化槽から下水道へ</h3>
              <p className="text-sm text-gray-600 mb-3">下水道切替工事完了</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                浄化槽から下水道への切替工事を実施。補助金の申請手続きもサポートし、お客様の負担を軽減しました。
              </p>
              <span className="text-teal-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">下水道切替工事はお任せください</h2>
          <p className="text-xl mb-8">
            浄化槽から下水道への切替で、快適な生活環境を実現します
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0220122-1817" className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
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
