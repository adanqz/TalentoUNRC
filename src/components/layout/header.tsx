
"use client";

import { Logo } from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import { Input } from "@/components/ui/input";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/opportunities", label: "Oportunidades" },
    { href: "/businesses", label: "Empresas" },
    { href: "/university", label: "Universidad" },
    { href: "/messages", label: "Mensajes" },
    { href: "/dashboard", label: "Panel" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLandingPage = pathname === '/';

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled || !isLandingPage
          ? "border-b bg-card shadow-sm"
          : "bg-transparent",
        isLandingPage && !isScrolled && "text-white"
      )}
    >
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="mr-6 flex items-center">
          <Logo className={cn(isLandingPage && !isScrolled && "text-white")} />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors",
                pathname.startsWith(item.href)
                  ? "text-primary font-semibold"
                  : isLandingPage && !isScrolled 
                  ? "text-white hover:text-slate-200" 
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
           {/* Mobile Navigation */}
          <div className="md:hidden">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                 <div className="flex h-full flex-col">
                    <div className="border-b pb-4">
                      <Logo />
                    </div>
                    <nav className="mt-8 flex flex-col space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "text-lg transition-colors hover:text-primary",
                            pathname.startsWith(item.href)
                              ? "text-primary font-semibold"
                              : "text-muted-foreground"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                 </div>
              </SheetContent>
            </Sheet>
          </div>

          <UserNav />
        </div>
      </div>
    </header>
  );
}

