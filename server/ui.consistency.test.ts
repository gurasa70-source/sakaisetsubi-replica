import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const readSource = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");

const publicUiFiles = [
  "client/src/pages/Home.tsx",
  "client/src/pages/Works.tsx",
  "client/src/pages/works/WorkDetail.tsx",
  "client/src/pages/Blog.tsx",
  "client/src/pages/BlogDetail.tsx",
  "client/src/pages/BathroomReform.tsx",
  "client/src/pages/LeakRepair.tsx",
  "client/src/pages/NewConstructionPlumbing.tsx",
  "client/src/pages/Corporate.tsx",
  "client/src/pages/Business.tsx",
  "client/src/components/Header.tsx",
  "client/src/components/ServiceIcon.tsx",
  "client/src/pages/services/LeakRepairService.tsx",
  "client/src/pages/services/RemodelService.tsx",
  "client/src/pages/services/EquipmentService.tsx",
  "client/src/pages/services/NewConstructionService.tsx",
  "client/src/pages/services/SewerService.tsx",
  "client/src/pages/services/WaterTapService.tsx",
  "client/src/pages/services/DesignService.tsx",
  "client/src/index.css",
  "client/src/pages/admin/WorksManagement.tsx",
  "client/src/pages/admin/DesignProjectsManagement.tsx",
  "client/src/pages/admin/BlogManagement.tsx",
];

describe("public UI consistency", () => {
  it("does not include the retired emoji or text-arrow UI markers", () => {
    const source = publicUiFiles.map(readSource).join("\n");
    expect(source).not.toMatch(/[📋💬👥📨📍🛠️🧰🚰🔩📝🏠🏢🛣⚙️✓→📞📧💧🔧🛁🏗🔄✅⚠☎✉⭐★]/u);
  });

  it("keeps service categories mapped to named SVG icon variants", () => {
    const works = readSource("client/src/pages/Works.tsx");
    const home = readSource("client/src/pages/Home.tsx");
    const iconNames = ["leak", "reform", "equipment", "new-construction", "sewer", "water-tap"];

    for (const iconName of iconNames) {
      expect(works).toContain(`'${iconName}' as ServiceIconName`);
    }
    expect(home).toContain('icon: "leak" as ServiceIconName');
    expect(home).toContain('icon: "reform" as ServiceIconName');
    expect(home).toContain('icon: "new-construction" as ServiceIconName');
  });

  it("keeps inquiry and recruitment conversion links present", () => {
    const home = readSource("client/src/pages/Home.tsx");
    const serviceSources = [
      "client/src/pages/services/LeakRepairService.tsx",
      "client/src/pages/services/RemodelService.tsx",
      "client/src/pages/services/EquipmentService.tsx",
      "client/src/pages/services/NewConstructionService.tsx",
      "client/src/pages/services/SewerService.tsx",
      "client/src/pages/services/WaterTapService.tsx",
    ].map(readSource).join("\\n");

    expect(home).toContain('href="/#contact"');
    expect(home).toContain("sakaisetsubi-rct.com");
    expect(serviceSources).toContain('href="/contact"');
    expect(serviceSources).toContain("tel:054-348-2286");
  });

  it("uses the clean blue and navy palette in public page sources", () => {
    const source = publicUiFiles.map(readSource).join("\n");
    expect(source).not.toMatch(/purple|green-|red-|#5B5FDE|#FF4444/u);
    expect(source).toMatch(/#0052CC|blue-|slate-/u);
  });

  it("uses a transparent estimate-request flow without free-price claims", () => {
    const source = publicUiFiles.map(readSource).join("\n");
    const business = readSource("client/src/pages/Business.tsx");

    expect(source).not.toMatch(/無料|無償|0円|ぼったく/u);
    expect(business).toContain("お見積もりをご希望の場合は");
    expect(business).toContain("お見積もり内容にご納得いただいたうえで施工");
  });

  it("routes every internal anchor through the shared faucet loading handler", () => {
    const app = readSource("client/src/App.tsx");
    const header = readSource("client/src/components/Header.tsx");
    const navigationLoading = readSource("client/src/components/InternalNavigationLoading.tsx");

    expect(app).toContain("<InternalNavigationLoading />");
    expect(navigationLoading).toContain('document.addEventListener("click", handleDocumentClick, true)');
    expect(navigationLoading).toContain("event.preventDefault()");
    expect(navigationLoading).toContain("showLoadingForTransition()");
    expect(navigationLoading).toContain("destination.origin !== window.location.origin");
    expect(navigationLoading).toContain("rawHref.startsWith(\"#\")");
    expect(header).not.toContain("useLoading");
  });

  it("shows the practical sewer-switching duration range", () => {
    const sewerService = readSource("client/src/pages/services/SewerService.tsx");

    expect(sewerService).toContain("簡易な工事は最短1日");
    expect(sewerService).toContain("5日程度が目安です");
  });

  it("avoids forced headline breaks and keeps call-to-action text responsive", () => {
    const home = readSource("client/src/pages/Home.tsx");
    const business = readSource("client/src/pages/Business.tsx");
    const works = readSource("client/src/pages/Works.tsx");
    const corporate = readSource("client/src/pages/Corporate.tsx");
    const globalStyles = readSource("client/src/index.css");

    expect(home).toContain("text-balance");
    expect(home).toContain("w-full max-w-xl flex-col");
    expect(home).toContain("max-w-[calc(100vw-2rem)]");
    expect(home).toContain("titleParts");
    expect(home).toContain("<wbr />");
    expect(business).not.toContain("水回りの困りごとから<br");
    expect(works).not.toContain("堺設備の<br");
    expect(corporate).not.toContain("一般住宅から公共工事まで<br");
    expect(globalStyles).toContain("text-wrap: balance");
    expect(globalStyles).toContain("text-wrap: pretty");
  });

  it("keeps every service-page hero readable and stacks its primary CTA on narrow screens", () => {
    const serviceSources = [
      "client/src/pages/services/LeakRepairService.tsx",
      "client/src/pages/services/RemodelService.tsx",
      "client/src/pages/services/EquipmentService.tsx",
      "client/src/pages/services/NewConstructionService.tsx",
      "client/src/pages/services/SewerService.tsx",
      "client/src/pages/services/WaterTapService.tsx",
    ].map(readSource);

    for (const source of serviceSources) {
      expect(source).toContain("text-4xl font-bold");
      expect(source).toContain("text-balance");
      expect(source).toContain("text-pretty");
      expect(source).toContain("flex flex-col items-stretch gap-3 sm:flex-row");
      expect(source).not.toContain('className="flex gap-4"');
    }
  });

  it("keeps the design and legacy service pages responsive as well", () => {
    const design = readSource("client/src/pages/services/DesignService.tsx");
    const bathroom = readSource("client/src/pages/BathroomReform.tsx");
    const leakRepair = readSource("client/src/pages/LeakRepair.tsx");

    expect(design).toContain("text-balance");
    expect(design).toContain("flex flex-col items-stretch gap-3 sm:flex-row");
    expect(design).toContain("w-full bg-white");
    expect(design).not.toContain("<br");
    expect(design).not.toContain("break-all");
    expect(bathroom).toContain("text-balance");
    expect(bathroom).toContain("flex flex-col items-stretch gap-3 sm:flex-row");
    expect(leakRepair).toContain("text-balance");
    expect(leakRepair).toContain("flex flex-col items-stretch gap-3 sm:flex-row");
    const newConstructionLegacy = readSource("client/src/pages/NewConstructionPlumbing.tsx");
    expect(newConstructionLegacy).toContain("text-balance");
    expect(newConstructionLegacy).toContain("flex flex-col items-stretch gap-3 sm:flex-row");
  });

  it("keeps public work and article detail pages readable on narrow screens", () => {
    const workDetail = readSource("client/src/pages/works/WorkDetail.tsx");
    const blog = readSource("client/src/pages/Blog.tsx");
    const blogDetail = readSource("client/src/pages/BlogDetail.tsx");

    expect(workDetail).toContain("break-keep text-balance text-white sm:text-5xl md:text-6xl");
    expect(workDetail).toContain("flex flex-col items-stretch gap-3 sm:flex-row");
    expect(workDetail).not.toMatch(/purple-|📞|📧|📋|💬|🔍|🔧|📸/u);
    expect(blog).toContain("text-balance sm:text-4xl md:text-5xl");
    expect(blogDetail).toContain("text-balance sm:text-4xl md:text-5xl");
  });

  it("does not leave fixed line-break tags or break-all in public page sources", () => {
    const source = publicUiFiles.map(readSource).join("\n");

    expect(source).not.toContain("<br");
    expect(source).not.toContain("break-all");
  });

  it("uses the menu at tablet widths before header labels can wrap", () => {
    const header = readSource("client/src/components/Header.tsx");

    expect(header).toContain('className="lg:hidden"');
    expect(header).toContain('className="hidden lg:flex gap-8"');
    expect(header).toContain('className="lg:hidden bg-white border-t"');
  });
});
