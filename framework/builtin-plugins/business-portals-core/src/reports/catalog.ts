export const reportDefinitions = [
  {
    "id": "business-portals-core.report.01",
    "label": "Self-Service Activity Summary",
    "owningPlugin": "business-portals-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "portal-access-review",
      "self-service-action-failures",
      "portal-identity-link-review"
    ]
  },
  {
    "id": "business-portals-core.report.02",
    "label": "Portal Adoption",
    "owningPlugin": "business-portals-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "portal-access-review",
      "self-service-action-failures",
      "portal-identity-link-review"
    ]
  },
  {
    "id": "business-portals-core.report.03",
    "label": "Portal Exception Queue",
    "owningPlugin": "business-portals-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "portal-access-review",
      "self-service-action-failures",
      "portal-identity-link-review"
    ]
  }
] as const;
