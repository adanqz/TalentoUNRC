
import { university } from "@/lib/data";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, GraduationCap, Globe } from "lucide-react";

export default function UniversityPage() {
  return (
    <>
      <div className="bg-card">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <Image
              src={university.logoUrl}
              alt={`${university.name} logo`}
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-lg"
              data-ai-hint="university campus"
            />
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-bold tracking-tight">
                {university.name}
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                {university.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap /> Areas of Expertise
                </CardTitle>
                <CardDescription>
                  Key academic and research fields at the university.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {university.expertise.map((area) => (
                  <Badge key={area} variant="secondary" className="text-md">
                    {area}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a
                      href={`mailto:${university.contact.email}`}
                      className="text-primary hover:underline"
                    >
                      {university.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-muted-foreground">
                      {university.contact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-muted-foreground">
                      {university.contact.address}
                    </p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Website</h4>
                    <a
                      href={`https://${university.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {university.contact.website}
                    </a>
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
