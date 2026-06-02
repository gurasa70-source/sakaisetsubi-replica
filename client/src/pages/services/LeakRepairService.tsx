export default function LeakRepairService() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            静岡市清水区の漏水修理・漏水調査
          </h1>
          <p className="text-xl text-blue-100">
            24時間対応で迅速に漏水を特定・修理いたします
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* よくある症状セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">こんな症状ありませんか？</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">💧 水道料金が高い</h3>
              <p className="text-gray-700">
                前月と比べて水道料金が急に上がった。使用量に心当たりがない場合は、漏水の可能性があります。
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">🌊 地面が濡れている</h3>
              <p className="text-gray-700">
                庭や駐車場の地面が常に濡れている。埋設管からの漏水の可能性があります。
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">⚙️ メーターが回る</h3>
              <p className="text-gray-700">
                蛇口を全て閉じているのに、水道メーターが回り続けている。漏水の可能性が高いです。
              </p>
            </div>
          </div>
        </section>

        {/* 対応内容セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応内容</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">漏水調査</h3>
                <p className="text-gray-700">
                  最新の漏水検査機器を使用して、目に見えない漏水箇所を正確に特定します。地中の埋設管からの漏水も調査可能です。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">給水管修理</h3>
                <p className="text-gray-700">
                  給水管からの漏水を修理・交換いたします。小規模な修理から配管全体の交換まで対応可能です。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">埋設管修理</h3>
                <p className="text-gray-700">
                  庭や駐車場の地中にある埋設管からの漏水に対応。掘削工事を含めた一貫した修理が可能です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 対応エリアセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応エリア</h2>
          <div className="bg-blue-50 p-8 rounded-lg">
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
          </div>
        </section>

        {/* よくある質問セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">よくある質問</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 漏水調査にはどのくらい時間がかかりますか？</h3>
              <p className="text-gray-700">
                A. 通常30分～1時間程度で調査が完了します。漏水箇所によっては追加調査が必要な場合もあります。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 修理費用はどのくらいかかりますか？</h3>
              <p className="text-gray-700">
                A. 漏水の原因や規模によって異なります。調査後に見積もりをお出しいたします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 深夜や休日の対応は可能ですか？</h3>
              <p className="text-gray-700">
                A. はい、24時間対応いたします。緊急の場合はお気軽にお電話ください。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 地中の埋設管からの漏水にも対応していますか？</h3>
              <p className="text-gray-700">
                A. はい、対応いたします。最新の調査機器で埋設管の漏水箇所を特定し、修理いたします。
              </p>
            </div>
          </div>
        </section>

        {/* 関連施工実績セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">関連施工実績</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/works/leak-repair-1" className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">清水区○○ 給水管漏水修理</h3>
              <p className="text-sm text-gray-600 mb-3">給水管からの漏水を修理</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                キッチン下の給水管から漏水が発生。調査機器で漏水箇所を特定し、配管を交換いたしました。
              </p>
              <span className="text-blue-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
            <a href="/works/leak-repair-2" className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">清水区△△ 漏水調査</h3>
              <p className="text-sm text-gray-600 mb-3">水道料金増加の原因を調査</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                水道料金が急に上がったため、漏水調査を実施。蛇口のパッキン劣化が原因で、交換いたしました。
              </p>
              <span className="text-blue-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
            <a href="/works/leak-repair-3" className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg hover:shadow-lg transition block">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">清水区□□ 埋設管漏水修理</h3>
              <p className="text-sm text-gray-600 mb-3">地中の埋設管からの漏水を修理</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                庭の埋設管からの漏水により、水道料金が大幅に増加。掘削工事を行い、配管を交換いたしました。
              </p>
              <span className="text-blue-600 font-semibold mt-4 inline-block">詳細を見る →</span>
            </a>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">漏水トラブルはお任せください</h2>
          <p className="text-xl mb-8">
            24時間対応で、迅速に漏水を修理いたします
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0220122-1817" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
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
