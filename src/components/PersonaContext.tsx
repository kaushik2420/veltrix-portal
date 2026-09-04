"use client";

import React from "react";
import { PERSONAS, type Persona } from "../lib/org";

type Ctx = {
  persona: Persona;
  setPersonaId: (id: string) => void;
  all: Persona[];
};

const PersonaCtx = React.createContext<Ctx>({
  persona: PERSONAS[0],
  setPersonaId: () => {},
  all: PERSONAS,
});

const KEY = "veltrix.persona";

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = React.useState(PERSONAS[0].id);

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved && PERSONAS.some((p) => p.id === saved)) setId(saved);
    } catch {
      /* private mode, blocked storage — carry on with the default */
    }
  }, []);

  const setPersonaId = React.useCallback((next: string) => {
    setId(next);
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const persona = PERSONAS.find((p) => p.id === id) ?? PERSONAS[0];

  return (
    <PersonaCtx.Provider value={{ persona, setPersonaId, all: PERSONAS }}>
      {children}
    </PersonaCtx.Provider>
  );
}

export const usePersona = () => React.useContext(PersonaCtx);
