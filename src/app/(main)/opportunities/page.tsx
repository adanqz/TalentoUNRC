
import { OpportunityCard } from "@/components/opportunity-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { opportunities, users } from "@/lib/data";
import { suggestRelevantOpportunities } from "@/ai/flows/suggest-relevant-opportunities";
import { AlertTriangle, Wand2 } from "lucide-react";
import type { Opportunity } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function OpportunitiesPage() {
  const currentUser = users[0];
  let suggestedOpportunities: Opportunity[] = [];
  let otherOpportunities: Opportunity[] = opportunities;
  let hasApiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "YOUR_API_KEY";

  if (hasApiKey) {
    try {
      const allOpportunityDescriptions = opportunities.map(o => o.description);
      
      const suggestedOpportunitiesResult = await suggestRelevantOpportunities({
        studentSkills: currentUser.skills || [],
        studentInterests: currentUser.interests || [],
        availableOpportunities: allOpportunityDescriptions,
      });

      if (suggestedOpportunitiesResult && suggestedOpportunitiesResult.relevantOpportunities) {
        suggestedOpportunities = opportunities.filter(o => suggestedOpportunitiesResult.relevantOpportunities.includes(o.description));
        otherOpportunities = opportunities.filter(o => !suggestedOpportunitiesResult.relevantOpportunities.includes(o.description));
      }
    } catch(e) {
      console.error(e);
      // Keep all opportunities in the other opportunities list
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Encuentra tu Próxima Oportunidad
        </h1>
        <p className="text-muted-foreground">
          Busca pasantías, proyectos y colaboraciones de investigación de las mejores empresas.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <Input
          type="search"
          placeholder="Buscar por título, habilidad o empresa..."
          className="flex-1"
        />
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Tipo de Oportunidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pasantia">Pasantía</SelectItem>
              <SelectItem value="project">Proyecto</SelectItem>
              <SelectItem value="research">Investigación</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remoto</SelectItem>
              <SelectItem value="ciudad-de-mexico">Ciudad de México</SelectItem>
            </SelectContent>
          </Select>
          <Button>Buscar</Button>
        </div>
      </div>
      
      <div className="mb-12">
          <h2 className="mb-6 flex items-center gap-2 font-headline text-2xl font-semibold">
              <Wand2 className="h-6 w-6 text-accent"/>
              Sugerencias Para Ti
          </h2>
          {!hasApiKey && (
             <Alert variant="default" className="mb-6 border-amber-500 text-amber-500 dark:border-amber-400 dark:text-amber-400 [&>svg]:text-amber-500 dark:[&>svg]:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Funcionalidades de IA Deshabilitadas</AlertTitle>
                <AlertDescription>
                  Por favor, añade tu clave de API de Gemini al archivo `.env` para habilitar las sugerencias de oportunidades por IA.
                </AlertDescription>
              </Alert>
          )}
          {suggestedOpportunities.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {suggestedOpportunities.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
            </div>
          )}
          {hasApiKey && suggestedOpportunities.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No hay sugerencias específicas para ti en este momento. ¡Echa un vistazo a todas las oportunidades a continuación!</p>
          )}
      </div>

      <div className="mb-12">
        <h2 className="mb-6 font-headline text-2xl font-semibold">
            Todas las Oportunidades
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherOpportunities.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
        </div>
      </div>

    </div>
  );
}
