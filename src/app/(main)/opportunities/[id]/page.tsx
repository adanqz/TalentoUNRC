
import { getOpportunityById, users } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  FlaskConical,
  GitBranch,
  Building,
  Users,
  Wand2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
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
import ClientComponent from "./client-component";

const typeIcons = {
  Internship: <Briefcase className="mr-2 h-5 w-5" />,
  Project: <GitBranch className="mr-2 h-5 w-5" />,
  Research: <FlaskConical className="mr-2 h-5 w-5" />,
};

// Mock "isBusinessUser" check
const isBusinessUser = true;

async function SuggestedCandidates({ opportunityDescription }: { opportunityDescription: string}) {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "YOUR_API_KEY") {
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
    )
  }

  const potentialCandidates = await Promise.all(
      users.slice(0, 2).map(async (student) => {
          const result = await suggestPotentialCandidates({
              opportunityDescription,
              studentSkills: student.skills || [],
          });
          return { ...student, ...result };
      })
  );
  
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
  )
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const opportunity = getOpportunityById(params.id);

  if (!opportunity) {
    notFound();
  }

  return (
    <ClientComponent opportunity={opportunity} isBusinessUser={isBusinessUser} />
  );
}
