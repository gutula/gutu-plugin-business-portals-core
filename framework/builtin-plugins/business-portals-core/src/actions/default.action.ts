import { defineAction } from "@platform/schema";
import { z } from "zod";

import {
  createPrimaryRecord,
  advancePrimaryRecord,
  reconcilePrimaryRecord,
  placePrimaryRecordOnHold,
  releasePrimaryRecordHold,
  amendPrimaryRecord,
  reversePrimaryRecord
} from "../services/main.service";
import {
  approvalStateSchema,
  fulfillmentStateSchema,
  postingStateSchema,
  recordStateSchema,
  createPrimaryRecordInputSchema,
  advancePrimaryRecordInputSchema,
  reconcilePrimaryRecordInputSchema,
  placePrimaryRecordOnHoldInputSchema,
  releasePrimaryRecordHoldInputSchema,
  amendPrimaryRecordInputSchema,
  reversePrimaryRecordInputSchema
} from "../model";

export const publishCustomerPortalAction = defineAction({
  id: "portals.customer-workspaces.publish",
  description: "Publish Customer Portal",
  input: createPrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    recordState: recordStateSchema,
    approvalState: approvalStateSchema,
    postingState: postingStateSchema,
    fulfillmentState: fulfillmentStateSchema,
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "portals.customer-workspaces.write",
  idempotent: true,
  audit: true,
  handler: ({ input }) => createPrimaryRecord(input)
});

export const capturePortalActionAction = defineAction({
  id: "portals.portal-actions.capture",
  description: "Capture Portal Action",
  input: advancePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    recordState: recordStateSchema,
    approvalState: approvalStateSchema,
    postingState: postingStateSchema,
    fulfillmentState: fulfillmentStateSchema,
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "portals.portal-actions.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => advancePrimaryRecord(input)
});

export const publishEmployeePortalAction = defineAction({
  id: "portals.employee-workspaces.publish",
  description: "Publish Employee Portal",
  input: reconcilePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    exceptionId: z.string(),
    status: z.enum(["open", "under-review", "resolved", "closed"]),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "portals.employee-workspaces.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => reconcilePrimaryRecord(input)
});

export const placeRecordOnHoldAction = defineAction({
  id: "portals.customer-workspaces.hold",
  description: "Place Record On Hold",
  input: placePrimaryRecordOnHoldInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    status: z.enum(["open", "under-review", "resolved", "closed"]),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "portals.customer-workspaces.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => placePrimaryRecordOnHold(input)
});

export const releaseRecordHoldAction = defineAction({
  id: "portals.customer-workspaces.release",
  description: "Release Record Hold",
  input: releasePrimaryRecordHoldInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    status: z.enum(["open", "under-review", "resolved", "closed"]),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "portals.customer-workspaces.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => releasePrimaryRecordHold(input)
});

export const amendRecordAction = defineAction({
  id: "portals.customer-workspaces.amend",
  description: "Amend Record",
  input: amendPrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    amendedRecordId: z.string(),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "portals.customer-workspaces.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => amendPrimaryRecord(input)
});

export const reverseRecordAction = defineAction({
  id: "portals.customer-workspaces.reverse",
  description: "Reverse Record",
  input: reversePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    reversalRecordId: z.string(),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "portals.customer-workspaces.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => reversePrimaryRecord(input)
});

export const businessActions = [
  publishCustomerPortalAction,
  capturePortalActionAction,
  publishEmployeePortalAction,
  placeRecordOnHoldAction,
  releaseRecordHoldAction,
  amendRecordAction,
  reverseRecordAction
] as const;
