# Business Portals Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

- Exports 7 governed actions: `portals.customer-workspaces.publish`, `portals.portal-actions.capture`, `portals.employee-workspaces.publish`, `portals.customer-workspaces.hold`, `portals.customer-workspaces.release`, `portals.customer-workspaces.amend`, `portals.customer-workspaces.reverse`.
- Owns 3 resource contracts: `portals.customer-workspaces`, `portals.vendor-workspaces`, `portals.employee-workspaces`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 4 owned entity surface(s): `Customer Workspace`, `Vendor Workspace`, `Employee Workspace`, `Portal Action Capture`.
- Carries 3 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `Portal`, `Support`, `Selling`, `Buying`.
- Operational scenario matrix includes `customer-self-service`, `vendor-response-flow`, `employee-request-flow`.
- Governs 2 settings or policy surface(s) for operator control and rollout safety.

## Current Gaps

- No additional gaps were identified beyond the plugin’s stated non-goals.

## Recommended Next

- Deepen portal-specific workflow and approval guidance as more business plugins expose self-service actions.
- Add stronger projection freshness and reconciliation diagnostics where portals become operationally critical.
- Deepen publishing, review, search, or portal flows where current resources and actions already suggest the next stable step.
- Add richer admin and operator guidance once the domain lifecycle hardens.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Portal`, `Issue`, `Quotation`.

## Later / Optional

- Advanced authoring, public delivery, and analytics extensions after the core content contracts prove stable.
