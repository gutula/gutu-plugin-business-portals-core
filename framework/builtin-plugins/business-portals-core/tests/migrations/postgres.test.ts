import { describe, expect, it } from "bun:test";

import {
  buildBusinessPortalsCoreMigrationSql,
  buildBusinessPortalsCoreRollbackSql,
  getBusinessPortalsCoreLookupIndexName,
  getBusinessPortalsCoreStatusIndexName
} from "../../src/postgres";

describe("business-portals-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildBusinessPortalsCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS business_portals_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS business_portals_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS business_portals_core.exception_records");
    expect(sql).toContain(getBusinessPortalsCoreLookupIndexName());
    expect(sql).toContain(getBusinessPortalsCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildBusinessPortalsCoreRollbackSql({ schemaName: "business_portals_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS business_portals_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS business_portals_core_preview CASCADE");
  });
});
