
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import { Download, Search, User, Clock, Info, ShieldAlert, WifiOff, FileJson } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const mockLogs = [
    {
        id: 'log-1',
        level: 'AUDIT',
        timestamp: '2023-10-27T10:35:00Z',
        actor: 'admin@example.com',
        ip: '201.148.33.12',
        action: 'OPPORTUNITY_CREATE',
        message: 'Nueva oportunidad "Software Engineer Intern" creada.',
        details: {
            title: "Software Engineer Intern",
            businessId: "biz-1",
            skills: ["React", "Node.js", "TypeScript"]
        }
    },
    {
        id: 'log-2',
        level: 'INFO',
        timestamp: '2023-10-27T10:22:45Z',
        actor: 'ana.t@example.com',
        ip: '189.172.11.54',
        action: 'USER_LOGIN',
        message: 'Usuario `ana.t@example.com` inició sesión.',
        details: {
            userId: "user-1",
            method: "email/password"
        }
    },
    {
        id: 'log-3',
        level: 'AUDIT',
        timestamp: '2023-10-27T10:23:01Z',
        actor: 'admin@example.com',
        ip: '201.148.33.12',
        action: 'USER_UPDATE',
        message: 'Se actualizó el perfil del usuario `carlos.g@example.com`.',
        details: {
            userId: "user-2",
            changes: {
                skills: {
                    before: ['Python', 'Machine Learning'],
                    after: ['Python', 'Machine Learning', 'TensorFlow']
                }
            }
        }
    },
    {
        id: 'log-4',
        level: 'WARN',
        timestamp: '2023-10-27T10:15:30Z',
        actor: 'system',
        ip: '127.0.0.1',
        action: 'DEPRECATION_WARNING',
        message: 'Función obsoleta `getProfile` llamada. Usar `getUserProfile` en su lugar.',
        details: {
            file: "/app/src/api/old-routes.ts:88",
        }
    },
    {
        id: 'log-5',
        level: 'ERROR',
        timestamp: '2023-10-27T10:20:05Z',
        actor: 'system',
        ip: '127.0.0.1',
        action: 'DB_CONNECTION_FAILED',
        message: 'Fallo al conectar con la base de datos: Conexión rechazada.',
        details: {
            host: "db.prod.internal",
            port: 5432,
            reason: "Connection refused"
        }
    },
     {
        id: 'log-6',
        level: 'SECURITY',
        timestamp: '2023-10-27T11:05:10Z',
        actor: 'anonymous',
        ip: '104.28.212.129',
        action: 'AUTH_FAILURE',
        message: 'Intento de inicio de sesión fallido para `admin@example.com`.',
        details: {
            reason: "Contraseña incorrecta",
            attempts: 3
        }
    },
];

const levelConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  INFO: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <Info className="h-4 w-4 text-blue-500" /> },
  WARN: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <ShieldAlert className="h-4 w-4 text-yellow-500" /> },
  ERROR: { color: 'bg-red-100 text-red-800 border-red-200', icon: <WifiOff className="h-4 w-4 text-red-500" /> },
  AUDIT: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: <FileJson className="h-4 w-4 text-purple-500" /> },
  SECURITY: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: <ShieldAlert className="h-4 w-4 text-orange-500" /> },
  DEBUG: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: <Info className="h-4 w-4 text-gray-500" /> },
};


export default function ServerLogsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <CardTitle>Registros del Servidor</CardTitle>
                <CardDescription>
                    Visualiza y audita los eventos importantes del sistema.
                </CardDescription>
            </div>
            <Button>
                <Download className="mr-2" />
                Descargar Registros
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por actor, acción, IP o mensaje..." className="pl-9" />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por Nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Niveles</SelectItem>
              {Object.keys(levelConfig).map(level => (
                <SelectItem key={level} value={level.toLowerCase()}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-[60vh] rounded-md border bg-muted/50 p-1">
            <Accordion type="single" collapsible className="w-full">
            {mockLogs.map((log) => (
              <AccordionItem value={log.id} key={log.id} className="border-b-0">
                  <Card className="m-2">
                    <AccordionTrigger className="p-4 hover:no-underline font-mono text-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-2 w-full text-left">
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {levelConfig[log.level]?.icon}
                                <Badge
                                    variant="outline"
                                    className={cn("w-fit font-bold", levelConfig[log.level]?.color)}
                                >
                                    {log.level}
                                </Badge>
                            </div>
                            <p className="flex-1 font-sans break-words whitespace-pre-wrap font-medium">{log.message}</p>
                            <span className="text-muted-foreground whitespace-nowrap text-xs md:text-sm">
                                {format(new Date(log.timestamp), "d MMM yyyy, HH:mm:ss", { locale: es })}
                            </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="px-4 pb-4 border-t pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-semibold">Actor</p>
                                        <p className="text-muted-foreground">{log.actor}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                     <div>
                                        <p className="font-semibold">IP Origen</p>
                                        <p className="text-muted-foreground">{log.ip}</p>
                                    </div>
                                </div>
                                 <div className="flex items-center gap-2">
                                    <FileJson className="h-4 w-4 text-muted-foreground" />
                                     <div>
                                        <p className="font-semibold">Acción</p>
                                        <p className="text-muted-foreground font-mono text-xs bg-muted px-1 py-0.5 rounded">{log.action}</p>
                                    </div>
                                </div>
                            </div>
                             <h4 className="font-semibold text-sm mb-2">Detalles</h4>
                             <pre className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-xs overflow-x-auto">
                                {JSON.stringify(log.details, null, 2)}
                            </pre>
                        </div>
                    </AccordionContent>
                  </Card>
              </AccordionItem>
            ))}
            </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
