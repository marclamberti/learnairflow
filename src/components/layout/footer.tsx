import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-center px-4 sm:px-6">
        <p className="text-sm text-muted-foreground">
          {new Date().getFullYear()} {SITE_NAME}. Learn Airflow by doing.
        </p>
      </div>
    </footer>
  );
}
