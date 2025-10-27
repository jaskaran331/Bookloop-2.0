import React, { useState } from 'react';
import ListingCard from '../components/ListingCard';
import { SearchIcon } from '../components/icons/SearchIcon';
import type { Listing } from '../types';

const categories = ['All', 'Textbook', 'Notes', 'Equipment'];

interface MarketplaceProps {
  listings: Listing[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ listings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredListings = listings.filter((listing: Listing) => {
    const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Marketplace</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Buy and sell academic materials from fellow students.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search for textbooks, notes..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow'
                  : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-slate-700 border border-gray-300 dark:border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500 dark:text-gray-400">No listings found for your search.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;