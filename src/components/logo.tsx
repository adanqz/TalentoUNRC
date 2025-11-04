import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
      >
        <defs>
          <linearGradient
            id="logoGradient"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="hsl(var(--primary))" />
            <stop offset="1" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#logoGradient)" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25 30C25 27.2386 27.2386 25 30 25H45V35H35V75H25V30ZM55 25H70C72.7614 25 75 27.2386 75 30V65C75 70.5228 70.5228 75 65 75H55V65H65C64.9999 62.2386 62.7614 60 60 60C57.2386 60 55 62.2386 55 65V25Z"
          fill="hsl(var(--primary-foreground))"
        />
      </svg>
      <span className="font-bold text-lg hidden sm:inline-block">API Talentos</span>
    </Link>
  );
}
