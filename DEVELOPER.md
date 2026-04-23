# Business Portals Core Developer Guide

Customer, vendor, and employee self-service portal workspaces that project governed business records without taking ownership away from source plugins.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Projects governed business records into customer, vendor, and employee self-service workspaces without taking ownership away from source plugins.

### This plugin is the right fit when

- You need **self-service portals**, **business projections**, **portal actions** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a monolithic website builder or headless-CMS replacement beyond the specific content surfaces exported here.
- Not a generic front-end framework; UI behavior remains bounded to the plugin’s declared resources and surfaces.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/business-portals-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/business-portals-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/business-portals-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/business-portals-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/business-portals-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/business-portals-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/business-portals-core` |
| Manifest ID | `business-portals-core` |
| Display Name | Business Portals Core |
| Domain Group | Content and Experience |
| Default Category | Content & Experience / Portal Experience |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `workflow-core`, `portal-core`, `party-relationships-core`, `sales-core`, `support-service-core`, `contracts-core`, `traceability-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.portals`, `events.publish.portals` |
| Provides Capabilities | `portals.customer-workspaces`, `portals.vendor-workspaces`, `portals.employee-workspaces` |
| Owns Data | `portals.customer-workspaces`, `portals.vendor-workspaces`, `portals.employee-workspaces`, `portals.portal-actions` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `portals.customer-workspaces.publish` | Permission: `portals.customer-workspaces.write` | Publish Customer Portal<br>Idempotent<br>Audited |
| Action | `portals.portal-actions.capture` | Permission: `portals.portal-actions.write` | Capture Portal Action<br>Non-idempotent<br>Audited |
| Action | `portals.employee-workspaces.publish` | Permission: `portals.employee-workspaces.write` | Publish Employee Portal<br>Non-idempotent<br>Audited |
| Resource | `portals.customer-workspaces` | Portal disabled | Customer-facing portal workspace definitions and projection rules.<br>Purpose: Expose customer self-service without making the portal the source of business truth.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `portals.vendor-workspaces` | Portal disabled | Vendor and supplier portal workspace definitions.<br>Purpose: Support supplier-facing workflows while preserving procurement ownership.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `portals.employee-workspaces` | Portal disabled | Employee self-service portal workspace definitions and actions.<br>Purpose: Project HR-safe self-service experiences without bypassing workforce governance.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `portals.projections.refresh` | `portals-projections` | Retry policy not declared | No timeout declared |
| `portals.reconciliation.run` | `portals-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `business-portals-lifecycle` | `portal-admin`, `ops`, `approver` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep portal activity explicit and governable without leaking ownership away from source plugins. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `portals.projections.refresh`, `portals.reconciliation.run`.
- Workflow surface: `business-portals-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/business-portals-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/business-portals-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["portals.customer-workspaces.publish"]
  action --> validation["Schema + permission guard"]
  validation --> service["Business Portals Core service layer"]
  service --> state["portals.customer-workspaces"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, createPrimaryRecordAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/business-portals-core";

export const pluginSurface = {
  manifest,
  createPrimaryRecordAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, createPrimaryRecordAction } from "@plugins/business-portals-core";

console.log("plugin", manifest.id);
console.log("action", createPrimaryRecordAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

- Exports 3 governed actions: `portals.customer-workspaces.publish`, `portals.portal-actions.capture`, `portals.employee-workspaces.publish`.
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

### Current gaps

- Repo-local documentation verification entrypoints were missing before this pass and need to stay green as the repo evolves.

### Recommended next

- Deepen portal-specific workflow and approval guidance as more business plugins expose self-service actions.
- Add stronger projection freshness and reconciliation diagnostics where portals become operationally critical.
- Deepen publishing, review, search, or portal flows where current resources and actions already suggest the next stable step.
- Add richer admin and operator guidance once the domain lifecycle hardens.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Portal`, `Issue`, `Quotation`.

### Later / optional

- Advanced authoring, public delivery, and analytics extensions after the core content contracts prove stable.
