
import { users, opportunities, getOpportunityById } from "@/lib/data";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, Wand2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OpportunityCard } from "@/components/opportunity-card";
import { suggestRelevantOpportunities } from "@/ai/flows/suggest-relevant-opportunities";
import type { Opportunity } from "@/lib/types";

export default async function StudentProfilePage({ searchParams }: { searchParams: { id?: string }}) {
  const studentId = searchParams.id || users[0].id;
  const student = users.find(u => u.id === studentId);

  if (!student) {
    notFound();
  }

  const hasApiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "YOUR_API_KEY";
  let suggestedOpportunities: Opportunity[] = [];

  if (hasApiKey) {
    try {
      const allOpportunityDescriptions = opportunities.map(o => o.description);
      const result = await suggestRelevantOpportunities({
        studentSkills: student.skills || [],
        studentInterests: student.interests || [],
        availableOpportunities: allOpportunityDescriptions,
      });
      if (result && result.relevantOpportunities) {
        suggestedOpportunities = opportunities.filter(o => result.relevantOpportunities.includes(o.description));
      }
    } catch (e) {
      console.error(e);
    }
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
              <Button>
                <Mail className="mr-2 h-4 w-4" /> Contactar Estudiante
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Wand2 className="text-accent" /> Mis Oportunidades Sugeridas</CardTitle>
                    <CardDescription>
                        Explora pasantías, proyectos y colaboraciones de investigación sugeridas para ti por la IA de API TalentosUNRC.
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
          </div>
        </div>
      </div>
    </>
  );
}
