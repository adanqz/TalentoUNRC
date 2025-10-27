import { Link2Icon } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Link2Icon className="h-8 w-8 text-primary" />
    </Link>
  );
}
