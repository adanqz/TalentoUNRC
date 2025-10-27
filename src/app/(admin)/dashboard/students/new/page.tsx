
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function NewStudentPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nuevo Estudiante</CardTitle>
        <CardDescription>
          Complete el formulario para agregar un nuevo estudiante a la plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Ej. Ana Torres" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="Ej. ana.t@example.com" />
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="avatarUrl">URL del Avatar</Label>
            <Input id="avatarUrl" placeholder="https://..." />
        </div>
        <div className="space-y-2">
            <Label htmlFor="skills">Habilidades (separadas por comas)</Label>
            <Input id="skills" placeholder="Ej. React, Node.js, TypeScript" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="interests">Intereses (separados por comas)</Label>
            <Input id="interests" placeholder="Ej. Desarrollo Web, IA" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" asChild>
            <Link href="/dashboard/students">Cancelar</Link>
        </Button>
        <Button>Guardar Estudiante</Button>
      </CardFooter>
    </Card>
  );
}
