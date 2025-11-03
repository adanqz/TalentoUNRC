
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { suggestPotentialCandidates } from '@/ai/flows/suggest-potential-candidates';
import { suggestRelevantOpportunities } from '@/ai/flows/suggest-relevant-opportunities';
import { suggestSuitableCandidates } from '@/ai/flows/suggest-suitable-candidates';
import { Loader2, Wand2, ChevronRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type Flow = 'potential-candidates' | 'relevant-opportunities' | 'suitable-candidates';

const flowDetails = {
    'potential-candidates': {
        title: 'Sugerir Candidatos Potenciales',
        description: 'Encuentra estudiantes que coincidan con la descripción de una oportunidad.',
    },
    'relevant-opportunities': {
        title: 'Sugerir Oportunidades Relevantes',
        description: 'Encuentra oportunidades para un estudiante según sus habilidades e intereses.',
    },
    'suitable-candidates': {
        title: 'Sugerir Candidatos Adecuados',
        description: 'Encuentra estudiantes cuyas habilidades se alinean con los requisitos.',
    }
}

export default function ApiPlaygroundPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedFlow, setSelectedFlow] = useState<Flow>('potential-candidates');

  const [potentialCandidatesForm, setPotentialCandidatesForm] = useState({
    opportunityDescription: 'Pasantía de verano de 3 meses para un desarrollador de software para trabajar en nuestro producto SaaS. El candidato ideal debe tener experiencia con React y Node.js.',
    studentSkills: 'React, Node.js, TypeScript',
  });

  const [relevantOppsForm, setRelevantOppsForm] = useState({
    studentSkills: 'React, TypeScript, Next.js',
    studentInterests: 'Desarrollo Web, IA, Startups',
    availableOpportunities: '1. Pasantía de desarrollador Frontend en Tech Innovators Inc.\n2. Científico de datos en Data Insights Co.\n3. Ingeniero de machine learning en AI Startups.',
  });

  const [suitableCandidatesForm, setSuitableCandidatesForm] = useState({
    opportunityRequirements: 'Buscamos un desarrollador de Python con experiencia en Django y DRF. Se requiere conocimiento de PostgreSQL.',
    studentSkills: 'Python, Django, Flask, PostgreSQL',
  });

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      let res;
      if (selectedFlow === 'potential-candidates') {
        const skillsArray = potentialCandidatesForm.studentSkills.split(',').map(s => s.trim());
        res = await suggestPotentialCandidates({ opportunityDescription: potentialCandidatesForm.opportunityDescription, studentSkills: skillsArray });
      } else if (selectedFlow === 'relevant-opportunities') {
        const skillsArray = relevantOppsForm.studentSkills.split(',').map(s => s.trim());
        const interestsArray = relevantOppsForm.studentInterests.split(',').map(s => s.trim());
        const opportunitiesArray = relevantOppsForm.availableOpportunities.split('\n');
        res = await suggestRelevantOpportunities({ studentSkills: skillsArray, studentInterests: interestsArray, availableOpportunities: opportunitiesArray });
      } else if (selectedFlow === 'suitable-candidates') {
        const skillsArray = suitableCandidatesForm.studentSkills.split(',').map(s => s.trim());
        res = await suggestSuitableCandidates({ opportunityRequirements: suitableCandidatesForm.opportunityRequirements, studentSkills: skillsArray });
      }
      setResult(res);
    } catch (e) {
      console.error(e);
      setResult({ error: 'Ocurrió un error al procesar la solicitud.' });
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (selectedFlow) {
      case 'potential-candidates':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pc-opp-desc">Descripción de la Oportunidad</Label>
              <Textarea
                id="pc-opp-desc"
                value={potentialCandidatesForm.opportunityDescription}
                onChange={(e) => setPotentialCandidatesForm({...potentialCandidatesForm, opportunityDescription: e.target.value})}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-student-skills">Habilidades del Estudiante (separadas por comas)</Label>
              <Input
                id="pc-student-skills"
                value={potentialCandidatesForm.studentSkills}
                onChange={(e) => setPotentialCandidatesForm({...potentialCandidatesForm, studentSkills: e.target.value})}
              />
            </div>
          </div>
        );
      case 'relevant-opportunities':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ro-student-skills">Habilidades del Estudiante (separadas por comas)</Label>
              <Input
                id="ro-student-skills"
                value={relevantOppsForm.studentSkills}
                onChange={(e) => setRelevantOppsForm({...relevantOppsForm, studentSkills: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ro-student-interests">Intereses del Estudiante (separadas por comas)</Label>
              <Input
                id="ro-student-interests"
                value={relevantOppsForm.studentInterests}
                onChange={(e) => setRelevantOppsForm({...relevantOppsForm, studentInterests: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ro-opportunities">Oportunidades Disponibles (una por línea)</Label>
              <Textarea
                id="ro-opportunities"
                value={relevantOppsForm.availableOpportunities}
                onChange={(e) => setRelevantOppsForm({...relevantOppsForm, availableOpportunities: e.target.value})}
                rows={4}
              />
            </div>
          </div>
        );
      case 'suitable-candidates':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sc-opp-reqs">Requisitos de la Oportunidad</Label>
              <Textarea
                id="sc-opp-reqs"
                value={suitableCandidatesForm.opportunityRequirements}
                onChange={(e) => setSuitableCandidatesForm({...suitableCandidatesForm, opportunityRequirements: e.target.value})}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-student-skills">Habilidades del Estudiante (separadas por comas)</Label>
              <Input
                id="sc-student-skills"
                value={suitableCandidatesForm.studentSkills}
                onChange={(e) => setSuitableCandidatesForm({...suitableCandidatesForm, studentSkills: e.target.value})}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
          <Wand2 /> API Playground
        </h1>
        <p className="text-muted-foreground">
          Interactúa con los flujos de Genkit para probar las capacidades de IA de la aplicación.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-12rem)]">
        {/* Endpoints List */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                {Object.keys(flowDetails).map((flowKey) => (
                  <button
                    key={flowKey}
                    onClick={() => setSelectedFlow(flowKey as Flow)}
                    className={cn(
                      "flex items-center justify-between text-left p-3 rounded-md transition-colors w-full",
                      selectedFlow === flowKey
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <div>
                        <p className="font-semibold">{flowDetails[flowKey as Flow].title}</p>
                        <p className={cn("text-xs", selectedFlow === flowKey ? "text-primary-foreground/80" : "text-muted-foreground")}>{flowDetails[flowKey as Flow].description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request and Response */}
        <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Form */}
          <div className="flex flex-col h-full">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle>Solicitud</CardTitle>
                <CardDescription>Parámetros para: <span className="font-semibold">{flowDetails[selectedFlow].title}</span></CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ScrollArea className="h-full pr-4">
                  {renderForm()}
                </ScrollArea>
              </CardContent>
            </Card>
            <Button onClick={handleSubmit} disabled={loading} className="mt-4 w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2" />}
              Ejecutar
            </Button>
          </div>
          
          {/* Response */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Respuesta de la IA</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                {result ? (
                    <pre className="p-4 bg-muted dark:bg-slate-800 rounded-md text-sm overflow-x-auto h-full">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>El resultado aparecerá aquí.</p>
                    </div>
                )}
                </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

    