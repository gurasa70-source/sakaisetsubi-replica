import { describe, it, expect } from 'vitest';
import {
  generateOrganizationSchema,
  generateLocalBusinessDetailSchema,
  generateContactPointSchema,
  generateWorkSchema,
  generateServiceSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from './schema';

describe('Schema.org generators', () => {
  it('should generate organization schema', () => {
    const schema = generateOrganizationSchema();
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('LocalBusiness');
    expect(schema.name).toBe('株式会社 堺設備');
    expect(schema.address).toBeDefined();
    expect(schema.address.addressLocality).toBe('静岡市清水区');
  });

  it('should generate work schema', () => {
    const work = {
      id: 1,
      title: 'テスト施工実績',
      workContent: 'テスト内容',
      date: '2026-06-03',
      category: '漏水修理',
      imageUrl: 'https://example.com/image.jpg',
    };

    const schema = generateWorkSchema(work);
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('CreativeWork');
    expect(schema.name).toBe('テスト施工実績');
    expect(schema.description).toBe('テスト内容');
    expect(schema.keywords).toContain('漏水修理');
  });

  it('should generate service schema', () => {
    const service = {
      name: '漏水修理',
      description: '漏水修理サービス',
      url: 'https://example.com/service/leak-repair',
    };

    const schema = generateServiceSchema(service);
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Service');
    expect(schema.name).toBe('漏水修理');
    expect(schema.provider).toBeDefined();
  });

  it('should generate website schema', () => {
    const schema = generateWebsiteSchema();
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe('株式会社 堺設備');
    expect(schema.potentialAction).toBeDefined();
  });

  it('should generate breadcrumb schema', () => {
    const items = [
      { name: 'ホーム', url: 'https://example.com' },
      { name: 'サービス', url: 'https://example.com/service' },
      { name: '漏水修理', url: 'https://example.com/service/leak-repair' },
    ];

    const schema = generateBreadcrumbSchema(items);
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[0].name).toBe('ホーム');
  });

  it('should generate FAQ schema', () => {
    const faqs = [
      {
        question: 'テスト質問1',
        answer: 'テスト回答1',
      },
      {
        question: 'テスト質問2',
        answer: 'テスト回答2',
      },
    ];

    const schema = generateFAQSchema(faqs);
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0].name).toBe('テスト質問1');
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('テスト回答1');
  });
});
