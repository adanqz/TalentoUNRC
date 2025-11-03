
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  Bell,
  Home,
  Users,
  Building,
  Briefcase,
  Package2,
  Settings,
  Terminal,
  FlaskConical,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserNav } from '@/components/user-nav';
import { Logo } from '@/components/logo';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/students', icon: Users, label: 'Estudiantes' },
    { href: '/dashboard/businesses', icon: Building, label: 'Empresas' },
    { href: '/dashboard/opportunities', icon: Briefcase, label: 'Oportunidades' },
    { href: '/dashboard/api-playground', icon: FlaskConical, label: 'API Playground'},
    { href: '/dashboard/logs', icon: Terminal, label: 'Logs'},
    { href: '/dashboard/settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Mobile Navigation can be added here */}
          <div className="w-full flex-1">
            {/* Search can be added here */}
          </div>
          <UserNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
