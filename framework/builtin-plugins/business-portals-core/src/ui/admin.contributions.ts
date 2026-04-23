import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "business-portals",
      label: "Business Portals",
      icon: "monitor-smartphone",
      description: "Self-service workspaces for customers, vendors, and employees.",
      permission: "portals.customer-workspaces.read",
      homePath: "/admin/business/portals",
      quickActions: ["business-portals-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "business-portals",
      group: "control-room",
      items: [
        {
          id: "business-portals-core.overview",
          label: "Control Room",
          icon: "monitor-smartphone",
          to: "/admin/business/portals",
          permission: "portals.customer-workspaces.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "business-portals-core.page",
      kind: "dashboard",
      route: "/admin/business/portals",
      label: "Business Portals Control Room",
      workspace: "business-portals",
      group: "control-room",
      permission: "portals.customer-workspaces.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "business-portals-core.open.control-room",
      label: "Open Business Portals Core",
      permission: "portals.customer-workspaces.read",
      href: "/admin/business/portals",
      keywords: ["business portals core","business portals","business"]
    })
  ]
};
