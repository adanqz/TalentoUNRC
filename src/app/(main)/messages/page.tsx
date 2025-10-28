
import { conversations, users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function MessagesPage() {
  // Assuming the current user is a student
  const currentUser = users[0];
  const selectedConversation = conversations[0];

  return (
    <div className="h-[calc(100vh-4rem)]">
    <div className="container h-full px-0">
      <div className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 border-t">
        <div className="flex flex-col border-r md:col-span-1">
          <div className="p-4">
            <h2 className="font-headline text-2xl font-bold">Conversaciones</h2>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por empresa..." className="pl-9" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {conversations.map((convo) => (
                <button
                  key={convo.id}
                  className={cn(
                    "flex items-center gap-3 p-4 text-left transition-colors hover:bg-accent/50",
                    selectedConversation.id === convo.id && "bg-accent"
                  )}
                >
                  <Avatar className="border">
                    <AvatarImage src={convo.business.logoUrl} alt={convo.business.name} className="object-contain" />
                    <AvatarFallback>{convo.business.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-baseline justify-between">
                        <p className="truncate font-semibold">{convo.business.name}</p>
                        <p className="text-xs text-muted-foreground">{convo.lastMessageTimestamp}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="truncate text-sm text-muted-foreground">{convo.lastMessage}</p>
                        {convo.unreadCount > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                {convo.unreadCount}
                            </span>
                        )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex flex-col md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-3 border-b p-4">
            <Avatar className="border">
              <AvatarImage src={selectedConversation.business.logoUrl} alt={selectedConversation.business.name} className="object-contain" />
              <AvatarFallback>{selectedConversation.business.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">{selectedConversation.business.name}</h3>
          </div>
          <ScrollArea className="flex-1 p-4 md:p-6">
            <div className="space-y-6">
              {selectedConversation.messages.map((message) => {
                 const isStudentSender = message.senderId === currentUser.id;
                 const senderUser = isStudentSender ? currentUser : null;
                 const senderBusiness = !isStudentSender ? selectedConversation.business : null;
                 
                 return (
                    <div key={message.id} className={cn("flex items-end gap-3", isStudentSender && "flex-row-reverse")}>
                        <Avatar className="h-8 w-8 border">
                            {senderUser && <AvatarImage src={senderUser.avatarUrl} alt={senderUser.name} />}
                            {senderBusiness && <AvatarImage src={senderBusiness.logoUrl} alt={senderBusiness.name} className="object-contain" />}
                            <AvatarFallback>
                                {isStudentSender ? currentUser.name.charAt(0) : selectedConversation.business.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className={cn("max-w-xs rounded-lg p-3 text-sm md:max-w-md", isStudentSender ? "bg-primary text-primary-foreground" : "bg-muted")}>
                            <p>{message.text}</p>
                            <p className={cn("mt-1 text-xs", isStudentSender ? "text-primary-foreground/70" : "text-muted-foreground")}>{message.timestamp}</p>
                        </div>
                    </div>
                 )
              })}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="relative">
              <Input placeholder="Escribe un mensaje..." className="pr-12" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2">
                <Send className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
