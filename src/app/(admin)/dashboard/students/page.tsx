
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { users } from '@/lib/data';
import { MoreHorizontal, Plus, Upload, Download } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from 'next/link';

export default function AdminStudentsPage() {
  return (
    <div className="relative space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Cargar Estudiantes Masivamente</CardTitle>
          <CardDescription>
            Agrega o actualiza estudiantes subiendo un archivo en formato CSV, XLS, XLSX o TXT.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="student-file">Seleccionar Archivo</Label>
            <Input id="student-file" type="file" accept=".csv, .xls, .xlsx, .txt" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button>
                <Upload className="mr-2" />
                Cargar Archivo
            </Button>
            <Button variant="outline" asChild>
                <Link href="#">
                    <Download className="mr-2" />
                    Descargar Plantilla
                </Link>
            </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estudiantes</CardTitle>
          <CardDescription>
            Gestiona los estudiantes de la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Avatar</span>
                </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">
                  Habilidades
                </TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                          {user.skills?.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary">
                                  {skill}
                              </Badge>
                          ))}
                           {user.skills && user.skills.length > 3 && (
                              <Badge variant="outline">+{user.skills.length - 3}</Badge>
                          )}
                      </div>
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
      <Button asChild className="fixed bottom-12 right-12 h-16 w-16 rounded-full shadow-lg">
        <Link href="/dashboard/students/new">
            <Plus className="h-6 w-6" />
            <span className="sr-only">Agregar Estudiante</span>
        </Link>
      </Button>
    </div>
  );
}
