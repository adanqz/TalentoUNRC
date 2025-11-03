
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
import { cn } from '@/lib/utils';
import { Download, Search } from 'lucide-react';

const mockLogs = [
  {
    level: 'INFO',
    timestamp: '2023-10-27T10:00:00Z',
    message: 'Server started successfully on port 3000.',
  },
  {
    level: 'INFO',
    timestamp: '2023-10-27T10:05:12Z',
    message: 'GET /api/users 200 OK',
  },
  {
    level: 'WARN',
    timestamp: '2023-10-27T10:15:30Z',
    message: 'Deprecated function `getProfile` called. Use `getUserProfile` instead.',
  },
  {
    level: 'ERROR',
    timestamp: '2023-10-27T10:20:05Z',
    message: 'Failed to connect to database: Connection refused.',
  },
  {
    level: 'INFO',
    timestamp: '2023-10-27T10:22:45Z',
    message: 'User `ana.t@example.com` logged in.',
  },
  {
    level: 'DEBUG',
    timestamp: '2023-10-27T10:23:01Z',
    message: 'Executing database query: SELECT * FROM opportunities LIMIT 10;',
  },
  {
    level: 'ERROR',
    timestamp: '2023-10-27T10:30:15Z',
    message: 'Unhandled exception: TypeError: Cannot read properties of null (reading \'id\') at /app/src/services/email.ts:42',
  },
  {
    level: 'INFO',
    timestamp: '2023-10-27T10:35:00Z',
    message: 'New opportunity "Software Engineer Intern" created.',
  },
];

const levelColors: Record<string, string> = {
  INFO: 'bg-blue-100 text-blue-800 border-blue-200',
  WARN: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  ERROR: 'bg-red-100 text-red-800 border-red-200',
  DEBUG: 'bg-gray-100 text-gray-800 border-gray-200',
};


export default function ServerLogsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <CardTitle>Registros del Servidor</CardTitle>
                <CardDescription>
                    Visualiza los registros de eventos del servidor en tiempo real.
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
            <Input placeholder="Buscar en los registros..." className="pl-9" />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por Nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Niveles</SelectItem>
              <SelectItem value="info">INFO</SelectItem>
              <SelectItem value="warn">WARN</SelectItem>
              <SelectItem value="error">ERROR</SelectItem>
              <SelectItem value="debug">DEBUG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border bg-muted/50 p-4 font-mono text-sm">
          <div className="h-[60vh] overflow-auto">
            {mockLogs.map((log, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-x-4 py-1">
                <span className="text-muted-foreground whitespace-nowrap">{log.timestamp}</span>
                <Badge
                  variant="outline"
                  className={cn("w-fit font-bold", levelColors[log.level])}
                >
                  {log.level}
                </Badge>
                <p className="break-words whitespace-pre-wrap">{log.message}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
