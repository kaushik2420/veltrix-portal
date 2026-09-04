import React from "react";

export function Page({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 py-8 ${wide ? "max-w-[1220px]" : "max-w-[1100px]"}`}
    >
      {children}
    </div>
  );
}

export function PageHead({
  kicker,
  title,
  sub,
  right,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-[720px]">
        {kicker && (
          <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-vx-orange">
            {kicker}
          </div>
        )}
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-vx-navy">
          {title}
        </h1>
        {sub && (
          <p className="mt-2 text-[14.5px] leading-[1.55] text-vx-steel">
            {sub}
          </p>
        )}
      </div>
      {right}
    </div>
  );
}

export function Card({
  children,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <As
      className={`rounded-xl border border-vx-line bg-white shadow-[0_1px_2px_rgba(14,34,51,0.05)] ${className}`}
    >
      {children}
    </As>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[15px] font-bold tracking-[-0.01em] text-vx-navy">
        {children}
      </h2>
      {action}
    </div>
  );
}

type Tone = "navy" | "orange" | "green" | "amber" | "red" | "grey";

const TONES: Record<Tone, string> = {
  navy: "bg-vx-navy text-white",
  orange: "bg-vx-orange-2 text-[#a8410c]",
  green: "bg-vx-green-2 text-vx-green",
  amber: "bg-vx-amber-2 text-vx-amber",
  red: "bg-vx-red-2 text-vx-red",
  grey: "bg-vx-mist text-vx-steel",
};

export function Badge({
  children,
  tone = "grey",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-[3px] text-[10.5px] font-bold uppercase tracking-[0.06em] ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}

export function statusTone(s: string): Tone {
  if (/resolved|met|operational|active/i.test(s)) return "green";
  if (/awaiting|expiring|maintenance|risk/i.test(s)) return "amber";
  if (/breach|fault|expired/i.test(s)) return "red";
  if (/progress|new/i.test(s)) return "orange";
  return "grey";
}

export function KeyValue({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-vx-slate">
        {label}
      </div>
      <div
        className={`mt-0.5 text-[13px] font-medium leading-snug text-[#22333f] ${
          mono ? "font-mono text-[12px]" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-vx-line bg-white px-6 py-10 text-center text-[13.5px] text-vx-slate">
      {children}
    </div>
  );
}
