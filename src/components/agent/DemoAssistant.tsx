"use client";

import React from "react";
import Link from "next/link";
import { usePersona } from "../PersonaContext";
import { answer, greeting, starterChips, type Reply } from "../../lib/assistant";

type Msg =
  | { role: "user"; text: string }
  | ({ role: "agent" } & Reply)
  | { role: "typing" };

export function DemoAssistant() {
  const { persona } = usePersona();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [msgs, setMsgs] = React.useState<Msg[]>([]);
  const endRef = React.useRef<HTMLDivElement>(null);

  // reset the conversation when the signed-in persona changes
  React.useEffect(() => {
    setMsgs([
      { role: "agent", text: greeting(persona), chips: starterChips(persona) },
    ]);
  }, [persona]);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, open]);

  const send = React.useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;
      setInput("");
      setMsgs((m) => [...m, { role: "user", text }, { role: "typing" }]);
      const reply = answer(text, persona);
      window.setTimeout(() => {
        setMsgs((m) => [
          ...m.filter((x) => x.role !== "typing"),
          { role: "agent", ...reply },
        ]);
      }, 520);
    },
    [persona],
  );

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open the Veltrix assistant"}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-vx-navy text-white shadow-[0_8px_28px_rgba(14,34,51,0.35)] transition hover:bg-vx-navy-2"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.2-4.2A8 8 0 1 1 21 12z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="vx-in fixed bottom-24 right-5 z-40 flex h-[560px] max-h-[calc(100vh-8rem)] w-[380px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-vx-line bg-white shadow-[0_20px_60px_rgba(14,34,51,0.28)]">
          {/* header */}
          <div className="shrink-0 bg-vx-navy px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-vx-orange text-[13px] font-bold text-vx-navy">
                VA
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-bold leading-tight">
                  Veltrix Assistant
                </div>
                <div className="text-[10.5px] text-white/60">
                  Signed in as {persona.name} · {persona.role}
                </div>
              </div>
              <span className="rounded-full bg-white/15 px-2 py-[3px] text-[9px] font-bold uppercase tracking-[0.08em]">
                Demo
              </span>
            </div>
          </div>

          <div className="shrink-0 border-b border-vx-line bg-vx-amber-2 px-4 py-1.5 text-[10.5px] leading-snug text-vx-amber">
            Built-in demo assistant. Set your Agentforce keys to replace it —
            see <Link href="/setup" className="underline">/setup</Link>.
          </div>

          {/* transcript */}
          <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-3.5">
            {msgs.map((m, i) => {
              if (m.role === "typing")
                return (
                  <div key={i} className="flex gap-1 px-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-vx-slate"
                        style={{ animationDelay: `${d * 120}ms` }}
                      />
                    ))}
                  </div>
                );
              if (m.role === "user")
                return (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-vx-navy px-3.5 py-2 text-[12.5px] leading-[1.5] text-white">
                      {m.text}
                    </div>
                  </div>
                );
              return (
                <div key={i} className="space-y-2">
                  <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-vx-mist px-3.5 py-2.5 text-[12.5px] leading-[1.55] text-[#243746]">
                    {m.text}
                  </div>
                  {m.articles && m.articles.length > 0 && (
                    <div className="space-y-1.5">
                      {m.articles.map((a) => (
                        <Link
                          key={a.id}
                          href={`/knowledge/${a.slug}`}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg border border-vx-line bg-white px-3 py-2 transition hover:border-vx-navy"
                        >
                          <div className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-vx-orange">
                            {a.id} · {a.type}
                          </div>
                          <div className="mt-0.5 text-[12px] font-semibold leading-snug text-vx-navy">
                            {a.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {m.action && (
                    <Link
                      href={m.action.href}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-vx-orange px-3 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#dd5b13]"
                    >
                      {m.action.label}
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h13M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  )}
                  {m.chips && m.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {m.chips.map((c) => (
                        <button
                          key={c}
                          onClick={() => send(c)}
                          className="rounded-full border border-vx-line bg-white px-2.5 py-1 text-[11px] font-medium text-vx-steel transition hover:border-vx-navy hover:text-vx-navy"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          {/* composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="shrink-0 border-t border-vx-line bg-white p-2.5"
          >
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a serial number, a fault, or a part…"
                className="min-w-0 flex-1 rounded-lg border border-vx-line px-3 py-2 text-[12.5px] outline-none focus:border-vx-navy"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-vx-navy text-white transition disabled:opacity-35"
                aria-label="Send"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
