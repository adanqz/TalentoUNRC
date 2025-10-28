
'use client';
import { users, opportunities, getOpportunityById } from "@/lib/data";
import { notFound, redirect, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, Wand2, BookOpen, FileText, Download, Languages, History } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { OpportunityCard } from "@/components/opportunity-card";
import { suggestRelevantOpportunities } from "@/ai/flows/suggest-relevant-opportunities";
import type { Opportunity } from "@/lib/types";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const COLORS = ['#631333', '#a13b63', '#d37ca1', '#E4B799', '#f0d8c9'];

function LanguageChart({ languages }: { languages: { name: string, proficiency: number }[] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  const chartConfig = languages.reduce((acc, lang) => {
    acc[lang.name] = { label: lang.name };
    return acc;
  }, {} as any);

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[250px]">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Tooltip
            content={<ChartTooltipContent 
              formatter={(value, name) => [`${value}%`, name]}
            />}
          />
          <Pie
            data={languages}
            dataKey="proficiency"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {languages.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}


export default function StudentProfilePage() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get('id') || users[0].id;
  const student = users.find(u => u.id === studentId);
  const [suggestedOpportunities, setSuggestedOpportunities] = useState<Opportunity[]>([]);
  const hasApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY && process.env.NEXT_PUBLIC_GEMINI_API_KEY !== "YOUR_API_KEY";

   useEffect(() => {
    async function fetchSuggestions() {
      if (hasApiKey && student) {
        try {
          const allOpportunityDescriptions = opportunities.map(o => o.description);
          const result = await suggestRelevantOpportunities({
            studentSkills: student.skills || [],
            studentInterests: student.interests || [],
            availableOpportunities: allOpportunityDescriptions,
          });
          if (result && result.relevantOpportunities) {
            const suggested = opportunities.filter(o => result.relevantOpportunities.includes(o.description));
            setSuggestedOpportunities(suggested);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    fetchSuggestions();
  }, [student, hasApiKey]);

  if (!student) {
    return notFound();
  }

  return (
    <>
      <div className="bg-card">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <Image
              src={student.avatarUrl}
              alt={`${student.name} logo`}
              width={150}
              height={150}
              className="rounded-full border-4 border-white shadow-lg"
              data-ai-hint="logo"
            />
            <div className="flex-1 space-y-2">
              <h1 className="font-headline text-4xl font-bold">{student.name}</h1>
              <p className="max-w-2xl text-lg text-muted-foreground mx-auto md:mx-0">{student.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Button>
                  <Mail className="mr-2 h-4 w-4" /> Contactar Estudiante
                </Button>
                 <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Descargar CV en PDF
                </Button>
                <Button variant="outline">
                    <History className="mr-2 h-4 w-4" /> Consultar Historial Académico
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen /> Proyectos Prototípicos</CardTitle>
                    <CardDescription>
                        Reflejo del trabajo conjunto por semestre
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible defaultValue="item-1">
                      {student.semesterProjects && student.semesterProjects.length > 0 ? student.semesterProjects.map((semesterProject, index) => (
                        <AccordionItem value={`item-${index + 1}`} key={semesterProject.semester}>
                          <AccordionTrigger className="text-lg font-semibold">{semesterProject.semester}</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-3">
                              {semesterProject.projects.slice(0, 1).map(project => (
                                <li key={project.id}>
                                  <Link href={project.pdfUrl} target="_blank" className="flex items-center justify-between rounded-md p-3 hover:bg-muted">
                                      <div className="flex items-center gap-3">
                                          <FileText className="h-5 w-5 text-primary" />
                                          <span className="font-medium">{project.name}</span>
                                      </div>
                                      <Button variant="outline" size="sm">Ver PDF</Button>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      )) : <p className="text-sm text-muted-foreground">No hay proyectos para mostrar.</p>}
                    </Accordion>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Wand2 className="text-accent" /> Oportunidades Sugeridas</CardTitle>
                    <CardDescription>
                        Pasantías y proyectos sugeridos para {student.name} por la IA de API TalentosUNRC.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                  {suggestedOpportunities.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {suggestedOpportunities.map(opp => (
                        <OpportunityCard key={opp.id} opportunity={opp} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No hay oportunidades sugeridas por el momento.</p>
                  )}
                </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase /> Habilidades e Intereses</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Habilidades</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.skills?.map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                 <Separator className="my-4" />
                <div>
                  <h4 className="font-semibold mb-2">Intereses</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.interests?.map(interest => (
                      <Badge key={interest}>{interest}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            {student.languages && student.languages.length > 0 && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Languages /> Idiomas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LanguageChart languages={student.languages} />
                    </CardContent>
                </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
