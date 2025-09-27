
import { businesses } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function BusinessesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Partner Businesses
        </h1>
        <p className="text-muted-foreground">
          Explore the innovative companies partnering through NexusConnect.
        </p>
      </div>

       <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <Input
          type="search"
          placeholder="Search by company name or industry..."
          className="flex-1"
        />
        <Button>Search</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {businesses.map((biz) => (
          <Card key={biz.id} className="flex flex-col">
            <CardHeader className="items-center text-center">
              <Image
                src={biz.logoUrl}
                alt={`${biz.name} logo`}
                width={80}
                height={80}
                className="mb-4 rounded-full border bg-white"
                data-ai-hint="logo"
              />
              <CardTitle>{biz.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="line-clamp-3">
                {biz.mission}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/businesses/${biz.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
