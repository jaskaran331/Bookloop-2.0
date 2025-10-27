import type { User, Listing, CommunityPost } from '../types';

export const mockUser1: User = {
  id: 'user1',
  name: 'Jaskaran Raju',
  avatarUrl: 'https://placehold.co/128x128/e0e7ff/4f46e5?text=JR',
  campus: 'LKCTC',
  major: 'B.TECH AIML',
  listingsCount: 2,
};

export const mockUser2: User = {
  id: 'user2',
  name: 'John Smith',
  avatarUrl: 'https://placehold.co/40x40/dcfce7/166534?text=JS',
  campus: 'State University',
  major: 'History',
  listingsCount: 2,
};

export const mockUser3: User = {
  id: 'user3',
  name: 'Emily White',
  avatarUrl: 'https://placehold.co/40x40/fef2f2/991b1b?text=EW',
  campus: 'State University',
  major: 'Biology',
  listingsCount: 1,
};

export const mockUser4: User = {
  id: 'user4',
  name: 'Mike Brown',
  avatarUrl: 'https://placehold.co/40x40/f0f9ff/0c4a6e?text=MB',
  campus: 'State University',
  major: 'Physics',
  listingsCount: 1,
};

export const mockListings: Listing[] = [
  { id: '1', title: 'Intro to Algorithms Textbook', description: 'Gently used, no markings. Latest edition.', price: 1200.00, category: 'Textbook', imageUrl: 'https://placehold.co/400x300/e0e7ff/4f46e5?text=Algorithms', seller: mockUser1 },
  { id: '2', title: 'Organic Chemistry Lab Coat', description: 'Size M, worn only a few times.', price: 750.00, category: 'Equipment', imageUrl: 'https://placehold.co/400x300/dcfce7/166534?text=Lab+Coat', seller: mockUser2 },
  { id: '3', title: 'Complete Biology Notes (Midterm)', description: 'Digital copy of comprehensive notes.', price: 400.00, category: 'Notes', imageUrl: 'https://placehold.co/400x300/fef2f2/991b1b?text=Notes', seller: mockUser3 },
  { id: '4', title: 'Calculus III Solutions Manual', description: 'Official solutions manual. Very helpful for practice.', price: 950.00, category: 'Textbook', imageUrl: 'https://placehold.co/400x300/e0e7ff/4f46e5?text=Calculus', seller: mockUser1 },
  { id: '5', title: 'Advanced Physics Problems', description: 'A great book for advanced physics students.', price: 1500.00, category: 'Textbook', imageUrl: 'https://placehold.co/400x300/f0f9ff/0c4a6e?text=Physics', seller: mockUser4 },
  { id: '6', title: 'Microscope for Biology Lab', description: 'Standard student microscope, in excellent condition.', price: 3500.00, category: 'Equipment', imageUrl: 'https://placehold.co/400x300/fef2f2/991b1b?text=Microscope', seller: mockUser3 },
  { id: '7', title: 'History of Modern Europe Notes', description: 'Covering from the French Revolution to WWI.', price: 300.00, category: 'Notes', imageUrl: 'https://placehold.co/400x300/dcfce7/166534?text=History', seller: mockUser2 },
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