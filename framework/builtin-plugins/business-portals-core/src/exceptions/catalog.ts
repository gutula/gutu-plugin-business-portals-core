export const exceptionQueueDefinitions = [
  {
    "id": "portal-access-review",
    "label": "Portal Access Review",
    "severity": "medium",
    "owner": "portal-admin",
    "reconciliationJobId": "portals.reconciliation.run"
  },
  {
    "id": "self-service-action-failures",
    "label": "Self Service Action Failures",
    "severity": "medium",
    "owner": "portal-admin",
    "reconciliationJobId": "portals.reconciliation.run"
  },
  {
    "id": "portal-identity-link-review",
    "label": "Portal Identity Link Review",
    "severity": "medium",
    "owner": "portal-admin",
    "reconciliationJobId": "portals.reconciliation.run"
  }
] as const;
