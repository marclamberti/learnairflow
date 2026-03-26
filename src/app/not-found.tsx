import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="max-w-md text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. Maybe the DAG
        hasn&apos;t been scheduled yet.
      </p>
      <div className="flex gap-4">
        <Button render={<Link href="/" />} nativeButton={false}>
          Go Home
        </Button>
        <Button
          variant="outline"
          render={<Link href="/courses" />}
          nativeButton={false}
        >
          Browse Courses
        </Button>
      </div>
    </div>
  );
}
