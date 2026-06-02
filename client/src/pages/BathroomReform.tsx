export default function BathroomReform() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            水回りリフォーム
          </h1>
          <p className="text-xl text-green-100">
            トイレ・洗面台・キッチン交換で、快適な生活空間を実現
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* 概要セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">水回りリフォームについて</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            毎日使う水回りだからこそ、快適さと機能性が重要です。トイレ、洗面台、キッチンなどの水回り設備は、時間とともに劣化し、使いづらくなっていきます。
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            堺設備では、最新の水回り設備への交換から、レイアウト変更を伴う大規模なリフォームまで、幅広いご要望にお応えしています。経験豊富なスタッフが、お客様のライフスタイルに合わせた最適なプランをご提案いたします。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            新しい設備で毎日の生活がより快適に、より効率的になります。水回りのリフォームをお考えでしたら、ぜひ堺設備にご相談ください。
          </p>
        </section>

        {/* 対応内容セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">トイレ交換</h3>
              <p className="text-gray-700 leading-relaxed">
                最新の節水型トイレへの交換。温水洗浄便座や自動開閉機能など、快適機能を備えた製品をご提案します。既存トイレの撤去から新規設置まで、一貫して対応いたします。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">洗面台交換</h3>
              <p className="text-gray-700 leading-relaxed">
                洗面台の交換で、朝の準備がより快適に。収納力の高い最新型洗面台から、シンプルで使いやすいタイプまで、様々な製品からお選びいただけます。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">キッチン交換</h3>
              <p className="text-gray-700 leading-relaxed">
                キッチンリフォームで、料理がより楽しくなります。システムキッチンの交換から、シンク・蛇口の単体交換まで、ご予算に合わせたプランをご提案します。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">浴室・浴槽交換</h3>
              <p className="text-gray-700 leading-relaxed">
                浴室全体のリフォームから、浴槽の単体交換まで対応。ユニットバスの導入で、清潔で快適な浴室空間を実現できます。
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-green-600">給排水管の更新</h3>
              <p className="text-gray-700 leading-relaxed">
                リフォームに合わせて、給排水管の更新も可能です。古い配管を新しくすることで、水漏れのリスクを減らし、より安心した生活環境を整えられます。
              </p>
            </div>
          </div>
        </section>

        {/* 対応エリアセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応エリア</h2>
          <div className="bg-green-50 p-8 rounded-lg">
            <p className="text-gray-700 mb-6 leading-relaxed">
              当社は、静岡市清水区を中心に、周辺地域での水回りリフォームに対応しています。迅速な対応が可能なエリアは以下の通りです。
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

        {/* リフォームのメリットセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">水回りリフォームのメリット</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">快適性の向上</h3>
                <p className="text-gray-700">
                  最新の水回り設備は、使いやすさと快適性を追求した設計。毎日の生活がより快適になります。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">省エネ・節水</h3>
                <p className="text-gray-700">
                  最新型の設備は、節水・省エネ機能を備えています。水道代・光熱費の削減につながります。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">衛生面の改善</h3>
                <p className="text-gray-700">
                  新しい設備は、清潔性と衛生面が向上。カビやバクテリアの増殖を抑える機能も搭載されています。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">資産価値の向上</h3>
                <p className="text-gray-700">
                  水回りのリフォームは、住宅の資産価値を高めます。将来の売却時にも有利になる可能性があります。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* リフォーム流れセクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">リフォームの流れ</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">ご相談・現地調査</h3>
                <p className="text-gray-700">
                  ご要望をお聞きし、現地を調査させていただきます。既存設備の状態を確認し、最適なプランをご提案します。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">お見積り・プラン提案</h3>
                <p className="text-gray-700">
                  詳細なお見積りと複数のリフォームプランをご提案。ご予算に合わせた最適なプランをお選びいただけます。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">ご契約・工事開始</h3>
                <p className="text-gray-700">
                  ご納得いただいた後、ご契約いただきます。工事スケジュールを調整し、工事を開始いたします。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">工事完了・引き渡し</h3>
                <p className="text-gray-700">
                  工事完了後、最終チェックを行い、お客様にご確認いただきます。ご不明な点があれば、丁寧にご説明いたします。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">よくある質問</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. リフォームにはどのくらい時間がかかりますか？</h3>
              <p className="text-gray-700">
                A. リフォーム内容によって異なりますが、トイレ交換なら1～2日、キッチン全体のリフォームなら1～2週間程度が目安です。詳細はお見積り時にご説明いたします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. リフォーム中は水が使えませんか？</h3>
              <p className="text-gray-700">
                A. リフォーム内容によって異なります。単体交換の場合は、短時間で対応可能です。大規模なリフォームの場合は、事前にご相談させていただきます。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 予算が限られているのですが、対応可能ですか？</h3>
              <p className="text-gray-700">
                A. もちろんです。ご予算に合わせて、複数のプランをご提案いたします。優先順位をお聞きし、最適なプランをご一緒に検討させていただきます。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 既存の設備の撤去費用は別途ですか？</h3>
              <p className="text-gray-700">
                A. 撤去費用はお見積りに含まれています。追加費用が発生する場合は、事前にご説明いたします。
              </p>
            </div>
          </div>
        </section>

        {/* 施工実績セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">施工実績</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">トイレ交換工事</h3>
              <p className="text-sm text-gray-600 mb-3">最新のトイレ機器に交換</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                老朽化したトイレを最新の温水洗浄便座付きトイレに交換。快適性と省エネ性が大幅に向上しました。
              </p>
              <a href="#" className="text-green-600 font-semibold mt-4 inline-block hover:text-green-800">
                詳細を見る →
              </a>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">洗面台交換工事</h3>
              <p className="text-sm text-gray-600 mb-3">新しい洗面台に交換</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                古い洗面台を新しいデザインの洗面台に交換。洗面所の雰囲気が大きく変わり、使い勝手も向上しました。
              </p>
              <a href="#" className="text-green-600 font-semibold mt-4 inline-block hover:text-green-800">
                詳細を見る →
              </a>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">キッチン改修工事</h3>
              <p className="text-sm text-gray-600 mb-3">キッチン全面改修</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                古いキッチンを最新のシステムキッチンに改修。調理スペースが広がり、使い勝手が大幅に改善されました。
              </p>
              <a href="#" className="text-green-600 font-semibold mt-4 inline-block hover:text-green-800">
                詳細を見る →
              </a>
            </div>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">水回りのリフォームをお考えですか？</h2>
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
