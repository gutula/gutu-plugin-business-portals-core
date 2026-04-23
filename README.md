# Business Portals Core

<p align="center">
  <img src="./docs/assets/gutu-mascot.png" alt="Gutu mascot" width="220" />
</p>

Customer, vendor, and employee self-service portal workspaces that project governed business records without taking ownership away from source plugins.

![Maturity: Hardened](https://img.shields.io/badge/Maturity-Hardened-2563eb) ![Verification: Build+Typecheck+Lint+Test+Contracts+Migrations+Integration](https://img.shields.io/badge/Verification-Build%2BTypecheck%2BLint%2BTest%2BContracts%2BMigrations%2BIntegration-2563eb) ![DB: postgres+sqlite](https://img.shields.io/badge/DB-postgres%2Bsqlite-2563eb) ![Integration Model: Actions+Resources+Jobs+Workflows+UI](https://img.shields.io/badge/Integration%20Model-Actions%2BResources%2BJobs%2BWorkflows%2BUI-2563eb)

## Part Of The Gutu Stack

| Aspect | Value |
| --- | --- |
| Repo kind | First-party plugin |
| Domain group | Content and Experience |
| Default category | Content & Experience / Portal Experience |
| Primary focus | self-service portals, business projections, portal actions |
| Best when | You need a governed domain boundary with explicit contracts and independent release cadence. |
| Composes through | Actions+Resources+Jobs+Workflows+UI |

- Gutu keeps plugins as independent repos with manifest-governed boundaries, compatibility channels, and verification lanes instead of hiding everything behind one giant mutable codebase.
- This plugin is meant to compose through explicit actions, resources, jobs, workflows, and runtime envelopes, not through undocumented hook chains.

## What It Does Now

Projects governed business records into customer, vendor, and employee self-service workspaces without taking ownership away from source plugins.

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

## Maturity

**Maturity Tier:** `Hardened`

This tier is justified because unit coverage exists, contract coverage exists, integration coverage exists, migration coverage exists, job definitions are exported, and workflow definitions are exported.

## Verified Capability Summary

- Domain group: **Content and Experience**
- Default category: **Content & Experience / Portal Experience**
- Verification surface: **Build+Typecheck+Lint+Test+Contracts+Migrations+Integration**
- Tests discovered: **5** total files across unit, contract, integration, migration lanes
- Integration model: **Actions+Resources+Jobs+Workflows+UI**
- Database support: **postgres + sqlite**

## Dependency And Compatibility Summary

| Field | Value |
| --- | --- |
| Package | `@plugins/business-portals-core` |
| Manifest ID | `business-portals-core` |
| Repo | [gutu-plugin-business-portals-core](https://github.com/gutula/gutu-plugin-business-portals-core) |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `workflow-core`, `portal-core`, `party-relationships-core`, `sales-core`, `support-service-core`, `contracts-core`, `traceability-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.portals`, `events.publish.portals` |
| Provided Capabilities | `portals.customer-workspaces`, `portals.vendor-workspaces`, `portals.employee-workspaces` |
| Runtime | bun>=1.3.12 |
| Database | postgres, sqlite |
| Integration Model | Actions+Resources+Jobs+Workflows+UI |

## Capability Matrix

| Surface | Count | Details |
| --- | --- | --- |
| Actions | 7 | `portals.customer-workspaces.publish`, `portals.portal-actions.capture`, `portals.employee-workspaces.publish`, `portals.customer-workspaces.hold`, `portals.customer-workspaces.release`, `portals.customer-workspaces.amend`, `portals.customer-workspaces.reverse` |
| Resources | 3 | `portals.customer-workspaces`, `portals.vendor-workspaces`, `portals.employee-workspaces` |
| Jobs | 2 | `portals.projections.refresh`, `portals.reconciliation.run` |
| Workflows | 1 | `business-portals-lifecycle` |
| UI | Present | base UI surface, admin contributions |
| Owned Entities | 4 | `Customer Workspace`, `Vendor Workspace`, `Employee Workspace`, `Portal Action Capture` |
| Reports | 3 | `Self-Service Activity Summary`, `Portal Adoption`, `Portal Exception Queue` |
| Exception Queues | 3 | `portal-access-review`, `self-service-action-failures`, `portal-identity-link-review` |
| Operational Scenarios | 3 | `customer-self-service`, `vendor-response-flow`, `employee-request-flow` |
| Settings Surfaces | 2 | `Portal Settings`, `Support Settings` |
| ERPNext Refs | 4 | `Portal`, `Support`, `Selling`, `Buying` |

## Quick Start For Integrators

Use this repo inside a **compatible Gutu workspace** or the **ecosystem certification workspace** so its `workspace:*` dependencies resolve honestly.

```bash
# from a compatible workspace that already includes this plugin's dependency graph
bun install
bun run build
bun run test
bun run docs:check
```

```ts
import { manifest, publishCustomerPortalAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/business-portals-core";

console.log(manifest.id);
console.log(publishCustomerPortalAction.id);
console.log(BusinessPrimaryResource.id);
```

Use the root repo scripts for day-to-day work **after the workspace is bootstrapped**, or run the nested package directly from `framework/builtin-plugins/business-portals-core` if you need lower-level control.

## Current Test Coverage

- Root verification scripts: `bun run build`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run test:contracts`, `bun run test:unit`, `bun run test:integration`, `bun run test:migrations`, `bun run docs:check`
- Unit files: 1
- Contracts files: 1
- Integration files: 1
- Migrations files: 2

## Known Boundaries And Non-Goals

- Not a monolithic website builder or headless-CMS replacement beyond the specific content surfaces exported here.
- Not a generic front-end framework; UI behavior remains bounded to the plugin’s declared resources and surfaces.
- Cross-plugin composition should use Gutu command, event, job, and workflow primitives. This repo should not be documented as exposing a generic WordPress-style hook system unless one is explicitly exported.

## Recommended Next Milestones

- Deepen portal-specific workflow and approval guidance as more business plugins expose self-service actions.
- Add stronger projection freshness and reconciliation diagnostics where portals become operationally critical.
- Deepen publishing, review, search, or portal flows where current resources and actions already suggest the next stable step.
- Add richer admin and operator guidance once the domain lifecycle hardens.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Portal`, `Issue`, `Quotation`.

## More Docs

See [DEVELOPER.md](./DEVELOPER.md), [TODO.md](./TODO.md), [SECURITY.md](./SECURITY.md), [CONTRIBUTING.md](./CONTRIBUTING.md). The internal domain sources used to build those docs live under:

- `plugins/gutu-plugin-business-portals-core/framework/builtin-plugins/business-portals-core/docs/AGENT_CONTEXT.md`
- `plugins/gutu-plugin-business-portals-core/framework/builtin-plugins/business-portals-core/docs/BUSINESS_RULES.md`
- `plugins/gutu-plugin-business-portals-core/framework/builtin-plugins/business-portals-core/docs/EDGE_CASES.md`
- `plugins/gutu-plugin-business-portals-core/framework/builtin-plugins/business-portals-core/docs/FLOWS.md`
- `plugins/gutu-plugin-business-portals-core/framework/builtin-plugins/business-portals-core/docs/GLOSSARY.md`
- `plugins/gutu-plugin-business-portals-core/framework/builtin-plugins/business-portals-core/docs/MANDATORY_STEPS.md`
