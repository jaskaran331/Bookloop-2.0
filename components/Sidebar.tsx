import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { MessagesIcon } from './icons/MessagesIcon';
import { ProfileIcon } from './icons/ProfileIcon';
import { CommunityIcon } from './icons/CommunityIcon';
import { GeminiIcon } from './icons/GeminiIcon';
import { BookIcon } from './icons/BookIcon';
import { PAGES, type Page } from '../constants';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { PlusIcon } from './icons/PlusIcon';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isCollapsed, setIsCollapsed }) => {
  const navItems = [
    { name: 'Marketplace', icon: HomeIcon, page: PAGES.MARKETPLACE },
    { name: 'Messages', icon: MessagesIcon, page: PAGES.MESSAGES },
    { name: 'Community', icon: CommunityIcon, page: PAGES.COMMUNITY },
    { name: 'Profile', icon: ProfileIcon, page: PAGES.PROFILE },
    { name: 'AI Assistant', icon: GeminiIcon, page: PAGES.GEMINI_CHAT },
  ];

  return (
    <aside className={`bg-white dark:bg-slate-800 flex-shrink-0 border-r border-gray-200 dark:border-slate-700 flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-16 flex items-center justify-center text-2xl font-bold text-primary-600 dark:text-primary-400 border-b border-gray-200 dark:border-slate-700">
        <BookIcon className="w-8 h-8 flex-shrink-0" />
        {!isCollapsed && <span className="ml-2 whitespace-nowrap">BookLoop</span>}
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <div key={item.name} className="relative">
            <button
              onClick={() => setCurrentPage(item.page)}
              className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 group ${
                currentPage === item.page
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-slate-700'
              } ${isCollapsed ? 'justify-center' : ''}`}
              aria-current={currentPage === item.page ? 'page' : undefined}
              aria-label={item.name}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${!isCollapsed && 'mr-3'}`} />
              {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
            </button>
            {isCollapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                {item.name}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setCurrentPage(PAGES.CREATE_LISTING)}
          className={`w-full flex items-center justify-center font-semibold py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800 ${
            isCollapsed ? 'px-3 bg-primary-600 text-white hover:bg-primary-700' : 'px-4 bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {isCollapsed ? <PlusIcon className="w-6 h-6" /> : <span>+ Create Listing</span>}
        </button>
      </div>
      <div className="px-4 py-4 border-t border-gray-200 dark:border-slate-700">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="w-full flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors">
            <ChevronLeftIcon className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${isCollapsed ? 'rotate-180 mx-auto' : ''}`} />
            {!isCollapsed && <span className="ml-2 text-sm font-medium whitespace-nowrap">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;