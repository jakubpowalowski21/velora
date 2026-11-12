"use client";

import { useRef, useState } from "react";
import type { PanelAction } from "@/lib/panel";
import { usePanel } from "./panel-provider";

export function usePanelTask() {
  const { mutate } = usePanel();
  const inProgress = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run(action: PanelAction) {
    if (inProgress.current) return false;
    inProgress.current = true;
    setBusy(true);
    setError("");
    try {
      await mutate(action);
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Spróbuj ponownie.");
      return false;
    } finally {
      inProgress.current = false;
      setBusy(false);
    }
  }

  return { run, busy, error };
}
