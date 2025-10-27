
import { Button } from '@/components/ui/button';
import { businesses, opportunities } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { OpportunityCard } from '@/components/opportunity-card';
import { ArrowRight, Briefcase, Building, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const latestOpportunities = opportunities.slice(0, 3);
  const partnerBusinesses = businesses.slice(0, 5);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-slate-50">
        <Image
          src="https://picsum.photos/seed/paris/1920/1080"
          alt="Vista de la ciudad de París"
          fill
          className="object-cover"
          data-ai-hint="cityscape paris"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="container px-4 md:px-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-white md:text-6xl">
              Tu futuro profesional comienza aquí
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-200 md:text-xl">
              Conectamos a estudiantes talentosos con las mejores empresas para
              pasantías y proyectos que impulsan tu carrera.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/opportunities">
                Explorar Oportunidades <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-10 text-center font-headline text-3xl font-bold">Explora Nuestra Plataforma</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <Card className="text-center flex flex-col items-center justify-center p-6">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full">
                            <Briefcase className="h-8 w-8" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardTitle className="text-xl mb-2">Oportunidades</CardTitle>
                        <CardDescription>Encuentra la pasantía, proyecto o investigación perfecta para ti.</CardDescription>
                    </CardContent>
                    <Button asChild className="w-full">
                        <Link href="/opportunities">Ver Oportunidades</Link>
                    </Button>
                </Card>
                 <Card className="text-center flex flex-col items-center justify-center p-6">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full">
                            <Building className="h-8 w-8" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardTitle className="text-xl mb-2">Empresas</CardTitle>
                        <CardDescription>Conecta con empresas innovadoras y líderes en la industria.</CardDescription>
                    </CardContent>
                    <Button asChild className="w-full">
                        <Link href="/businesses">Explorar Empresas</Link>
                    </Button>
                </Card>
                 <Card className="text-center flex flex-col items-center justify-center p-6">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full">
                            <Users className="h-8 w-8" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardTitle className="text-xl mb-2">Estudiantes</CardTitle>
                        <CardDescription>Descubre el talento emergente de nuestra universidad.</CardDescription>
                    </CardContent>
                    <Button asChild className="w-full">
                        <Link href="/students">Ver Estudiantes</Link>
                    </Button>
                </Card>
            </div>
        </div>
      </section>
      
      {/* Featured Companies Section */}
      <section className="bg-slate-50/50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Empresas que confían en nuestro talento
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
            {partnerBusinesses.map(biz => (
              <Image
                key={biz.id}
                src={biz.logoUrl}
                alt={`${biz.name} logo`}
                width={120}
                height={50}
                className="object-contain grayscale transition hover:grayscale-0"
                data-ai-hint="logo"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Opportunities Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-10 text-center font-headline text-3xl font-bold">
            Últimas Oportunidades
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestOpportunities.map(opp => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/opportunities">Ver Todas las Oportunidades</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="font-headline text-3xl font-bold">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Crea tu perfil, muestra tus habilidades y encuentra la oportunidad
            perfecta para lanzar tu carrera profesional.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/student-profile">Crea tu Perfil</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/businesses">Explora Empresas</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
