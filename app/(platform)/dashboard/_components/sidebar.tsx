"use client";

import ActiveLink from "@/components/active-link";
import { Activity, Layout, Settings } from "lucide-react";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="mt-14">
      <ActiveLink
        activeClassName="active-sidebar-item"
        href="/dashboard/boards"
        className="sidebar-item"
      >
        <Layout className="sidebar-item-icon" />
        Boards
      </ActiveLink>
      <ActiveLink
        activeClassName="active-sidebar-item"
        href="/dashboard/activity"
        className="sidebar-item"
      >
        <Activity className="sidebar-item-icon" />
        Activity
      </ActiveLink>
      <ActiveLink
        activeClassName="active-sidebar-item"
        href="/dashboard/settings"
        className="sidebar-item"
      >
        <Settings className="sidebar-item-icon" />
        Settings
      </ActiveLink>
    </aside>
  );
}
