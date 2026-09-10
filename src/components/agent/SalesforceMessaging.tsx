"use client";

import React from "react";
import { SF, bootstrapSrc, contextFields } from "../../lib/salesforce";
import { usePersona } from "../PersonaContext";
import { ACCOUNTS } from "../../lib/org";

/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    embeddedservice_bootstrap?: any;
    /** Demo helper — wipes the conversation and reloads with a fresh chat. */
    veltrixResetChat?: () => void;
  }
}

const SCRIPT_ID = "veltrix-esw-bootstrap";

/**
 * The Experience Cloud site that serves the messaging client is a developer
 * org, and it intermittently stalls for 20s+ on a cold request without ever
 * firing `error`. When that happens the launcher simply never appears. So we
 * load the script ourselves with a watchdog and retry instead of trusting a
 * single <script> tag to resolve.
 */
const LOAD_TIMEOUT_MS = 7000;
const MAX_ATTEMPTS = 4;

/** Every web-storage key the Embedded Messaging client uses is org-prefixed. */
function clearMessagingStorage() {
  if (typeof window === "undefined") return;
  const prefix = SF.orgId.slice(0, 15);
  const wipe = (store: Storage) => {
    try {
      const doomed: string[] = [];
      for (let i = 0; i < store.length; i++) {
        const key = store.key(i);
        if (
          key &&
          (key.startsWith(prefix) ||
            key.includes("_WEB_STORAGE") ||
            key.startsWith("ESW") ||
            key.startsWith("EMBEDDED_MESSAGING"))
        ) {
          doomed.push(key);
        }
      }
      doomed.forEach((key) => store.removeItem(key));
    } catch {
      /* storage can be blocked — nothing to clear then */
    }
  };
  wipe(window.localStorage);
  wipe(window.sessionStorage);
}

/**
 * Hard reset for demos: tear the client down, drop the stored conversation and
 * reload. Reachable three ways —
 *   • append `?resetchat=1` to any portal URL
 *   • press Alt + Shift + R
 *   • run `veltrixResetChat()` in the browser console
 */
function resetChat() {
  try {
    window.embeddedservice_bootstrap?.userVerificationAPI?.clearSession?.();
  } catch {
    /* only defined once a verified session exists */
  }
  try {
    window.embeddedservice_bootstrap?.utilAPI?.removeAllComponents?.();
  } catch {
    /* client may not have finished booting */
  }
  clearMessagingStorage();
  const url = new URL(window.location.href);
  url.searchParams.delete("resetchat");
  window.location.replace(url.toString());
}

/**
 * Loads the Salesforce Embedded Messaging (Agentforce / MIAW) client and hands
 * it the signed-in contact's context so the agent starts the conversation
 * already knowing the account, the SLA tier and the channel.
 */
export function SalesforceMessaging() {
  const { persona } = usePersona();
  const account = ACCOUNTS.find((a) => a.id === persona.accountId);

  // The loader effect runs once on mount; read identity through a ref so it
  // always sees the persona that is current when the client finally boots.
  const identity = React.useRef({ persona, account });
  identity.current = { persona, account };

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    window.veltrixResetChat = resetChat;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.shiftKey && event.key.toLowerCase() === "r") {
        event.preventDefault();
        resetChat();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    // ?resetchat=1 — clear before the client boots, then tidy the URL.
    if (new URLSearchParams(window.location.search).has("resetchat")) {
      clearMessagingStorage();
      const url = new URL(window.location.href);
      url.searchParams.delete("resetchat");
      window.history.replaceState({}, "", url.toString());
    }

    let attempt = 0;
    let started = false;
    let timer: number | undefined;

    const start = () => {
      if (started) return;
      const esw = window.embeddedservice_bootstrap;
      if (!esw) return;
      started = true;
      window.clearTimeout(timer);

      try {
        esw.settings.language = SF.language;

        const { persona: who, account: acct } = identity.current;
        esw.prechatAPI?.setHiddenPrechatFields?.(
          contextFields({
            contactId: who.id,
            name: who.name,
            email: who.email,
            accountId: who.accountId,
            accountName: acct?.name ?? "",
            slaTier: acct?.slaTier ?? "",
          }),
        );

        esw.init(SF.orgId, SF.eswConfigDevName, SF.siteUrl, {
          scrt2URL: SF.scrt2Url,
        });

        // Warm the rest of the client's assets so the first open is instant.
        window.setTimeout(() => {
          try {
            esw.utilAPI?.prefetchResources?.();
          } catch {
            /* best effort */
          }
        }, 2000);
      } catch (err) {
        console.error("[Veltrix] Error starting Embedded Messaging:", err);
      }
    };

    const load = () => {
      if (started) return;
      if (window.embeddedservice_bootstrap) {
        start();
        return;
      }

      attempt += 1;
      if (attempt > MAX_ATTEMPTS) {
        console.error(
          "[Veltrix] Embedded Messaging bootstrap never loaded from",
          bootstrapSrc(),
          "— the Experience Cloud site is not responding. Reload the page, or run veltrixResetChat().",
        );
        return;
      }

      document.getElementById(SCRIPT_ID)?.remove();

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "text/javascript";
      // First try the plain URL so a warm browser cache serves it instantly.
      // Retries add a cache-buster, which abandons a stalled response instead
      // of queueing behind it.
      script.src =
        attempt === 1
          ? bootstrapSrc()
          : `${bootstrapSrc()}?veltrixRetry=${attempt}-${Date.now()}`;
      script.onload = start;
      script.onerror = () => {
        console.warn(`[Veltrix] Messaging bootstrap attempt ${attempt} failed.`);
        load();
      };
      document.head.appendChild(script);

      // A stalled Experience Cloud request fires neither load nor error, so
      // time it out ourselves.
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (started) return;
        if (window.embeddedservice_bootstrap) {
          start();
          return;
        }
        console.warn(
          `[Veltrix] Messaging bootstrap attempt ${attempt} stalled — retrying.`,
        );
        load();
      }, LOAD_TIMEOUT_MS);
    };

    load();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
