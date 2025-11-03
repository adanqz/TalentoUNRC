
import type { User } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type StudentCardProps = {
  student: User;
};

export function StudentCard({ student }: StudentCardProps) {
  return (
    <Card className="flex h-full flex-col transition-all hover:shadow-md">
      <CardHeader className="items-center text-center">
         <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={student.avatarUrl} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-center">
        <CardTitle className="text-lg">{student.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{student.email}</p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {student.skills?.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
          {student.skills && student.skills.length > 3 && (
            <Badge variant="outline">+{student.skills.length - 3}</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant={"outline"}>
          <Link href={`/student-profile?id=${student.id}`}>Ver Perfil</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
