import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { MessagesIcon } from './icons/MessagesIcon';
import { ProfileIcon } from './icons/ProfileIcon';
import { CommunityIcon } from './icons/CommunityIcon';
import { GeminiIcon } from './icons/GeminiIcon';
import { BookIcon } from './icons/BookIcon';

type Page = 'Marketplace' | 'Messages' | 'Profile' | 'Community' | 'CreateListing' | 'GeminiChat';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { name: 'Marketplace', icon: HomeIcon, page: 'Marketplace' as Page },
    { name: 'Messages', icon: MessagesIcon, page: 'Messages' as Page },
    { name: 'Community', icon: CommunityIcon, page: 'Community' as Page },
    { name: 'Profile', icon: ProfileIcon, page: 'Profile' as Page },
    { name: 'AI Assistant', icon: GeminiIcon, page: 'GeminiChat' as Page },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 flex-shrink-0 border-r border-gray-200 dark:border-slate-700 flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold text-primary-600 dark:text-primary-400 border-b border-gray-200 dark:border-slate-700">
        <BookIcon className="w-8 h-8 mr-2" />
        <span>BookLoop</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentPage(item.page)}
            className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
              currentPage === item.page
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-slate-700'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
      <div className="px-4 py-6">
        <button
          onClick={() => setCurrentPage('CreateListing')}
          className="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800"
        >
          + Create Listing
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
