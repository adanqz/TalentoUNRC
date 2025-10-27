
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

export default function StudentsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Explorar Estudiantes
        </h1>
        <p className="text-muted-foreground">
          Descubre a los talentosos estudiantes de API TalentosUNRC.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <Input
          type="search"
          placeholder="Buscar por nombre o habilidad..."
          className="flex-1"
        />
        <Button>Buscar</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

