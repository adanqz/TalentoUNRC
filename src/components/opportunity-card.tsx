
import type { Opportunity } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, MapPin, FlaskConical, GitBranch } from "lucide-react";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

const typeIcons = {
  Internship: <Briefcase className="h-4 w-4 text-muted-foreground" />,
  Project: <GitBranch className="h-4 w-4 text-muted-foreground" />,
  Research: <FlaskConical className="h-4 w-4 text-muted-foreground" />,
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="mb-4 flex items-center gap-3">
          <Image
            src={opportunity.businessLogoUrl}
            alt={`${opportunity.businessName} logo`}
            width={40}
            height={40}
            className="rounded-full"
            data-ai-hint="logo"
          />
          <div>
            <CardTitle className="text-lg leading-tight">{opportunity.title}</CardTitle>
            <CardDescription className="text-sm">
              {opportunity.businessName}
            </CardDescription>
          </div>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
                {typeIcons[opportunity.type]}
                <span>{opportunity.type}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{opportunity.location}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {opportunity.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {opportunity.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
          {opportunity.skills.length > 3 && (
            <Badge variant="outline">+{opportunity.skills.length - 3}</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/opportunities/${opportunity.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
