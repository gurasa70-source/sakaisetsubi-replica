export default function EquipmentService() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            機器交換工事
          </h1>
          <p className="text-xl text-orange-100">
            トイレ・洗面台・水栓・井戸ポンプの交換工事
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* 対応内容セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">🚽 トイレ交換</h3>
              <p className="text-gray-700 leading-relaxed">
                最新の節水型トイレへの交換。温水洗浄便座や自動開閉機能など、快適機能を備えた製品をご提案します。
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">🚰 洗面台交換</h3>
              <p className="text-gray-700 leading-relaxed">
                洗面台の交換で、朝の準備がより快適に。収納力の高い最新型洗面台から、シンプルで使いやすいタイプまで。
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">🔧 水栓交換</h3>
              <p className="text-gray-700 leading-relaxed">
                キッチンやバスルームの水栓交換。最新の省水型水栓で、水道代の削減にも貢献します。
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">⚙️ 井戸ポンプ交換</h3>
              <p className="text-gray-700 leading-relaxed">
                井戸ポンプの交換・修理。古いポンプから最新型への交換で、効率性と信頼性が向上します。
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
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 交換工事にはどのくらい時間がかかりますか？</h3>
              <p className="text-gray-700">
                A. 機器によって異なりますが、トイレ交換は1日、水栓交換は数時間程度が目安です。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 古い機器の処分は対応していますか？</h3>
              <p className="text-gray-700">
                A. はい、古い機器の撤去と処分も対応いたします。新しい機器の設置までを一貫して行います。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 井戸ポンプの修理だけでも対応していますか？</h3>
              <p className="text-gray-700">
                A. はい、対応いたします。修理で対応可能な場合もあります。まずはご相談ください。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 機器の選択についてアドバイスをもらえますか？</h3>
              <p className="text-gray-700">
                A. もちろんです。ご予算やご要望に合わせて、最適な機器をご提案いたします。
              </p>
            </div>
          </div>
        </section>

        {/* 関連施工実績セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">施工実績</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/works/equipment-toilet" className="bg-white p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">トイレ交換工事</h3>
              <p className="text-sm text-gray-600 mb-3">最新のトイレ機器に交換</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                老朽化したトイレを最新の温水洗浄便座付きトイレに交換。快適性が大幅に向上しました。
              </p>
              <span className="text-orange-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
            <a href="/works/equipment-pump" className="bg-white p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">井戸ポンプ交換工事</h3>
              <p className="text-sm text-gray-600 mb-3">古いポンプから新型へ交換</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                動かなくなった井戸ポンプを最新型に交換。効率性と信頼性が大幅に向上しました。
              </p>
              <span className="text-orange-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">機器交換工事はお任せください</h2>
          <p className="text-xl mb-8">
            最新の機器で、快適な生活環境を実現します
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0220122-1817" className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
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
