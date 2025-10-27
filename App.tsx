import React, { useState, useEffect, lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { mockListings, mockCommunityPosts } from './data/mockData';
import { PAGES, type Page } from './constants';
import Spinner from './components/Spinner';

const Marketplace = lazy(() => import('./pages/Marketplace'));
const Messages = lazy(() => import('./pages/Messages'));
const Profile = lazy(() => import('./pages/Profile'));
const Community = lazy(() => import('./pages/Community'));
const CreateListing = lazy(() => import('./pages/CreateListing'));
const GeminiChat = lazy(() => import('./pages/GeminiChat'));

type AuthPage = 'Login' | 'Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>('Login');
  const [currentPage, setCurrentPage] = useState<Page>(PAGES.MARKETPLACE);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleRegister = () => setIsLoggedIn(true);

  if (!isLoggedIn) {
    if (authPage === 'Login') {
      return <Login onLogin={handleLogin} setAuthPage={setAuthPage} />;
    }
    return <Register onRegister={handleRegister} setAuthPage={setAuthPage} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case PAGES.MARKETPLACE:
        return <Marketplace listings={mockListings} />;
      case PAGES.MESSAGES:
        return <Messages />;
      case PAGES.PROFILE:
        return <Profile />;
      case PAGES.COMMUNITY:
        return <Community posts={mockCommunityPosts} />;
      case PAGES.CREATE_LISTING:
        return <CreateListing setPage={setCurrentPage} />;
      case PAGES.GEMINI_CHAT:
        return <GeminiChat />;
      default:
        return <Marketplace listings={mockListings} />;
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-gray-100`}>
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          listings={mockListings}
          posts={mockCommunityPosts}
        />
        <main className="flex-1 overflow-hidden">
          <Suspense fallback={<Spinner />}>
            {renderPage()}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;