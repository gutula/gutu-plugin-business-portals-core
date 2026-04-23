import { describe, expect, it } from "bun:test";

import {
  buildBusinessPortalsCoreSqliteMigrationSql,
  buildBusinessPortalsCoreSqliteRollbackSql,
  getBusinessPortalsCoreSqliteLookupIndexName,
  getBusinessPortalsCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("business-portals-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildBusinessPortalsCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS business_portals_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS business_portals_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS business_portals_core_exception_records");
    expect(sql).toContain(getBusinessPortalsCoreSqliteLookupIndexName("business_portals_core_"));
    expect(sql).toContain(getBusinessPortalsCoreSqliteStatusIndexName("business_portals_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildBusinessPortalsCoreSqliteRollbackSql({ tablePrefix: "business_portals_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS business_portals_core_preview_exception_records");
  });
});
