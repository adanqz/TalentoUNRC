
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { businesses } from '@/lib/data';
import { MoreHorizontal, Plus } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Image from 'next/image';

export default function AdminBusinessesPage() {
  return (
    <div className="relative">
      <Card>
        <CardHeader>
          <CardTitle>Empresas</CardTitle>
          <CardDescription>
            Gestiona las empresas asociadas a la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Logo</span>
                </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden md:table-cell">Misión</TableHead>
                <TableHead className="hidden md:table-cell">Oportunidades</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businesses.map((biz) => (
                <TableRow key={biz.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      src={biz.logoUrl}
                      alt={`${biz.name} logo`}
                      width={40}
                      height={40}
                      className="rounded-full border bg-white"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{biz.name}</TableCell>
                  <TableCell className="hidden md:table-cell line-clamp-2">{biz.mission}</TableCell>
                  <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{biz.opportunities.length}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <Button className="fixed bottom-12 right-12 h-16 w-16 rounded-full shadow-lg">
        <Plus className="h-6 w-6" />
        <span className="sr-only">Agregar Empresa</span>
      </Button>
    </div>
  );
}
