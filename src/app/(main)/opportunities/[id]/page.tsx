
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
        <CardTitle className="flex items-center gap-2"><Wand2 className="text-accent" /> AI-Suggested Candidates</CardTitle>
      </CardHeader>
      <CardContent>
          <Alert variant="default" className="border-amber-500 text-amber-500 dark:border-amber-400 dark:text-amber-400 [&>svg]:text-amber-500 dark:[&>svg]:text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>AI Features Disabled</AlertTitle>
            <AlertDescription>
              Please add your Gemini API key to the `.env` file to enable AI-powered candidate suggestions.
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
        <CardTitle className="flex items-center gap-2"><Wand2 className="text-accent" /> AI-Suggested Candidates</CardTitle>
        <CardDescription>
          Potential students based on skill and interest matching.
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
              <Button variant="outline" size="sm">View Profile</Button>
            </div>
            <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Match Score</span>
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
                    at{" "}
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
                Job Description
              </h2>
              <p>{opportunity.longDescription}</p>

              <h2 className="font-headline text-xl font-semibold">
                Required Skills
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
              Apply Now
            </Button>
            {isBusinessUser && <SuggestedCandidates opportunityDescription={opportunity.description} />}
          </div>
        </div>
      </div>
    </div>
  );
}
