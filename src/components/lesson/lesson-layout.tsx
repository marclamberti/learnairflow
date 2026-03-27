"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContentPanel } from "./content-panel";
import { OutputPanel } from "./output-panel";
import { LessonNav } from "./lesson-nav";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RotateCcwIcon,
  EyeIcon,
  EyeOffIcon,
  LightbulbIcon,
} from "lucide-react";
import { useLessonProgress } from "@/hooks/use-lesson-progress";
import { useMediaQuery } from "@/hooks/use-media-query";

const CodeEditor = dynamic(
  () => import("./code-editor").then((m) => m.CodeEditor),
  { ssr: false, loading: () => <Skeleton className="size-full" /> },
);

interface LessonLayoutProps {
  courseSlug: string;
  lessonSlug: string;
  instructions: string;
  starterCode: string;
  solutionCode: string;
  mockOutput: string;
  hints?: string[];
  nextLesson: { slug: string; title: string } | null;
}

export function LessonLayout({
  courseSlug,
  lessonSlug,
  instructions,
  starterCode,
  solutionCode,
  mockOutput,
  hints,
  nextLesson,
}: LessonLayoutProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);

  const markCompleted = useLessonProgress((s) => s.markCompleted);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setOutput(mockOutput);
      setIsRunning(false);
      markCompleted(courseSlug, lessonSlug);
    }, 1500);
  }, [mockOutput, markCompleted, courseSlug, lessonSlug]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    setOutput(null);
    setShowSolution(false);
  }, [starterCode]);

  const handleToggleSolution = useCallback(() => {
    setShowSolution((prev) => {
      setCode(!prev ? solutionCode : starterCode);
      return !prev;
    });
  }, [solutionCode, starterCode]);

  const handleShowHint = useCallback(() => {
    setHintsShown((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!isRunning) handleRun();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRun, isRunning]);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const toolbar = (
    <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-terminal-border bg-[#0B1D3D] px-3 py-1.5">
      <Button variant="ghost" size="sm" onClick={handleReset} className="text-terminal-foreground/80 hover:bg-terminal-border/50 hover:text-terminal-foreground">
        <RotateCcwIcon data-icon="inline-start" />
        Reset
      </Button>
      <Button variant="ghost" size="sm" onClick={handleToggleSolution} className="text-terminal-foreground/80 hover:bg-terminal-border/50 hover:text-terminal-foreground">
        {showSolution ? (
          <EyeOffIcon data-icon="inline-start" />
        ) : (
          <EyeIcon data-icon="inline-start" />
        )}
        {showSolution ? "Hide Solution" : "Show Solution"}
      </Button>
      {hints && hints.length > 0 && hintsShown < hints.length && (
        <Button variant="ghost" size="sm" onClick={handleShowHint} className="text-terminal-foreground/80 hover:bg-terminal-border/50 hover:text-terminal-foreground">
          <LightbulbIcon data-icon="inline-start" />
          Hint ({hintsShown}/{hints.length})
        </Button>
      )}
    </div>
  );

  const hintsBlock = hints && hintsShown > 0 && (
    <div className="border-b border-terminal-border bg-[#0B1D3D] px-3 py-2">
      {hints.slice(0, hintsShown).map((hint, i) => (
        <p key={i} className="text-xs text-terminal-foreground">
          <span className="text-terminal-warning">Hint {i + 1}:</span> {hint}
        </p>
      ))}
    </div>
  );

  const navFooter = (
    <LessonNav courseSlug={courseSlug} nextLesson={nextLesson} />
  );

  if (!isDesktop) {
    return (
      <div className="flex h-[calc(100vh-7rem)] flex-col">
        <Tabs defaultValue="instructions" className="flex flex-1 flex-col">
          <TabsList className="shrink-0">
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>
          <TabsContent value="instructions" className="flex-1 overflow-hidden">
            <ContentPanel markdown={instructions} footer={navFooter} />
          </TabsContent>
          <TabsContent value="editor" className="flex-1 overflow-hidden">
            <div className="flex size-full flex-col">
              {toolbar}
              {hintsBlock}
              <div className="flex-1">
                <CodeEditor value={code} onChange={setCode} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="output" className="flex-1 overflow-hidden">
            <OutputPanel output={output} isRunning={isRunning} onRun={handleRun} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={40} minSize={25}>
          <ContentPanel markdown={instructions} footer={navFooter} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="flex size-full flex-col overflow-hidden rounded-r-lg">
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel defaultSize={65} minSize={20}>
                <div className="flex size-full flex-col">
                  {toolbar}
                  {hintsBlock}
                  <div className="flex-1">
                    <CodeEditor value={code} onChange={setCode} />
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel defaultSize={35} minSize={10}>
                <OutputPanel output={output} isRunning={isRunning} onRun={handleRun} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
