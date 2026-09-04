import type { Article } from "./kb-types";

export const GENERAL_ARTICLES: Article[] = [
  /* ----------------------- control panels ----------------------- */
  {
    id: "KB-2210",
    title: "CP-100 trip codes E01–E20 reference",
    slug: "cp-100-trip-codes-reference",
    category: "Control Panels — Reference",
    productLine: "Control Panels",
    type: "Reference",
    summary:
      "Complete list of CP-100 protection trip codes with meaning, likely cause and the first action for each.",
    keywords: ["CP-100", "trip", "code", "E14", "fault", "HMI", "protection", "alarm"],
    models: ["CP-100", "CP-100X"],
    updated: "24 Aug 2026",
    views: 5240,
    helpful: 95,
    related: ["KB-2221", "KB-2234", "KB-1502"],
    body: `
<h3>How to read a trip</h3>
<p>The CP-100 HMI shows the active code plus the feeder number. Codes are latched — the panel will not permit a restart until the trip is acknowledged at the HMI, which is deliberate. Note the code <em>and</em> the feeder before you reset; the log holds only the last eight events.</p>

<table>
<tr><th>Code</th><th>Meaning</th><th>Most likely cause</th><th>First action</th></tr>
<tr><td>E01</td><td>Control supply undervoltage</td><td>Failed 24 V PSU or blown control fuse</td><td>Measure at the PSU output terminals</td></tr>
<tr><td>E02</td><td>Phase failure</td><td>Blown line fuse, loose incomer termination</td><td>Check all three phases at the incomer</td></tr>
<tr><td>E03</td><td>Phase sequence incorrect</td><td>Supply re-terminated after works</td><td>Correct at the incomer, not at the motor</td></tr>
<tr><td>E04</td><td>Voltage unbalance &gt; 3%</td><td>Upstream supply problem</td><td>Log the readings; escalate to your electrical authority</td></tr>
<tr><td>E05</td><td>Overvoltage</td><td>Transformer tap or light-load condition</td><td>Record duration and magnitude</td></tr>
<tr><td>E06</td><td>Undervoltage sustained</td><td>Voltage dip on a large start elsewhere</td><td>Check the start sequence of other plant</td></tr>
<tr><td>E07</td><td>Thermal overload</td><td>Genuine mechanical overload</td><td>Do not simply reset — find the load</td></tr>
<tr><td>E08</td><td>Instantaneous overcurrent</td><td>Short circuit or stalled rotor</td><td>Megger before re-energising — KB-1511</td></tr>
<tr><td>E09</td><td>Undercurrent / dry run</td><td>Pump running with no liquid</td><td>Check suction and prime</td></tr>
<tr><td>E10</td><td>Start time exceeded</td><td>Excessive inertia or a partially seized machine</td><td>Turn the shaft by hand</td></tr>
<tr><td>E11</td><td>Starts per hour exceeded</td><td>Control loop hunting</td><td>Review the level or pressure setpoints</td></tr>
<tr><td>E12</td><td>Motor thermistor trip</td><td>Winding over-temperature</td><td>See KB-1502. Never bypass.</td></tr>
<tr><td>E13</td><td>Thermistor circuit open</td><td>Broken sensor wiring</td><td>Continuity-check the thermistor loop</td></tr>
<tr><td>E14</td><td>Earth fault</td><td>Insulation failure in cable or winding</td><td>Insulation test — KB-2221</td></tr>
<tr><td>E15</td><td>Contactor failed to close</td><td>Coil failure or auxiliary contact</td><td>Check the coil and the feedback contact</td></tr>
<tr><td>E16</td><td>Contactor welded closed</td><td>Contact welding after a fault clearance</td><td>Replace the contactor — do not dress contacts</td></tr>
<tr><td>E17</td><td>Emergency stop active</td><td>A field E-stop is latched</td><td>Locate and release the correct station</td></tr>
<tr><td>E18</td><td>Enclosure over-temperature</td><td>Filter blocked or fan failed</td><td>Clean filters — KB-2245</td></tr>
<tr><td>E19</td><td>Communications loss to PLC</td><td>Network or terminating resistor</td><td>Check the fieldbus segment</td></tr>
<tr><td>E20</td><td>Internal self-test failure</td><td>Controller module fault</td><td>Raise a case — module replacement</td></tr>
</table>

<div class="callout danger"><p>E07, E08, E12 and E14 are protective trips that indicate a real fault. Repeated resetting without diagnosis is how a repairable fault becomes a replacement, and it will invalidate warranty cover on the affected feeder.</p></div>
`,
  },
  {
    id: "KB-2221",
    title: "CP-100 earth fault (E14) — troubleshooting",
    slug: "cp-100-earth-fault-e14",
    category: "Control Panels — Troubleshooting",
    productLine: "Control Panels",
    type: "Troubleshooting",
    summary:
      "How to localise an E14 earth fault between the panel, the cable and the motor, with the readings to capture before raising a case.",
    keywords: ["E14", "earth fault", "insulation", "megger", "CP-100", "trip on start"],
    models: ["CP-100", "CP-100X"],
    updated: "01 Sep 2026",
    views: 2960,
    helpful: 93,
    related: ["KB-2210", "KB-1511", "KB-9001"],
    body: `
<div class="callout danger"><p>Isolate and lock off at the incomer before any test. Prove dead. Follow KB-9001.</p></div>

<h3>Intermittent versus solid</h3>
<p>An E14 that trips only on start usually indicates moisture or a partially tracked termination that flashes over at the start-current inrush. A solid trip that recurs immediately usually indicates a failed winding or a damaged cable. The diagnostic path is the same; the likely outcome differs.</p>

<h3>Localising the fault</h3>
<ol>
<li><strong>Test the whole circuit.</strong> With the feeder isolated, megger from each phase to earth at the outgoing terminals — 500&nbsp;V DC, 1 minute. Record all three.</li>
<li><strong>Split at the motor terminal box.</strong> Disconnect the motor tails and repeat the test on the cable alone, then on the motor alone. This one step resolves most cases.</li>
<li><strong>Cable low, motor good</strong> → cable damage. Common at gland entries, at any point crushed by later works, and where a cable passes through a wall.</li>
<li><strong>Motor low, cable good</strong> → winding or terminal box. Check for water ingress and tracking in the box before condemning the winding; a dried-out and cleaned terminal box recovers a surprising number of motors.</li>
<li><strong>Both good</strong> → the fault is in the panel. Check the outgoing terminal insulation, the CT wiring, and for swarf or a dropped washer bridging to the gland plate.</li>
</ol>

<h3>Readings to attach when you raise the case</h3>
<ul>
<li>Insulation resistance L1/L2/L3 to earth, whole circuit, with the test voltage used.</li>
<li>The same three readings split at the motor terminal box.</li>
<li>Winding temperature at the time of test, and whether the machine was hot or cold.</li>
<li>How long the fault has been present and whether it trips on start or while running.</li>
<li>Anything that changed on the plant in the preceding fortnight — civil works, washdowns, cable pulls.</li>
</ul>
<p>With those five items a Veltrix engineer can usually tell you whether you need a cable, a rewind, or a panel visit without attending site first.</p>
`,
  },
  {
    id: "KB-2234",
    title: "Replacing a CP-100 feeder module",
    slug: "replacing-cp-100-feeder-module",
    category: "Control Panels — Repair procedures",
    productLine: "Control Panels",
    type: "How-To",
    summary:
      "Withdrawing and replacing a plug-in feeder module on the CP-100, including the address setting that is easy to forget.",
    keywords: ["feeder", "module", "replace", "CP-100", "withdrawable", "address", "DIP switch"],
    models: ["CP-100", "CP-100X"],
    updated: "16 Jul 2026",
    views: 980,
    helpful: 89,
    related: ["KB-2210", "KB-2245", "KB-9001"],
    body: `
<div class="callout danger"><p>The busbar chamber remains live when an individual feeder is isolated. Only isolate at the incomer, prove dead, and lock off before withdrawing a module.</p></div>

<h3>Before you start</h3>
<ul>
<li>Confirm the replacement module part number matches — <code>FM-100-A</code> (up to 45&nbsp;kW) or <code>FM-100-B</code> (55–160&nbsp;kW). They are not interchangeable.</li>
<li>Photograph the existing DIP switch settings and the HMI feeder configuration page.</li>
<li>Note the feeder number and the equipment it serves. Label the outgoing cores before disconnecting.</li>
</ul>

<h3>Procedure</h3>
<ol>
<li>Isolate at the incomer, prove dead at the busbar test points, apply locks and tags.</li>
<li>Turn the module's cam lock a quarter turn anticlockwise and pull the handle to the disconnected position. The primary and auxiliary contacts separate in sequence — do not force it.</li>
<li>Disconnect the outgoing cores and the control multiway plug.</li>
<li>Withdraw the module on its rails. Modules above 55&nbsp;kW need two people or the lifting handle.</li>
<li>Set the DIP switches on the new module to match the photograph. <strong>This sets the feeder address.</strong> A module fitted with the wrong address will appear to work and will report against the wrong feeder on the HMI and in the trip log.</li>
<li>Insert the new module, reconnect the multiway and the outgoing cores to the terminal torques on the module label.</li>
<li>Engage the cam lock fully. The mechanical interlock should prevent the door closing if it is not fully home — if the door closes easily, check the lock.</li>
<li>Restore supply, acknowledge the expected E15/E19 startup events, and confirm the feeder appears at the correct address on the HMI.</li>
<li>Run the feeder off-load, then on-load, and confirm current on all three phases.</li>
</ol>

<h3>Afterwards</h3>
<p>Record the module serial against the panel asset in the portal. If the panel is within warranty, retain the failed module — it must be returned for the warranty claim to be settled. See KB-3001.</p>
`,
  },
  {
    id: "KB-2245",
    title: "CP-100 enclosure sealing, filters and gland torque",
    slug: "cp-100-enclosure-sealing-filters",
    category: "Control Panels — Maintenance",
    productLine: "Control Panels",
    type: "How-To",
    summary:
      "Maintaining the IP54 rating on a CP-100 in a dusty plant: filter intervals, door seal checks, gland torques and the E18 over-temperature link.",
    keywords: ["IP54", "filter", "enclosure", "seal", "gland", "dust", "E18", "cooling"],
    models: ["CP-100", "CP-100X"],
    updated: "09 May 2026",
    views: 742,
    helpful: 85,
    related: ["KB-2210", "KB-2234"],
    body: `
<h3>Why this matters more than it looks</h3>
<p>Nearly every CP-100 E18 over-temperature trip we attend traces back to a blocked intake filter. Filters are a five-minute job that prevents a shutdown, and in a steel plant environment the standard three-month interval is usually too long.</p>

<h3>Filter maintenance</h3>
<table>
<tr><th>Environment</th><th>Inspect</th><th>Replace</th></tr>
<tr><td>Clean, air-conditioned MCC room</td><td>6 months</td><td>12 months</td></tr>
<tr><td>General plant</td><td>3 months</td><td>6 months</td></tr>
<tr><td>Dusty — steel, cement, foundry</td><td>Monthly</td><td>3 months</td></tr>
</table>
<p>Filter mat part number <code>FLT-100-S</code> (standard) or <code>FLT-100-F</code> (fine, for foundry environments — note it restricts airflow, so pair it with the shorter interval).</p>

<h3>Door seal and enclosure checks</h3>
<ul>
<li>Run a hand around the door seal for flat spots or hardening. A compressed seal that does not spring back has lost its rating.</li>
<li>Check that every unused gland entry has a blanking plug fitted, not tape.</li>
<li>Confirm the door earth bond strap is intact — it is often the first thing damaged during panel work.</li>
</ul>

<h3>Gland torques</h3>
<table>
<tr><th>Gland size</th><th>Body to plate</th><th>Compression nut</th></tr>
<tr><td>M20</td><td>8 Nm</td><td>6 Nm</td></tr>
<tr><td>M25</td><td>12 Nm</td><td>9 Nm</td></tr>
<tr><td>M32</td><td>18 Nm</td><td>14 Nm</td></tr>
<tr><td>M40</td><td>25 Nm</td><td>20 Nm</td></tr>
</table>

<div class="callout"><p>Cables entering from below with no drip loop will wick water into the enclosure along the sheath. If your CP-100 is in a washdown area, form a drip loop outside the panel — it costs nothing and prevents the E14 trips that follow every washdown.</p></div>
`,
  },

  /* ------------------- warranty / AMC / entitlement ------------------- */
  {
    id: "KB-3001",
    title: "What your AMC covers — and what it doesn't",
    slug: "what-your-amc-covers",
    category: "Contracts & Entitlements",
    productLine: "Commercial",
    type: "Policy",
    summary:
      "Plain-language scope of a Veltrix Annual Maintenance Contract: included parts and labour, exclusions, and the common misunderstandings.",
    keywords: ["AMC", "contract", "coverage", "warranty", "included", "excluded", "chargeable"],
    models: ["All"],
    updated: "12 Aug 2026",
    views: 6180,
    helpful: 92,
    related: ["KB-3010", "KB-3021", "KB-3033", "KB-4015"],
    body: `
<h3>What is included on every AMC tier</h3>
<ul>
<li>Scheduled preventive maintenance visits — frequency by tier (see KB-3010).</li>
<li>Breakdown attendance within the contracted response time.</li>
<li>Labour and travel for covered assets.</li>
<li>Wear parts: mechanical seals, bearings, wear rings, gaskets and O-rings.</li>
<li>Telephone and portal technical support during business hours, or 24×7 on Platinum.</li>
<li>Discounted pricing on parts outside the wear-part list.</li>
</ul>

<h3>What is not included</h3>
<ul>
<li><strong>Consequential damage.</strong> If a pump runs dry because a level switch elsewhere failed, the resulting damage is chargeable.</li>
<li><strong>Damage from operation outside the design duty</strong> — running off-curve, dry running, cavitation caused by a system change, or pumping a fluid other than that specified.</li>
<li><strong>Impellers, casings and shafts</strong>, unless the failure is traced to a defect in a covered part.</li>
<li><strong>Third-party work.</strong> Assets repaired by another party since the last Veltrix visit fall outside cover until re-inspected.</li>
<li><strong>Modifications</strong> not agreed in writing, including impeller trims and non-standard seal fits.</li>
<li><strong>Civil, structural and electrical infrastructure</strong> up to the equipment terminals.</li>
</ul>

<h3>The three things customers most often get wrong</h3>
<ol>
<li><strong>"Everything on site is covered."</strong> Cover is per asset, listed by serial number on the contract. Adding equipment mid-term is straightforward but is not automatic — check your asset list in the portal.</li>
<li><strong>"The AMC covers the motor because it drives our pump."</strong> Motors are covered only where explicitly listed. On the Konark Pune contract, motors above 30&nbsp;kW are included; smaller motors are not.</li>
<li><strong>"A warranty claim and an AMC call are the same thing."</strong> They are settled differently, and warranty claims usually require the failed part to be returned. Say which you believe applies when you raise the case and we will confirm.</li>
</ol>

<div class="callout"><p>If you are unsure whether a specific failure is covered, raise the case anyway and say so. We would rather assess it than have you defer a repair on a critical asset while you work out who pays.</p></div>
`,
  },
  {
    id: "KB-3010",
    title: "How SLA tiers work: Platinum, Gold and Standard",
    slug: "how-sla-tiers-work",
    category: "Contracts & Entitlements",
    productLine: "Commercial",
    type: "Reference",
    summary:
      "Response and restore commitments by tier, how the clock is measured, what escalation looks like, and what happens if we miss.",
    keywords: ["SLA", "response time", "restore", "Platinum", "Gold", "Standard", "escalation", "milestone"],
    models: ["All"],
    updated: "12 Aug 2026",
    views: 5470,
    helpful: 94,
    related: ["KB-3001", "KB-3021", "KB-3033"],
    body: `
<h3>The commitments</h3>
<table>
<tr><th></th><th>Platinum</th><th>Gold</th><th>Standard</th></tr>
<tr><td>Response — P1</td><td>4 hours</td><td>8 hours</td><td>24 hours</td></tr>
<tr><td>Restore — P1</td><td>24 hours</td><td>48 hours</td><td>5 working days</td></tr>
<tr><td>Response — P2</td><td>8 hours</td><td>16 hours</td><td>2 working days</td></tr>
<tr><td>Coverage window</td><td>24 × 7</td><td>06:00 – 22:00, 7 days</td><td>09:00 – 18:00, Mon–Sat</td></tr>
<tr><td>Preventive visits / year</td><td>4</td><td>2</td><td>1</td></tr>
<tr><td>On-site attendance</td><td>Included</td><td>Included</td><td>Chargeable</td></tr>
<tr><td>Spares discount</td><td>22%</td><td>12%</td><td>0%</td></tr>
<tr><td>Named account engineer</td><td>Yes</td><td>No</td><td>No</td></tr>
</table>

<h3>How the clock is measured</h3>
<ul>
<li><strong>Response</strong> starts when the case is created — by phone, email, portal or chat — and stops when a Veltrix engineer makes substantive contact. An automated acknowledgement does not stop the clock.</li>
<li><strong>Restore</strong> means the asset is returned to service, which may be with a temporary measure while a permanent repair is scheduled. Restoring to service and closing the case are different events.</li>
<li>The clock pauses while we are waiting on you — site access, a permit, an isolation, or information we have asked for. You will see the case status change to <em>Awaiting your reply</em> when this happens, and the milestone display in the portal reflects it.</li>
<li>Outside the coverage window for your tier, the clock does not run. A Standard-tier case raised at 19:00 on Saturday starts counting at 09:00 on Monday.</li>
</ul>

<h3>Priority is set by impact, not by who is asking</h3>
<p>P1 means production is stopped or a safety function is compromised. P2 means degraded operation with a workaround. P3 is a question or a planned request. If we classify a case differently from how you raised it, the case will say so and why — and you can push back through the case, which is logged.</p>

<h3>If we miss a commitment</h3>
<p>A missed milestone escalates automatically to the service manager, and on Platinum to your named account engineer, without you needing to chase. You will see the escalation on the case timeline. Service credits, where your contract includes them, are calculated quarterly and applied to the following invoice — you do not need to claim them.</p>
`,
  },
  {
    id: "KB-3021",
    title: "Checking warranty or AMC status from a serial number",
    slug: "checking-warranty-status-serial",
    category: "Contracts & Entitlements",
    productLine: "Commercial",
    type: "How-To",
    summary:
      "Where to find the serial number on each product line, and how to check coverage in the portal in under a minute.",
    keywords: ["serial number", "warranty", "AMC", "coverage", "check", "nameplate", "expiry"],
    models: ["All"],
    updated: "20 Aug 2026",
    views: 4390,
    helpful: 96,
    related: ["KB-3001", "KB-3010", "KB-4002"],
    body: `
<h3>Where the serial number is</h3>
<table>
<tr><th>Product</th><th>Location</th><th>Format</th></tr>
<tr><td>VX-series pumps</td><td>Stainless plate on the bearing housing, drive end</td><td><code>VX450-2023-08812</code></td></tr>
<tr><td>VM-series motors</td><td>Nameplate on the frame, opposite the terminal box</td><td><code>VM090-2024-11907</code></td></tr>
<tr><td>CP-100 panels</td><td>Inside the door, upper left of the gland plate</td><td><code>CP100-2025-00641</code></td></tr>
</table>
<p>The format is always <em>model – year of manufacture – sequence</em>. If the plate is painted over or corroded, the same number is stamped into the casing foot on pumps and etched on the terminal block carrier on motors.</p>

<h3>Checking coverage</h3>
<ol>
<li>Open <strong>Installed base</strong> in the portal.</li>
<li>Search the serial number, or filter by plant location if you are working from a list.</li>
<li>The asset record shows the governing contract, the SLA tier, the expiry date, whether on-site attendance is included, and the full case history for that specific unit.</li>
</ol>
<p>You can also simply ask the assistant — "is VX450-2023-08812 still under AMC?" — and it will answer from the same contract data rather than creating a case.</p>

<h3>If the serial isn't found</h3>
<ul>
<li>Check for transposed digits — the year block is four digits and the sequence is five.</li>
<li>Equipment bought through a distributor may be registered under the distributor's account. Raise a case with a photograph of the nameplate and we will re-point it.</li>
<li>Assets added mid-contract are visible once the contract amendment is processed, usually within two working days.</li>
</ul>

<div class="callout"><p>Photograph the nameplate of every asset at commissioning and keep it with your handover pack. It saves an hour of scraping paint off a plate on the day you actually need the number.</p></div>
`,
  },
  {
    id: "KB-3033",
    title: "Renewing, extending or upgrading an AMC",
    slug: "renewing-extending-upgrading-amc",
    category: "Contracts & Entitlements",
    productLine: "Commercial",
    type: "FAQ",
    summary:
      "Timelines and options for AMC renewal, adding assets mid-term, upgrading a tier, and what happens if cover lapses.",
    keywords: ["renewal", "renew", "extend", "upgrade", "tier", "lapse", "expiry", "add asset"],
    models: ["All"],
    updated: "12 Aug 2026",
    views: 2210,
    helpful: 88,
    related: ["KB-3001", "KB-3010"],
    body: `
<h3>When renewal starts</h3>
<p>Your account engineer will contact you 90 days before expiry with a renewal quotation based on the asset list as it then stands. Contracts do not auto-renew. You will see an <em>Expiring soon</em> flag against the contract in the portal from 90 days out.</p>

<h3>Adding assets mid-term</h3>
<p>New equipment can be added at any point; the contract value is pro-rated to the existing end date so that everything expires together. Send the serial numbers through a portal case and the amendment is usually processed within two working days. Newly commissioned Veltrix equipment carries its own warranty, so adding it to an AMC before the warranty expires is generally not worth doing — ask us and we will tell you honestly which applies.</p>

<h3>Upgrading a tier</h3>
<p>Tier upgrades take effect from the first of the following month and are pro-rated. The most common upgrade is Gold to Platinum on a single critical line rather than across a whole site — tiers can differ per asset within one contract, so you can put Platinum cover only where downtime actually costs you.</p>

<h3>If cover lapses</h3>
<ul>
<li>Support reverts to time-and-materials at standard rates, with no response commitment.</li>
<li>Reinstating cover within 30 days of expiry requires no inspection.</li>
<li>After 30 days, assets must be inspected before cover resumes, and the inspection is chargeable.</li>
<li>Any failure that occurred during the lapsed period is not retrospectively covered.</li>
</ul>

<h3>Frequently asked</h3>
<p><strong>Can we pay quarterly?</strong> Yes, on annual contracts above a threshold your account engineer will confirm.</p>
<p><strong>Can we transfer cover if we move a pump between plants?</strong> Yes, provided both sites are on your account. Tell us before the move — cover follows the serial number, not the location, but the response commitment depends on the site.</p>
<p><strong>What happens to cover if we sell the equipment?</strong> Contracts are not transferable to a third party without written agreement. Talk to your account engineer before the sale.</p>
`,
  },

  /* ------------------------ spares & ordering ------------------------ */
  {
    id: "KB-4002",
    title: "Finding the right spare part number from your serial number",
    slug: "finding-spare-part-number",
    category: "Spare Parts & Ordering",
    productLine: "All products",
    type: "How-To",
    summary:
      "Why catalogue part numbers are not enough, how to get the correct part for the unit you actually own, and the most-ordered parts by model.",
    keywords: ["spare part", "part number", "order", "seal kit", "bearing", "impeller", "BOM"],
    models: ["All"],
    updated: "26 Aug 2026",
    views: 3870,
    helpful: 94,
    related: ["KB-3021", "KB-4015", "KB-1182", "KB-1168"],
    body: `
<h3>Always start from the serial number</h3>
<p>Veltrix equipment is built to order, which means two pumps of the same model on the same skid can have different impeller diameters, seal variants and material specifications. A catalogue part number will often physically fit and still be wrong. The as-built bill of materials is held against the serial number — start there and you will not order twice.</p>

<h3>How to look it up</h3>
<ol>
<li>Open <strong>Installed base</strong> and search the serial number.</li>
<li>Open the asset and use <strong>Spare parts</strong> to see the as-built list for that unit.</li>
<li>Prices shown already include your AMC spares discount where a contract covers the asset.</li>
</ol>
<p>Or ask the assistant directly — "which seal kit fits VX450-2023-08812" — and it will answer from the same bill of materials.</p>

<h3>Most-ordered parts</h3>
<table>
<tr><th>Model</th><th>Part</th><th>Number</th><th>Typical stock</th></tr>
<tr><td>VX-450</td><td>Cartridge seal kit</td><td>SK-450-M</td><td>Pune depot</td></tr>
<tr><td>VX-450</td><td>Bearing set (DE + NDE)</td><td>BS-450-02</td><td>Pune depot</td></tr>
<tr><td>VX-450</td><td>Wear ring set</td><td>WR-450-A</td><td>Regional</td></tr>
<tr><td>VX-450</td><td>Shaft sleeve</td><td>SL-450-06</td><td>Regional</td></tr>
<tr><td>VX-600</td><td>Wear ring set</td><td>WR-600-B</td><td>Regional</td></tr>
<tr><td>VX-600</td><td>Casing gasket set</td><td>GK-600-04</td><td>Pune depot</td></tr>
<tr><td>VM-090</td><td>Bearing set</td><td>BS-VM090-01</td><td>Pune depot</td></tr>
<tr><td>CP-100</td><td>Feeder module (≤45 kW)</td><td>FM-100-A</td><td>Regional</td></tr>
<tr><td>CP-100</td><td>Filter mat</td><td>FLT-100-S</td><td>Pune depot</td></tr>
</table>

<div class="callout"><p><strong>Recommended shelf stock</strong> for a critical duty pump: one seal kit, one bearing set and one casing gasket set per model on site. Those three items cover the large majority of unplanned interventions and remove the lead time from your critical path entirely.</p></div>
`,
  },
  {
    id: "KB-4015",
    title: "Spare parts lead times and emergency dispatch",
    slug: "spare-parts-lead-times",
    category: "Spare Parts & Ordering",
    productLine: "All products",
    type: "Reference",
    summary:
      "Indicative lead times by part category and depot, how emergency dispatch works on a P1 case, and how AMC cover changes it.",
    keywords: ["lead time", "delivery", "dispatch", "emergency", "depot", "stock", "courier"],
    models: ["All"],
    updated: "26 Aug 2026",
    views: 2540,
    helpful: 90,
    related: ["KB-4002", "KB-3010", "KB-3001"],
    body: `
<h3>Indicative lead times</h3>
<table>
<tr><th>Category</th><th>Ex-depot stock</th><th>Ex-works</th><th>Made to order</th></tr>
<tr><td>Seal kits, gaskets, O-rings</td><td>Same day</td><td>2–3 days</td><td>—</td></tr>
<tr><td>Bearings, sleeves</td><td>Same day</td><td>2–4 days</td><td>—</td></tr>
<tr><td>Wear rings</td><td>2–3 days</td><td>5–7 days</td><td>3 weeks</td></tr>
<tr><td>Impellers</td><td>—</td><td>2–3 weeks</td><td>6–8 weeks</td></tr>
<tr><td>CP-100 feeder modules</td><td>2–3 days</td><td>1 week</td><td>—</td></tr>
<tr><td>Motors (stock ratings)</td><td>—</td><td>1–2 weeks</td><td>8–10 weeks</td></tr>
</table>
<p>Depots: Pune, Chennai, Ahmedabad, Kolkata. The portal shows which depot holds the part for your delivery address.</p>

<h3>Emergency dispatch</h3>
<p>On a P1 case against an asset with Platinum or Gold cover, wear parts held at your nearest depot are dispatched without waiting for a purchase order. You will receive the paperwork afterwards. This is the single biggest practical difference between the tiers and the reason critical-line assets are worth putting on Platinum.</p>
<ul>
<li><strong>Platinum</strong> — depot stock dispatched within 2 hours of case creation, 24×7, courier or dedicated vehicle.</li>
<li><strong>Gold</strong> — dispatched same working day if the case is raised before 15:00.</li>
<li><strong>Standard</strong> — dispatched on receipt of a purchase order.</li>
</ul>

<h3>What slows an order down</h3>
<ol>
<li>A part number quoted from a catalogue rather than from the serial number's bill of materials — the mismatch is caught at picking and the order is held.</li>
<li>A delivery address that differs from the account's registered site, which triggers a verification step.</li>
<li>Orders placed by email to an individual rather than through the portal or the service line. If that person is on leave, the order sits.</li>
</ol>

<div class="callout"><p>If a line is down and you are waiting on a part, say so in the case. Priority is set from stated impact — an order that is holding up production is expedited, but only if we know that it is.</p></div>
`,
  },

  /* ------------------------- commissioning ------------------------- */
  {
    id: "KB-5004",
    title: "Pre-commissioning checklist for VX-series pump sets",
    slug: "pre-commissioning-checklist-vx",
    category: "Installation & Commissioning",
    productLine: "Centrifugal Pumps",
    type: "How-To",
    summary:
      "The checks to complete before a new VX-series pump set is first energised, and the baseline readings to record for the rest of its life.",
    keywords: ["commissioning", "installation", "checklist", "startup", "baseline", "handover"],
    models: ["VX-220", "VX-450", "VX-600"],
    updated: "03 Aug 2026",
    views: 1420,
    helpful: 93,
    related: ["KB-1156", "KB-1511", "KB-5012", "KB-9001"],
    body: `
<h3>Mechanical</h3>
<ul>
<li>Baseplate grouted, level within 0.2&nbsp;mm/m, and fully cured.</li>
<li>Suction and discharge pipework independently supported. The pump carries no pipe weight.</li>
<li>Pipe strain checked with a dial gauge — under 0.05&nbsp;mm movement when flanges are slackened.</li>
<li>Soft foot checked and shimmed at every foot.</li>
<li>Cold alignment within tolerance, recorded — see KB-1156.</li>
<li>Coupling spacer fitted, guard in place, shaft turns freely by hand.</li>
<li>Suction strainer fitted and clean. Note it in the handover pack: temporary strainers must be removed after the flushing period or they will blind and cause cavitation.</li>
</ul>

<h3>Electrical</h3>
<ul>
<li>Insulation resistance tested and recorded — see KB-1511.</li>
<li>Rotation direction confirmed with the coupling disconnected.</li>
<li>Overload setting matched to the motor nameplate FLC, not to the cable rating.</li>
<li>Thermistor circuit continuity proven.</li>
<li>VFD parameters loaded and saved — see KB-1520.</li>
<li>Earth bonding continuity confirmed at the motor and the pump.</li>
</ul>

<h3>Process</h3>
<ul>
<li>System flushed and the flushing strainer removed.</li>
<li>Casing vented and fully primed. Never start dry.</li>
<li>Suction valve fully open; discharge valve cracked open for start.</li>
<li>Seal flush or quench connected where specified.</li>
</ul>

<h3>Baseline readings to record — this is the part people skip</h3>
<table>
<tr><th>Reading</th><th>Where</th></tr>
<tr><td>Suction and discharge pressure</td><td>At the flanges, at the design duty</td></tr>
<tr><td>Motor current, all three phases</td><td>At the panel, at the design duty</td></tr>
<tr><td>Bearing temperature DE and NDE</td><td>At the housing, after 2 hours running</td></tr>
<tr><td>Ambient temperature</td><td>Alongside the bearing reading</td></tr>
<tr><td>Vibration, mm/s RMS</td><td>DE and NDE, horizontal / vertical / axial</td></tr>
<tr><td>Running frequency</td><td>From the drive, if VFD-driven</td></tr>
</table>

<div class="callout"><p>Attach these baselines to the asset record in the portal. Every troubleshooting article in this knowledge base asks you to compare against baseline — a set that was never recorded is the most common reason a remote diagnosis turns into a site visit.</p></div>
`,
  },
  {
    id: "KB-5012",
    title: "Handover documentation and what to keep",
    slug: "handover-documentation",
    category: "Installation & Commissioning",
    productLine: "All products",
    type: "Reference",
    summary:
      "What is in a Veltrix handover pack, which parts you will actually need later, and how to get a replacement if it has gone missing.",
    keywords: ["handover", "documentation", "manual", "O&M", "certificate", "curve", "GA drawing"],
    models: ["All"],
    updated: "03 Aug 2026",
    views: 890,
    helpful: 87,
    related: ["KB-5004", "KB-3021", "KB-1520"],
    body: `
<h3>What you receive</h3>
<ul>
<li>General arrangement and foundation drawings.</li>
<li>The <strong>as-built performance curve</strong> for the impeller diameter actually fitted.</li>
<li>Bill of materials against the serial number.</li>
<li>Test certificates — hydrostatic, performance, and motor routine test.</li>
<li>Operation and maintenance manual for the model.</li>
<li>Commissioning report with the baseline readings.</li>
<li>Alignment record.</li>
<li>VFD parameter file, where a drive is supplied.</li>
<li>Warranty certificate and its start date.</li>
</ul>

<h3>The four items you will genuinely need later</h3>
<ol>
<li><strong>The as-built curve.</strong> Without it you cannot tell whether a pump is underperforming or simply operating at a different point. The catalogue curve is not the same thing.</li>
<li><strong>The commissioning baselines.</strong> Bearing temperature and vibration mean nothing in isolation.</li>
<li><strong>The bill of materials.</strong> Saves ordering the wrong seal.</li>
<li><strong>The VFD parameter file.</strong> Turns a recommissioning into an upload.</li>
</ol>
<p>Everything else is useful; those four are the ones whose absence costs you a shift.</p>

<h3>If the pack is missing</h3>
<p>All of it is reproducible from the serial number. Raise a portal case with the serial numbers and the site, and we will reissue electronically — usually within two working days, and at no charge for equipment under warranty or AMC. It is worth doing as a batch exercise for a whole plant rather than one asset at a time.</p>

<div class="callout"><p>Keep the electronic copies somewhere that is not one engineer's laptop. The most common version of this request we receive is a plant that has changed maintenance contractor and lost the lot.</p></div>
`,
  },

  /* ------------------------------ safety ------------------------------ */
  {
    id: "KB-9001",
    title: "Lockout / tagout before working on a Veltrix pump set",
    slug: "lockout-tagout-pump-set",
    category: "Safety",
    productLine: "All products",
    type: "Safety",
    summary:
      "The isolation sequence to follow before any mechanical or electrical work on a Veltrix pump, motor or panel, including stored-energy hazards specific to this equipment.",
    keywords: ["lockout", "tagout", "LOTO", "isolation", "safety", "permit", "stored energy"],
    models: ["All"],
    updated: "14 Jul 2026",
    views: 3120,
    helpful: 97,
    related: ["KB-1182", "KB-2234", "KB-2221"],
    body: `
<div class="callout danger"><p>This article summarises good practice. It does not replace your site's permit-to-work system or your legal duties. Where the two differ, your site procedure takes precedence.</p></div>

<h3>Sequence</h3>
<ol>
<li><strong>Plan.</strong> Identify every energy source: electrical supply, process pressure, stored liquid, thermal, and gravitational or spring-stored energy in valves and actuators.</li>
<li><strong>Notify.</strong> Tell the control room and anyone affected before you isolate. Confirm the duty has been transferred to a standby unit where one exists.</li>
<li><strong>Shut down</strong> using the normal stop, not the emergency stop, unless there is an immediate hazard.</li>
<li><strong>Isolate electrically</strong> at the feeder and the local isolator. On VFD-driven sets, isolate upstream of the drive.</li>
<li><strong>Lock and tag</strong> every isolation point. One lock per person working, on a hasp. Never rely on someone else's lock.</li>
<li><strong>Isolate the process.</strong> Close and lock the suction and discharge valves. Where a single valve is the only isolation on a hazardous service, double block and bleed.</li>
<li><strong>Release stored energy.</strong> Drain the casing through the bottom plug and open the vent. Confirm zero at the pressure gauge — do not take the gauge on trust if it has been isolated.</li>
<li><strong>Prove dead.</strong> Test the electrical isolation with a proving unit, test the circuit, then re-prove the tester.</li>
<li><strong>Attempt a start</strong> from the local control station to confirm the isolation is effective.</li>
</ol>

<h3>Hazards specific to this equipment</h3>
<ul>
<li><strong>Retained pressure in the seal chamber.</strong> A stopped pump with closed valves can hold pressure. The gland nuts are the last thing to slacken, and slacken them evenly.</li>
<li><strong>Hot liquid.</strong> Cooling-water duty above 60&nbsp;°C will flash on release. Allow the casing to cool and drain to a safe point.</li>
<li><strong>VFD DC bus.</strong> Capacitors retain a lethal charge after isolation. Observe the discharge time on the drive label — typically five minutes — and confirm with a meter.</li>
<li><strong>CP-100 busbar chamber.</strong> Remains live when an individual feeder is isolated. Only isolation at the incomer makes the busbar safe.</li>
<li><strong>Back-driving.</strong> A pump in a system with a common header can be spun backwards by another running pump if the non-return valve passes. Lock the discharge valve closed, not just the isolator.</li>
</ul>

<h3>Restoring</h3>
<p>Reverse the sequence: remove tools and confirm the area is clear, refit all guards, remove locks in the reverse order they were applied, restore process isolation, restore electrical supply, then start under supervision and observe for the first fifteen minutes.</p>
`,
  },
];
