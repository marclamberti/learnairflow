"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContentPanelProps {
  markdown: string;
  footer?: React.ReactNode;
}

export function ContentPanel({ markdown, footer }: ContentPanelProps) {
  return (
    <ScrollArea className="size-full bg-background">
      <div className="prose prose-sm dark:prose-invert max-w-none p-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {markdown}
        </ReactMarkdown>
      </div>
      {footer && (
        <div className="border-t border-border px-8 py-4">
          {footer}
        </div>
      )}
    </ScrollArea>
  );
}
