
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
import { Mail, Phone, MapPin, GraduationCap, Globe, Building, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

const licenciaturas = [
    { name: "Ciencias de la Comunicación", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LCC.pdf" },
    { name: "Ciencias de Datos para Negocios", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LCDN.pdf" },
    { name: "Contaduría y Finanzas", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LCF.pdf" },
    { name: "Derecho y Criminología", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LDC.pdf" },
    { name: "Mercadotecnia y Ventas", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LMV.pdf" },
    { name: "Psicología", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LP.pdf" },
    { name: "Relaciones Internacionales", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LRI.pdf" },
    { name: "Administración y Comercio", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LAC.pdf" },
    { name: "Diseño Gráfico y Medios Digitales", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LDGMD.pdf" },
    { name: "Turismo", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LT.pdf" },
    { name: "Ingeniería en Software", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/IS.pdf" },
    { name: "Ingeniería en Control y Automatización", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/ICA.pdf" },
    { name: "Urbanismo y Desarrollo Metropolitano", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LUDM.pdf" },
    { name: "Ciencias Ambientales para Zonas Urbanas", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LCAZU.pdf" },
    { name: "Ciencias de la Tierra", url: "https://www.rcastellanos.cdmx.gob.mx/storage/docs/oferta-academica/licenciaturas/mapas-curriculares/LCT.pdf" },
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
                  <GraduationCap /> Oferta Académica
                </CardTitle>
                <CardDescription>
                  Conoce los planes de estudio de nuestras licenciaturas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {licenciaturas.map((lic) => (
                    <li key={lic.name}>
                        <Link href={lic.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg border hover:bg-muted transition-colors">
                            <h4 className="font-semibold text-primary">{lic.name}</h4>
                            <p className="text-sm text-muted-foreground">Ver plan de estudios</p>
                        </Link>
                    </li>
                  ))}
                </ul>
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

    