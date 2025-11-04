
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
import { createOpportunity, readOpportunity, updateOpportunity, deleteOpportunity } from '@/ai/flows/opportunity-crud';
import { createStudent, readStudent, updateStudent, deleteStudent } from '@/ai/flows/student-crud';
import { Loader2, Wand2, ChevronRight, Play, Database, FilePlus, FileSearch, FilePen, FileX, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


type Flow = 'potential-candidates' | 'relevant-opportunities' | 'suitable-candidates' 
| 'create-opportunity' | 'read-opportunity' | 'update-opportunity' | 'delete-opportunity'
| 'create-student' | 'read-student' | 'update-student' | 'delete-student';

const suggestionFlowDetails = {
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
};

const opportunityCrudFlowDetails = {
    'create-opportunity': {
        title: 'Crear Oportunidad',
        description: 'Crea una nueva oportunidad en el sistema.',
        icon: <FilePlus className="mr-2" />
    },
    'read-opportunity': {
        title: 'Leer Oportunidad',
        description: 'Lee los detalles de una oportunidad por su ID.',
        icon: <FileSearch className="mr-2" />
    },
    'update-opportunity': {
        title: 'Actualizar Oportunidad',
        description: 'Actualiza los detalles de una oportunidad existente.',
        icon: <FilePen className="mr-2" />
    },
    'delete-opportunity': {
        title: 'Eliminar Oportunidad',
        description: 'Elimina una oportunidad del sistema.',
        icon: <FileX className="mr-2" />
    }
};

const studentCrudFlowDetails = {
    'create-student': {
        title: 'Crear Estudiante',
        description: 'Crea un nuevo estudiante en el sistema.',
        icon: <FilePlus className="mr-2" />
    },
    'read-student': {
        title: 'Leer Estudiante',
        description: 'Lee los detalles de un estudiante por su ID.',
        icon: <FileSearch className="mr-2" />
    },
    'update-student': {
        title: 'Actualizar Estudiante',
        description: 'Actualiza los detalles de un estudiante existente.',
        icon: <FilePen className="mr-2" />
    },
    'delete-student': {
        title: 'Eliminar Estudiante',
        description: 'Elimina un estudiante del sistema.',
        icon: <FileX className="mr-2" />
    }
};

const allFlowDetails = { ...suggestionFlowDetails, ...opportunityCrudFlowDetails, ...studentCrudFlowDetails };

export default function ApiPlaygroundPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedFlow, setSelectedFlow] = useState<Flow>('potential-candidates');

  // Form states
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
  const [opportunityCrudForm, setOpportunityCrudForm] = useState({
      id: 'opp-123',
      title: 'Desarrollador Full Stack Senior',
      description: 'Trabaja en un producto innovador con un equipo talentoso.',
      businessName: 'NextGen Solutions',
  });
  const [studentCrudForm, setStudentCrudForm] = useState({
      id: 'student-123',
      name: 'Ana Torres',
      email: 'ana.t@example.com',
      skills: 'React, Node.js, TypeScript',
  });


  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      let res;
      switch (selectedFlow) {
        // Suggestion Flows
        case 'potential-candidates':
          const pcSkills = potentialCandidatesForm.studentSkills.split(',').map(s => s.trim());
          res = await suggestPotentialCandidates({ opportunityDescription: potentialCandidatesForm.opportunityDescription, studentSkills: pcSkills });
          break;
        case 'relevant-opportunities':
          const roSkills = relevantOppsForm.studentSkills.split(',').map(s => s.trim());
          const roInterests = relevantOppsForm.studentInterests.split(',').map(s => s.trim());
          const roOpps = relevantOppsForm.availableOpportunities.split('\n');
          res = await suggestRelevantOpportunities({ studentSkills: roSkills, studentInterests: roInterests, availableOpportunities: roOpps });
          break;
        case 'suitable-candidates':
          const scSkills = suitableCandidatesForm.studentSkills.split(',').map(s => s.trim());
          res = await suggestSuitableCandidates({ opportunityRequirements: suitableCandidatesForm.opportunityRequirements, studentSkills: scSkills });
          break;

        // Opportunity CRUD
        case 'create-opportunity':
            res = await createOpportunity({ title: opportunityCrudForm.title, description: opportunityCrudForm.description, businessName: opportunityCrudForm.businessName });
            break;
        case 'read-opportunity':
            res = await readOpportunity({ id: opportunityCrudForm.id });
            break;
        case 'update-opportunity':
            res = await updateOpportunity(opportunityCrudForm);
            break;
        case 'delete-opportunity':
            res = await deleteOpportunity({ id: opportunityCrudForm.id });
            break;

        // Student CRUD
        case 'create-student':
            res = await createStudent({ name: studentCrudForm.name, email: studentCrudForm.email, skills: studentCrudForm.skills.split(',').map(s => s.trim()) });
            break;
        case 'read-student':
            res = await readStudent({ id: studentCrudForm.id });
            break;
        case 'update-student':
            res = await updateStudent({ id: studentCrudForm.id, name: studentCrudForm.name, email: studentCrudForm.email, skills: studentCrudForm.skills.split(',').map(s => s.trim()) });
            break;
        case 'delete-student':
            res = await deleteStudent({ id: studentCrudForm.id });
            break;
      }
      setResult(res);
    } catch (e) {
      console.error(e);
      const error = e instanceof Error ? e.message : 'Ocurrió un error al procesar la solicitud.';
      setResult({ error });
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
              <Textarea id="pc-opp-desc" value={potentialCandidatesForm.opportunityDescription} onChange={(e) => setPotentialCandidatesForm({...potentialCandidatesForm, opportunityDescription: e.target.value})} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-student-skills">Habilidades del Estudiante (separadas por comas)</Label>
              <Input id="pc-student-skills" value={potentialCandidatesForm.studentSkills} onChange={(e) => setPotentialCandidatesForm({...potentialCandidatesForm, studentSkills: e.target.value})} />
            </div>
          </div>
        );
      case 'relevant-opportunities':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ro-student-skills">Habilidades del Estudiante (separadas por comas)</Label>
              <Input id="ro-student-skills" value={relevantOppsForm.studentSkills} onChange={(e) => setRelevantOppsForm({...relevantOppsForm, studentSkills: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ro-student-interests">Intereses del Estudiante (separadas por comas)</Label>
              <Input id="ro-student-interests" value={relevantOppsForm.studentInterests} onChange={(e) => setRelevantOppsForm({...relevantOppsForm, studentInterests: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ro-opportunities">Oportunidades Disponibles (una por línea)</Label>
              <Textarea id="ro-opportunities" value={relevantOppsForm.availableOpportunities} onChange={(e) => setRelevantOppsForm({...relevantOppsForm, availableOpportunities: e.target.value})} rows={4} />
            </div>
          </div>
        );
      case 'suitable-candidates':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sc-opp-reqs">Requisitos de la Oportunidad</Label>
              <Textarea id="sc-opp-reqs" value={suitableCandidatesForm.opportunityRequirements} onChange={(e) => setSuitableCandidatesForm({...suitableCandidatesForm, opportunityRequirements: e.target.value})} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-student-skills">Habilidades del Estudiante (separadas por comas)</Label>
              <Input id="sc-student-skills" value={suitableCandidatesForm.studentSkills} onChange={(e) => setSuitableCandidatesForm({...suitableCandidatesForm, studentSkills: e.target.value})} />
            </div>
          </div>
        );
        case 'create-opportunity':
        case 'update-opportunity':
            return (
            <div className="space-y-4">
                 {selectedFlow === 'update-opportunity' && (
                    <div className="space-y-2">
                        <Label htmlFor="crud-id">ID de Oportunidad</Label>
                        <Input id="crud-id" value={opportunityCrudForm.id} onChange={(e) => setOpportunityCrudForm({...opportunityCrudForm, id: e.target.value})} />
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="crud-title">Título</Label>
                    <Input id="crud-title" value={opportunityCrudForm.title} onChange={(e) => setOpportunityCrudForm({...opportunityCrudForm, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="crud-desc">Descripción</Label>
                    <Textarea id="crud-desc" value={opportunityCrudForm.description} onChange={(e) => setOpportunityCrudForm({...opportunityCrudForm, description: e.target.value})} rows={3} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="crud-biz">Nombre de la Empresa</Label>
                    <Input id="crud-biz" value={opportunityCrudForm.businessName} onChange={(e) => setOpportunityCrudForm({...opportunityCrudForm, businessName: e.target.value})} />
                </div>
            </div>
            );
        case 'read-opportunity':
        case 'delete-opportunity':
            return (
                <div className="space-y-2">
                    <Label htmlFor="crud-id">ID de Oportunidad</Label>
                    <Input id="crud-id" value={opportunityCrudForm.id} onChange={(e) => setOpportunityCrudForm({...opportunityCrudForm, id: e.target.value})} />
                    <p className="text-xs text-muted-foreground">Prueba con `opp-123` para la lectura.</p>
                </div>
            );
      case 'create-student':
      case 'update-student':
          return (
          <div className="space-y-4">
                {selectedFlow === 'update-student' && (
                  <div className="space-y-2">
                      <Label htmlFor="student-crud-id">ID de Estudiante</Label>
                      <Input id="student-crud-id" value={studentCrudForm.id} onChange={(e) => setStudentCrudForm({...studentCrudForm, id: e.target.value})} />
                  </div>
              )}
              <div className="space-y-2">
                  <Label htmlFor="student-crud-name">Nombre</Label>
                  <Input id="student-crud-name" value={studentCrudForm.name} onChange={(e) => setStudentCrudForm({...studentCrudForm, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="student-crud-email">Email</Label>
                  <Input id="student-crud-email" type="email" value={studentCrudForm.email} onChange={(e) => setStudentCrudForm({...studentCrudForm, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="student-crud-skills">Habilidades (separadas por comas)</Label>
                  <Input id="student-crud-skills" value={studentCrudForm.skills} onChange={(e) => setStudentCrudForm({...studentCrudForm, skills: e.target.value})} />
              </div>
          </div>
          );
      case 'read-student':
      case 'delete-student':
          return (
              <div className="space-y-2">
                  <Label htmlFor="student-crud-id">ID de Estudiante</Label>
                  <Input id="student-crud-id" value={studentCrudForm.id} onChange={(e) => setStudentCrudForm({...studentCrudForm, id: e.target.value})} />
                  <p className="text-xs text-muted-foreground">Prueba con `student-123` para la lectura.</p>
              </div>
          );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          API Playground
        </h1>
        <p className="text-muted-foreground">
          Interactúa con los flujos de Genkit para probar las capacidades de IA de la aplicación.
        </p>
      </div>

      <Tabs defaultValue="suggestions" className="h-[calc(100vh-12rem)] space-y-4">
        <TabsList>
            <TabsTrigger value="suggestions"><Wand2 className="mr-2"/> Sugerencias IA</TabsTrigger>
            <TabsTrigger value="crud-opps"><Database className="mr-2"/> CRUD Oportunidades</TabsTrigger>
            <TabsTrigger value="crud-students"><Users className="mr-2"/> CRUD Estudiantes</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            <div className="lg:col-span-3">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                    <TabsContent value="suggestions">
                        <div className="flex flex-col space-y-2">
                        {Object.keys(suggestionFlowDetails).map((flowKey) => (
                        <button
                            key={flowKey}
                            onClick={() => setSelectedFlow(flowKey as Flow)}
                            className={cn(
                                "flex items-center justify-between text-left p-3 rounded-md transition-colors w-full",
                                selectedFlow === flowKey ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            )}
                        >
                            <div>
                                <p className="font-semibold">{suggestionFlowDetails[flowKey as keyof typeof suggestionFlowDetails].title}</p>
                                <p className={cn("text-xs", selectedFlow === flowKey ? "text-primary-foreground/80" : "text-muted-foreground")}>{suggestionFlowDetails[flowKey as keyof typeof suggestionFlowDetails].description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                        </button>
                        ))}
                    </div>
                    </TabsContent>
                    <TabsContent value="crud-opps">
                         <div className="flex flex-col space-y-2">
                            {Object.keys(opportunityCrudFlowDetails).map((flowKey) => (
                            <button
                                key={flowKey}
                                onClick={() => setSelectedFlow(flowKey as Flow)}
                                className={cn(
                                    "flex items-center justify-between text-left p-3 rounded-md transition-colors w-full",
                                    selectedFlow === flowKey ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                )}
                            >
                                <div>
                                    <p className="font-semibold">{opportunityCrudFlowDetails[flowKey as keyof typeof opportunityCrudFlowDetails].title}</p>
                                    <p className={cn("text-xs", selectedFlow === flowKey ? "text-primary-foreground/80" : "text-muted-foreground")}>{opportunityCrudFlowDetails[flowKey as keyof typeof opportunityCrudFlowDetails].description}</p>
                                </div>
                                <ChevronRight className="h-4 w-4" />
                            </button>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="crud-students">
                         <div className="flex flex-col space-y-2">
                            {Object.keys(studentCrudFlowDetails).map((flowKey) => (
                            <button
                                key={flowKey}
                                onClick={() => setSelectedFlow(flowKey as Flow)}
                                className={cn(
                                    "flex items-center justify-between text-left p-3 rounded-md transition-colors w-full",
                                    selectedFlow === flowKey ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                )}
                            >
                                <div>
                                    <p className="font-semibold">{studentCrudFlowDetails[flowKey as keyof typeof studentCrudFlowDetails].title}</p>
                                    <p className={cn("text-xs", selectedFlow === flowKey ? "text-primary-foreground/80" : "text-muted-foreground")}>{studentCrudFlowDetails[flowKey as keyof typeof studentCrudFlowDetails].description}</p>
                                </div>
                                <ChevronRight className="h-4 w-4" />
                            </button>
                            ))}
                        </div>
                    </TabsContent>
                </CardContent>
            </Card>
            </div>

            <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col h-full">
                <Card className="flex-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Solicitud</CardTitle>
                    <CardDescription>Parámetros para: <span className="font-semibold">{allFlowDetails[selectedFlow].title}</span></CardDescription>
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
            
            <Card className="flex flex-col h-full">
                <CardHeader>
                <CardTitle>Respuesta</CardTitle>
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
      </Tabs>
    </>
  );
}
