
import { university } from "@/lib/data";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, GraduationCap, Globe, Building } from "lucide-react";

const sedes = [
    { name: "Coyoacán", address: "Av. Canal de Miramontes 1785, Campestre Churubusco, Coyoacán" },
    { name: "Azcapotzalco", address: "Av. Aquiles Serdán 2060, Ex-Hacienda del Rosario, Azcapotzalco" },
    { name: "Justo Sierra", address: "Justo Sierra 71, Centro Histórico, Cuauhtémoc" },
    { name: "Gustavo A. Madero", address: "Av. 517 S/N, San Juan de Aragón I Secc, Gustavo A. Madero" },
    { name: "Benito Juárez (Del Valle)", address: "Av. División del Nte. 906, Col del Valle Nte, Benito Juárez" },
    { name: "Iztapalapa", address: "Calz. Ermita Iztapalapa 235, Iztapalapa" },
    { name: "La Magdalena Contreras", address: "Av. San Bernabé 150, San Jerónimo Lídice, La Magdalena Contreras" },
    { name: "Milpa Alta", address: "Av. México Nte. S/N, Villa Milpa Alta, Milpa Alta" },
    { name: "Tláhuac", address: "Av. Tláhuac 5664, Santa Ana Poniente, Tláhuac" },
    { name: "Xochimilco", address: "Av. 16 de Septiembre S/N, Santa María Nativitas, Xochimilco" },
];

export default function UniversityPage() {
  return (
    <>
      <section className="relative w-full border-b bg-slate-50 py-20 md:py-24 lg:py-32">
        <Image
          src="https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDB8fHx8MTc2MTgzODE3NHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Campus de la Universidad"
          layout="fill"
          className="object-cover"
          data-ai-hint="university campus"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
                 <Image
                    src={university.logoUrl}
                    alt={`${university.name} logo`}
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-white shadow-lg mx-auto mb-4 bg-white"
                    data-ai-hint="university campus"
                    />
                 <h1 className="font-headline text-4xl font-bold tracking-tight text-white md:text-5xl">
                    {university.name}
                </h1>
                <p className="mt-4 text-lg text-slate-200 md:text-xl">
                    {university.description}
                </p>
            </div>
        </div>
    </section>

      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap /> Áreas de Especialización
                </CardTitle>
                <CardDescription>
                  Campos académicos y de investigación clave de la universidad.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {university.expertise.map((area) => (
                  <Badge key={area} variant="secondary" className="text-md">
                    {area}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building /> Sedes
                </CardTitle>
                <CardDescription>
                  Nuestras ubicaciones en toda la Ciudad de México.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {sedes.map((sede) => (
                    <div key={sede.name} className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-muted-foreground" />
                        <div>
                            <h4 className="font-semibold">{sede.name}</h4>
                            <p className="text-sm text-muted-foreground">{sede.address}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Correo Electrónico</h4>
                    <a
                      href={`mailto:${university.contact.email}`}
                      className="text-primary hover:underline"
                    >
                      {university.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Teléfono</h4>
                    <p className="text-muted-foreground">
                      {university.contact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Dirección</h4>
                    <p className="text-muted-foreground">
                      {university.contact.address}
                    </p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Sitio Web</h4>
                    <a
                      href={`https://${university.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {university.contact.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
