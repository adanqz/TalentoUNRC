

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
import { Briefcase, MapPin, FlaskConical, GitBranch, Handshake, GraduationCap, DollarSign, Clock } from "lucide-react";

type OpportunityCardProps = {
  opportunity: Opportunity;
  highlight?: boolean;
};

const typeIcons: Record<Opportunity['type'], React.ReactNode> = {
  'Prácticas Profesionales': <Briefcase className="h-4 w-4 text-muted-foreground" />,
  'Servicio Social': <Handshake className="h-4 w-4 text-muted-foreground" />,
  Project: <GitBranch className="h-4 w-4 text-muted-foreground" />,
  Research: <FlaskConical className="h-4 w-4 text-muted-foreground" />,
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function OpportunityCard({ opportunity, highlight }: OpportunityCardProps) {
  return (
    <Card className="flex h-full flex-col transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start gap-4">
            <Image
                src={opportunity.businessLogoUrl}
                alt={`${opportunity.businessName} logo`}
                width={50}
                height={50}
                className="rounded-full border bg-white"
                data-ai-hint="logo"
            />
            <div className="flex-1">
                <CardTitle className="text-lg leading-tight">{opportunity.title}</CardTitle>
                <CardDescription className="text-sm">
                    en {opportunity.businessName}
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
         <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
                {typeIcons[opportunity.type]}
                <span>{opportunity.type}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" />
                <span>{opportunity.profileType}</span>
            </div>
             {opportunity.monthlySupport !== undefined && (
                <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" />
                    <span>{opportunity.monthlySupport > 0 ? `${formatCurrency(opportunity.monthlySupport)}/mes` : 'Sin apoyo'}</span>
                </div>
            )}
             <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{opportunity.horario}</span>
            </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {opportunity.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant={'outline'}>
          <Link href={`/opportunities/${opportunity.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
