import { Link2Icon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Link2Icon className="h-6 w-6 text-primary" />
      <span className={cn("font-headline text-xl font-bold", className)}>TalentosUNRC</span>
    </Link>
  );
}
