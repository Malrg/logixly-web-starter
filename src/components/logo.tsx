import Link from "next/link";
import { branding } from "@/config/branding";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight", className)} aria-label={`${branding.companyName}, inicio`}>
      <span className="grid size-9 place-items-center rounded-xl bg-brand text-sm font-black text-brand-foreground shadow-lg shadow-brand/25">L</span>
      <span>{branding.companyName}</span>
    </Link>
  );
}
