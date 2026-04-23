import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "business-portals-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-business-portals-core",
  "displayName": "Business Portals Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "content_experience",
    "label": "Content & Experience",
    "subcategoryId": "portal_experience",
    "subcategoryLabel": "Portal Experience"
  },
  "description": "Customer, vendor, and employee self-service portal workspaces that project governed business records without taking ownership away from source plugins.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "workflow-core",
    "portal-core",
    "party-relationships-core",
    "sales-core",
    "support-service-core",
    "contracts-core",
    "traceability-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Business Portals Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Business Portals Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Business Portals Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Business Portals Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "portal-core",
      "class": "required",
      "rationale": "Required for Business Portals Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "party-relationships-core",
      "class": "required",
      "rationale": "Required for Business Portals Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "sales-core",
      "class": "required",
      "rationale": "Required for Business Portals Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "support-service-core",
      "class": "required",
      "rationale": "Required for Business Portals Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "contracts-core",
      "class": "required",
      "rationale": "Required for Business Portals Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "traceability-core",
      "class": "required",
      "rationale": "Required for Business Portals Core to keep its boundary governed and explicit."
    }
  ],
  "optionalWith": [],
  "conflictsWith": [],
  "providesCapabilities": [
    "portals.customer-workspaces",
    "portals.vendor-workspaces",
    "portals.employee-workspaces"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.portals",
    "events.publish.portals"
  ],
  "ownsData": [
    "portals.customer-workspaces",
    "portals.vendor-workspaces",
    "portals.employee-workspaces",
    "portals.portal-actions"
  ],
  "extendsData": [],
  "publicCommands": [
    "portals.customer-workspaces.publish",
    "portals.portal-actions.capture",
    "portals.employee-workspaces.publish"
  ],
  "publicQueries": [
    "portals.workspace-summary",
    "portals.self-service-summary"
  ],
  "publicEvents": [
    "portals.workspace-published.v1",
    "portals.portal-action-captured.v1",
    "portals.self-service-updated.v1"
  ],
  "domainCatalog": {
    "erpnextModules": [
      "Portal",
      "Support",
      "Selling",
      "Buying"
    ],
    "erpnextDoctypes": [
      "Portal",
      "Issue",
      "Quotation",
      "Request for Quotation"
    ],
    "ownedEntities": [
      "Customer Workspace",
      "Vendor Workspace",
      "Employee Workspace",
      "Portal Action Capture"
    ],
    "reports": [
      "Self-Service Activity Summary",
      "Portal Adoption",
      "Portal Exception Queue"
    ],
    "exceptionQueues": [
      "portal-access-review",
      "self-service-action-failures",
      "portal-identity-link-review"
    ],
    "operationalScenarios": [
      "customer-self-service",
      "vendor-response-flow",
      "employee-request-flow"
    ],
    "settingsSurfaces": [
      "Portal Settings",
      "Support Settings"
    ],
    "edgeCases": [
      "expired shared access",
      "cross-role portal identity conflicts",
      "portal action replay"
    ]
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
