
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

export default function NewBusinessPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nueva Empresa</CardTitle>
        <CardDescription>
          Complete el formulario para agregar una nueva empresa a la plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Empresa</Label>
            <Input id="name" placeholder="Ej. Tech Innovators Inc." />
        </div>
        <div className="space-y-2">
            <Label htmlFor="logoUrl">URL del Logo</Label>
            <Input id="logoUrl" placeholder="https://..." />
        </div>
        <div className="space-y-2">
            <Label htmlFor="mission">Misión</Label>
            <Textarea id="mission" placeholder="La misión de nuestra empresa es..." />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" asChild>
            <Link href="/dashboard/businesses">Cancelar</Link>
        </Button>
        <Button>Guardar Empresa</Button>
      </CardFooter>
    </Card>
  );
}
