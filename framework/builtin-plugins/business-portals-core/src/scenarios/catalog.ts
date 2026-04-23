export const scenarioDefinitions = [
  {
    "id": "customer-self-service",
    "owningPlugin": "business-portals-core",
    "workflowId": "business-portals-lifecycle",
    "actionIds": [
      "portals.customer-workspaces.publish",
      "portals.portal-actions.capture",
      "portals.employee-workspaces.publish"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "sales.quotes.create",
        "support.tickets.create"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "vendor-response-flow",
    "owningPlugin": "business-portals-core",
    "workflowId": "business-portals-lifecycle",
    "actionIds": [
      "portals.customer-workspaces.publish",
      "portals.portal-actions.capture",
      "portals.employee-workspaces.publish"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "sales.quotes.create",
        "support.tickets.create"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "employee-request-flow",
    "owningPlugin": "business-portals-core",
    "workflowId": "business-portals-lifecycle",
    "actionIds": [
      "portals.customer-workspaces.publish",
      "portals.portal-actions.capture",
      "portals.employee-workspaces.publish"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "sales.quotes.create",
        "support.tickets.create"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
