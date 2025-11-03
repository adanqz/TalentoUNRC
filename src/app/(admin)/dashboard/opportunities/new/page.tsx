
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { businesses } from "@/lib/data";
import Link from "next/link";

export default function NewOpportunityPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nueva Oportunidad</CardTitle>
        <CardDescription>
          Complete el formulario para agregar una nueva oportunidad a la plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
            <Label htmlFor="title">Título de la Oportunidad</Label>
            <Input id="title" placeholder="Ej. Pasantía de Desarrollador Frontend" />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="business">Empresa</Label>
                 <Select>
                    <SelectTrigger id="business">
                        <SelectValue placeholder="Seleccione una empresa" />
                    </SelectTrigger>
                    <SelectContent>
                        {businesses.map(b => (
                            <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="type">Tipo de Oportunidad</Label>
                 <Select>
                    <SelectTrigger id="type">
                        <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Servicio Social">Servicio Social</SelectItem>
                        <SelectItem value="Prácticas Profesionales">Prácticas Profesionales</SelectItem>
                        <SelectItem value="Project">Proyecto</SelectItem>
                        <SelectItem value="Research">Investigación</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input id="location" placeholder="Ej. Remoto, Ciudad de México" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="profileType">Tipo de Perfil Requerido</Label>
                 <Select>
                    <SelectTrigger id="profileType">
                        <SelectValue placeholder="Seleccione un tipo de perfil" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Estudiante">Estudiante</SelectItem>
                        <SelectItem value="Egresado">Egresado</SelectItem>
                        <SelectItem value="Titulado Sin Experiencia">Titulado Sin Experiencia</SelectItem>
                        <SelectItem value="Titulado">Titulado</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="skills">Habilidades Requeridas (separadas por comas)</Label>
                <Input id="skills" placeholder="Ej. React, TypeScript, CSS" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="monthlySupport">Apoyo Monetario Mensual (MXN)</Label>
                <Input id="monthlySupport" type="number" placeholder="Ej. 8000" />
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Descripción Corta</Label>
            <Textarea id="description" placeholder="Una breve descripción de la oportunidad." rows={2} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="longDescription">Descripción Larga</Label>
            <Textarea id="longDescription" placeholder="Una descripción detallada de la oportunidad, responsabilidades, etc." rows={5} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" asChild>
            <Link href="/dashboard/opportunities">Cancelar</Link>
        </Button>
        <Button>Guardar Oportunidad</Button>
      </CardFooter>
    </Card>
  );
}
