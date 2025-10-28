
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
import { AlertTriangle, Wand2, Filter, Search } from "lucide-react";
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
    <div className="bg-slate-50/50">
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-12 space-y-3">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Encuentra tu Próxima Oportunidad
        </h1>
        <p className="text-lg text-muted-foreground">
          Busca servicio social, prácticas profesionales, proyectos y colaboraciones de investigación de las mejores empresas.
        </p>
      </div>

      <div className="mb-12 rounded-lg border bg-card p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Buscar por título, habilidad o empresa..."
                className="h-12 pl-10 text-base"
                />
            </div>
          <Select>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Tipo de Oportunidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="servicio-social">Servicio Social</SelectItem>
              <SelectItem value="practicas-profesionales">Prácticas Profesionales</SelectItem>
              <SelectItem value="project">Proyecto</SelectItem>
              <SelectItem value="research">Investigación</SelectItem>
            </SelectContent>
          </Select>
          <Button size="lg" className="h-12 text-base">Buscar</Button>
        </div>
      </div>
      
      <div className="mb-16">
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
          {suggestedOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {suggestedOpportunities.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} highlight />
                ))}
            </div>
          ) : (
             hasApiKey && <p className="text-center text-muted-foreground py-8">No hay sugerencias específicas para ti en este momento. ¡Echa un vistazo a todas las oportunidades a continuación!</p>
          )}
          
      </div>

      <div className="mb-12">
        <h2 className="mb-6 font-headline text-2xl font-semibold">
            Todas las Oportunidades
        </h2>
        {otherOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherOpportunities.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
            </div>
        ) : (
            <p className="text-center text-muted-foreground py-8">No hay más oportunidades disponibles en este momento.</p>
        )}
      </div>

    </div>
    </div>
  );
}
