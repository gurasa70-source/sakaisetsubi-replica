import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb } from './db';
import { works } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

describe('works.filter', () => {
  let db: Awaited<ReturnType<typeof getDb>>;

  beforeAll(async () => {
    db = await getDb();
    if (!db) {
      throw new Error('Database not available');
    }
  });

  it('should filter works by location', async () => {
    if (!db) throw new Error('Database not available');
    
    // テストデータを作成
    await db.insert(works).values({
      title: 'Test Work - Shizuoka',
      category: '漏水修理',
      date: '2024年12月',
      location: '静岡市',
      workContent: 'Test content',
      requestContent: 'Test request',
      cause: 'Test cause',
      method: 'Test method',
      comment: 'Test comment',
      status: 'published',
    });

    await db.insert(works).values({
      title: 'Test Work - Yaizu',
      category: '漏水修理',
      date: '2024年12月',
      location: '焼津市',
      workContent: 'Test content',
      requestContent: 'Test request',
      cause: 'Test cause',
      method: 'Test method',
      comment: 'Test comment',
      status: 'published',
    });

    // 静岡市の施工実績を取得
    const shizuokaWorks = await db
      .select()
      .from(works)
      .where(eq(works.location, '静岡市'));

    expect(shizuokaWorks.length).toBeGreaterThan(0);
    expect(shizuokaWorks.every(w => w.location === '静岡市')).toBe(true);
  });

  it('should have location field in works table', async () => {
    if (!db) throw new Error('Database not available');
    
    const result = await db.select().from(works).limit(1);
    
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('location');
    }
  });

  afterAll(async () => {
    if (db) {
      // テストデータをクリーンアップ
      await db.delete(works).where(eq(works.title, 'Test Work - Shizuoka'));
      await db.delete(works).where(eq(works.title, 'Test Work - Yaizu'));
    }
  });
});
