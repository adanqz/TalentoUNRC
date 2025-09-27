
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
import { suggestPotentialCandidates } from "@/ai/flows/suggest-potential-candidates";
import { users } from "@/lib/data";
import { useEffect, useState } from "react";

const typeIcons = {
    Internship: <Briefcase className="mr-2 h-5 w-5" />,
    Project: <GitBranch className="mr-2 h-5 w-5" />,
    Research: <FlaskConical className="mr-2 h-5 w-5" />,
};

type SuggestedCandidatesProps = {
    opportunityDescription: string;
};

function SuggestedCandidates({ opportunityDescription }: SuggestedCandidatesProps) {
  const [potentialCandidates, setPotentialCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSuggestions() {
      if (process.env.NEXT_PUBLIC_GEMINI_API_KEY && process.env.NEXT_PUBLIC_GEMINI_API_KEY !== "YOUR_API_KEY") {
        try {
          const candidates = await Promise.all(
            users.slice(0, 2).map(async (student) => {
              const result = await suggestPotentialCandidates({
                opportunityDescription,
                studentSkills: student.skills || [],
              });
              return { ...student, ...result };
            })
          );
          setPotentialCandidates(candidates);
        } catch (error) {
          console.error("Error getting potential candidates:", error);
        }
      }
      setLoading(false);
    }
    getSuggestions();
  }, [opportunityDescription]);

  if (loading) {
      return (
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Wand2 className="text-accent" /> Candidatos Sugeridos por IA</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center justify-center py-8">
                      <p>Buscando candidatos...</p>
                  </div>
              </CardContent>
          </Card>
      );
  }

  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY === "YOUR_API_KEY") {
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
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{candidate.name}</h4>
                  <p className="text-sm text-muted-foreground">{candidate.email}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Ver Perfil</Button>
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


export default function ClientComponent({ opportunity, isBusinessUser }: { opportunity: Opportunity; isBusinessUser: boolean }) {
    return (
        <div className="bg-slate-50/50">
            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <div className="mb-8">
                            <div className="mb-4 flex items-center gap-3">
                                <Image
                                    src={opportunity.businessLogoUrl}
                                    alt={`${opportunity.businessName} logo`}
                                    width={50}
                                    height={50}
                                    className="rounded-full border bg-white"
                                    data-ai-hint="logo"
                                />
                                <div>
                                    <h1 className="font-headline text-3xl font-bold">
                                        {opportunity.title}
                                    </h1>
                                    <p className="text-lg text-muted-foreground">
                                        en{" "}
                                        <Link
                                            href={`/businesses/${opportunity.businessId}`}
                                            className="font-medium text-primary hover:underline"
                                        >
                                            {opportunity.businessName}
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
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

                        <div className="prose prose-slate max-w-none dark:prose-invert">
                            <h2 className="font-headline text-xl font-semibold">
                                Descripción del Puesto
                            </h2>
                            <p>{opportunity.longDescription}</p>

                            <h2 className="font-headline text-xl font-semibold">
                                Habilidades Requeridas
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {opportunity.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-sm">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <Button size="lg" className="w-full">
                            Aplicar Ahora
                        </Button>
                        {isBusinessUser && <SuggestedCandidates opportunityDescription={opportunity.description} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
