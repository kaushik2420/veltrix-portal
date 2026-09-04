"use client";

import React from "react";
import Script from "next/script";
import { SF, bootstrapSrc, contextFields } from "../../lib/salesforce";
import { usePersona } from "../PersonaContext";
import { ACCOUNTS } from "../../lib/org";

/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    embeddedservice_bootstrap?: any;
  }
}

/**
 * Loads the Salesforce Embedded Messaging (Agentforce / MIAW) client and
 * hands it the signed-in contact's context so the agent starts the
 * conversation already knowing the account, the SLA tier and the channel.
 */
export function SalesforceMessaging() {
  const { persona } = usePersona();
  const account = ACCOUNTS.find((a) => a.id === persona.accountId);

  const init = React.useCallback(() => {
    const esw = window.embeddedservice_bootstrap;
    if (!esw) {
      console.error("[Veltrix] Embedded Messaging bootstrap did not load.");
      return;
    }
    try {
      esw.settings.language = SF.language;

      // Pre-populate the messaging session with who is asking.
      esw.prechatAPI?.setHiddenPrechatFields?.(
        contextFields({
          contactId: persona.id,
          name: persona.name,
          email: persona.email,
          accountId: persona.accountId,
          accountName: account?.name ?? "",
          slaTier: account?.slaTier ?? "",
        }),
      );

      esw.init(SF.orgId, SF.eswConfigDevName, SF.siteUrl, {
        scrt2URL: SF.scrt2Url,
      });
    } catch (err) {
      console.error("[Veltrix] Error loading Embedded Messaging:", err);
    }
  }, [persona, account]);

  return (
    <Script
      id="veltrix-esw-bootstrap"
      src={bootstrapSrc()}
      strategy="afterInteractive"
      onLoad={init}
      onError={() =>
        console.error(
          "[Veltrix] Could not fetch the Embedded Messaging bootstrap from",
          bootstrapSrc(),
          "— check NEXT_PUBLIC_SF_SITE_URL and that the site is active.",
        )
      }
    />
  );
}
