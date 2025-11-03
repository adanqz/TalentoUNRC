
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
import { Separator } from "@/components/ui/separator";
import { Download, Upload } from "lucide-react";
import Link from "next/link";

export default function NewStudentPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Estudiante</CardTitle>
          <CardDescription>
            Complete el formulario para agregar un nuevo estudiante individualmente a la plataforma.
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
      
      <div className="relative">
          <Separator />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted-foreground">O</div>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Carga Masiva de Estudiantes</CardTitle>
              <CardDescription>
                  Sube un archivo (.csv, .txt, .xls, .xlsx) para agregar múltiples estudiantes a la vez.
              </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulk-upload-file">Archivo de Estudiantes</Label>
                <Input id="bulk-upload-file" type="file" accept=".csv, .txt, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                <p className="text-xs text-muted-foreground">
                    Asegúrate de que el archivo siga el formato requerido.
                    <Button variant="link" size="sm" className="p-0 h-auto ml-1" asChild>
                        <Link href="/student-upload-template.csv" download>
                           Descargar plantilla
                        </Link>
                    </Button>
                </p>
              </div>
          </CardContent>
          <CardFooter className="flex justify-end">
              <Button>
                  <Upload className="mr-2" />
                  Subir Archivo y Procesar
              </Button>
          </CardFooter>
      </Card>
    </div>
  );
}

