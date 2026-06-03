import { useState, useEffect, useMemo } from 'react';
import { useSchemaOrg } from '@/hooks/useSchemaOrg';
import { generateServiceSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, FileText, Pencil, Zap, Users } from 'lucide-react';

export default function DesignService() {
  // Schema.org構造化データを追加
  const designSchema = useMemo(() => {
    return generateServiceSchema({
      name: '設計・申請業務',
      description: '新築・リフォームの給排水設備設計から水道申請まで一括対応。施工を理解した設計で、現場とのズレを最小限に。',
      url: 'https://sakaireplica-m2oiogqs.manus.space/design',
    });
  }, []);

  useSchemaOrg(designSchema, 'design-service-schema');

  const [activeTab, setActiveTab] = useState<'what' | 'difference' | 'results'>('what');

  // ファーストビュー画像
  const heroImages = [
    '/manus-storage/hero_design_1.jpg',
    '/manus-storage/hero_design_2.jpg',
    '/manus-storage/hero_design_3.jpg',
  ];

  const services = [
    {
      icon: <Pencil className="w-8 h-8" />,
      title: '設備設計',
      description: '新築・リフォームの給排水設備設計を対応',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: '配管計画図作成',
      description: '施工を理解した詳細な配管計画図を作成',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: '水道局申請',
      description: '水道局への申請業務を一括対応',
    },
    {
      icon: <Check className="w-8 h-8" />,
      title: '竣工図作成',
      description: '施工完了後の竣工図を作成',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'コンサルティング',
      description: '設計に関するご相談をお受けします',
    },
  ];

  const differences = [
    {
      title: '施工を理解した設計',
      description: '50年の施工実績から得た知識で、実現可能な設計を提案します。',
    },
    {
      title: '現場とズレない図面',
      description: '施工部門と密に連携し、現場での変更を最小限に抑えます。',
    },
    {
      title: '施工部門との一体運用',
      description: '設計から施工まで同じ会社で対応。スムーズな連携で品質を確保。',
    },
    {
      title: '修正の少ない設計',
      description: '詳細な打ち合わせと現場調査で、設計変更を最小限に。',
    },
  ];

  const results = [
    {
      title: '静岡市 新築戸建 設備設計',
      category: '新築',
      description: '4LDK戸建の給排水設備設計・水道申請を対応。',
    },
    {
      title: 'アパート給排水計画',
      category: 'アパート',
      description: '20戸アパートの給排水計画図作成・申請業務。',
    },
    {
      title: 'リフォーム設備設計',
      category: 'リフォーム',
      description: '既存建物の水回りリフォーム設計・申請対応。',
    },
  ];

  const reasons = [
    '設計〜施工まで一括対応で手間が少ない',
    '現場目線の設計で施工品質が向上',
    '申請業務まで対応で手続きが簡単',
    '地域密着だからいつでも相談できる',
  ];

  return (
    <div className="w-full">
      {/* ファーストビュー */}
      <section className="relative w-full h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={heroImages[0]}
            alt="設計・申請業務"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            静岡市の給排水設備設計・申請業務
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            新築・リフォームの設備設計から水道申請まで一括対応
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => window.location.href = 'tel:054-348-2286'}
            >
              電話する
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              お問い合わせ
            </Button>
          </div>
        </div>
      </section>

      {/* このページでできること */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            このページでできること
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 他社との違い */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            他社との違い
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differences.map((diff, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white">
                      <Check className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{diff.title}</h3>
                    <p className="text-gray-600">{diff.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 実績 */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            設計実績
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                  {result.category}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{result.title}</h3>
                <p className="text-gray-600">{result.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 対応可能な業務 */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            対応可能な業務
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 給排水 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">給排水</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">申請・竣工図面作成</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">申請手続き代行</span>
                </li>
              </ul>
            </div>

            {/* 許可申請 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">許可申請</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span className="text-gray-700">道路使用許可申請</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span className="text-gray-700">道路占用許可申請</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span className="text-gray-700">河川占用許可申請</span>
                </li>
              </ul>
            </div>

            {/* 調査代行 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">調査代行</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">上下水道局調査代行</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">法務局調査代行</span>
                </li>
              </ul>
            </div>

            {/* 対応建物・設備 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">対応建物・設備</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span className="text-gray-700">一般住宅</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span className="text-gray-700">集合住宅</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span className="text-gray-700">受水槽</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span className="text-gray-700">水理計算</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 選ばれる理由 */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            選ばれる理由
          </h2>

          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <p className="text-lg text-gray-900 font-semibold">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 問い合わせセクション */}
      <section id="contact" className="py-16 md:py-24 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            設計・申請業務についてのご相談
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            設計だけでもOK、丸投げもOK。お気軽にお問い合わせください。
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => window.location.href = 'tel:054-348-2286'}
            >
              📞 054-348-2286
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => window.location.href = 'mailto:contact@sakaisetsubi.com'}
            >
              📧 メールでお問い合わせ
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
