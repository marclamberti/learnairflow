"use client";

import { PlayIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RunButtonProps {
  isRunning: boolean;
  onClick: () => void;
}

export function RunButton({ isRunning, onClick }: RunButtonProps) {
  return (
    <Button size="sm" onClick={onClick} disabled={isRunning}>
      {isRunning ? (
        <LoaderCircleIcon data-icon="inline-start" className="animate-spin" />
      ) : (
        <PlayIcon data-icon="inline-start" />
      )}
      {isRunning ? "Running..." : "Run DAG"}
    </Button>
  );
}
