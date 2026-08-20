import { CheckCircle2, ChevronRight, Mail, Phone } from "lucide-react";

export default function LeakRepair() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="max-w-4xl text-3xl font-bold leading-[1.2] text-balance mb-4 sm:text-4xl md:text-5xl">
            漏水修理
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-pretty text-blue-100 sm:text-xl">
            静岡市・焼津市の水漏れ・漏水トラブルに対応
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-4xl mx-auto px-4 py-16">
        {/* 漏水とはセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">漏水とは</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            漏水とは、給水管や排水管から水が漏れ出ている状態を指します。目に見える漏水もあれば、壁の中や地中で起きている見えない漏水もあります。放置すると、水道料金の増加、建物への水損害、カビの発生など、様々なトラブルに繋がります。
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            特に、水道料金が急に上がった場合や、水道メーターが常に回っている場合は、漏水の可能性があります。堺設備では、漏水の原因を特定し、迅速に修理いたします。
          </p>
          <div className="bg-blue-50 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">漏水の主な原因</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />経年劣化による配管の破損</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />凍結による配管の破裂</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />地震による配管の損傷</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />施工不良による接続部の漏水</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />蛇口やパッキンの劣化</li>
            </ul>
          </div>
        </section>

        {/* 修理内容セクション */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">修理内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">漏水調査</h3>
              <p className="text-gray-700 leading-relaxed">
                最新の漏水検査機器を使用して、目に見えない漏水箇所を特定いたします。地中の埋設管からの漏水も、正確に調査できます。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">配管修理・交換</h3>
              <p className="text-gray-700 leading-relaxed">
                漏水箇所の配管を修理または交換いたします。小規模な修理から、配管全体の交換まで対応可能です。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">蛇口・パッキン交換</h3>
              <p className="text-gray-700 leading-relaxed">
                蛇口やパッキンの劣化による漏水は、部品交換で対応いたします。状況に合わせた修理方法をご案内します。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">埋設管漏水修理</h3>
              <p className="text-gray-700 leading-relaxed">
                庭や駐車場の地中にある埋設管からの漏水も対応いたします。掘削工事を含めた一貫した修理が可能です。
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">24時間対応</h3>
              <p className="text-gray-700 leading-relaxed">
                緊急の漏水トラブルは、24時間対応いたします。深夜や休日でも、お気軽にお電話ください。
              </p>
            </div>
          </div>
        </section>

        {/* 対応エリアセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">対応エリア</h2>
          <div className="bg-blue-50 p-8 rounded-lg">
            <p className="text-gray-700 mb-6 leading-relaxed">
              堺設備は、静岡市・焼津市の上下水道指定工事店として、漏水修理に対応いたします。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">指定工事店対応エリア</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />静岡市</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700" />焼津市</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 水道料金が急に上がったのですが、漏水の可能性はありますか？</h3>
              <p className="text-gray-700">
                A. はい、漏水の可能性があります。水道メーターが常に回っていないか確認してください。漏水調査をお勧めいたします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 漏水調査にはどのくらい時間がかかりますか？</h3>
              <p className="text-gray-700">
                A. 通常、30分～1時間程度で調査が完了します。漏水箇所によっては、追加の調査が必要な場合もあります。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 修理費用はどのくらいかかりますか？</h3>
              <p className="text-gray-700">
                A. 漏水の原因や規模によって異なります。お見積もりをご希望の場合は、調査内容と必要費用をご説明したうえでお見積もりをご案内します。内容にご納得いただいてから施工します。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 深夜や休日の対応は可能ですか？</h3>
              <p className="text-gray-700">
                A. はい、24時間対応いたします。緊急の場合は、お気軽にお電話ください。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Q. 地中の埋設管からの漏水にも対応していますか？</h3>
              <p className="text-gray-700">
                A. はい、対応いたします。最新の調査機器を使用して、埋設管の漏水箇所を特定し、修理いたします。
              </p>
            </div>
          </div>
        </section>

        {/* 関連施工実績セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">関連施工実績</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">清水区○○で漏水修理</h3>
              <p className="text-sm text-gray-600 mb-3">給水管からの漏水を調査・修理</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                キッチン下の給水管から漏水が発生。最新の調査機器で漏水箇所を特定し、配管を交換いたしました。
              </p>
              <a href="/works" className="text-blue-600 font-semibold mt-4 inline-block hover:text-blue-800">
                詳細を見る <ChevronRight className="inline-block w-4 h-4 align-text-bottom" />
              </a>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">清水区△△で埋設管漏水修理</h3>
              <p className="text-sm text-gray-600 mb-3">地中の埋設管からの漏水を修理</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                府の埋設管からの漏水により、水道料金が大幅に増加。掘削工事を行い、配管を交換いたしました。
              </p>
              <a href="/works" className="text-blue-600 font-semibold mt-4 inline-block hover:text-blue-800">
                詳細を見る <ChevronRight className="inline-block w-4 h-4 align-text-bottom" />
              </a>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">清水区□□で漏水調査</h3>
              <p className="text-sm text-gray-600 mb-3">水道料金増加の原因を調査</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                水道料金が急に上がったため、漏水調査を実施。螒口のパッキン劣化が原因で、交換いたしました。
              </p>
              <a href="/works" className="text-blue-600 font-semibold mt-4 inline-block hover:text-blue-800">
                詳細を見る <ChevronRight className="inline-block w-4 h-4 align-text-bottom" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">漏水トラブルはお任せください</h2>
          <p className="text-xl mb-8">
            24時間対応で、迅速に漏水を修理いたします
          </p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <a href="tel:0543482286" className="flex min-h-12 w-full items-center justify-center bg-white px-6 py-4 rounded-lg text-center font-bold text-lg text-blue-600 transition hover:bg-gray-100 sm:w-auto">
              <Phone className="inline-block mr-2 w-5 h-5" />電話する
            </a>
              <a 
              href="/#contact"
              className="flex min-h-12 w-full items-center justify-center bg-blue-700 px-6 py-4 rounded-lg text-center font-bold text-lg text-white transition hover:bg-blue-800 sm:w-auto"
            >
              <Mail className="inline-block mr-2 w-5 h-5" />お問い合わせ
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
