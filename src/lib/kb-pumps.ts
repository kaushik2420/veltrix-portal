import type { Article } from "./kb-types";

export const PUMP_ARTICLES: Article[] = [
  {
    id: "KB-1182",
    title: "VX-450 mechanical seal replacement procedure",
    slug: "vx-450-mechanical-seal-replacement",
    category: "Pumps — Repair procedures",
    productLine: "Centrifugal Pumps",
    type: "How-To",
    summary:
      "Full replacement procedure for the cartridge mechanical seal on VX-450 end-suction pumps, including setting clearance, torque values and the re-commissioning check.",
    keywords: [
      "seal",
      "mechanical seal",
      "leak",
      "leakage",
      "seal kit",
      "SK-450-M",
      "cartridge seal",
      "VX-450",
      "drip",
    ],
    models: ["VX-450", "VX-450H"],
    updated: "18 Aug 2026",
    views: 4821,
    helpful: 96,
    related: ["KB-1104", "KB-1121", "KB-9001", "KB-4002"],
    body: `
<div class="callout danger"><p><strong>Isolate first.</strong> Follow KB-9001 lockout/tagout before removing any guard. The seal chamber can retain pressure even with the pump stopped.</p></div>

<h3>When to use this procedure</h3>
<p>Replace the cartridge seal when you observe continuous leakage from the seal chamber drain, visible scoring on the seal faces, or a repeat of the leak within 30 days of a re-seat. A weeping seal that stops after ten minutes of running is usually a bedding-in artefact and does not require replacement — see KB-1104 before you strip the pump.</p>

<h3>Parts required</h3>
<table>
<tr><th>Part</th><th>Number</th><th>Notes</th></tr>
<tr><td>Cartridge seal kit</td><td>SK-450-M</td><td>Standard duty, water to 90&nbsp;°C</td></tr>
<tr><td>Cartridge seal kit (high temp)</td><td>SK-450-H</td><td>Above 90&nbsp;°C or glycol service</td></tr>
<tr><td>Casing gasket</td><td>GK-450-02</td><td>Always replace — never reuse</td></tr>
<tr><td>Shaft sleeve O-ring</td><td>OR-450-18</td><td>Supplied in the seal kit</td></tr>
</table>

<h3>Procedure</h3>
<ol>
<li>Isolate electrically and mechanically. Close suction and discharge valves, drain the casing through the bottom plug, and confirm zero pressure at the gauge tapping.</li>
<li>Remove the coupling guard and disconnect the spacer coupling. Do not disturb the motor feet — the alignment shims stay where they are.</li>
<li>Remove the four seal gland nuts (M12) evenly, working diagonally. Slide the gland plate back along the shaft.</li>
<li>Release the cartridge setting clips. The cartridge will now move freely on the sleeve.</li>
<li>Withdraw the cartridge assembly. Inspect the shaft sleeve for scoring — anything you can catch a fingernail in means the sleeve is scrap. Replace with <code>SL-450-06</code>.</li>
<li>Clean the seal chamber bore and gland face. No burrs, no old gasket material, no solvent residue.</li>
<li>Lubricate the new cartridge O-rings with clean water or a compatible silicone-free lubricant. <strong>Do not use mineral grease</strong> — it swells EPDM.</li>
<li>Slide the new cartridge into position by hand until it seats. It should not need force.</li>
<li>Fit the gland plate and tighten the four nuts to <strong>28&nbsp;Nm</strong>, diagonally, in two passes.</li>
<li>Remove the cartridge setting clips <em>after</em> the gland is torqued. Keep them — they are needed for any future removal.</li>
<li>Refit the coupling spacer and check alignment per KB-1156. Replacing a seal should not change alignment, but confirm it rather than assume it.</li>
</ol>

<h3>Re-commissioning check</h3>
<ul>
<li>Vent the casing fully before starting. A dry-run of even a few seconds will destroy the new faces.</li>
<li>Run for 15 minutes and check the seal chamber drain. A few drops during bedding-in is normal; a steady drip is not.</li>
<li>Log the drive-end and non-drive-end bearing temperatures at 30 minutes and compare to the baseline in your handover pack. A rise above baseline suggests over-greasing during reassembly — see KB-1121.</li>
<li>Record the replacement against the asset serial number in the portal so the failure history stays accurate.</li>
</ul>

<div class="callout"><p><strong>Repeat failures.</strong> If this is the second seal on the same serial number within 18 months, raise a case rather than simply refitting. Repeat seal failure is usually a symptom of misalignment, cavitation, or a batch issue — not of the seal itself.</p></div>
`,
  },
  {
    id: "KB-1104",
    title: "Diagnosing seal leakage on VX-series pumps",
    slug: "diagnosing-seal-leakage-vx-series",
    category: "Pumps — Troubleshooting",
    productLine: "Centrifugal Pumps",
    type: "Troubleshooting",
    summary:
      "Work out whether a leaking VX-series pump needs a new seal, a new sleeve, or a fix to the underlying cause — before you strip anything.",
    keywords: ["seal", "leak", "leakage", "drip", "weeping", "seal chamber", "diagnosis"],
    models: ["VX-220", "VX-450", "VX-600"],
    updated: "04 Jul 2026",
    views: 3910,
    helpful: 93,
    related: ["KB-1182", "KB-1110", "KB-1156"],
    body: `
<h3>Read the leak before you act on it</h3>
<p>Most seal replacements on VX-series pumps are avoidable. The seal is nearly always the component that fails, but it is rarely the component that is <em>wrong</em>. Spend ten minutes characterising the leak and you will usually find the real cause.</p>

<table>
<tr><th>What you see</th><th>Most likely cause</th><th>Action</th></tr>
<tr><td>Weeping for the first 10–20 minutes after a seal change, then stops</td><td>Normal bedding-in</td><td>Monitor. No action.</td></tr>
<tr><td>Steady drip that does not change with load</td><td>Face damage or O-ring nip</td><td>Replace cartridge — KB-1182</td></tr>
<tr><td>Leak that worsens sharply as discharge pressure rises</td><td>Seal is being pushed beyond its rating, or balance line blocked</td><td>Check balance line; review duty point</td></tr>
<tr><td>Intermittent spitting with a rattling noise</td><td>Cavitation destroying the faces</td><td>Fix the suction condition — KB-1110</td></tr>
<tr><td>Leak returns within 30 days of every replacement</td><td>Misalignment or bent shaft</td><td>Full alignment check — KB-1156. Raise a case.</td></tr>
<tr><td>Fine spray at the gland face rather than the drain</td><td>Gland gasket or uneven gland torque</td><td>Re-torque diagonally to 28 Nm; replace gasket</td></tr>
</table>

<h3>Three checks worth doing every time</h3>
<ol>
<li><strong>Shaft sleeve condition.</strong> Run a fingernail along the sleeve under the seal position. Any catchable groove means the sleeve is scrap and a new seal will fail on it.</li>
<li><strong>Suction pressure at the pump, not at the tank.</strong> A seal that keeps failing on a pump running below its NPSH requirement will keep failing regardless of the kit you fit.</li>
<li><strong>Coupling alignment, cold and hot.</strong> Steel pipework and hot duty move the casing. Alignment that is good at 25&nbsp;°C can be well out at operating temperature.</li>
</ol>

<div class="callout"><p><strong>Before you order a kit:</strong> confirm your seal variant against the serial number in the portal. VX-450 units built after March 2024 use a revised cartridge with a different O-ring section; the older <code>SK-450-M</code> will fit but will not seal reliably.</p></div>
`,
  },
  {
    id: "KB-1110",
    title: "Cavitation on centrifugal pumps: symptoms, causes and corrections",
    slug: "cavitation-symptoms-causes-corrections",
    category: "Pumps — Troubleshooting",
    productLine: "Centrifugal Pumps",
    type: "Troubleshooting",
    summary:
      "How to recognise cavitation, distinguish it from recirculation and mechanical noise, and correct the suction condition that causes it.",
    keywords: ["cavitation", "noise", "rattle", "gravel", "NPSH", "suction", "impeller damage"],
    models: ["VX-220", "VX-450", "VX-600"],
    updated: "22 May 2026",
    views: 2874,
    helpful: 91,
    related: ["KB-1104", "KB-1147", "KB-1135"],
    body: `
<h3>What it sounds and looks like</h3>
<p>Classic cavitation sounds like gravel passing through the pump. It is accompanied by an unstable discharge pressure, fluctuating motor current, and — over weeks — pitting on the impeller vane leading edges and the front shroud. If you have replaced a seal or an impeller more than once on the same unit, check for cavitation before you replace anything again.</p>

<h3>Distinguish it from the look-alikes</h3>
<ul>
<li><strong>Suction recirculation</strong> — noise is worse at <em>low</em> flow, not high. Damage appears on the pressure side of the vanes.</li>
<li><strong>Air entrainment</strong> — irregular surging, often with visible bubbles in a sight glass. Look for a vortexing suction tank or a leaking suction joint.</li>
<li><strong>Bearing damage</strong> — noise is constant regardless of flow, and vibration is dominated by bearing defect frequencies rather than broadband noise.</li>
</ul>

<h3>Corrections, in the order worth trying</h3>
<ol>
<li><strong>Clean the suction strainer.</strong> This is the cause more often than anything else on plant pumps. A partially blinded strainer costs you exactly the NPSH margin you need.</li>
<li><strong>Open the suction isolation valve fully.</strong> Never throttle on the suction side. Throttle discharge if you must control flow.</li>
<li><strong>Raise the suction level or lower the pump.</strong> Every metre of static head helps directly.</li>
<li><strong>Reduce the liquid temperature</strong> if the process allows — vapour pressure rises steeply near boiling and eats your available NPSH.</li>
<li><strong>Move the duty point left.</strong> Cavitation risk rises with flow. Trimming the impeller or fitting a VFD to run at reduced speed both work; the VFD usually pays for itself in energy.</li>
<li><strong>Check for a collapsed suction hose or a gasket protruding into the bore.</strong> Rare, but it happens after pipework changes.</li>
</ol>

<div class="callout"><p><strong>Rule of thumb:</strong> available NPSH should exceed required NPSH by at least 1&nbsp;m, and by 1.5&nbsp;m on hot duty. If you don't have the pump curve to hand, the serial number lookup in the portal will return the correct one.</p></div>
`,
  },
  {
    id: "KB-1121",
    title: "Bearing temperature above baseline after service",
    slug: "bearing-temperature-above-baseline",
    category: "Pumps — Troubleshooting",
    productLine: "Centrifugal Pumps",
    type: "Troubleshooting",
    summary:
      "Why bearing temperature commonly rises after a seal or coupling job, how much rise is acceptable, and what to do about each cause.",
    keywords: ["bearing", "temperature", "hot", "overheating", "grease", "over-greasing"],
    models: ["VX-220", "VX-450", "VX-600"],
    updated: "12 Jun 2026",
    views: 2115,
    helpful: 89,
    related: ["KB-1182", "KB-1156", "KB-1533"],
    body: `
<h3>What is acceptable</h3>
<p>VX-series grease-lubricated bearings normally stabilise between 45&nbsp;°C and 70&nbsp;°C measured at the housing, and typically 35–45&nbsp;°C above ambient. What matters is the change from <em>your</em> baseline, not the absolute number. A rise of more than 10&nbsp;°C above the commissioning baseline warrants investigation; more than 20&nbsp;°C warrants shutting down.</p>

<h3>Causes, in the order they actually occur</h3>
<ol>
<li><strong>Over-greasing (by far the most common after a service).</strong> Excess grease churns and generates heat. Symptom: temperature climbs for 1–2 hours after start, then slowly settles over several days as the surplus is purged. Fix: remove the drain plug and run until the surplus is expelled, then refit. Quantities are in KB-1533.</li>
<li><strong>Wrong grease or mixed greases.</strong> Lithium complex and polyurea greases are not compatible and will separate. If in doubt, purge completely.</li>
<li><strong>Misalignment.</strong> Introduced by coupling work or by pipe strain when a flange is re-made. Temperature rise is usually accompanied by increased 2× running-speed vibration. See KB-1156.</li>
<li><strong>Axial thrust from a worn wear ring.</strong> Increased internal recirculation loads the thrust bearing. Check wear ring clearance — KB-1168.</li>
<li><strong>Cooling water to the bearing housing isolated and not restored</strong> after a job. Obvious in hindsight, easy to miss on a night shift.</li>
</ol>

<h3>What to record before raising a case</h3>
<ul>
<li>Drive-end and non-drive-end temperatures, and ambient.</li>
<li>The baseline from your commissioning pack, or the last PM visit report.</li>
<li>What work was done immediately before the rise, and by whom.</li>
<li>Overall vibration in mm/s RMS if you have a meter.</li>
</ul>
<p>Those four items let a Veltrix engineer resolve most of these cases without a site visit.</p>
`,
  },
  {
    id: "KB-1135",
    title: "Excessive vibration — first-line checks",
    slug: "excessive-vibration-first-line-checks",
    category: "Pumps — Troubleshooting",
    productLine: "Centrifugal Pumps",
    type: "Troubleshooting",
    summary:
      "A structured 20-minute check to narrow high vibration down to unbalance, misalignment, looseness, hydraulic causes or bearing damage.",
    keywords: ["vibration", "shaking", "noise", "unbalance", "misalignment", "looseness"],
    models: ["VX-220", "VX-450", "VX-600"],
    updated: "30 Apr 2026",
    views: 1988,
    helpful: 87,
    related: ["KB-1110", "KB-1156", "KB-1121"],
    body: `
<h3>Acceptance limits</h3>
<table>
<tr><th>Overall velocity (mm/s RMS)</th><th>Assessment</th></tr>
<tr><td>Below 2.8</td><td>Good — no action</td></tr>
<tr><td>2.8 – 4.5</td><td>Acceptable — monitor monthly</td></tr>
<tr><td>4.5 – 7.1</td><td>Unsatisfactory — plan a correction</td></tr>
<tr><td>Above 7.1</td><td>Unacceptable — shut down at the next opportunity</td></tr>
</table>

<h3>Narrowing it down without a spectrum analyser</h3>
<ol>
<li><strong>Does it change with flow?</strong> Yes → hydraulic (cavitation, recirculation, or running far off the best efficiency point). No → mechanical.</li>
<li><strong>Does it stay when the pump is decoupled and the motor is run solo?</strong> Yes → the motor is the source. No → pump or coupling.</li>
<li><strong>Is the dominant direction axial?</strong> Axial vibration above about half the radial level points strongly at misalignment or a bent shaft.</li>
<li><strong>Does it change when you slacken and re-torque the hold-down bolts?</strong> A change indicates soft foot or baseplate looseness.</li>
<li><strong>Is there a soft foot?</strong> Slacken each foot in turn with a dial gauge on the frame. Movement above 0.05&nbsp;mm needs shimming.</li>
</ol>

<h3>The two causes worth ruling out first</h3>
<ul>
<li><strong>Pipe strain.</strong> Slacken the suction and discharge flanges with a gauge on the casing. If the casing moves more than 0.05&nbsp;mm, the pipework is pulling the pump out of position and no amount of alignment will hold.</li>
<li><strong>Partially blocked impeller.</strong> A single lodged fragment creates a substantial unbalance at running speed. Common after any upstream work on the system.</li>
</ul>

<div class="callout"><p>Attach your vibration readings to the case when you raise it. Readings at drive-end and non-drive-end, in horizontal, vertical and axial directions, let a specialist reach a conclusion the same day instead of scheduling a visit.</p></div>
`,
  },
  {
    id: "KB-1147",
    title: "Pump not delivering rated flow or head",
    slug: "pump-not-delivering-rated-flow",
    category: "Pumps — Troubleshooting",
    productLine: "Centrifugal Pumps",
    type: "Troubleshooting",
    summary:
      "Systematic causes of low flow on VX-series pumps, from the trivial to the terminal, with the check that identifies each.",
    keywords: ["low flow", "no flow", "head", "performance", "duty point", "pressure"],
    models: ["VX-220", "VX-450", "VX-600"],
    updated: "08 Mar 2026",
    views: 2402,
    helpful: 90,
    related: ["KB-1110", "KB-1168", "KB-1520"],
    body: `
<h3>Work down this list in order</h3>
<ol>
<li><strong>Wrong rotation.</strong> A centrifugal pump running backwards still develops perhaps 60% of its head, so it is easy to miss. Check the direction arrow on the casing. This is the single most common cause after any motor or panel work.</li>
<li><strong>Air in the casing.</strong> Vent fully. A pump that has been drained and not vented will never prime itself on a suction lift.</li>
<li><strong>Blocked or blinded suction strainer.</strong> Check differential pressure across it if there are tappings; otherwise open and inspect.</li>
<li><strong>Closed or partially closed valve.</strong> Including non-return valves that have stuck. Confirm by position, not by the actuator indicator.</li>
<li><strong>Speed.</strong> On VFD-driven sets, confirm the actual running frequency. A drive that has reverted to a default parameter set after a power event is a frequent culprit — see KB-1520.</li>
<li><strong>Worn wear rings.</strong> Internal recirculation rises steeply once clearance doubles. Symptoms: lower head, higher power for the flow delivered, rising axial thrust. Limits in KB-1168.</li>
<li><strong>Damaged or partially blocked impeller.</strong> Erosion from cavitation or a lodged foreign object.</li>
<li><strong>System change.</strong> New pipework, an added filter, or a fouled heat exchanger moves the system curve. The pump is fine; the duty point has moved.</li>
</ol>

<h3>Confirming it is the pump and not the system</h3>
<p>Fit gauges at the suction and discharge flanges and calculate developed head. Compare against the pump curve for your serial number — the portal returns the correct curve for the impeller diameter actually fitted, which is often not the catalogue maximum. If developed head matches the curve at the measured flow, the pump is healthy and the problem is in the system.</p>
`,
  },
  {
    id: "KB-1156",
    title: "Shaft alignment procedure after coupling work",
    slug: "shaft-alignment-procedure",
    category: "Pumps — Repair procedures",
    productLine: "Centrifugal Pumps",
    type: "How-To",
    summary:
      "Cold alignment tolerances and the reverse-dial method for VX-series pump sets, including thermal growth allowances for hot duty.",
    keywords: ["alignment", "coupling", "shims", "soft foot", "dial gauge", "laser alignment"],
    models: ["VX-220", "VX-450", "VX-600"],
    updated: "15 Jul 2026",
    views: 1673,
    helpful: 92,
    related: ["KB-1135", "KB-1121", "KB-1182"],
    body: `
<h3>Tolerances</h3>
<table>
<tr><th>Speed</th><th>Offset (max)</th><th>Angularity (max)</th></tr>
<tr><td>1500 rpm</td><td>0.08 mm</td><td>0.08 mm / 100 mm</td></tr>
<tr><td>3000 rpm</td><td>0.05 mm</td><td>0.05 mm / 100 mm</td></tr>
</table>
<p>These are cold, static tolerances measured at the coupling. For duty above 60&nbsp;°C, set the motor low by the calculated thermal growth so the set comes into alignment at temperature.</p>

<h3>Before you touch the alignment</h3>
<ol>
<li><strong>Check for soft foot.</strong> With all feet torqued, slacken one at a time with a dial gauge on the top of that foot. More than 0.05&nbsp;mm of lift means a soft foot; shim it out before proceeding. Aligning on a soft foot wastes the whole exercise.</li>
<li><strong>Check for pipe strain.</strong> Dial gauge on the pump casing, then slacken the suction and discharge flange bolts. More than 0.05&nbsp;mm of movement means the pipework is loaded and must be corrected first.</li>
<li><strong>Clean the shim pack.</strong> Rust and paint under shims will settle and lose your alignment within days. Use stainless shims, and no more than four per foot.</li>
</ol>

<h3>Procedure — reverse dial method</h3>
<ol>
<li>Mount brackets and dial gauges on both shafts, reading each other's shaft at 180&nbsp;mm separation.</li>
<li>Zero both gauges at the 12 o'clock position and rotate both shafts together through 90°, 180° and 270°, recording each.</li>
<li>Correct vertical first — shim under the motor feet. Recheck.</li>
<li>Correct horizontal second — jack the motor sideways. Never use the hold-down bolts to pull the motor across.</li>
<li>Re-torque the feet to the values on the baseplate label and re-measure. Torquing always changes the reading; the final measurement must be the torqued one.</li>
<li>Record the final numbers against the asset serial in the portal.</li>
</ol>

<div class="callout"><p>Laser alignment tools are quicker and are what our field engineers carry, but the tolerances above are the same either way. What matters is that soft foot and pipe strain are cleared first — every alignment that "won't hold" is one of those two.</p></div>
`,
  },
  {
    id: "KB-1168",
    title: "Wear ring clearance limits and when to replace",
    slug: "wear-ring-clearance-limits",
    category: "Pumps — Reference",
    productLine: "Centrifugal Pumps",
    type: "Reference",
    summary:
      "New and maximum wear ring clearances for VX-series pumps, how to measure them, and the efficiency cost of running past the limit.",
    keywords: ["wear ring", "clearance", "efficiency", "recirculation", "WR-450", "WR-600"],
    models: ["VX-220", "VX-450", "VX-600"],
    updated: "27 Feb 2026",
    views: 1244,
    helpful: 88,
    related: ["KB-1147", "KB-4002", "KB-1121"],
    body: `
<h3>Clearance table</h3>
<table>
<tr><th>Model</th><th>Ring set</th><th>New (diametral)</th><th>Replace at</th></tr>
<tr><td>VX-220</td><td>WR-220-A</td><td>0.30 – 0.38 mm</td><td>0.75 mm</td></tr>
<tr><td>VX-450</td><td>WR-450-A</td><td>0.38 – 0.46 mm</td><td>0.90 mm</td></tr>
<tr><td>VX-450H</td><td>WR-450-B</td><td>0.45 – 0.55 mm</td><td>1.05 mm</td></tr>
<tr><td>VX-600</td><td>WR-600-B</td><td>0.50 – 0.60 mm</td><td>1.20 mm</td></tr>
</table>

<h3>What it costs you to leave it</h3>
<p>Internal recirculation through worn rings is lost work. As a practical guide, a VX-450 running at double the new clearance loses roughly 4–6% of its efficiency and develops noticeably less head; at triple, expect 10% or more, plus rising axial thrust on the thrust bearing. On a 75&nbsp;kW pump running continuously, 5% is a meaningful annual energy number — worth putting in front of whoever signs the maintenance budget.</p>

<h3>Measuring</h3>
<ol>
<li>With the casing split, measure the casing ring bore at three positions 60° apart using an internal micrometer.</li>
<li>Measure the impeller ring outside diameter at the same positions.</li>
<li>Diametral clearance is the difference of the averages. Note any ovality above 0.10&nbsp;mm — an oval ring will not seal even if the average clearance is in tolerance.</li>
</ol>

<div class="callout"><p><strong>Ordering:</strong> always replace casing and impeller rings as a set. Fitting a new casing ring against a worn impeller ring gives you a fraction of the benefit and a repeat job. Both parts are covered by the AMC spares discount.</p></div>
`,
  },
  {
    id: "KB-1502",
    title: "VM-series motor running hot — diagnosis",
    slug: "vm-series-motor-running-hot",
    category: "Motors — Troubleshooting",
    productLine: "Motors & Drives",
    type: "Troubleshooting",
    summary:
      "Temperature limits by insulation class, and how to work out whether an overheating VM-series motor is loaded, cooled, supplied or wired wrongly.",
    keywords: ["motor", "hot", "overheating", "temperature", "winding", "insulation class", "IE4"],
    models: ["VM-055", "VM-090", "VM-132"],
    updated: "19 Jun 2026",
    views: 1802,
    helpful: 90,
    related: ["KB-1511", "KB-1520", "KB-1533"],
    body: `
<h3>Limits</h3>
<p>VM-series motors use Class F insulation with a Class B temperature rise, which means a winding rise of 80&nbsp;K over a 40&nbsp;°C ambient, with a 25&nbsp;K margin held in reserve. In practice: a frame surface too hot to hold your hand on is normal; a smell of hot varnish is not.</p>

<h3>Causes and the check that finds each</h3>
<table>
<tr><th>Cause</th><th>Check</th></tr>
<tr><td>Overload</td><td>Compare measured current against the nameplate FLC. Above 105% continuous is an overload, not a motor fault.</td></tr>
<tr><td>Blocked cooling path</td><td>Inspect the fan cowl and fins. Dust and process fibre are the usual culprits; a blanketed motor can run 20&nbsp;K hot.</td></tr>
<tr><td>Voltage unbalance</td><td>Measure all three line voltages. 1% unbalance produces roughly 6–8% extra heating. Above 2% is a supply fault to chase.</td></tr>
<tr><td>Single phasing</td><td>Motor still runs but draws heavily and is very noisy. Trip immediately.</td></tr>
<tr><td>Running below rated speed on a VFD without forced ventilation</td><td>TEFC motors lose cooling with speed. Below about 30&nbsp;Hz continuous, a separately driven fan is required.</td></tr>
<tr><td>Excessive starts per hour</td><td>Check the actual start count against the nameplate. Repeated starts heat the rotor far faster than continuous running.</td></tr>
<tr><td>Bearing failure</td><td>Localised heat at one end bell rather than an even frame rise. See KB-1533.</td></tr>
</table>

<div class="callout danger"><p>If the winding temperature sensor has tripped, do not bypass it to keep the line running. Establish the cause. A bypassed thermistor is how a repairable motor becomes a rewind.</p></div>
`,
  },
  {
    id: "KB-1511",
    title: "Insulation resistance testing before energising",
    slug: "insulation-resistance-testing",
    category: "Motors — Procedures",
    productLine: "Motors & Drives",
    type: "How-To",
    summary:
      "How to megger a VM-series motor safely, what values to accept, and how to dry out a motor that has been standing in a humid plant.",
    keywords: ["megger", "insulation resistance", "IR test", "polarisation index", "commissioning"],
    models: ["VM-055", "VM-090", "VM-132"],
    updated: "11 Aug 2026",
    views: 1391,
    helpful: 94,
    related: ["KB-1502", "KB-2221", "KB-5004"],
    body: `
<div class="callout danger"><p>Isolate and lock off before testing. Disconnect the VFD — a megger test will destroy drive output stages. Discharge the winding to earth after every test.</p></div>

<h3>Test voltage and acceptance</h3>
<table>
<tr><th>Motor rating</th><th>Test voltage</th><th>Minimum acceptable at 40 °C</th></tr>
<tr><td>Up to 1 kV</td><td>500 V DC</td><td>100 MΩ (new) · 5 MΩ (in service)</td></tr>
<tr><td>1 – 3.3 kV</td><td>1000 V DC</td><td>200 MΩ (new) · 10 MΩ (in service)</td></tr>
</table>
<p>Insulation resistance halves roughly every 10&nbsp;°C rise, so always note the winding temperature with the reading. A reading of 8&nbsp;MΩ at 60&nbsp;°C is healthier than 15&nbsp;MΩ at 25&nbsp;°C.</p>

<h3>Polarisation index</h3>
<p>Take readings at 1 minute and 10 minutes. The ratio (10-minute ÷ 1-minute) is the polarisation index:</p>
<ul>
<li><strong>Below 1.0</strong> — do not energise. Investigate.</li>
<li><strong>1.0 – 2.0</strong> — questionable. Dry out and retest.</li>
<li><strong>2.0 – 4.0</strong> — good.</li>
<li><strong>Above 4.0</strong> — very dry, possibly brittle insulation on an old machine.</li>
</ul>

<h3>Drying out a damp motor</h3>
<ol>
<li>Remove the terminal box cover and any drain plugs at the lowest point.</li>
<li>Apply low-temperature heat — a space heater blowing into the enclosure, or the motor's own anti-condensation heaters if fitted. Do not exceed 90&nbsp;°C at the frame.</li>
<li>Take an IR reading every hour. Resistance typically dips before it climbs as moisture migrates outward.</li>
<li>Continue until the reading has been stable and above the acceptance value for three consecutive hours.</li>
</ol>
<p>Motors stored on a monsoon-season site for more than four weeks should be meggered before commissioning as a matter of routine, whether or not there is any visible sign of damp.</p>
`,
  },
  {
    id: "KB-1520",
    title: "VFD parameter set for VM-090 on cooling water duty",
    slug: "vfd-parameter-set-vm090",
    category: "Motors — Reference",
    productLine: "Motors & Drives",
    type: "Reference",
    summary:
      "Recommended drive parameters for a VM-090 driving a VX-450 on cooling water, and how to restore them after a power event resets the drive.",
    keywords: ["VFD", "drive", "parameters", "frequency", "ramp", "PID", "default reset"],
    models: ["VM-090", "VX-450"],
    updated: "05 Aug 2026",
    views: 1105,
    helpful: 86,
    related: ["KB-1147", "KB-1502", "KB-2210"],
    body: `
<h3>Baseline parameters</h3>
<table>
<tr><th>Parameter</th><th>Value</th><th>Why</th></tr>
<tr><td>Motor rated current</td><td>Per nameplate</td><td>Never leave at the drive default</td></tr>
<tr><td>Minimum frequency</td><td>30 Hz</td><td>Below this a TEFC motor loses self-cooling</td></tr>
<tr><td>Maximum frequency</td><td>50 Hz</td><td>Over-speeding a centrifugal pump raises power by the cube of speed</td></tr>
<tr><td>Acceleration ramp</td><td>15 s</td><td>Limits surge in the cooling water header</td></tr>
<tr><td>Deceleration ramp</td><td>25 s</td><td>Reduces check-valve slam</td></tr>
<tr><td>Current limit</td><td>110%</td><td>Protects the motor without nuisance tripping on start</td></tr>
<tr><td>Skip frequency band</td><td>38 – 41 Hz</td><td>Avoids a structural resonance on the Line 3 skid</td></tr>
<tr><td>Auto-restart</td><td>Disabled</td><td>Restart must be a deliberate decision after a trip</td></tr>
</table>

<h3>After a power event</h3>
<p>If a drive has been replaced or has reverted to factory defaults, the pump will typically run — but at the wrong speed, without the skip band, and with the wrong motor protection. This shows up as "the pump isn't delivering what it used to" rather than as an alarm, which is why it is easy to miss for weeks.</p>
<ol>
<li>Read the current parameter set and compare it against the commissioning record in your handover pack.</li>
<li>Restore the values above, then verify actual running frequency against the HMI rather than trusting the setpoint.</li>
<li>Confirm rotation direction after any drive replacement — see KB-1147, item 1.</li>
<li>Save the parameter set to the drive's memory module and export a copy. Attach it to the asset record in the portal.</li>
</ol>

<div class="callout"><p>Keep a saved parameter file per drive. It converts a four-hour recommissioning into a ten-minute upload, and it is the single most valuable thing to have on file after a site power failure.</p></div>
`,
  },
  {
    id: "KB-1533",
    title: "Bearing re-greasing intervals and quantities",
    slug: "bearing-regreasing-intervals",
    category: "Motors — Reference",
    productLine: "Motors & Drives",
    type: "Reference",
    summary:
      "Grease type, quantity and interval by frame size for VM-series motors and VX-series pump bearing housings — and why more is not better.",
    keywords: ["grease", "lubrication", "bearing", "interval", "quantity", "regreasing"],
    models: ["VM-055", "VM-090", "VM-132", "VX-450", "VX-600"],
    updated: "02 Jun 2026",
    views: 1560,
    helpful: 91,
    related: ["KB-1121", "KB-1502"],
    body: `
<h3>Grease specification</h3>
<p>Lithium complex, NLGI 2, base oil viscosity 100–150&nbsp;cSt at 40&nbsp;°C. Veltrix supplies <code>GR-LC2</code> in 400&nbsp;g cartridges. Do not mix with polyurea or calcium sulphonate greases — incompatible thickeners separate and the bearing runs effectively dry.</p>

<h3>Quantities and intervals</h3>
<table>
<tr><th>Frame / housing</th><th>Quantity per point</th><th>Interval at 1500 rpm</th><th>Interval at 3000 rpm</th></tr>
<tr><td>VM-055 (frame 250)</td><td>25 g</td><td>4 500 h</td><td>2 200 h</td></tr>
<tr><td>VM-090 (frame 280)</td><td>35 g</td><td>4 000 h</td><td>2 000 h</td></tr>
<tr><td>VM-132 (frame 315)</td><td>45 g</td><td>3 500 h</td><td>1 700 h</td></tr>
<tr><td>VX-450 bearing housing</td><td>30 g per end</td><td>4 000 h</td><td>2 000 h</td></tr>
<tr><td>VX-600 bearing housing</td><td>40 g per end</td><td>3 500 h</td><td>1 700 h</td></tr>
</table>
<p>Halve the interval above 70&nbsp;°C housing temperature, in wet environments, or in heavy dust. Double it for clean, cool, lightly loaded duty.</p>

<h3>Method</h3>
<ol>
<li>Clean the grease nipple before connecting. Dirt driven into a bearing does more damage than a missed service.</li>
<li>Remove the drain plug at the bottom of the housing. This is the step most often skipped, and skipping it is what causes over-greasing.</li>
<li>Apply the specified quantity slowly with the machine running if it is safe to do so.</li>
<li>Leave the drain plug out for 30 minutes of running to let the surplus purge, then clean and refit.</li>
<li>Record the date and quantity against the asset serial in the portal.</li>
</ol>

<div class="callout"><p><strong>More is not better.</strong> A bearing packed solid churns grease, generates heat, and fails faster than one that is slightly under-greased. If a bearing runs hot immediately after a lubrication service, over-greasing is the first thing to suspect — see KB-1121.</p></div>
`,
  },
];
