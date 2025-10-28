
import { users } from "@/lib/data";
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
import { StudentCard } from "@/components/student-card";
import { Search } from "lucide-react";

export default function StudentsPage() {
  return (
    <div className="bg-slate-50/50">
      <section className="relative w-full border-b bg-slate-50 py-20 md:py-24 lg:py-32">
         <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzdHVkZW50cyUyMGxhdGlufGVufDB8fHx8MTc2MTgxNTg5MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Estudiantes colaborando"
          layout="fill"
          className="object-cover"
          data-ai-hint="students collaborating"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
                 <h1 className="font-headline text-4xl font-bold tracking-tight text-white md:text-5xl">
                    Descubre a Nuestros Talentosos Estudiantes
                </h1>
                <p className="mt-4 text-lg text-slate-200 md:text-xl">
                    Explora los perfiles de los estudiantes de API TalentosUNRC, sus habilidades, proyectos e intereses.
                </p>
            </div>
            <div className="mt-8 mx-auto max-w-2xl rounded-lg border bg-card p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="relative md:col-span-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="Buscar por nombre, habilidad, etc..."
                        className="h-12 pl-10 text-base"
                        />
                    </div>
                <Button size="lg" className="h-12 text-base">Buscar Estudiantes</Button>
                </div>
            </div>
        </div>
    </section>

    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
    </div>
  );
}
