"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { RunButton } from "./run-button";

interface OutputPanelProps {
  output: string | null;
  isRunning: boolean;
  onRun: () => void;
  command?: string;
}

export function OutputPanel({ output, isRunning, onRun, command = "airflow dags test my_dag" }: OutputPanelProps) {
  return (
    <div className="flex size-full flex-col bg-terminal text-sm">
      <div className="flex shrink-0 items-center justify-between border-b border-terminal-border px-3 py-1.5">
        <div className="flex items-center gap-3">
          <Badge className="bg-terminal-label/20 text-terminal-label border-terminal-label/30">
            Terminal
          </Badge>
          <span className="font-mono text-xs text-terminal-foreground/70">
            {command}
          </span>
        </div>
        <RunButton isRunning={isRunning} onClick={onRun} />
      </div>
      <ScrollArea className="flex-1">
        <pre className="p-3 font-mono text-xs leading-5 text-terminal-foreground">
          {isRunning && (
            <span className="text-terminal-warning">Running DAG...</span>
          )}
          {!isRunning && output === null && (
            <span className="text-terminal-muted">
              <span className="inline-block text-terminal-foreground/50">{">"}_ </span>
              Press the Run button to start.
            </span>
          )}
          {!isRunning && output !== null && output}
        </pre>
      </ScrollArea>
    </div>
  );
}
