import { ASSETS, CONTRACTS, ACCOUNTS, CASES, type Persona } from "./org";
import { searchArticles, getById, type Article } from "./kb";

export type Reply = {
  text: string;
  /** rendered as small linked cards under the message */
  articles?: Article[];
  /** rendered as a call-to-action button */
  action?: { label: string; href: string };
  /** rendered as suggested follow-up chips */
  chips?: string[];
};

const SERIAL_RE = /\b([A-Z]{2}\d{3})[-\s]?(\d{4})[-\s]?(\d{4,5})\b/i;

function findSerial(q: string) {
  const m = q.match(SERIAL_RE);
  if (!m) return undefined;
  const normalised = `${m[1].toUpperCase()}-${m[2]}-${m[3]}`;
  return (
    ASSETS.find((a) => a.serial.toUpperCase() === normalised) ??
    ASSETS.find((a) =>
      a.serial.toUpperCase().replace(/-/g, "").includes(m[3]),
    )
  );
}

const has = (q: string, ...words: string[]) =>
  words.some((w) => q.includes(w));

export function greeting(p: Persona) {
  const first = p.name.split(" ")[0];
  return `Hello ${first}. I can check entitlement and warranty status, find a spare part number, search the technical library, or raise a case for you. What do you need?`;
}

export function starterChips(p: Persona): string[] {
  if (p.role === "Procurement Lead")
    return [
      "Is VX450-2023-08812 under AMC?",
      "Which seal kit fits VX450-2023-08812?",
      "What does our AMC cover?",
      "Spare parts lead times",
    ];
  if (p.role === "Plant Manager")
    return [
      "Show my open cases",
      "How do SLA tiers work?",
      "What does our AMC cover?",
      "Preventive maintenance schedule",
    ];
  return [
    "My VX-450 seal is leaking",
    "CP-100 tripping on E14",
    "Is VX450-2023-08812 under AMC?",
    "Bearing running hot after a service",
  ];
}

export function answer(rawQuery: string, persona: Persona): Reply {
  const q = rawQuery.toLowerCase().trim();
  const asset = findSerial(rawQuery);
  const account = ACCOUNTS.find((a) => a.id === persona.accountId);

  /* ---------- entitlement / warranty against a serial number ---------- */
  if (asset && has(q, "amc", "warranty", "cover", "covered", "entitle", "contract", "sla")) {
    const c = CONTRACTS.find((x) => x.id === asset.contractId);
    if (c) {
      return {
        text:
          `Yes — serial ${asset.serial} (${asset.model}, ${asset.location}) is covered under ` +
          `${c.id}, ${c.slaTier} tier, until ${c.endDate}. That gives you a ${c.responseHrs}-hour response ` +
          `and a ${c.restoreHrs}-hour restore commitment${c.onSiteIncluded ? ", with on-site attendance included" : ""}. ` +
          `Spares on this asset carry your ${c.sparesDiscount} contract discount. ` +
          `This unit has ${asset.historicCases} historic cases and ${asset.openCases} open.`,
        articles: [getById("KB-3001")!, getById("KB-3010")!].filter(Boolean),
        action: { label: `Open asset ${asset.serial}`, href: `/assets` },
        chips: ["Which seal kit fits it?", "Show its case history", "What isn't covered?"],
      };
    }
  }

  /* --------------------------- serial lookup -------------------------- */
  if (asset && !has(q, "seal", "leak", "trip", "hot", "vibrat")) {
    return {
      text:
        `${asset.serial} is a ${asset.description}, commissioned ${asset.commissioned} at ${asset.location}. ` +
        `Current status: ${asset.status}. Governing contract ${asset.contractId}. Last serviced ${asset.lastServiced}.`,
      action: { label: "Open installed base", href: "/assets" },
      chips: ["Is it under AMC?", "Which spare parts fit it?", "Raise a case for this asset"],
    };
  }

  /* ----------------------------- spares ------------------------------- */
  if (has(q, "spare", "part number", "part no", "seal kit", "order", "which kit", "bearing set")) {
    const kitLine = asset
      ? `For ${asset.serial} (${asset.model}) the as-built list gives you ` +
        (asset.model === "VX-450"
          ? "cartridge seal kit SK-450-M, bearing set BS-450-02 and casing gasket GK-450-02"
          : asset.model === "VX-600"
            ? "wear ring set WR-600-B and casing gasket set GK-600-04"
            : "the parts listed against that serial") +
        ". "
      : "";
    return {
      text:
        kitLine +
        "Always order against the serial number rather than the catalogue — Veltrix equipment is built to order, so two units of the same model can take different seal variants and impeller diameters. Prices shown in the portal already include your contract discount.",
      articles: [getById("KB-4002")!, getById("KB-4015")!].filter(Boolean),
      action: { label: "Browse installed base", href: "/assets" },
      chips: ["Spare parts lead times", "Emergency dispatch on a P1", "What does our AMC cover?"],
    };
  }

  /* ------------------------------ cases ------------------------------- */
  if (has(q, "my case", "open case", "my cases", "case status", "show case", "track")) {
    const mine = CASES.filter(
      (c) => c.accountId === persona.accountId,
    ).filter((c) => c.status !== "Closed");
    return {
      text: mine.length
        ? `You have ${mine.length} open case${mine.length > 1 ? "s" : ""}: ` +
          mine
            .map((c) => `${c.number} — ${c.subject} (${c.status}, ${c.milestone})`)
            .join("; ") +
          "."
        : "You have no open cases at the moment.",
      action: { label: "Open my cases", href: "/cases" },
      chips: ["Raise a new case", "How do SLA tiers work?"],
    };
  }

  if (has(q, "raise a case", "log a case", "new case", "report a fault", "report a problem", "create a case")) {
    return {
      text:
        "I can start that for you. I'll pre-fill your account, contact and entitlement — you just need to pick the asset and describe the problem. If it turns out to be something I can answer from the library, I'll tell you before it becomes a case.",
      action: { label: "Log a case", href: "/cases/new" },
      chips: ["What information should I include?", "How is priority decided?"],
    };
  }

  /* -------------------------- SLA / contract -------------------------- */
  if (has(q, "sla", "response time", "restore", "platinum", "gold", "escalat", "milestone")) {
    return {
      text: account
        ? `${account.name} is on the ${account.slaTier} tier. On Platinum that's a 4-hour response and 24-hour restore on P1, 24×7, with on-site attendance included and a 22% spares discount. The clock pauses while we're waiting on you — you'll see the case move to "Awaiting your reply" when that happens.`
        : "Response and restore commitments depend on your tier.",
      articles: [getById("KB-3010")!, getById("KB-3001")!].filter(Boolean),
      chips: ["What does our AMC cover?", "What if you miss an SLA?", "Renewing our AMC"],
    };
  }

  /* --------------------------- known faults --------------------------- */
  if (has(q, "seal", "leak", "leaking", "drip", "weep")) {
    return {
      text:
        "Before replacing anything, characterise the leak — most VX-series seal replacements are avoidable, and a repeat failure usually points at alignment, cavitation or a worn sleeve rather than at the seal itself. If it's a steady drip that doesn't change with load, the cartridge needs replacing.",
      articles: [getById("KB-1104")!, getById("KB-1182")!, getById("KB-1156")!].filter(Boolean),
      action: { label: "Raise a case", href: "/cases/new" },
      chips: ["Which seal kit do I need?", "It's the second failure in 14 months", "Lockout procedure"],
    };
  }

  if (has(q, "e14", "earth fault", "trip", "tripping", "cp-100", "cp100", "panel", "fault code")) {
    return {
      text:
        "Note the code and the feeder number before you reset — the CP-100 log only holds the last eight events. For an E14 earth fault, the single most useful step is to split the test at the motor terminal box: megger the cable alone and the motor alone, and you'll usually localise it in one go.",
      articles: [getById("KB-2210")!, getById("KB-2221")!, getById("KB-1511")!].filter(Boolean),
      action: { label: "Raise a case", href: "/cases/new" },
      chips: ["What readings should I send you?", "Replacing a feeder module", "Is the panel under warranty?"],
    };
  }

  if (has(q, "hot", "temperature", "overheat", "bearing")) {
    return {
      text:
        "If the temperature rise appeared straight after a service, over-greasing is the first thing to suspect — it's the most common cause by a wide margin. Pull the drain plug and run for 30 minutes to purge the surplus. A rise of more than 10 °C above your commissioning baseline is worth investigating; more than 20 °C means stop.",
      articles: [getById("KB-1121")!, getById("KB-1533")!, getById("KB-1502")!].filter(Boolean),
      chips: ["Correct grease quantities", "Could it be misalignment?", "Raise a case"],
    };
  }

  if (has(q, "vibrat", "shaking", "noise", "rattl", "cavitat")) {
    return {
      text:
        "Two quick discriminators: does it change with flow (hydraulic, usually cavitation or off-curve running) and does it persist with the pump decoupled (motor rather than pump)? Gravel-like noise with unstable discharge pressure is cavitation, and the cause is almost always a blinded suction strainer.",
      articles: [getById("KB-1110")!, getById("KB-1135")!, getById("KB-1156")!].filter(Boolean),
      chips: ["Acceptable vibration limits", "Fixing the suction condition", "Raise a case"],
    };
  }

  if (has(q, "flow", "no flow", "low pressure", "not pumping", "performance")) {
    return {
      text:
        "Start with rotation direction — a centrifugal pump running backwards still develops around 60% of its head, so it's easy to miss and it's the most common cause after any motor or panel work. After that: venting, suction strainer, valve positions, and on VFD sets the actual running frequency.",
      articles: [getById("KB-1147")!, getById("KB-1520")!, getById("KB-1168")!].filter(Boolean),
      chips: ["Wear ring clearance limits", "VFD parameters for VM-090", "Raise a case"],
    };
  }

  if (has(q, "commission", "install", "startup", "handover", "baseline", "documentation")) {
    return {
      text:
        "The part most often skipped is recording the baselines — bearing temperature, vibration, current and developed head at the design duty. Nearly every troubleshooting article here asks you to compare against baseline, and a missing baseline is the most common reason a remote diagnosis turns into a site visit.",
      articles: [getById("KB-5004")!, getById("KB-5012")!, getById("KB-1156")!].filter(Boolean),
      chips: ["Reissue our handover pack", "Alignment tolerances"],
    };
  }

  if (has(q, "safety", "lockout", "loto", "isolat", "permit")) {
    return {
      text:
        "Follow your site permit system first — this is a summary, not a replacement. The hazards specific to this equipment are retained seal-chamber pressure, the VFD DC bus after isolation, the CP-100 busbar chamber staying live when a single feeder is isolated, and back-driving through a passing non-return valve.",
      articles: [getById("KB-9001")!].filter(Boolean),
      chips: ["Seal replacement procedure", "Replacing a feeder module"],
    };
  }

  if (has(q, "renew", "expiry", "expire", "upgrade", "add asset", "lapse")) {
    return {
      text:
        "Your account engineer will be in touch 90 days before expiry — contracts don't auto-renew. Assets can be added mid-term and are pro-rated to the existing end date, and tiers can differ per asset within one contract, so you can put Platinum only where downtime actually costs you.",
      articles: [getById("KB-3033")!, getById("KB-3010")!].filter(Boolean),
      action: { label: "View contracts", href: "/contracts" },
      chips: ["What happens if cover lapses?", "Upgrade one line to Platinum"],
    };
  }

  /* --------------------------- free search ---------------------------- */
  const hits = searchArticles(rawQuery, 3);
  if (hits.length) {
    return {
      text: `Here's what I found in the technical library for “${rawQuery.trim()}”. If none of these answers it, I can raise a case and attach this conversation.`,
      articles: hits,
      action: { label: "Raise a case", href: "/cases/new" },
      chips: ["Raise a case", "Search the full library"],
    };
  }

  /* ------------------------------ handoff ----------------------------- */
  return {
    text:
      "I couldn't find a confident answer to that in the technical library, so rather than guess I'll hand this to a Veltrix engineer. I'll create a case with your account, contract and this conversation attached — you won't need to repeat anything.",
    action: { label: "Raise a case with this context", href: "/cases/new" },
    chips: ["Search the library instead", "Is my equipment under AMC?"],
  };
}
