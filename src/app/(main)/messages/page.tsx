
import { conversations, users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const currentUser = users[0];
  const selectedConversation = conversations[0];

  return (
    <div className="h-[calc(100vh-4rem)]">
    <div className="container h-full px-0">
      <div className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 border-t">
        <div className="flex flex-col border-r md:col-span-1">
          <div className="p-4">
            <h2 className="font-headline text-2xl font-bold">Conversations</h2>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages" className="pl-9" />
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
                  <Avatar>
                    <AvatarImage src={convo.participant.avatarUrl} alt={convo.participant.name} />
                    <AvatarFallback>{convo.participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-baseline justify-between">
                        <p className="truncate font-semibold">{convo.participant.name}</p>
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
            <Avatar>
              <AvatarImage src={selectedConversation.participant.avatarUrl} alt={selectedConversation.participant.name} />
              <AvatarFallback>{selectedConversation.participant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">{selectedConversation.participant.name}</h3>
          </div>
          <ScrollArea className="flex-1 p-4 md:p-6">
            <div className="space-y-6">
              {selectedConversation.messages.map((message) => {
                 const isSender = message.senderId === currentUser.id;
                 const sender = isSender ? currentUser : selectedConversation.participant;
                 return (
                    <div key={message.id} className={cn("flex items-end gap-3", isSender && "flex-row-reverse")}>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={sender.avatarUrl} alt={sender.name} />
                            <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={cn("max-w-xs rounded-lg p-3 text-sm md:max-w-md", isSender ? "bg-primary text-primary-foreground" : "bg-muted")}>
                            <p>{message.text}</p>
                            <p className={cn("mt-1 text-xs", isSender ? "text-primary-foreground/70" : "text-muted-foreground")}>{message.timestamp}</p>
                        </div>
                    </div>
                 )
              })}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="relative">
              <Input placeholder="Type a message..." className="pr-12" />
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
