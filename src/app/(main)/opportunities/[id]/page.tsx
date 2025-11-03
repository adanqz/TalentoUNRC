
import { getOpportunityById, users } from "@/lib/data";
import { notFound } from "next/navigation";
import { suggestPotentialCandidates } from "@/ai/flows/suggest-potential-candidates";
import ClientComponent from "./client-component";

// Mock "isBusinessUser" check
const isBusinessUser = true;

export default async function OpportunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const opportunity = getOpportunityById(params.id);

  if (!opportunity) {
    notFound();
  }

  let potentialCandidates: any[] | null = [];
  const hasApiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "YOUR_API_KEY";

  if (isBusinessUser && hasApiKey) {
     try {
        potentialCandidates = await Promise.all(
          users.slice(0, 2).map(async (student) => {
              if (!student.skills) return null;
              const result = await suggestPotentialCandidates({
                  opportunityDescription: opportunity.description,
                  studentSkills: student.skills,
              });
              return { ...student, ...result };
          })
      );
      potentialCandidates = potentialCandidates.filter(p => p !== null);
     } catch (error) {
        console.error("Error fetching potential candidates:", error);
        potentialCandidates = [];
     }
  } else if (isBusinessUser && !hasApiKey) {
    potentialCandidates = null;
  }


  return (
    <ClientComponent opportunity={opportunity} isBusinessUser={isBusinessUser} potentialCandidates={potentialCandidates} />
  );
}
