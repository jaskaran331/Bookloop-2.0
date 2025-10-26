import type { User, Listing, CommunityPost } from '../types';

export const mockUser1: User = {
  id: 'user1',
  name: 'Jaskaran Raju',
  avatarUrl: 'https://picsum.photos/seed/user/128/128',
  campus: 'LKCTC',
  major: 'B.TECH AIML',
  listingsCount: 2,
};

export const mockUser2: User = {
  id: 'user2',
  name: 'John Smith',
  avatarUrl: 'https://picsum.photos/seed/john/40/40',
  campus: 'State University',
  major: 'History',
  listingsCount: 2,
};

export const mockUser3: User = {
  id: 'user3',
  name: 'Emily White',
  avatarUrl: 'https://picsum.photos/seed/emily/40/40',
  campus: 'State University',
  major: 'Biology',
  listingsCount: 1,
};

export const mockUser4: User = {
  id: 'user4',
  name: 'Mike Brown',
  avatarUrl: 'https://picsum.photos/seed/mike/40/40',
  campus: 'State University',
  major: 'Physics',
  listingsCount: 1,
};

export const mockListings: Listing[] = [
  { id: '1', title: 'Intro to Algorithms Textbook', description: 'Gently used, no markings. Latest edition.', price: 1200.00, category: 'Textbook', imageUrl: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=400', seller: mockUser1 },
  { id: '2', title: 'Organic Chemistry Lab Coat', description: 'Size M, worn only a few times.', price: 750.00, category: 'Equipment', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400', seller: mockUser2 },
  { id: '3', title: 'Complete Biology Notes (Midterm)', description: 'Digital copy of comprehensive notes.', price: 400.00, category: 'Notes', imageUrl: 'https://images.unsplash.com/photo-1517842645767-c6f90415ad90?q=80&w=400', seller: mockUser3 },
  { id: '4', title: 'Calculus III Solutions Manual', description: 'Official solutions manual. Very helpful for practice.', price: 950.00, category: 'Textbook', imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400', seller: mockUser1 },
  { id: '5', title: 'Advanced Physics Problems', description: 'A great book for advanced physics students.', price: 1500.00, category: 'Textbook', imageUrl: 'https://images.unsplash.com/photo-1509228627-15051441a175?q=80&w=400', seller: mockUser4 },
  { id: '6', title: 'Microscope for Biology Lab', description: 'Standard student microscope, in excellent condition.', price: 3500.00, category: 'Equipment', imageUrl: 'https://images.unsplash.com/photo-1578495941549-b2c5235a3bf7?q=80&w=400', seller: mockUser3 },
  { id: '7', title: 'History of Modern Europe Notes', description: 'Covering from the French Revolution to WWI.', price: 300.00, category: 'Notes', imageUrl: 'https://images.unsplash.com/photo-1526721993215-95a358045a40?q=80&w=400', seller: mockUser2 },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post1',
    author: mockUser3,
    content: 'Has anyone taken Prof. Davis\'s class for CHEM201? Looking for advice on how to prepare for the final exam! Any tips would be appreciated. 🙏',
    timestamp: '2 hours ago',
    likes: 15,
    comments: 4,
  },
  {
    id: 'post2',
    author: mockUser1,
    content: 'Just finished my data structures project and I have a bunch of caffeine-fueled insights on recursion vs. iteration. Anyone want to have a study group session to discuss?',
    timestamp: '5 hours ago',
    likes: 22,
    comments: 8,
  },
  {
    id: 'post3',
    author: mockUser4,
    content: 'Selling my graphing calculator! It\'s a TI-84 Plus, works perfectly. DM me if interested. I am putting up a listing soon.',
    timestamp: '1 day ago',
    likes: 8,
    comments: 2,
  },
];