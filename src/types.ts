export interface User {
  id: string;
  uniqueId: string;
  name: string;
  email?: string;
  role: 'member' | 'admin';
  status?: string;
  profileImage: string;
  batch?: string;
  profession?: string;
  location?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  price: number;
  attendees: string[];
}
