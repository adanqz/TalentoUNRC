
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
import { Search } from "lucide-react";

export default function BusinessesPage() {
  return (
    <div className="bg-slate-50/50">
       <section className="relative w-full border-b bg-slate-50 py-20 md:py-24 lg:py-32">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGJ1aWxkaW5nfGVufDB8fHx8MTc2MTgzODE3NHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Edificios de oficinas modernos"
          layout="fill"
          className="object-cover"
          data-ai-hint="business building"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
                 <h1 className="font-headline text-4xl font-bold tracking-tight text-white md:text-5xl">
                    Empresas Asociadas
                </h1>
                <p className="mt-4 text-lg text-slate-200 md:text-xl">
                    Explora las empresas innovadoras asociadas a través de API TalentosUNRC.
                </p>
            </div>
            <div className="mt-8 mx-auto max-w-2xl rounded-lg border bg-card p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="relative md:col-span-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="Buscar por nombre o industria..."
                        className="h-12 pl-10 text-base"
                        />
                    </div>
                <Button size="lg" className="h-12 text-base">Buscar</Button>
                </div>
            </div>
        </div>
    </section>

      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  <Link href={`/businesses/${biz.id}`}>Ver Perfil</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
