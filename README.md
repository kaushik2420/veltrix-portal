# Veltrix Customer & Partner Hub

A working self-service portal for **Veltrix Industrial Systems Pvt. Ltd**, the
fictional B2B pump and motor manufacturer in the Salesforce Specialist SE
(Service Cloud) case study.

It exists so you can demonstrate the customer-facing half of the story —
entitlement self-check, spare-part lookup, a searchable technical library and
case deflection — with a **real Salesforce Agentforce agent embedded in it**,
without needing an Experience Cloud licence.

---

## What's in it

| Route | What it shows |
| --- | --- |
| `/` | Personalised home — entitlement strip, open cases, popular articles, installed base |
| `/knowledge` | 25-article technical library with search and filters |
| `/knowledge/[slug]` | Full article, related articles, keywords, "raise a case about this" |
| `/cases` | Case list with expandable timelines showing entitlement and milestones |
| `/cases/new` | Log-a-case form that suggests articles **before** you submit — deflection, visibly |
| `/assets` | Installed base by serial number: coverage, case history, spares that fit |
| `/contracts` | Live contracts, tier comparison, what's excluded |
| `/setup` | **For you, not the customer** — how to wire your Salesforce agent in |

Three switchable personas (Plant Engineer, Procurement Lead, Plant Manager) on
the same account. Switching changes the assistant's opening suggestions and what
the portal emphasises — a good 15-second beat in a demo.

The 25 knowledge base articles are real technical content: seal replacement
procedures with torque values, cavitation diagnosis, CP-100 trip codes E01–E20,
wear ring clearance tables, AMC scope and exclusions, SLA tier definitions,
spare part numbers and lead times, commissioning checklists, and lockout/tagout.
They're written to be genuinely searchable, so grounding an agent on them
produces answers that sound like a manufacturer, not like filler.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Out of the box it runs a **built-in demo assistant** — a local, rules-based chat
widget that answers from the same knowledge base and contract data. It is
clearly badged "Demo" so you're never accidentally passing it off as Salesforce.

---

## Plugging in your Salesforce agent

The whole point of this portal. Full click-by-click instructions are on the
**`/setup` page in the running app** — it also shows live status of what's
currently configured. In short:

1. In Salesforce: create a **Messaging for In-App and Web** channel, attach your
   Agentforce Service Agent, and create an **Embedded Service Deployment** for
   Messaging for Web.
2. Add your Vercel domain to the deployment's trusted URLs / allowed origins,
   and to Setup → CORS and Setup → Trusted URLs. *(Skipping this is the number
   one reason the chat button never appears.)*
3. Click **Get Code Snippet** and copy four values out of the
   `embeddedservice_bootstrap.init(...)` call: Org ID, deployment API name, site
   URL, and `scrt2URL`.
4. Add them as environment variables (see `.env.example`), then **redeploy** —
   Next.js inlines `NEXT_PUBLIC_*` at build time.

The portal pushes the signed-in contact into the messaging session as hidden
pre-chat fields — contact, account, SLA tier, channel — so the agent can open
with *"I can see you're on a Platinum AMC"* instead of asking who you are. Map
those to Messaging Session fields in your deployment's pre-chat config. Field
names are listed on `/setup` and editable in `src/lib/salesforce.ts`.

**Got an older, longer snippet?** (classic Embedded Service Chat / Live Agent).
Paste it into `src/components/agent/CustomSnippet.tsx` — the file has commented
scaffolding showing exactly where each part goes — and set
`NEXT_PUBLIC_SF_MODE=custom`.

Nothing in `NEXT_PUBLIC_*` is secret. Embedded Messaging credentials are
designed to run in the browser. Never put a connected-app secret there.

---

## Deploying to Vercel through GitHub

1. **Create the repo.** [github.com/new](https://github.com/new) → name it
   `veltrix-portal` → Private → don't add a README.
2. **Upload.** Click "uploading an existing file", then drag in the *contents*
   of this folder (`src`, `public`, `package.json`, and the rest — not the
   folder itself). GitHub walks subfolders automatically. The staged list should
   show `src/app/page.tsx` with slashes in it, and `package.json` on its own.
   Commit.
   *Prefer a GUI? [GitHub Desktop](https://desktop.github.com) → File → Add
   Local Repository → this folder → Publish. Structure is guaranteed correct.*
3. **Deploy.** [vercel.com](https://vercel.com) → Add New → Project → import the
   repo → framework auto-detects as Next.js → **Deploy**. Change nothing.
4. **Add the Salesforce variables** (Settings → Environment Variables) and
   redeploy.

If Vercel says "No Next.js version detected", your files went one level too
deep: Settings → General → Root Directory → `veltrix-portal` → redeploy.

---

## Using it in the interview

The strongest sequence is roughly four minutes, and it lands the exec sponsor's
mandate — *"real account and contract data, not stock data"* — better than any
slide:

1. Sign in as **Priya (Procurement)**. Ask the agent *"is VX450-2023-08812 still
   under AMC?"* — it answers from contract data in seconds. **No case created.**
   That is deflection, on screen.
2. Switch to **Rajesh (Plant Engineer)**. Describe the seal leak. The agent
   grounds its answer in KB-1182 with a citation.
3. Start **Log a case**. Watch the suggested articles appear as you type, and
   the entitlement resolve to Platinum automatically in the sidebar.
4. Submit — then flip to the Service Console and show the case arriving with the
   contact, account, asset and SLA already populated.

Say out loud that the portal is a demo harness and the agent is the real
Salesforce component. Panels forgive scaffolding; they don't forgive a bluff.

**Before you present:** hide `/setup` by removing that entry from `NAV` in
`src/components/Chrome.tsx`. The page is harmless either way, but it's for you,
not for the customer.

---

## Editing the data

Everything the portal displays is plain TypeScript with no database:

| File | Contains |
| --- | --- |
| `src/lib/org.ts` | Accounts, contacts/personas, contracts, assets, cases |
| `src/lib/kb-pumps.ts` | 12 pump and motor articles |
| `src/lib/kb-general.ts` | 13 panel, contract, spares, commissioning and safety articles |
| `src/lib/assistant.ts` | The demo assistant's answers and routing |
| `src/components/Logo.tsx` | The Veltrix mark and wordmark |

Keep the serial numbers and contract IDs identical to the records you build in
your Salesforce org. When the same `VX450-2023-08812` appears in the portal and
in the Service Console, the demo stops looking like two disconnected things.
