
import { Logo } from "@/components/logo";
import Link from "next/link";

const footerLinks = [
    { href: "/opportunities", label: "Oportunidades" },
    { href: "/businesses", label: "Empresas" },
    { href: "/university", label: "Universidad" },
    { href: "/about", label: "Sobre Nosotros" },
    { href: "/contact", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-4">
                    <Logo />
                    <p className="max-w-xs text-sm text-muted-foreground">
                        Conectando el talento del mañana con las oportunidades de hoy.
                    </p>
                </div>
                <div>
                    <h4 className="mb-4 font-semibold">Enlaces Rápidos</h4>
                    <ul className="space-y-2">
                        {footerLinks.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 font-semibold">Legal</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                                Política de Privacidad
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                                Términos de Servicio
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} API TalentosUNRC. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
  );
}
