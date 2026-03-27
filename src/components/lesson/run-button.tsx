"use client";

import { PlayIcon, LoaderCircleIcon } from "lucide-react";

interface RunButtonProps {
  isRunning: boolean;
  onClick: () => void;
}

export function RunButton({ isRunning, onClick }: RunButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isRunning}
      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-bold text-white shadow-[0_4px_0_0_#059669] transition-all duration-100 hover:bg-emerald-400 active:translate-y-1 active:shadow-none disabled:pointer-events-none disabled:opacity-60"
    >
      {isRunning ? (
        <LoaderCircleIcon className="size-4 animate-spin" />
      ) : (
        <PlayIcon className="size-4" />
      )}
      {isRunning ? "Running..." : "Run"}
      {!isRunning && (
        <kbd className="ml-0.5 rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold leading-none">
          &#8984;&#x23CE;
        </kbd>
      )}
    </button>
  );
}
