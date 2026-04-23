import { describe, expect, it } from "bun:test";
import { domainCatalog } from "../../src/domain/catalog";
import { exceptionQueueDefinitions } from "../../src/exceptions/catalog";
import { businessFlowDefinitions, publishCustomerPortal, capturePortalAction, publishEmployeePortal, placeRecordOnHold, releaseRecordHold, amendRecord, reverseRecord } from "../../src/flows/catalog";
import { reportDefinitions } from "../../src/reports/catalog";
import { scenarioDefinitions } from "../../src/scenarios/catalog";
import { settingsSurfaceDefinitions } from "../../src/settings/catalog";
import manifest from "../../package";

describe("plugin manifest", () => {
  it("keeps a stable package id and business contract surface", () => {
    expect(manifest.id).toBe("business-portals-core");
    expect(manifest.kind).toBe("plugin");
    expect(manifest.publicCommands).toContain("portals.customer-workspaces.publish");
    expect(manifest.publicEvents).toContain("portals.workspace-published.v1");
  });
});

describe("domain catalog", () => {
  it("keeps ERPNext parity references and operational surfaces visible", () => {
    expect(domainCatalog.ownedEntities.length).toBeGreaterThan(0);
    expect(domainCatalog.reports.length).toBeGreaterThan(0);
    expect(domainCatalog.exceptionQueues.length).toBeGreaterThan(0);
    expect(domainCatalog.operationalScenarios.length).toBeGreaterThan(0);
    expect(reportDefinitions).toHaveLength(domainCatalog.reports.length);
    expect(exceptionQueueDefinitions).toHaveLength(domainCatalog.exceptionQueues.length);
    expect(scenarioDefinitions).toHaveLength(domainCatalog.operationalScenarios.length);
    expect(settingsSurfaceDefinitions).toHaveLength(domainCatalog.settingsSurfaces.length);
    expect(businessFlowDefinitions).toHaveLength(manifest.publicCommands.length);
    expect(typeof publishCustomerPortal).toBe("function");
    expect(typeof capturePortalAction).toBe("function");
    expect(typeof publishEmployeePortal).toBe("function");
    expect(typeof placeRecordOnHold).toBe("function");
    expect(typeof releaseRecordHold).toBe("function");
    expect(typeof amendRecord).toBe("function");
    expect(typeof reverseRecord).toBe("function");
  });
});
