# Business Portals Core Flows

## Happy paths

- `portals.customer-workspaces.publish`: Publish Customer Portal
- `portals.portal-actions.capture`: Capture Portal Action
- `portals.employee-workspaces.publish`: Publish Employee Portal

## Operational scenario matrix

- `customer-self-service`
- `vendor-response-flow`
- `employee-request-flow`

## Action-level flows

### `portals.customer-workspaces.publish`

Publish Customer Portal

Permission: `portals.customer-workspaces.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s idempotent semantics.

Side effects:

- Mutates or validates state owned by `portals.customer-workspaces`, `portals.vendor-workspaces`, `portals.employee-workspaces`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `portals.portal-actions.capture`

Capture Portal Action

Permission: `portals.portal-actions.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `portals.customer-workspaces`, `portals.vendor-workspaces`, `portals.employee-workspaces`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `portals.employee-workspaces.publish`

Publish Employee Portal

Permission: `portals.employee-workspaces.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `portals.customer-workspaces`, `portals.vendor-workspaces`, `portals.employee-workspaces`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


## Cross-package interactions

- Direct dependencies: `auth-core`, `org-tenant-core`, `role-policy-core`, `workflow-core`, `portal-core`, `party-relationships-core`, `sales-core`, `support-service-core`, `contracts-core`, `traceability-core`
- Requested capabilities: `ui.register.admin`, `api.rest.mount`, `data.write.portals`, `events.publish.portals`
- Integration model: Actions+Resources+Jobs+Workflows+UI
- ERPNext doctypes used as parity references: `Portal`, `Issue`, `Quotation`, `Request for Quotation`
- Recovery ownership should stay with the host orchestration layer when the plugin does not explicitly export jobs, workflows, or lifecycle events.
