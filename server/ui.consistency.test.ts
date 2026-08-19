import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const readSource = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");

const publicUiFiles = [
  "client/src/pages/Home.tsx",
  "client/src/pages/Works.tsx",
  "client/src/pages/Blog.tsx",
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
});
