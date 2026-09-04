/* ==================================================================== *
 *  SALESFORCE AGENT INJECTION POINT
 *  --------------------------------------------------------------------
 *  This is where you wire your Salesforce Agentforce / Embedded Service
 *  messaging deployment into the portal. Nothing here is secret — every
 *  value below is designed to be public and is safe in a client bundle.
 *
 *  Set them as environment variables in Vercel
 *  (Project → Settings → Environment Variables), or drop them into a
 *  local `.env.local` file while you're testing. See /setup in the
 *  running app for a click-by-click guide to finding each value.
 *
 *  If nothing is configured, the portal falls back to a clearly-labelled
 *  built-in demo assistant so the site is never broken on stage.
 * ==================================================================== */

export type AgentMode = "messaging" | "custom" | "demo";

const env = (k: string) => (process.env[k] ?? "").trim();

export const SF = {
  /**
   * "messaging" — Agentforce / Messaging for In-App and Web  (recommended)
   * "custom"    — you pasted your own snippet into
   *               src/components/agent/CustomSnippet.tsx
   * "demo"      — built-in local assistant, no Salesforce connection
   */
  mode: (env("NEXT_PUBLIC_SF_MODE") || "demo") as AgentMode,

  /** 15 or 18 character Org ID — Setup → Company Information */
  orgId: env("NEXT_PUBLIC_SF_ORG_ID"),

  /** API name of the Embedded Service deployment */
  eswConfigDevName: env("NEXT_PUBLIC_SF_ESW_CONFIG_NAME"),

  /** Experience Cloud / ESW site endpoint, e.g. https://acme.my.site.com/ESWMyDeployment */
  siteUrl: env("NEXT_PUBLIC_SF_SITE_URL"),

  /** SCRT2 URL, e.g. https://acme.my.salesforce-scrt.com */
  scrt2Url: env("NEXT_PUBLIC_SF_SCRT2_URL"),

  /** Optional override for the bootstrap script; defaults to <siteUrl>/assets/js/bootstrap.min.js */
  bootstrapUrl: env("NEXT_PUBLIC_SF_BOOTSTRAP_URL"),

  /** Language passed to the messaging client */
  language: env("NEXT_PUBLIC_SF_LANGUAGE") || "en_US",
};

export function messagingConfigured() {
  return Boolean(
    SF.mode === "messaging" &&
      SF.orgId &&
      SF.eswConfigDevName &&
      SF.siteUrl &&
      SF.scrt2Url,
  );
}

export function bootstrapSrc() {
  if (SF.bootstrapUrl) return SF.bootstrapUrl;
  return `${SF.siteUrl.replace(/\/$/, "")}/assets/js/bootstrap.min.js`;
}

/** Which agent the app should actually render right now. */
export function resolvedMode(): AgentMode {
  if (messagingConfigured()) return "messaging";
  if (SF.mode === "custom") return "custom";
  return "demo";
}

/**
 * Fields pushed into the messaging session as pre-chat / hidden context.
 * Map these to Messaging Session or Case fields in Salesforce so the
 * agent starts the conversation already knowing who it is talking to.
 */
export function contextFields(p: {
  contactId: string;
  name: string;
  email: string;
  accountId: string;
  accountName: string;
  slaTier: string;
}) {
  return {
    _firstName: p.name.split(" ")[0],
    _lastName: p.name.split(" ").slice(1).join(" "),
    _email: p.email,
    VeltrixContactId: p.contactId,
    VeltrixAccountId: p.accountId,
    VeltrixAccountName: p.accountName,
    VeltrixSlaTier: p.slaTier,
    VeltrixChannel: "Partner Portal",
  };
}
