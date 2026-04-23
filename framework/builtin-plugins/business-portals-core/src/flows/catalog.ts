import {
  advancePrimaryRecord,
  amendPrimaryRecord,
  createPrimaryRecord,
  placePrimaryRecordOnHold,
  reconcilePrimaryRecord,
  releasePrimaryRecordHold,
  reversePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type AmendPrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type PlacePrimaryRecordOnHoldInput,
  type ReconcilePrimaryRecordInput,
  type ReleasePrimaryRecordHoldInput,
  type ReversePrimaryRecordInput
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
  },
  {
    "id": "portals.customer-workspaces.hold",
    "label": "Place Record On Hold",
    "phase": "hold",
    "methodName": "placeRecordOnHold"
  },
  {
    "id": "portals.customer-workspaces.release",
    "label": "Release Record Hold",
    "phase": "release",
    "methodName": "releaseRecordHold"
  },
  {
    "id": "portals.customer-workspaces.amend",
    "label": "Amend Record",
    "phase": "amend",
    "methodName": "amendRecord"
  },
  {
    "id": "portals.customer-workspaces.reverse",
    "label": "Reverse Record",
    "phase": "reverse",
    "methodName": "reverseRecord"
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

export async function placeRecordOnHold(input: PlacePrimaryRecordOnHoldInput) {
  return placePrimaryRecordOnHold(input);
}

export async function releaseRecordHold(input: ReleasePrimaryRecordHoldInput) {
  return releasePrimaryRecordHold(input);
}

export async function amendRecord(input: AmendPrimaryRecordInput) {
  return amendPrimaryRecord(input);
}

export async function reverseRecord(input: ReversePrimaryRecordInput) {
  return reversePrimaryRecord(input);
}
