
import { getBusinessById, getOpportunityById, getUserById } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { OpportunityCard } from "@/components/opportunity-card";
import type { Opportunity } from "@/lib/types";

export default function BusinessProfilePage({ params }: { params: { id: string } }) {
  const business = getBusinessById(params.id);

  if (!business) {
    notFound();
  }

  const businessOpportunities: Opportunity[] = business.opportunities
    .map(oppId => getOpportunityById(oppId))
    .filter((opp): opp is Opportunity => !!opp);

  const teamMembers = business.team
    .map(user => getUserById(user.id))
    .filter(user => !!user);

  return (
    <>
      <div className="bg-card">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <Image
              src={business.logoUrl}
              alt={`${business.name} logo`}
              width={150}
              height={150}
              className="rounded-full border-4 border-white shadow-lg"
              data-ai-hint="logo"
            />
            <div className="flex-1 space-y-2">
              <h1 className="font-headline text-4xl font-bold">{business.name}</h1>
              <p className="max-w-2xl text-lg text-muted-foreground mx-auto md:mx-0">{business.mission}</p>
              <Button>
                <Mail className="mr-2 h-4 w-4" /> Contactar Empresa
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle>Oportunidades Abiertas</CardTitle>
                    <CardDescription>
                        Explora pasantías, proyectos y colaboraciones de investigación ofrecidas por {business.name}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {businessOpportunities.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {businessOpportunities.map(opp => (
                        <OpportunityCard key={opp.id} opportunity={opp} />
                        ))}
                    </div>
                    ) : (
                    <p className="text-center text-muted-foreground py-8">No hay oportunidades abiertas por el momento.</p>
                    )}
                </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> Equipo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.length > 0 ? (
                  teamMembers.map(member => member && (
                    <div key={member.id} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                    <p className="text-sm text-muted-foreground">Información del equipo no disponible.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Proyectos Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {business.projects.map(project => (
                        <li key={project}>{project}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
