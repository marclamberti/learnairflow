"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ContentPanel({ markdown }: { markdown: string }) {
  return (
    <ScrollArea className="size-full">
      <div className="prose prose-sm dark:prose-invert max-w-none p-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  );
}
