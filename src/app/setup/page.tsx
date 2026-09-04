"use client";

import React from "react";
import { Page, PageHead, Card, Badge } from "../../components/ui";
import { SF, resolvedMode, messagingConfigured, bootstrapSrc } from "../../lib/salesforce";

const VARS: { name: string; what: string; where: string; example: string }[] = [
  {
    name: "NEXT_PUBLIC_SF_MODE",
    what: "Which agent the portal renders.",
    where: "Set to `messaging` for Agentforce, `custom` if you pasted your own snippet, or leave unset for the built-in demo assistant.",
    example: "messaging",
  },
  {
    name: "NEXT_PUBLIC_SF_ORG_ID",
    what: "Your Salesforce Org ID.",
    where: "Setup → Company Settings → Company Information → Salesforce.com Organization ID.",
    example: "00Dxx0000001gPzEAI",
  },
  {
    name: "NEXT_PUBLIC_SF_ESW_CONFIG_NAME",
    what: "API name of the Embedded Service deployment.",
    where: "Setup → Feature Settings → Service → Embedded Service Deployments → your deployment → the API name shown in the code snippet.",
    example: "Veltrix_Partner_Portal",
  },
  {
    name: "NEXT_PUBLIC_SF_SITE_URL",
    what: "The Experience Cloud / ESW site that hosts the messaging assets.",
    where: "Shown in the same code snippet as the third argument to `embeddedservice_bootstrap.init(...)`.",
    example: "https://veltrix.my.site.com/ESWVeltrixPartnerPo",
  },
  {
    name: "NEXT_PUBLIC_SF_SCRT2_URL",
    what: "The SCRT2 endpoint the messaging client talks to.",
    where: "In the snippet, inside the options object as `scrt2URL`.",
    example: "https://veltrix.my.salesforce-scrt.com",
  },
  {
    name: "NEXT_PUBLIC_SF_LANGUAGE",
    what: "Optional. Language for the messaging client.",
    where: "Defaults to en_US.",
    example: "en_US",
  },
  {
    name: "NEXT_PUBLIC_SF_BOOTSTRAP_URL",
    what: "Optional. Override the bootstrap script URL.",
    where: "Only needed if your org serves it from a non-standard path. Defaults to <site URL>/assets/js/bootstrap.min.js.",
    example: "",
  },
];

function Status() {
  const mode = resolvedMode();
  const ok = messagingConfigured();
  return (
    <Card className="mb-8 overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-vx-line bg-vx-mist px-5 py-3.5">
        <span className="text-[13px] font-bold text-vx-navy">
          Current agent
        </span>
        <Badge tone={mode === "messaging" ? "green" : mode === "custom" ? "amber" : "grey"}>
          {mode === "messaging"
            ? "Agentforce / Embedded Messaging"
            : mode === "custom"
              ? "Custom snippet"
              : "Built-in demo assistant"}
        </Badge>
        <span className="ml-auto text-[11.5px] text-vx-slate">
          Read at build time from NEXT_PUBLIC_* environment variables
        </span>
      </div>
      <div className="grid gap-px bg-vx-line sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Mode", SF.mode || "(unset)"],
          ["Org ID", SF.orgId || "(unset)"],
          ["Deployment", SF.eswConfigDevName || "(unset)"],
          ["Site URL", SF.siteUrl || "(unset)"],
          ["SCRT2 URL", SF.scrt2Url || "(unset)"],
          ["Language", SF.language],
          ["Bootstrap", SF.siteUrl ? bootstrapSrc() : "(derived from site URL)"],
          ["Messaging ready", ok ? "Yes" : "No — falling back to demo"],
        ].map(([k, v]) => (
          <div key={k} className="bg-white px-4 py-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-vx-slate">
              {k}
            </div>
            <div
              className={`mt-0.5 break-all font-mono text-[11.5px] ${
                String(v).startsWith("(unset)") || String(v).startsWith("No —")
                  ? "text-vx-slate"
                  : "text-vx-navy"
              }`}
            >
              {v}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vx-navy text-[13px] font-bold text-white">
        {n}
      </span>
      <div className="flex-1 pb-7">
        <h3 className="text-[15.5px] font-bold text-vx-navy">{title}</h3>
        <div className="mt-1.5 space-y-2 text-[13.5px] leading-[1.65] text-vx-steel">
          {children}
        </div>
      </div>
    </div>
  );
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-vx-mist px-1.5 py-[2px] font-mono text-[12px] text-vx-navy">
    {children}
  </code>
);

export default function SetupPage() {
  return (
    <Page>
      <PageHead
        kicker="For the demo builder"
        title="Wiring your Salesforce agent into this portal"
        sub="This page is for you, not for the customer. Hide it before the interview by removing the Setup link in src/components/Chrome.tsx — the page itself is harmless either way."
      />

      <Status />

      <h2 className="mb-4 text-[19px] font-bold text-vx-navy">
        Agentforce / Messaging for Web — the recommended path
      </h2>

      <Card className="mb-8 p-6">
        <Step n={1} title="Create the Messaging channel and deployment in Salesforce">
          <p>
            Setup → <strong>Messaging Settings</strong> → New Channel →{" "}
            <strong>Messaging for In-App and Web</strong>. Then Setup →{" "}
            <strong>Embedded Service Deployments</strong> → New Deployment →{" "}
            <strong>Messaging for Web</strong>, and point it at that channel.
          </p>
          <p>
            Attach your Agentforce Service Agent to the channel so the agent
            answers rather than a queue. If Agentforce isn&apos;t enabled in your
            org, an Einstein Bot or a live-agent queue works with exactly the
            same wiring — nothing on this page changes.
          </p>
        </Step>

        <Step n={2} title="Allow this site to talk to Salesforce">
          <p>
            In the deployment settings, add your Vercel domain to the{" "}
            <strong>trusted URLs / allowed origins</strong> list — both the
            production domain and the <Code>*.vercel.app</Code> preview domain if
            you want previews to work. Missing this is the single most common
            reason the chat button never appears.
          </p>
          <p>
            Also check Setup → <strong>CORS</strong> and Setup →{" "}
            <strong>Trusted URLs</strong> include your domain.
          </p>
        </Step>

        <Step n={3} title="Copy the four values out of the code snippet">
          <p>
            On the deployment, click <strong>Get Code Snippet</strong>. You are
            looking for the call to{" "}
            <Code>embeddedservice_bootstrap.init(...)</Code>. Its arguments are,
            in order: your <strong>Org ID</strong>, the{" "}
            <strong>deployment API name</strong>, the <strong>site URL</strong>,
            and an options object containing <strong>scrt2URL</strong>.
          </p>
          <p>
            You don&apos;t need to paste the snippet anywhere — this portal
            already contains the loader. It just needs those four values.
          </p>
        </Step>

        <Step n={4} title="Add them as environment variables in Vercel">
          <p>
            Vercel → your project → <strong>Settings</strong> →{" "}
            <strong>Environment Variables</strong>. Add each variable from the
            table below for the Production, Preview and Development
            environments, then <strong>redeploy</strong> — Next.js inlines{" "}
            <Code>NEXT_PUBLIC_*</Code> variables at build time, so a redeploy is
            required for them to take effect.
          </p>
          <p>
            Testing locally? Put the same lines in a{" "}
            <Code>.env.local</Code> file at the project root and restart{" "}
            <Code>npm run dev</Code>.
          </p>
        </Step>

        <Step n={5} title="Verify">
          <p>
            Reload the portal. The Salesforce chat launcher replaces the built-in
            demo assistant, and the box at the top of this page will report{" "}
            <strong>Messaging ready: Yes</strong>. If it doesn&apos;t, open your
            browser console — the loader logs a clear message naming the URL it
            tried to fetch.
          </p>
        </Step>
      </Card>

      <h2 className="mb-3 text-[19px] font-bold text-vx-navy">
        Environment variables
      </h2>
      <Card className="mb-8 overflow-x-auto">
        <table className="w-full min-w-[720px] text-[13px]">
          <thead>
            <tr className="bg-vx-mist text-left">
              <th className="px-4 py-3 font-bold text-vx-navy">Variable</th>
              <th className="px-4 py-3 font-bold text-vx-navy">What it is</th>
              <th className="px-4 py-3 font-bold text-vx-navy">Where to find it</th>
            </tr>
          </thead>
          <tbody>
            {VARS.map((v) => (
              <tr key={v.name} className="border-t border-vx-line align-top">
                <td className="px-4 py-3">
                  <div className="font-mono text-[11.5px] font-bold text-vx-navy">
                    {v.name}
                  </div>
                  {v.example && (
                    <div className="mt-1 font-mono text-[11px] text-vx-slate">
                      {v.example}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-vx-steel">{v.what}</td>
                <td className="px-4 py-3 text-vx-slate">{v.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <h2 className="mb-3 text-[19px] font-bold text-vx-navy">
        Passing context into the conversation
      </h2>
      <Card className="mb-8 p-6">
        <p className="text-[13.5px] leading-[1.65] text-vx-steel">
          The portal already pushes the signed-in contact into the messaging
          session as hidden pre-chat fields — contact, account, SLA tier and
          channel. That&apos;s what lets the agent open with &ldquo;I can see
          you&apos;re on a Platinum AMC&rdquo; instead of asking who you are, and
          it is the most persuasive 20 seconds of the whole demo.
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.65] text-vx-steel">
          To make it land, create matching custom fields on the{" "}
          <strong>Messaging Session</strong> object in Salesforce and map them in
          the deployment&apos;s pre-chat configuration. The field API names the
          portal sends are:
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            "_firstName",
            "_lastName",
            "_email",
            "VeltrixContactId",
            "VeltrixAccountId",
            "VeltrixAccountName",
            "VeltrixSlaTier",
            "VeltrixChannel",
          ].map((f) => (
            <span
              key={f}
              className="rounded-md bg-vx-mist px-2 py-1 font-mono text-[11.5px] font-semibold text-vx-navy"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[13px] leading-[1.6] text-vx-slate">
          Edit the list in <Code>src/lib/salesforce.ts</Code> →{" "}
          <Code>contextFields()</Code> if your org uses different API names.
        </p>
      </Card>

      <h2 className="mb-3 text-[19px] font-bold text-vx-navy">
        If your snippet looks different
      </h2>
      <Card className="mb-8 p-6">
        <p className="text-[13.5px] leading-[1.65] text-vx-steel">
          Older orgs use the classic Embedded Service Chat snippet, which is much
          longer and loads <Code>esw.min.js</Code> first. For that, open{" "}
          <Code>src/components/agent/CustomSnippet.tsx</Code>, paste the snippet
          body into the marked area, put the external script URL in{" "}
          <Code>EXTERNAL_SCRIPT</Code>, and set{" "}
          <Code>NEXT_PUBLIC_SF_MODE=custom</Code>. The file has commented
          scaffolding showing exactly where each part goes.
        </p>
      </Card>

      <h2 className="mb-3 text-[19px] font-bold text-vx-navy">
        Wiring the case form to Salesforce
      </h2>
      <Card className="mb-8 p-6">
        <p className="text-[13.5px] leading-[1.65] text-vx-steel">
          <Code>/cases/new</Code> currently shows a realistic confirmation
          without creating anything. Two ways to make it real, in increasing
          order of effort:
        </p>
        <ul className="mt-2.5 space-y-2 text-[13.5px] leading-[1.6] text-vx-steel">
          <li className="flex gap-2">
            <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-vx-orange" />
            <span>
              <strong>Web-to-Case</strong> — Setup → Web-to-Case, generate the
              HTML, and post the form to that endpoint. Fastest, no auth, but no
              response body to show the case number.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-vx-orange" />
            <span>
              <strong>A Next.js route handler calling the REST API</strong> —
              add <Code>src/app/api/case/route.ts</Code>, keep the client
              credentials in server-only environment variables (no{" "}
              <Code>NEXT_PUBLIC_</Code> prefix), and POST to{" "}
              <Code>/services/data/vXX.X/sobjects/Case</Code>. You get the real
              case number back and can show it on the confirmation.
            </span>
          </li>
        </ul>
        <p className="mt-3 rounded-lg border-l-[3px] border-vx-orange bg-[#fff7f2] px-3.5 py-2.5 text-[12.5px] leading-snug text-[#7a3e12]">
          For a 30-minute interview demo, honestly, neither is needed. Showing
          the case arriving in the Service Console <em>from the chat agent</em>{" "}
          is the moment that matters — the form is scenery.
        </p>
      </Card>
    </Page>
  );
}
