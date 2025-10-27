'use client';
import type { Opportunity } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  FlaskConical,
  GitBranch,
  Wand2,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const typeIcons = {
    Pasantía: <Briefcase className="mr-2 h-5 w-5" />,
    Project: <GitBranch className="mr-2 h-5 w-5" />,
    Research: <FlaskConical className="mr-2 h-5 w-5" />,
};

type SuggestedCandidatesProps = {
    potentialCandidates: any[] | null;
};

function SuggestedCandidates({ potentialCandidates }: SuggestedCandidatesProps) {

  if (potentialCandidates === null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Wand2 className="text-accent" /> Candidatos Sugeridos por IA</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="default" className="border-amber-500 text-amber-500 dark:border-amber-400 dark:text-amber-400 [&>svg]:text-amber-500 dark:[&>svg]:text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Funcionalidades de IA Deshabilitadas</AlertTitle>
            <AlertDescription>
              Por favor, añade tu clave de API de Gemini al archivo `.env` para habilitar las sugerencias de candidatos por IA.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!potentialCandidates || potentialCandidates.length === 0) {
      return (
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Wand2 className="text-accent" /> Candidatos Sugeridos por IA</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center justify-center py-8">
                      <p>No se encontraron candidatos adecuados.</p>
                  </div>
              </CardContent>
          </Card>
      );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Wand2 className="text-accent" /> Candidatos Sugeridos por IA</CardTitle>
        <CardDescription>
          Estudiantes potenciales basados en la coincidencia de habilidades e intereses.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {potentialCandidates.map((candidate) => (
          <div key={candidate.id} className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <Avatar>
                  <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <h4 className="font-semibold truncate">{candidate.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">{candidate.email}</p>
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="flex-shrink-0">
                <Link href={`/student-profile?id=${candidate.id}`}>Ver Perfil</Link>
              </Button>
            </div>
            <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Puntuación de Coincidencia</span>
                    <span>{Math.round(candidate.matchScore * 100)}%</span>
                </div>
                <Progress value={candidate.matchScore * 100} />
            </div>
            <p className="text-sm text-muted-foreground italic">"{candidate.justification}"</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


export default function ClientComponent({ opportunity, isBusinessUser, potentialCandidates }: { opportunity: Opportunity; isBusinessUser: boolean, potentialCandidates: any[] | null }) {
    return (
        <div className="bg-slate-50/50">
            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    <div className="space-y-8 md:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <Image
                                        src={opportunity.businessLogoUrl}
                                        alt={`${opportunity.businessName} logo`}
                                        width={50}
                                        height={50}
                                        className="rounded-full border bg-white"
                                        data-ai-hint="logo"
                                    />
                                    <div className="flex-1">
                                        <CardTitle className="text-2xl">{opportunity.title}</CardTitle>
                                        <CardDescription className="text-md">
                                            en{" "}
                                            <Link
                                                href={`/businesses/${opportunity.businessId}`}
                                                className="font-medium text-primary hover:underline"
                                            >
                                                {opportunity.businessName}
                                            </Link>
                                        </CardDescription>
                                        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                                            <div className="flex items-center text-sm">
                                                {typeIcons[opportunity.type]}
                                                <span>{opportunity.type}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <MapPin className="mr-2 h-5 w-5" />
                                                <span>{opportunity.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Descripción del Puesto</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-slate max-w-none dark:prose-invert">
                                    <p>{opportunity.longDescription}</p>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-xl">Habilidades Requeridas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {opportunity.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="text-sm">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                    <div className="space-y-8">
                        <Button size="lg" className="w-full">
                            Aplicar Ahora
                        </Button>
                        {isBusinessUser && <SuggestedCandidates potentialCandidates={potentialCandidates} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
