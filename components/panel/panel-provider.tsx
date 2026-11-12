"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { emptyPanel, type PanelAction, type PanelData } from "@/lib/panel";

class RequestError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function requestPanel(action?: PanelAction, signal?: AbortSignal): Promise<PanelData> {
  const response = await fetch("/api/panel", {
    signal,
    ...(action && {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action),
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new RequestError(data.error, response.status);
  return data as PanelData;
}

const PanelContext = createContext<{
  data: PanelData | null;
  loadError: boolean;
  refresh: () => Promise<void>;
  mutate: (action: PanelAction) => Promise<PanelData>;
} | null>(null);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PanelData | null>(null);
  const [loadError, setLoadError] = useState(false);
  const pendingRead = useRef<AbortController | null>(null);
  const queue = useRef(Promise.resolve());
  const pendingWrites = useRef(0);

  const refresh = useCallback(async () => {
    if (pendingWrites.current) return;
    pendingRead.current?.abort();
    const controller = new AbortController();
    pendingRead.current = controller;
    try {
      const next = await requestPanel(undefined, controller.signal);
      if (controller.signal.aborted) return;
      setData(next);
      setLoadError(false);
    } catch {
      if (!controller.signal.aborted) setLoadError(true);
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(refresh, 0);
    window.addEventListener("focus", refresh);
    return () => {
      window.clearTimeout(initialLoad);
      pendingRead.current?.abort();
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);

  function mutate(action: PanelAction) {
    pendingRead.current?.abort();
    pendingWrites.current += 1;
    const result = queue.current.then(async () => {
      try {
        const next = await requestPanel(action);
        setData(next);
        setLoadError(false);
        return next;
      } catch (error) {
        if (error instanceof RequestError && error.status === 401 && action.action !== "login") {
          setData(emptyPanel);
        }
        throw error;
      } finally {
        pendingWrites.current -= 1;
      }
    });
    queue.current = result.then(() => undefined, () => undefined);
    return result;
  }

  return (
    <PanelContext.Provider value={{ data, loadError, refresh, mutate }}>
      {children}
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const context = useContext(PanelContext);
  if (!context) throw new Error("PanelProvider is required.");
  return context;
}
