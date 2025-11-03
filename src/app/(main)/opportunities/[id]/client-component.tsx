

'use client';
import type { Opportunity, Business, AcademicRequirements } from "@/lib/types";
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
  Handshake,
  GraduationCap,
  DollarSign,
  Clock,
  Building,
  Check,
  Lightbulb,
  Calendar,
  Users,
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
import { Separator } from "@/components/ui/separator";

const typeIcons: Record<Opportunity['type'], React.ReactNode> = {
    'Prácticas Profesionales': <Briefcase className="mr-2 h-5 w-5" />,
    'Servicio Social': <Handshake className="mr-2 h-5 w-5" />,
    Project: <GitBranch className="mr-2 h-5 w-5" />,
    Research: <FlaskConical className="mr-2 h-5 w-5" />,
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

type SuggestedCandidatesProps = {
    potentialCandidates: any[] | null;
};

const knowledgeLevelColors: Record<string, string> = {
    'Avanzado': 'bg-green-100 text-green-800',
    'Intermedio': 'bg-blue-100 text-blue-800',
    'Básico': 'bg-yellow-100 text-yellow-800',
};


function AcademicRequirementsSection({ academicRequirements }: { academicRequirements: AcademicRequirements }) {
    return (
         <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Antecedentes Académicos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" /> Carreras</h4>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {academicRequirements.degrees.map(degree => <li key={degree}>{degree}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Habilidades Blandas</h4>
                             <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {academicRequirements.softSkills.map(skill => <li key={skill}>{skill}</li>)}
                            </ul>
                        </div>
                    </div>
                     <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" /> Conocimientos Requeridos</h4>
                            <div className="flex flex-wrap gap-2">
                                {academicRequirements.knowledge.map(k => (
                                    <div key={k.name} className="flex items-center">
                                        <span className="bg-muted text-muted-foreground px-3 py-1 rounded-l-md text-sm">{k.name}</span>
                                        <span className={`px-3 py-1 rounded-r-md text-sm font-semibold ${knowledgeLevelColors[k.level] || 'bg-gray-100 text-gray-800'}`}>{k.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {academicRequirements.semester && (
                             <div>
                                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Semestres</h4>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    <li>Semestre mínimo: {academicRequirements.semester.min}</li>
                                    <li>Semestre máximo: {academicRequirements.semester.max}</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

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


export default function ClientComponent({ opportunity, business, isBusinessUser, potentialCandidates }: { opportunity: Opportunity; business: Business; isBusinessUser: boolean, potentialCandidates: any[] | null }) {
    return (
        <>
        <div className="bg-card border-b">
          <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                <Image
                    src={opportunity.businessLogoUrl}
                    alt={`${opportunity.businessName} logo`}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white bg-white shadow-md flex-shrink-0"
                    data-ai-hint="logo"
                />
                <div className="flex-1 space-y-2">
                    <h1 className="font-headline text-4xl font-bold">{opportunity.title}</h1>
                     <p className="text-xl text-muted-foreground">
                        en{" "}
                        <Link
                            href={`/businesses/${opportunity.businessId}`}
                            className="font-semibold text-primary hover:underline"
                        >
                            {opportunity.businessName}
                        </Link>
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                        <div className="flex items-center text-sm font-medium">
                            {typeIcons[opportunity.type]}
                            <span>{opportunity.type}</span>
                        </div>
                        <div className="flex items-center text-sm font-medium">
                            <MapPin className="mr-2 h-5 w-5" />
                            <span>{opportunity.location}</span>
                        </div>
                        <div className="flex items-center text-sm font-medium">
                            <Clock className="mr-2 h-5 w-5" />
                            <span>{opportunity.horario} {opportunity.workHours && `(${opportunity.workHours})`}</span>
                        </div>
                          <div className="flex items-center text-sm font-medium">
                            <GraduationCap className="mr-2 h-5 w-5" />
                            <span>{opportunity.profileType}</span>
                        </div>
                        {opportunity.monthlySupport !== undefined && (
                            <div className="flex items-center text-sm font-medium">
                                <DollarSign className="mr-2 h-5 w-5" />
                                <span>{opportunity.monthlySupport > 0 ? `${formatCurrency(opportunity.monthlySupport)}/mes` : 'Sin apoyo'}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50/50">
            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Descripción del Puesto</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-slate max-w-none dark:prose-invert">
                                    <p>{opportunity.longDescription}</p>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Responsabilidades Diarias</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                  {opportunity.responsibilities.map((resp, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <Check className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                            </CardContent>
                        </Card>
                        
                        {opportunity.academicRequirements && <AcademicRequirementsSection academicRequirements={opportunity.academicRequirements} />}

                        <Card>
                              <CardHeader>
                                <CardTitle className="text-2xl">Habilidades Técnicas Requeridas</CardTitle>
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

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Building /> Acerca de la Compañía</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">{business.mission}</p>
                                <Button asChild variant="secondary">
                                    <Link href={`/businesses/${business.id}`}>Ver Perfil de la Empresa</Link>
                                </Button>
                            </CardContent>
                        </Card>

                    </div>
                    <div className="space-y-8">
                        <Button size="lg" className="w-full h-12 text-lg">
                            Aplicar Ahora
                        </Button>
                        {isBusinessUser && <SuggestedCandidates potentialCandidates={potentialCandidates} />}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
