export default function RemodelService() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            水回りリフォーム
          </h1>
          <p className="text-xl text-green-100">
            トイレ・洗面台・キッチン・浴室の交換・改修工事
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* 対応内容セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-600">🚽 トイレ交換</h3>
              <p className="text-gray-700 leading-relaxed">
                最新の節水型トイレへの交換。温水洗浄便座や自動開閉機能など、快適機能を備えた製品をご提案します。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-600">🚰 洗面台交換</h3>
              <p className="text-gray-700 leading-relaxed">
                洗面台の交換で、朝の準備がより快適に。収納力の高い最新型洗面台から、シンプルで使いやすいタイプまで。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-600">🍳 キッチン改修</h3>
              <p className="text-gray-700 leading-relaxed">
                キッチンリフォームで、料理がより楽しくなります。システムキッチンの交換から、シンク・蛇口の単体交換まで。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-600">🛁 浴室交換</h3>
              <p className="text-gray-700 leading-relaxed">
                浴室全体のリフォームから、浴槽の単体交換まで対応。ユニットバスの導入で、清潔で快適な浴室空間を実現。
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
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. リフォームにはどのくらい時間がかかりますか？</h3>
              <p className="text-gray-700">
                A. トイレ交換は1日、キッチン改修は3～5日程度が目安です。詳しくはご相談ください。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 設計段階からの相談は可能ですか？</h3>
              <p className="text-gray-700">
                A. はい、対応いたします。ご要望をお聞きして、最適なプランをご提案いたします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 複数の水回り設備を同時にリフォームすることは可能ですか？</h3>
              <p className="text-gray-700">
                A. はい、可能です。複数の設備を同時にリフォームすることで、工期を短縮し、費用を削減できる場合もあります。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 予算が限られているのですが、対応可能ですか？</h3>
              <p className="text-gray-700">
                A. もちろんです。ご予算に合わせて、複数のプランをご提案いたします。
              </p>
            </div>
          </div>
        </section>

        {/* 関連施工実績セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">施工実績</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/works/remodel-toilet" className="bg-white p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">トイレ交換工事</h3>
              <p className="text-sm text-gray-600 mb-3">最新のトイレ機器に交換</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                老朽化したトイレを最新の温水洗浄便座付きトイレに交換。快適性と省エネ性が大幅に向上しました。
              </p>
              <span className="text-green-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
            <a href="/works/remodel-sink" className="bg-white p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">洗面台交換工事</h3>
              <p className="text-sm text-gray-600 mb-3">新しい洗面台に交換</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                古い洗面台を新しいデザインの洗面台に交換。洗面所の雰囲気が大きく変わり、使い勝手も向上しました。
              </p>
              <span className="text-green-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">水回りのリフォームはお任せください</h2>
          <p className="text-xl mb-8">
            快適な生活空間を実現するなら、堺設備にお任せください
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0220122-1817" className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
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
