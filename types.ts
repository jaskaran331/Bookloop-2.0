export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  campus: string;
  major: string;
  listingsCount: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Textbook' | 'Notes' | 'Equipment';
  imageUrl: string;
  seller: User;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'other';
  avatarUrl?: string;
}

export interface CommunityPost {
  id:string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}