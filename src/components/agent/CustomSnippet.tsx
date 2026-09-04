"use client";

import React from "react";

/* ==================================================================== *
 *  PASTE-YOUR-OWN-SNIPPET ESCAPE HATCH
 *  --------------------------------------------------------------------
 *  Use this when your Salesforce deployment gives you a code snippet
 *  that isn't the standard Agentforce / Messaging-for-Web one — for
 *  example the older Embedded Service Chat (Live Agent) snippet, or a
 *  snippet your admin has customised.
 *
 *  HOW TO USE
 *  1. In Salesforce: Setup → Embedded Service Deployments → your
 *     deployment → Get Code Snippet. Copy the whole thing.
 *  2. Paste the JavaScript from inside the <script> tags into the
 *     marked area of `run()` below. Delete the placeholder console.log.
 *  3. If the snippet also loads an external file (usually
 *     `.../embeddedservice/5.0/esw.min.js`), put that URL in
 *     EXTERNAL_SCRIPT below — it is loaded first, then run() is called.
 *  4. Set NEXT_PUBLIC_SF_MODE=custom in your environment variables.
 *
 *  Nothing here is secret. Embedded Service snippets are designed to be
 *  public client-side code.
 * ==================================================================== */

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Optional: the external script the snippet asks you to load first. */
const EXTERNAL_SCRIPT = "";

function run() {
  // ------------------------------------------------------------------
  // ⬇⬇⬇  PASTE YOUR SALESFORCE SNIPPET BODY HERE  ⬇⬇⬇
  //
  // e.g. for classic Embedded Service Chat:
  //
  //   const embedded_svc = (window as any).embedded_svc;
  //   embedded_svc.settings.displayHelpButton = true;
  //   embedded_svc.settings.language = 'en';
  //   embedded_svc.settings.enabledFeatures = ['LiveAgent'];
  //   embedded_svc.settings.entryFeature = 'LiveAgent';
  //   embedded_svc.init(
  //     'https://YOUR.my.salesforce.com',
  //     'https://YOUR.my.site.com/portal',
  //     gslbBaseURL,
  //     'YOUR_ORG_ID',
  //     'YOUR_DEPLOYMENT_NAME',
  //     { baseLiveAgentContentURL: '...', deploymentId: '...',
  //       buttonId: '...', baseLiveAgentURL: '...',
  //       eswLiveAgentDevName: '...', isOfflineSupportEnabled: false }
  //   );
  //
  // ⬆⬆⬆  END OF PASTE AREA  ⬆⬆⬆
  // ------------------------------------------------------------------

  console.log(
    "[Veltrix] NEXT_PUBLIC_SF_MODE=custom is set, but no snippet has been " +
      "pasted into src/components/agent/CustomSnippet.tsx yet.",
  );
}

export function CustomSnippet() {
  React.useEffect(() => {
    if (!EXTERNAL_SCRIPT) {
      run();
      return;
    }
    const existing = document.getElementById("veltrix-custom-agent");
    if (existing) return;
    const s = document.createElement("script");
    s.id = "veltrix-custom-agent";
    s.src = EXTERNAL_SCRIPT;
    s.async = true;
    s.onload = () => run();
    s.onerror = () =>
      console.error("[Veltrix] Could not load", EXTERNAL_SCRIPT);
    document.body.appendChild(s);
  }, []);

  return null;
}
