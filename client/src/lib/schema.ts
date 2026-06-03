/**
 * Schema.org 構造化データ生成ユーティリティ
 * SEO最適化のための構造化データをJSON-LD形式で生成します
 */

// 会社情報スキーマ
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '株式会社 堺設備',
    image: 'https://sakaireplica-m2oiogqs.manus.space/manus-storage/logo_c1bdfbde.png',
    description: '静岡県静岡市清水区の水道設備会社。50年以上の実績で地域の暮らしを支えています。',
    url: 'https://sakaireplica-m2oiogqs.manus.space',
    telephone: '0220122161',
    email: 'contact@sakaisetsubi.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '静岡県静岡市清水区',
      addressLocality: '静岡市清水区',
      addressRegion: '静岡県',
      postalCode: '424-0000',
      addressCountry: 'JP',
    },
    areaServed: {
      '@type': 'City',
      name: '静岡市清水区',
    },
    priceRange: '¥¥',
    sameAs: [
      'https://sakaisetsubi-rct.com/',
    ],
    foundingDate: '1970-01-01',
    knowsAbout: [
      '水漏れ修理',
      '水回りリフォーム',
      '新築給排水工事',
      '機器交換工事',
      '下水道切替工事',
      '分水工事',
    ],
  };
}

// 施工実績スキーマ
export function generateWorkSchema(work: {
  id: number;
  title: string;
  workContent: string;
  date: string;
  category: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title,
    description: work.workContent,
    datePublished: work.date,
    image: work.imageUrl || 'https://sakaireplica-m2oiogqs.manus.space/manus-storage/logo_c1bdfbde.png',
    creator: {
      '@type': 'Organization',
      name: '株式会社 堺設備',
    },
    keywords: `${work.category}, 施工実績, 水道工事, 静岡市`,
  };
}

// サービスページスキーマ
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'LocalBusiness',
      name: '株式会社 堺設備',
      url: 'https://sakaireplica-m2oiogqs.manus.space',
    },
    areaServed: {
      '@type': 'City',
      name: '静岡市清水区',
    },
  };
}

// ウェブサイトスキーマ
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '株式会社 堺設備',
    url: 'https://sakaireplica-m2oiogqs.manus.space',
    description: '静岡県静岡市清水区の水道設備会社。50年以上の実績で地域の暮らしを支えています。',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://sakaireplica-m2oiogqs.manus.space/works?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// BreadcrumbListスキーマ（パンくずリスト）
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQスキーマ
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
