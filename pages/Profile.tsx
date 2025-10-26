import React from 'react';
import type { User, Listing } from '../types';
import ListingCard from '../components/ListingCard';

const mockUser: User = {
  id: 'user1',
  name: 'Jaskaran Raju',
  avatarUrl: 'https://picsum.photos/seed/user/128/128',
  campus: 'LKCTC',
  major: 'B.TECH AIML',
  listingsCount: 2,
};

const mockListings: Listing[] = [
  { id: '1', title: 'Intro to Algorithms Textbook', description: 'Gently used, no markings.', price: 1200.00, category: 'Textbook', imageUrl: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=400', seller: mockUser },
  { id: '4', title: 'Calculus III Solutions Manual', description: 'Official solutions manual.', price: 950.00, category: 'Textbook', imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400', seller: mockUser },
];


const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <div className="h-40 bg-primary-500"></div>
        <div className="p-6 sm:p-8 flex items-start -mt-20">
          <img src={mockUser.avatarUrl} alt={mockUser.name} className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800" />
          <div className="ml-6 mt-16">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{mockUser.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{mockUser.major} @ {mockUser.campus}</p>
          </div>
        </div>
        <div className="px-6 sm:px-8 pb-6 border-t border-gray-200 dark:border-slate-700 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">My Listings ({mockUser.listingsCount})</h2>
          {mockListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">You haven't posted any listings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;