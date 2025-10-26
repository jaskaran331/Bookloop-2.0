import React, { useState, useEffect, useRef } from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { SearchIcon } from './icons/SearchIcon';
import { mockUser1 } from '../data/mockData';
import type { Listing, CommunityPost } from '../types';
import { performSearch, type SearchResults } from '../services/geminiService';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  listings: Listing[];
  posts: CommunityPost[];
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode, listings, posts }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const debounce = setTimeout(() => {
        setIsSearching(true);
        performSearch(searchQuery, listings, posts).then(results => {
          setSearchResults(results);
          setIsSearching(false);
        });
      }, 500);
      return () => clearTimeout(debounce);
    } else {
      setSearchResults(null);
    }
  }, [searchQuery, listings, posts]);
  
  const hasResults = searchResults && (searchResults.listings.length > 0 || searchResults.posts.length > 0 || searchResults.academicAnswer);

  return (
    <header className="h-16 bg-white dark:bg-slate-800 flex-shrink-0 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 gap-4">
      <div ref={searchContainerRef} className="relative w-full max-w-xl">
        <div className="relative">
            <input
                type="text"
                placeholder="Search listings, posts, or ask a question..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {isSearchFocused && (searchQuery.length > 2) && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-20 max-h-96 overflow-y-auto">
                {isSearching ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">Searching...</div>
                ) : hasResults ? (
                    <div>
                        {searchResults.academicAnswer && (
                            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                                <h4 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">AI Answer</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{searchResults.academicAnswer}</p>
                            </div>
                        )}
                        {searchResults.listings.length > 0 && (
                            <div className="p-2">
                                <h4 className="px-2 pb-1 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Listings</h4>
                                {searchResults.listings.map(l => (
                                    <a key={l.id} href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
                                        <img src={l.imageUrl} alt={l.title} className="w-10 h-10 rounded-md object-cover flex-shrink-0"/>
                                        <div>
                                            <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 truncate">{l.title}</p>
                                            <p className="text-xs text-primary-600 dark:text-primary-400 font-bold">₹{l.price.toFixed(2)}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                         {searchResults.posts.length > 0 && (
                            <div className="p-2 border-t border-gray-200 dark:border-slate-700">
                                <h4 className="px-2 pt-1 pb-1 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Community Posts</h4>
                                {searchResults.posts.map(p => (
                                    <a key={p.id} href="#" className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{`"${p.content}"`}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">by {p.author.name}</p>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">No results found for "{searchQuery}".</div>
                )}
            </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full p-2"
        >
          {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2">
            <img src={mockUser1.avatarUrl} alt={mockUser1.name} className="w-9 h-9 rounded-full object-cover" />
            <span className="hidden md:inline font-medium text-gray-700 dark:text-gray-300">{mockUser1.name}</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700">Your Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700">Settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700">Sign out</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
