
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { users, opportunities } from '@/lib/data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MoreHorizontal, Download, CheckCircle, XCircle } from 'lucide-react';

const socialServiceReports = [
  {
    id: 'report-1',
    studentId: 'user-4',
    opportunityId: 'opp-4',
    submissionDate: '2024-07-01T10:00:00Z',
    reportUrl: '#',
    month: 'Junio 2024',
    status: 'Pendiente',
  },
  {
    id: 'report-2',
    studentId: 'user-10',
    opportunityId: 'opp-10',
    submissionDate: '2024-07-02T11:30:00Z',
    reportUrl: '#',
    month: 'Junio 2024',
    status: 'Aprobado',
  },
  {
    id: 'report-3',
    studentId: 'user-7',
    opportunityId: 'opp-7',
    submissionDate: '2024-07-03T09:15:00Z',
    reportUrl: '#',
    month: 'Junio 2024',
    status: 'Rechazado',
  },
  {
    id: 'report-4',
    studentId: 'user-4',
    opportunityId: 'opp-4',
    submissionDate: '2024-06-01T10:00:00Z',
    reportUrl: '#',
    month: 'Mayo 2024',
    status: 'Aprobado',
  },
];

const statusConfig: Record<
  string,
  { color: string; }
> = {
  Pendiente: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  Aprobado: { color: 'bg-green-100 text-green-800 border-green-200' },
  Rechazado: { color: 'bg-red-100 text-red-800 border-red-200' },
};

export default function SocialServiceReportsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reportes de Servicio Social</CardTitle>
        <CardDescription>
          Administra y revisa los reportes mensuales de los estudiantes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead className="hidden md:table-cell">Oportunidad</TableHead>
              <TableHead className="hidden sm:table-cell">Mes</TableHead>
              <TableHead className="hidden sm:table-cell">Fecha de Entrega</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socialServiceReports.map((report) => {
              const student = users.find((u) => u.id === report.studentId);
              const opportunity = opportunities.find(
                (o) => o.id === report.opportunityId
              );
              return (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={student?.avatarUrl} alt={student?.name} />
                        <AvatarFallback>{student?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{student?.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {opportunity?.title}
                  </TableCell>
                   <TableCell className="hidden sm:table-cell">
                    {report.month}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {format(new Date(report.submissionDate), 'd MMM yyyy, HH:mm', { locale: es })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn('capitalize', statusConfig[report.status].color)}
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Download className="mr-2" />
                          Descargar Reporte
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2" />
                          Aprobar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          <XCircle className="mr-2" />
                          Rechazar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
