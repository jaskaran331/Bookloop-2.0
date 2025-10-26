import React from 'react';
import type { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {listing.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">
          {listing.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{listing.description.substring(0, 50)}...</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">₹{listing.price.toFixed(2)}</span>
          <div className="flex items-center">
            <img
              src={listing.seller.avatarUrl}
              alt={listing.seller.name}
              className="w-8 h-8 rounded-full object-cover mr-2 border-2 border-white dark:border-slate-800"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{listing.seller.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;