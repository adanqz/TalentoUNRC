
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  skills?: string[];
  interests?: string[];
};

export type Business = {
  id: string;
  name: string;
  logoUrl: string;
  mission: string;
  team: User[];
  projects: string[];
  opportunities: string[]; // Array of opportunity IDs
};

export type Opportunity = {
  id: string;
  title: string;
  businessName: string;
  businessId: string;
  businessLogoUrl: string;
  type: 'Internship' | 'Project' | 'Research';
  description: string;
  longDescription: string;
  location: string;
  skills: string[];
};

export type University = {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  expertise: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
    website: string;
  };
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  participant: User;
  messages: Message[];
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
};
