"use client";

import ActiveLink from "@/components/active-link";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="mt-14">
      <ActiveLink
        activeClassName="active-sidebar-item"
        href="/dashboard/boards"
        className="sidebar-item"
      >
        Boards
      </ActiveLink>
      <ActiveLink
        activeClassName="active-sidebar-item"
        href="/dashboard/activity"
        className="sidebar-item"
      >
        Activity
      </ActiveLink>
      <ActiveLink
        activeClassName="active-sidebar-item"
        href="/dashboard/settings"
        className="sidebar-item"
      >
        Settings
      </ActiveLink>
    </aside>
  );
}
