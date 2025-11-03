import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image 
        src="/logo.png"
        alt="API Talentos Logo"
        width={28}
        height={28}
        className="h-7 w-7"
      />
      <span className={cn("font-headline text-xl font-bold", className)}>
        API Talentos
      </span>
    </Link>
  );
}
