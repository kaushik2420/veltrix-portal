import React from "react";

/* ------------------------------------------------------------------ *
 * Veltrix Industrial Systems — brand mark
 *
 * The mark is a hex bolt-head (industrial fastener) enclosing a "V"
 * chevron with a second chevron below it, reading as downward flow
 * through a pump. Works from 16px favicon up to a title slide.
 * ------------------------------------------------------------------ */

export function VeltrixMark({
  size = 40,
  className = "",
  mono = false,
}: {
  size?: number;
  className?: string;
  /** single-colour version, inherits currentColor */
  mono?: boolean;
}) {
  const shell = mono ? "currentColor" : "#0E2233";
  const vee = mono ? "currentColor" : "#0E2233";
  const flow = mono ? "currentColor" : "#F26A21";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Veltrix Industrial Systems"
    >
      <path
        d="M50 3 L90.6 26.5 L90.6 73.5 L50 97 L9.4 73.5 L9.4 26.5 Z"
        fill="none"
        stroke={shell}
        strokeWidth="6.5"
        strokeLinejoin="round"
      />
      <path
        d="M27 30 L50 61 L73 30"
        fill="none"
        stroke={vee}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39 63 L50 78 L61 63"
        fill="none"
        stroke={flow}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VeltrixLogo({
  size = 34,
  className = "",
  onDark = false,
  showTagline = true,
}: {
  size?: number;
  className?: string;
  onDark?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span style={{ color: onDark ? "#ffffff" : undefined }}>
        {onDark ? (
          <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            role="img"
            aria-label="Veltrix Industrial Systems"
          >
            <path
              d="M50 3 L90.6 26.5 L90.6 73.5 L50 97 L9.4 73.5 L9.4 26.5 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="6.5"
              strokeLinejoin="round"
            />
            <path
              d="M27 30 L50 61 L73 30"
              fill="none"
              stroke="#ffffff"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M39 63 L50 78 L61 63"
              fill="none"
              stroke="#F26A21"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <VeltrixMark size={size} />
        )}
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="font-bold tracking-[0.14em]"
          style={{
            fontSize: size * 0.53,
            color: onDark ? "#ffffff" : "#0E2233",
          }}
        >
          VELTRIX
        </span>
        {showTagline && (
          <span
            className="mt-[3px] font-semibold uppercase tracking-[0.2em]"
            style={{
              fontSize: size * 0.235,
              color: onDark ? "rgba(255,255,255,0.6)" : "#5A7085",
            }}
          >
            Industrial Systems
          </span>
        )}
      </span>
    </span>
  );
}
