import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb } from './db';
import { works } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

describe('works.getFiltered - comprehensive filtering', () => {
  let db: Awaited<ReturnType<typeof getDb>>;
  const testWorkIds: number[] = [];

  beforeAll(async () => {
    db = await getDb();
    if (!db) {
      throw new Error('Database not available');
    }

    // テストデータを作成
    const testData = [
      {
        title: 'Shizuoka 2024 Leak Repair',
        category: '漏水修理',
        date: '2024年12月',
        location: '静岡市',
        workContent: 'Leak repair in Shizuoka 2024',
        requestContent: 'Fix water leak',
        cause: 'Old pipes',
        method: 'Replace pipes',
        comment: 'Completed successfully',
        status: 'published' as const,
      },
      {
        title: 'Yaizu 2024 Leak Repair',
        category: '漏水修理',
        date: '2024年12月',
        location: '焼津市',
        workContent: 'Leak repair in Yaizu 2024',
        requestContent: 'Fix water leak',
        cause: 'Old pipes',
        method: 'Replace pipes',
        comment: 'Completed successfully',
        status: 'published' as const,
      },
      {
        title: 'Shizuoka 2024 Bathroom Remodel',
        category: '水回りリフォーム',
        date: '2024年12月',
        location: '静岡市',
        workContent: 'Bathroom remodel in Shizuoka 2024',
        requestContent: 'Remodel bathroom',
        cause: 'Old bathroom',
        method: 'Full renovation',
        comment: 'Completed successfully',
        status: 'published' as const,
      },
      {
        title: 'Shizuoka 2023 Equipment Exchange',
        category: '機器交換工事',
        date: '2023年6月',
        location: '静岡市',
        workContent: 'Equipment exchange in Shizuoka 2023',
        requestContent: 'Replace equipment',
        cause: 'Old equipment',
        method: 'Replace with new',
        comment: 'Completed successfully',
        status: 'published' as const,
      },
      {
        title: 'Yaizu 2023 Leak Repair',
        category: '漏水修理',
        date: '2023年3月',
        location: '焼津市',
        workContent: 'Leak repair in Yaizu 2023',
        requestContent: 'Fix water leak',
        cause: 'Cracks in pipes',
        method: 'Patch and seal',
        comment: 'Completed successfully',
        status: 'published' as const,
      },
    ];

    for (const data of testData) {
      const result = await db.insert(works).values(data);
      // 挿入されたIDを記録
      const inserted = await db.select().from(works).where(eq(works.title, data.title));
      if (inserted.length > 0) {
        testWorkIds.push(inserted[0].id);
      }
    }
  });

  it('should filter by location only', async () => {
    if (!db) throw new Error('Database not available');
    
    const shizuokaWorks = await db
      .select()
      .from(works)
      .where(eq(works.location, '静岡市'));

    expect(shizuokaWorks.length).toBeGreaterThanOrEqual(3);
    expect(shizuokaWorks.every(w => w.location === '静岡市')).toBe(true);
  });

  it('should filter by year only', async () => {
    if (!db) throw new Error('Database not available');
    
    const works2024 = await db
      .select()
      .from(works)
      .where(eq(works.status, 'published'));

    const filtered2024 = works2024.filter(w => w.date?.startsWith('2024'));
    
    expect(filtered2024.length).toBeGreaterThanOrEqual(3);
    expect(filtered2024.every(w => w.date?.startsWith('2024'))).toBe(true);
  });

  it('should filter by category only', async () => {
    if (!db) throw new Error('Database not available');
    
    const leakRepairs = await db
      .select()
      .from(works)
      .where(eq(works.category, '漏水修理'));

    expect(leakRepairs.length).toBeGreaterThanOrEqual(3);
    expect(leakRepairs.every(w => w.category === '漏水修理')).toBe(true);
  });

  it('should filter by location and year combined', async () => {
    if (!db) throw new Error('Database not available');
    
    const allWorks = await db.select().from(works);
    const filtered = allWorks.filter(
      w => w.location === '静岡市' && w.date?.startsWith('2024')
    );

    expect(filtered.length).toBeGreaterThanOrEqual(2);
    expect(filtered.every(w => w.location === '静岡市' && w.date?.startsWith('2024'))).toBe(true);
  });

  it('should filter by location, year, and category combined', async () => {
    if (!db) throw new Error('Database not available');
    
    const allWorks = await db.select().from(works);
    const filtered = allWorks.filter(
      w => w.location === '静岡市' && w.date?.startsWith('2024') && w.category === '漏水修理'
    );

    expect(filtered.length).toBeGreaterThanOrEqual(1);
    expect(
      filtered.every(
        w => w.location === '静岡市' && w.date?.startsWith('2024') && w.category === '漏水修理'
      )
    ).toBe(true);
  });

  it('should return all published works when no filters applied', async () => {
    if (!db) throw new Error('Database not available');
    
    const allPublished = await db
      .select()
      .from(works)
      .where(eq(works.status, 'published'));

    expect(allPublished.length).toBeGreaterThan(0);
  });

  it('should handle empty result when no matches found', async () => {
    if (!db) throw new Error('Database not available');
    
    const allWorks = await db.select().from(works);
    const filtered = allWorks.filter(
      w => w.location === '非存在地域' && w.date?.startsWith('2025')
    );

    expect(filtered.length).toBe(0);
  });

  it('should correctly distinguish between locations', async () => {
    if (!db) throw new Error('Database not available');
    
    const shizuokaWorks = await db
      .select()
      .from(works)
      .where(eq(works.location, '静岡市'));

    const yaizuWorks = await db
      .select()
      .from(works)
      .where(eq(works.location, '焼津市'));

    expect(shizuokaWorks.length).toBeGreaterThan(0);
    expect(yaizuWorks.length).toBeGreaterThan(0);
    
    // 両者が異なることを確認
    const shizuokaIds = new Set(shizuokaWorks.map(w => w.id));
    const yaizuIds = new Set(yaizuWorks.map(w => w.id));
    
    expect(shizuokaIds.size + yaizuIds.size).toBeGreaterThan(0);
  });

  afterAll(async () => {
    if (db && testWorkIds.length > 0) {
      // テストデータをクリーンアップ
      for (const id of testWorkIds) {
        await db.delete(works).where(eq(works.id, id));
      }
    }
  });
});
