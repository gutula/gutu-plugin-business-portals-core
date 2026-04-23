export const domainCatalog = {
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
} as const;
