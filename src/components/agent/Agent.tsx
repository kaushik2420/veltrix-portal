"use client";

import React from "react";
import { resolvedMode } from "../../lib/salesforce";
import { SalesforceMessaging } from "./SalesforceMessaging";
import { CustomSnippet } from "./CustomSnippet";
import { DemoAssistant } from "./DemoAssistant";

/**
 * One place that decides which agent the portal shows.
 *
 *   messaging → your real Agentforce / Embedded Messaging deployment
 *   custom    → whatever snippet you pasted into CustomSnippet.tsx
 *   demo      → the built-in local assistant (default)
 *
 * See src/lib/salesforce.ts and the /setup page.
 */
export function Agent() {
  const mode = resolvedMode();
  if (mode === "messaging") return <SalesforceMessaging />;
  if (mode === "custom") return <CustomSnippet />;
  return <DemoAssistant />;
}
