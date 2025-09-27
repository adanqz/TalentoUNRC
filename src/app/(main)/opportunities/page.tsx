
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
  let hasApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "YOUR_API_KEY";

  if (hasApiKey) {
    const allOpportunityDescriptions = opportunities.map(o => o.description);
    
    const suggestedOpportunitiesResult = await suggestRelevantOpportunities({
      studentSkills: currentUser.skills || [],
      studentInterests: currentUser.interests || [],
      availableOpportunities: allOpportunityDescriptions,
    });

    suggestedOpportunities = opportunities.filter(o => suggestedOpportunitiesResult.relevantOpportunities.includes(o.description));
    otherOpportunities = opportunities.filter(o => !suggestedOpportunitiesResult.relevantOpportunities.includes(o.description));
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Find Your Next Opportunity
        </h1>
        <p className="text-muted-foreground">
          Browse internships, projects, and research collaborations from top businesses.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <Input
          type="search"
          placeholder="Search by title, skill, or company..."
          className="flex-1"
        />
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Opportunity Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="research">Research</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="rio-cuarto">Río Cuarto</SelectItem>
            </SelectContent>
          </Select>
          <Button>Search</Button>
        </div>
      </div>
      
      <div className="mb-12">
          <h2 className="mb-6 flex items-center gap-2 font-headline text-2xl font-semibold">
              <Wand2 className="h-6 w-6 text-accent"/>
              Suggested For You
          </h2>
          {!hasApiKey && (
             <Alert variant="default" className="mb-6 border-amber-500 text-amber-500 dark:border-amber-400 dark:text-amber-400 [&>svg]:text-amber-500 dark:[&>svg]:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>AI Features Disabled</AlertTitle>
                <AlertDescription>
                  Please add your Gemini API key to the `.env` file to enable AI-powered opportunity suggestions.
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
            <p className="text-center text-muted-foreground py-8">No specific suggestions for you at the moment. Check out all opportunities below!</p>
          )}
      </div>

      <div className="mb-12">
        <h2 className="mb-6 font-headline text-2xl font-semibold">
            All Opportunities
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
