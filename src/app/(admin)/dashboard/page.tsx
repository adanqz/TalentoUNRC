
'use client';

import { useEffect, useState } from 'react';
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
import { Loader2, Wand2, Users, Building, Briefcase, Wifi } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { opportunities, users, businesses, onlineUsers } from '@/lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const opportunityTypes = opportunities.reduce((acc, opp) => {
  if (!acc[opp.type]) {
    acc[opp.type] = 0;
  }
  acc[opp.type]++;
  return acc;
}, {} as Record<string, number>);

const opportunityChartData = Object.keys(opportunityTypes).map(key => ({
  name: key,
  value: opportunityTypes[key],
}));

const studentSkills = users.flatMap(u => u.skills || []).reduce((acc, skill) => {
    if (!acc[skill]) {
        acc[skill] = 0;
    }
    acc[skill]++;
    return acc;
}, {} as Record<string, number>);

const skillsChartData = Object.keys(studentSkills).map(key => ({
  name: key,
  value: studentSkills[key],
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000 * 30); // update every 30 seconds
    return () => clearInterval(timer);
  }, []);

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

  const handlePotentialCandidates = async () => {
    setLoading(true);
    setResult(null);
    const skillsArray = potentialCandidatesForm.studentSkills.split(',').map(s => s.trim());
    try {
      const res = await suggestPotentialCandidates({ opportunityDescription: potentialCandidatesForm.opportunityDescription, studentSkills: skillsArray });
      setResult(res);
    } catch (e) {
      console.error(e);
      setResult({ error: 'Ocurrió un error.' });
    }
    setLoading(false);
  };
  
  const handleRelevantOpportunities = async () => {
    setLoading(true);
    setResult(null);
    const skillsArray = relevantOppsForm.studentSkills.split(',').map(s => s.trim());
    const interestsArray = relevantOppsForm.studentInterests.split(',').map(s => s.trim());
    const opportunitiesArray = relevantOppsForm.availableOpportunities.split('\n');
    try {
      const res = await suggestRelevantOpportunities({ studentSkills: skillsArray, studentInterests: interestsArray, availableOpportunities: opportunitiesArray });
      setResult(res);
    } catch (e) {
      console.error(e);
      setResult({ error: 'Ocurrió un error.' });
    }
    setLoading(false);
  };

  const handleSuitableCandidates = async () => {
    setLoading(true);
    setResult(null);
    const skillsArray = suitableCandidatesForm.studentSkills.split(',').map(s => s.trim());
    try {
      const res = await suggestSuitableCandidates({ opportunityRequirements: suitableCandidatesForm.opportunityRequirements, studentSkills: skillsArray });
      setResult(res);
    } catch (e) {
      console.error(e);
      setResult({ error: 'Ocurrió un error.' });
    }
    setLoading(false);
  };


  return (
    <>
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Panel de Administración
        </h1>
        <p className="text-muted-foreground">
          Una vista general de las métricas de la plataforma y las herramientas de IA.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Estudiantes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Empresas
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businesses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Oportunidades</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.length}</div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios en Línea</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onlineUsers.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Actividad de Usuarios en Tiempo Real</CardTitle>
                <CardDescription>
                    Usuarios actualmente navegando en el sitio.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {onlineUsers.map(user => (
                        <div key={user.id} className="flex items-center gap-4">
                            <Avatar className="h-10 w-10 border">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    En: <code className="bg-muted px-1.5 py-0.5 rounded-sm">{user.currentPage}</code>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">
                                    {formatDistanceToNow(user.onlineSince, { addSuffix: true, locale: es })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Distribución de Oportunidades</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-64 w-full">
                    <BarChart data={opportunityChartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Distribución de Habilidades de Estudiantes</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-64 w-full">
                    <PieChart>
                        <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                        <Pie data={skillsChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {skillsChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

       <div className="space-y-2">
        <h2 className="font-headline text-2xl font-bold tracking-tight flex items-center gap-2">
          <Wand2 /> Panel de la API de IA
        </h2>
        <p className="text-muted-foreground">
          Interactúa con los flujos de Genkit para probar las capacidades de IA de la aplicación.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Suggest Potential Candidates */}
        <Card>
          <CardHeader>
            <CardTitle>Sugerir Candidatos Potenciales</CardTitle>
            <CardDescription>
              Encuentra estudiantes que coincidan con la descripción de una oportunidad.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <Button onClick={handlePotentialCandidates} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sugerir Candidatos
            </Button>
          </CardContent>
        </Card>

        {/* Suggest Relevant Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle>Sugerir Oportunidades Relevantes</CardTitle>
            <CardDescription>
              Encuentra oportunidades para un estudiante según sus habilidades e intereses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <Button onClick={handleRelevantOpportunities} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sugerir Oportunidades
            </Button>
          </CardContent>
        </Card>

        {/* Suggest Suitable Candidates */}
        <Card>
          <CardHeader>
            <CardTitle>Sugerir Candidatos Adecuados</CardTitle>
            <CardDescription>
              Encuentra estudiantes cuyas habilidades se alinean con los requisitos de la oportunidad.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <Button onClick={handleSuitableCandidates} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sugerir Candidatos
            </Button>
          </CardContent>
        </Card>
      </div>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Resultado de la IA</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </>
  );
}
