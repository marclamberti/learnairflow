"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface OutputPanelProps {
  output: string | null;
  isRunning: boolean;
}

export function OutputPanel({ output, isRunning }: OutputPanelProps) {
  return (
    <div className="flex size-full flex-col bg-terminal text-sm">
      <div className="flex h-8 shrink-0 items-center border-b border-terminal-border px-3">
        <span className="text-xs font-medium text-terminal-label">Output</span>
      </div>
      <ScrollArea className="flex-1">
        <pre className="p-3 font-mono text-xs leading-5 text-terminal-foreground">
          {isRunning && (
            <span className="text-terminal-warning">Running DAG...</span>
          )}
          {!isRunning && output === null && (
            <span className="text-terminal-muted">
              Click &quot;Run DAG&quot; to execute your code.
            </span>
          )}
          {!isRunning && output !== null && output}
        </pre>
      </ScrollArea>
    </div>
  );
}
