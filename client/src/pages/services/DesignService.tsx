import { useMemo, useState } from 'react';
import { useSchemaOrg } from '@/hooks/useSchemaOrg';
import { generateServiceSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Zap, Users, MapPin, Phone } from 'lucide-react';

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

  const concerns = [
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: '設備設計を外注できる会社を探している',
      color: 'text-red-600',
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: '水道申請の書類作成が負担になっている',
      color: 'text-red-600',
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: '設計と現場のズレで手戻りが発生している',
      color: 'text-red-600',
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: '一括で任せられる業者が見つからない',
      color: 'text-red-600',
    },
  ];

  const services = [
    '給排水設備設計（新築・リフォーム）',
    '配管計画図作成',
    '水道局申請書類作成',
    '各種行政申請業務',
    '竣工図作成',
    '現場調査・事前確認',
  ];

  const reasons = [
    {
      number: '①',
      title: '施工を理解した現実的な設計',
      description: '机上だけの設計ではなく、現場で使える設計を行います。',
    },
    {
      number: '②',
      title: '施工部門との連携体制',
      description: '社内施工部門と連携し、設計と現場のズレを防ぎます。',
    },
    {
      number: '③',
      title: '申請業務まで一括対応',
      description: '水道申請などの煩雑な業務もまとめて対応可能です。',
    },
    {
      number: '④',
      title: '地域密着で迅速対応',
      description: '静岡市周辺を中心に、スピーディーな対応を行っています。',
    },
  ];

  const serviceAreas = ['静岡市', '焼津市'];

  return (
    <div className="min-h-screen bg-white">
      {/* ファーストビュー */}
      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* 左側：画像 */}
            <div className="order-2 md:order-1">
              <div className="bg-blue-700 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://d35hueqnbj0jwy.cloudfront.net/38nnuP1214iB8HwzhBZz"
                  alt="設計・申請業務 CAD図面と現場写真"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* 右側：テキスト */}
            <div className="order-1 md:order-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                静岡市の給排水設備設計・申請業務
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-4">
                施工を理解した設計で、現場に強い図面を作成
              </p>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                新築・リフォームの設計から水道申請まで一括対応
              </p>

              <div className="flex gap-4 flex-wrap">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-bold"
                  onClick={() => window.location.href = 'tel:054-348-2286'}
                >
                  電話でご相談
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-bold"
                  onClick={() => window.location.href = 'mailto:sakai-sekkei@ace.ocn.ne.jp'}
                >
                  設計・見積依頼を送信
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* よくあるお悩み */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            設計・申請業務でこんなお悩みありませんか？
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            当社では施工部門と連携し、現場に即した設計・申請業務を一括対応しています。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {concerns.map((concern, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
                <div className={`${concern.color} mb-3`}>
                  {concern.icon}
                </div>
                <p className="text-gray-900 font-semibold text-lg">{concern.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* サービス内容 */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            対応業務
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-900 font-semibold">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 選ばれる理由 */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            選ばれる理由
          </h2>

          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-start gap-6">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: '#0052CC' }}
                  >
                    {reason.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 実績 */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            設計・申請実績
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4" style={{ borderLeftColor: '#0052CC' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                静岡市｜新築戸建 給排水設備設計・申請
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                <strong>建物：</strong>新築戸建<br />
                <strong>業務内容：</strong>給排水設備設計・水道申請<br />
                <strong>対応範囲：</strong>図面作成〜申請提出
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                静岡市内の新築戸建住宅にて、給排水設備設計および水道申請業務を担当しました。施工部門と連携し、スムーズな現場進行を実現しています。
              </p>
            </Card>

            <Card className="p-6 border-l-4" style={{ borderLeftColor: '#0052CC' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                焼津市｜集合住宅 給排水計画
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                <strong>建物：</strong>集合住宅<br />
                <strong>業務内容：</strong>給排水計画図作成・申請<br />
                <strong>対応範囲：</strong>全体計画〜竣工図作成
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                複数戸の集合住宅における給排水計画図作成と各種申請業務を一括対応。設計と施工の連携で、スムーズな工事進行を実現しました。
              </p>
            </Card>
          </div>

          <p className="text-center text-gray-600 mt-8 text-sm">
            ※その他多数の実績があります。詳細はお問い合わせください。
          </p>
        </div>
      </section>

      {/* 設計×施工の強み */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            設計と施工が一体の強み
          </h2>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 leading-relaxed">
              設計部と施工部が同一会社内にあることで、現場で実際に使える設計を実現しています。
              これにより、手戻りの少ないスムーズな施工が可能になります。
            </p>
          </div>
        </div>
      </section>

      {/* 対応エリア */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            対応エリア
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg text-center border-2 border-blue-200">
                <p className="text-lg font-bold text-gray-900">{area}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            静岡市・焼津市の上下水道指定工事店として対応しています
          </p>
        </div>
      </section>

      {/* お問い合わせ */}
      <section id="contact" className="py-16 md:py-24 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            設計・申請のご相談はこちら
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            新築・リフォームに関わる給排水設備設計・申請業務について、お気軽にご相談ください。
            設計のみのご依頼も可能です。
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold"
              onClick={() => window.location.href = 'tel:054-348-2286'}
            >
              <Phone className="w-5 h-5 mr-2" />
              電話する
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-bold"
              onClick={() => window.location.href = 'mailto:sakai-sekkei@ace.ocn.ne.jp'}
            >
              設計・見積依頁を送信
            </Button>
          </div>

          <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-blue-600 mb-4 font-bold text-lg">設計部直通連絡先</p>
            <div className="space-y-4 text-gray-800">
              <div>
                <p className="text-sm text-gray-600 font-semibold">電話</p>
                <p className="text-2xl font-bold text-blue-600">054-348-2286</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">FAX</p>
                <p className="text-2xl font-bold text-blue-600">054-340-1401</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">メール</p>
                <p className="text-lg font-bold text-blue-600 break-all">sakai-sekkei@ace.ocn.ne.jp</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
