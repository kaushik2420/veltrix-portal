/* ------------------------------------------------------------------ *
 * Demo data for the Veltrix partner portal.
 *
 * This mirrors the Salesforce objects you'll build in your demo org:
 *   Account (with hierarchy) · Contact · Asset · ServiceContract ·
 *   Entitlement · Case
 *
 * Keep the IDs and serial numbers identical in both places so the
 * portal and the Service Console tell the same story on screen.
 * ------------------------------------------------------------------ */

export type SlaTier = "Platinum" | "Gold" | "Standard";

export type Persona = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  accountId: string;
  initials: string;
  /** what this persona typically comes to the portal to do */
  intent: string;
};

export type Account = {
  id: string;
  name: string;
  parentId?: string;
  city: string;
  state: string;
  industry: string;
  slaTier: SlaTier;
  accountManager: string;
  annualContractValue: string;
  downtimeCostPerHour: string;
  plantCriticality: "Critical" | "High" | "Medium";
  energyRating: string;
};

export type Contract = {
  id: string;
  accountId: string;
  type: "AMC" | "Warranty" | "Extended Warranty";
  slaTier: SlaTier;
  responseHrs: number;
  restoreHrs: number;
  startDate: string;
  endDate: string;
  coverage: string[];
  onSiteIncluded: boolean;
  sparesDiscount: string;
  status: "Active" | "Expiring soon" | "Expired";
};

export type AssetRec = {
  id: string;
  serial: string;
  model: string;
  productLine: "Centrifugal Pumps" | "Motors & Drives" | "Control Panels";
  description: string;
  accountId: string;
  location: string;
  commissioned: string;
  contractId: string;
  status: "Operational" | "Under maintenance" | "Fault reported";
  lastServiced: string;
  openCases: number;
  historicCases: number;
};

export type CaseRec = {
  id: string;
  number: string;
  subject: string;
  accountId: string;
  contactId: string;
  assetSerial?: string;
  productLine: string;
  failureType: string;
  priority: "P1 — Production down" | "P2 — Degraded" | "P3 — Question";
  status: "New" | "In progress" | "Awaiting your reply" | "Resolved" | "Closed";
  origin: "Phone" | "Email" | "Partner Portal" | "WhatsApp" | "Web Chat";
  opened: string;
  slaTier: SlaTier;
  milestone: string;
  milestoneState: "On track" | "At risk" | "Breached" | "Met";
  owner: string;
  summary: string;
  timeline: { at: string; who: string; text: string }[];
};

/* ---------------------------- accounts ---------------------------- */

export const ACCOUNTS: Account[] = [
  {
    id: "ACC-1001",
    name: "Konark Steel Works Ltd",
    city: "Mumbai",
    state: "Maharashtra",
    industry: "Integrated steel",
    slaTier: "Platinum",
    accountManager: "S. Iyer",
    annualContractValue: "₹4.8 Cr",
    downtimeCostPerHour: "₹18.5 L",
    plantCriticality: "Critical",
    energyRating: "IE4 fleet · 62% converted",
  },
  {
    id: "ACC-1002",
    name: "Konark Steel Works — Pune Plant",
    parentId: "ACC-1001",
    city: "Pune",
    state: "Maharashtra",
    industry: "Integrated steel",
    slaTier: "Platinum",
    accountManager: "S. Iyer",
    annualContractValue: "₹2.9 Cr",
    downtimeCostPerHour: "₹18.5 L",
    plantCriticality: "Critical",
    energyRating: "IE4 fleet · 71% converted",
  },
  {
    id: "ACC-1003",
    name: "Konark Steel Works — Raipur Plant",
    parentId: "ACC-1001",
    city: "Raipur",
    state: "Chhattisgarh",
    industry: "Integrated steel",
    slaTier: "Gold",
    accountManager: "S. Iyer",
    annualContractValue: "₹1.9 Cr",
    downtimeCostPerHour: "₹9.2 L",
    plantCriticality: "High",
    energyRating: "IE3 fleet · 40% converted",
  },
];

/* ---------------------------- personas ---------------------------- */

export const PERSONAS: Persona[] = [
  {
    id: "CON-2001",
    name: "Rajesh Kulkarni",
    role: "Plant Engineer",
    email: "rajesh.kulkarni@konarksteel.example",
    phone: "+91 98220 41xxx",
    accountId: "ACC-1002",
    initials: "RK",
    intent:
      "Raises breakdown cases, checks failure history on a specific serial number, wants a fix now.",
  },
  {
    id: "CON-2002",
    name: "Priya Deshmukh",
    role: "Procurement Lead",
    email: "priya.deshmukh@konarksteel.example",
    phone: "+91 98220 55xxx",
    accountId: "ACC-1002",
    initials: "PD",
    intent:
      "Checks warranty and AMC coverage before raising a PO, finds spare part numbers, tracks orders.",
  },
  {
    id: "CON-2003",
    name: "Anil Menon",
    role: "Plant Manager",
    email: "anil.menon@konarksteel.example",
    phone: "+91 98220 77xxx",
    accountId: "ACC-1002",
    initials: "AM",
    intent:
      "Wants the SLA picture across the plant — what's open, what's breaching, what keeps failing.",
  },
];

/* --------------------------- contracts ---------------------------- */

export const CONTRACTS: Contract[] = [
  {
    id: "AMC-2024-0912",
    accountId: "ACC-1002",
    type: "AMC",
    slaTier: "Platinum",
    responseHrs: 4,
    restoreHrs: 24,
    startDate: "01 Apr 2024",
    endDate: "31 Mar 2027",
    coverage: [
      "All VX-series centrifugal pumps at Pune Plant",
      "VM-series motors above 30 kW",
      "Preventive maintenance — 4 visits / year",
      "Mechanical seals, bearings and wear rings",
    ],
    onSiteIncluded: true,
    sparesDiscount: "22%",
    status: "Active",
  },
  {
    id: "AMC-2023-0455",
    accountId: "ACC-1003",
    type: "AMC",
    slaTier: "Gold",
    responseHrs: 8,
    restoreHrs: 48,
    startDate: "01 Jul 2023",
    endDate: "30 Jun 2026",
    coverage: [
      "VX-220 and VX-450 pumps at Raipur Plant",
      "Preventive maintenance — 2 visits / year",
      "Labour only; consumables billed separately",
    ],
    onSiteIncluded: true,
    sparesDiscount: "12%",
    status: "Expiring soon",
  },
  {
    id: "WTY-2025-8871",
    accountId: "ACC-1002",
    type: "Warranty",
    slaTier: "Standard",
    responseHrs: 24,
    restoreHrs: 120,
    startDate: "12 Feb 2025",
    endDate: "11 Feb 2027",
    coverage: [
      "CP-100 control panels commissioned Feb 2025",
      "Manufacturing defects only",
      "Return-to-works; on-site attendance chargeable",
    ],
    onSiteIncluded: false,
    sparesDiscount: "0%",
    status: "Active",
  },
];

/* ----------------------------- assets ----------------------------- */

export const ASSETS: AssetRec[] = [
  {
    id: "AST-3001",
    serial: "VX450-2023-08812",
    model: "VX-450",
    productLine: "Centrifugal Pumps",
    description: "VX-450 end-suction centrifugal pump, 75 kW, cooling water duty",
    accountId: "ACC-1002",
    location: "Pune Plant · Line 3 · Cooling tower pump house",
    commissioned: "14 Aug 2023",
    contractId: "AMC-2024-0912",
    status: "Fault reported",
    lastServiced: "02 Jun 2026",
    openCases: 1,
    historicCases: 4,
  },
  {
    id: "AST-3002",
    serial: "VX450-2023-08813",
    model: "VX-450",
    productLine: "Centrifugal Pumps",
    description: "VX-450 end-suction centrifugal pump, 75 kW, standby unit",
    accountId: "ACC-1002",
    location: "Pune Plant · Line 3 · Cooling tower pump house",
    commissioned: "14 Aug 2023",
    contractId: "AMC-2024-0912",
    status: "Operational",
    lastServiced: "02 Jun 2026",
    openCases: 0,
    historicCases: 1,
  },
  {
    id: "AST-3003",
    serial: "VX600-2022-04120",
    model: "VX-600",
    productLine: "Centrifugal Pumps",
    description: "VX-600 split-case pump, 160 kW, main process water",
    accountId: "ACC-1002",
    location: "Pune Plant · Utilities block",
    commissioned: "09 Nov 2022",
    contractId: "AMC-2024-0912",
    status: "Operational",
    lastServiced: "18 May 2026",
    openCases: 0,
    historicCases: 3,
  },
  {
    id: "AST-3004",
    serial: "VM090-2024-11907",
    model: "VM-090",
    productLine: "Motors & Drives",
    description: "VM-090 IE4 induction motor, 90 kW, 1480 rpm",
    accountId: "ACC-1002",
    location: "Pune Plant · Line 3",
    commissioned: "21 Jan 2024",
    contractId: "AMC-2024-0912",
    status: "Operational",
    lastServiced: "02 Jun 2026",
    openCases: 0,
    historicCases: 0,
  },
  {
    id: "AST-3005",
    serial: "CP100-2025-00641",
    model: "CP-100",
    productLine: "Control Panels",
    description: "CP-100 motor control centre, 8-feeder, IP54",
    accountId: "ACC-1002",
    location: "Pune Plant · Line 3 · MCC room",
    commissioned: "12 Feb 2025",
    contractId: "WTY-2025-8871",
    status: "Fault reported",
    lastServiced: "—",
    openCases: 1,
    historicCases: 2,
  },
  {
    id: "AST-3006",
    serial: "VX220-2021-02277",
    model: "VX-220",
    productLine: "Centrifugal Pumps",
    description: "VX-220 inline booster pump, 22 kW",
    accountId: "ACC-1003",
    location: "Raipur Plant · Quench water skid",
    commissioned: "30 Mar 2021",
    contractId: "AMC-2023-0455",
    status: "Under maintenance",
    lastServiced: "11 Aug 2026",
    openCases: 0,
    historicCases: 6,
  },
];

/* ------------------------------ cases ----------------------------- */

export const CASES: CaseRec[] = [
  {
    id: "CS-1",
    number: "00042817",
    subject: "VX-450 mechanical seal leakage — Line 3 shutdown",
    accountId: "ACC-1002",
    contactId: "CON-2001",
    assetSerial: "VX450-2023-08812",
    productLine: "Centrifugal Pumps",
    failureType: "Seal / gasket leakage",
    priority: "P1 — Production down",
    status: "In progress",
    origin: "Phone",
    opened: "Today 06:41",
    slaTier: "Platinum",
    milestone: "Restore by 06:41 tomorrow · 22h 48m remaining",
    milestoneState: "On track",
    owner: "Rajat S. — Veltrix Service",
    summary:
      "Steady drip from the seal chamber developing into a stream over 40 minutes. Line 3 taken offline at 06:20. Second seal failure on this unit in 14 months.",
    timeline: [
      { at: "06:41", who: "Rajesh Kulkarni", text: "Called the Veltrix service line. Case created from the call; transcript attached." },
      { at: "06:41", who: "System", text: "Entitlement matched — AMC-2024-0912, Platinum. Response and restore milestones started." },
      { at: "06:43", who: "Veltrix Assistant", text: "Article KB-1182 surfaced to the agent: VX-450 mechanical seal replacement procedure." },
      { at: "06:52", who: "Rajat S.", text: "Swarm opened with the centrifugal pump specialist. Two prior seal cases on this serial reviewed." },
      { at: "07:15", who: "Meena P. — Pump Specialist", text: "Three other units from production lot 2023-Q3 show the same failure mode. Raising an engineering defect record." },
      { at: "07:20", who: "Rajat S.", text: "Seal kit SK-450-M dispatched from the Pune depot under AMC. Field engineer allocated, ETA 11:00." },
    ],
  },
  {
    id: "CS-2",
    number: "00042690",
    subject: "CP-100 trip code E14 on feeder 4",
    accountId: "ACC-1002",
    contactId: "CON-2001",
    assetSerial: "CP100-2025-00641",
    productLine: "Control Panels",
    failureType: "Protection trip",
    priority: "P2 — Degraded",
    status: "Awaiting your reply",
    origin: "Partner Portal",
    opened: "01 Sep 2026",
    slaTier: "Standard",
    milestone: "Response met · restore by 06 Sep",
    milestoneState: "On track",
    owner: "Divya N. — Veltrix Service",
    summary:
      "Feeder 4 tripping intermittently on E14 (earth fault) during start. We've asked for the megger readings before dispatching an engineer.",
    timeline: [
      { at: "01 Sep 09:12", who: "Rajesh Kulkarni", text: "Logged through the partner portal with a photo of the HMI." },
      { at: "01 Sep 09:14", who: "System", text: "Classified: Control Panels · Protection trip · P2." },
      { at: "01 Sep 11:40", who: "Divya N.", text: "Sent KB-2210 and asked for insulation resistance readings on the outgoing cable." },
    ],
  },
  {
    id: "CS-3",
    number: "00042551",
    subject: "Spare part number for VX-600 wear ring set",
    accountId: "ACC-1002",
    contactId: "CON-2002",
    assetSerial: "VX600-2022-04120",
    productLine: "Centrifugal Pumps",
    failureType: "Spare parts enquiry",
    priority: "P3 — Question",
    status: "Resolved",
    origin: "Email",
    opened: "26 Aug 2026",
    slaTier: "Platinum",
    milestone: "Met in 41 minutes",
    milestoneState: "Met",
    owner: "Veltrix Assistant",
    summary:
      "Part number and AMC pricing for the VX-600 wear ring set, confirmed against the serial number.",
    timeline: [
      { at: "26 Aug 14:02", who: "Priya Deshmukh", text: "Emailed asking for the wear ring part number." },
      { at: "26 Aug 14:03", who: "Veltrix Assistant", text: "Matched serial VX600-2022-04120 → WR-600-B set. Confirmed 22% AMC discount applies." },
      { at: "26 Aug 14:43", who: "Priya Deshmukh", text: "Confirmed. Raising the PO." },
    ],
  },
  {
    id: "CS-4",
    number: "00042318",
    subject: "Quarterly preventive maintenance visit — Q3 scheduling",
    accountId: "ACC-1002",
    contactId: "CON-2003",
    productLine: "Centrifugal Pumps",
    failureType: "Preventive maintenance",
    priority: "P3 — Question",
    status: "Closed",
    origin: "Partner Portal",
    opened: "12 Aug 2026",
    slaTier: "Platinum",
    milestone: "Met",
    milestoneState: "Met",
    owner: "Field Service Scheduling",
    summary:
      "Third of four contracted PM visits for the year, scheduled against the Line 3 shutdown window.",
    timeline: [
      { at: "12 Aug 10:05", who: "Anil Menon", text: "Requested the PM visit be aligned to the 18–19 September shutdown." },
      { at: "13 Aug 09:30", who: "Field Service Scheduling", text: "Confirmed for 18 September, two engineers, 0700–1700." },
    ],
  },
  {
    id: "CS-5",
    number: "00041902",
    subject: "VX-450 elevated bearing temperature after re-commissioning",
    accountId: "ACC-1002",
    contactId: "CON-2001",
    assetSerial: "VX450-2023-08812",
    productLine: "Centrifugal Pumps",
    failureType: "Bearing / vibration",
    priority: "P2 — Degraded",
    status: "Closed",
    origin: "Phone",
    opened: "19 Jun 2026",
    slaTier: "Platinum",
    milestone: "Met",
    milestoneState: "Met",
    owner: "Rajat S. — Veltrix Service",
    summary:
      "Drive-end bearing running 18°C above baseline after the June seal replacement. Traced to over-greasing during re-commissioning.",
    timeline: [
      { at: "19 Jun 08:20", who: "Rajesh Kulkarni", text: "Reported the temperature rise on the trend." },
      { at: "19 Jun 15:10", who: "Rajat S.", text: "Grease purged to the specified quantity; temperature back within 4°C of baseline." },
    ],
  },
];

/* ---------------------------- helpers ----------------------------- */

export const byId = <T extends { id: string }>(xs: T[], id: string) =>
  xs.find((x) => x.id === id);

export const accountName = (id: string) =>
  ACCOUNTS.find((a) => a.id === id)?.name ?? id;

export const tierColour = (t: SlaTier) =>
  t === "Platinum"
    ? { bg: "bg-vx-navy", text: "text-white" }
    : t === "Gold"
      ? { bg: "bg-vx-amber-2", text: "text-vx-amber" }
      : { bg: "bg-vx-mist", text: "text-vx-steel" };
