import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const readSource = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");

describe("コンバージョン計測と導線", () => {
  it("アクセス解析スキーマにイベント種別と導線ラベルを保持する", () => {
    const schema = readSource("drizzle/schema.ts");
    expect(schema).toContain('eventType: varchar("eventType"');
    expect(schema).toContain('eventLabel: varchar("eventLabel"');
  });

  it("CTAイベントを受け取る公開APIを定義する", () => {
    const routerSource = readSource("server/routers.ts");
    expect(routerSource).toContain('"phone_click"');
    expect(routerSource).toContain('"contact_submit"');
    expect(routerSource).toContain('"recruit_click"');
    expect(routerSource).toContain('inquiries: router({');
  });

  it("トップページの電話・フォーム・求人CTAが成果計測に接続される", () => {
    const homeSource = readSource("client/src/pages/Home.tsx");
    expect(homeSource).toContain('trackConversion("phone_click"');
    expect(homeSource).toContain('trackConversion("contact_submit"');
    expect(homeSource).toContain('trackConversion("recruit_click"');
  });

  it("事業内容リンクが詳細ページへ遷移し、主要サービスへの導線を提供する", () => {
    const homeSource = readSource("client/src/pages/Home.tsx");
    const headerSource = readSource("client/src/components/Header.tsx");
    const appSource = readSource("client/src/App.tsx");
    const businessSource = readSource("client/src/pages/Business.tsx");
    expect(headerSource).toContain("href: '/business'");
    expect(homeSource).toContain('href="/business"');
    expect(appSource).toContain('path={"/business"}');
    expect(businessSource).toContain("水漏れ・排水トラブル対応");
    expect(businessSource).toContain("水回りリフォーム");
    expect(businessSource).toContain("新築・増改築の給排水設備工事");
    expect(businessSource).toContain("設計・水道申請");
    expect(businessSource).toContain('trackConversion("phone_click"');
    expect(businessSource).toContain('trackConversion("contact_click"');
  });

  it("スマートフォン固定CTAが電話と見積もり相談を提供する", () => {
    const mobileCta = readSource("client/src/components/MobileConversionBar.tsx");
    expect(mobileCta).toContain('tel:0543482286');
    expect(mobileCta).toContain('/#contact');
    expect(mobileCta).toContain('md:hidden');
  });

  it("管理画面でコンバージョン数と導線別集計を表示する", () => {
    const dashboard = readSource("client/src/pages/admin/AnalyticsManagement.tsx");
    expect(dashboard).toContain('コンバージョン数');
    expect(dashboard).toContain('コンバージョン率');
    expect(dashboard).toContain('コンバージョン導線');
  });
});
