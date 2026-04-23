import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "portals.customer-workspaces.publish",
    "label": "Publish Customer Portal",
    "phase": "create",
    "methodName": "publishCustomerPortal"
  },
  {
    "id": "portals.portal-actions.capture",
    "label": "Capture Portal Action",
    "phase": "advance",
    "methodName": "capturePortalAction"
  },
  {
    "id": "portals.employee-workspaces.publish",
    "label": "Publish Employee Portal",
    "phase": "reconcile",
    "methodName": "publishEmployeePortal"
  }
] as const;

export async function publishCustomerPortal(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function capturePortalAction(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function publishEmployeePortal(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}
