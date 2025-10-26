import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Community from './pages/Community';
import CreateListing from './pages/CreateListing';
import GeminiChat from './pages/GeminiChat';
import Login from './pages/Login';
import Register from './pages/Register';
import { mockListings, mockCommunityPosts } from './data/mockData';

type Page = 'Marketplace' | 'Messages' | 'Profile' | 'Community' | 'CreateListing' | 'GeminiChat';
type AuthPage = 'Login' | 'Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>('Login');
  const [currentPage, setCurrentPage] = useState<Page>('Marketplace');
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
      case 'Marketplace':
        return <Marketplace listings={mockListings} />;
      case 'Messages':
        return <Messages />;
      case 'Profile':
        return <Profile />;
      case 'Community':
        return <Community posts={mockCommunityPosts} />;
      case 'CreateListing':
        return <CreateListing setPage={setCurrentPage} />;
      case 'GeminiChat':
        return <GeminiChat />;
      default:
        return <Marketplace listings={mockListings} />;
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-gray-100`}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          listings={mockListings}
          posts={mockCommunityPosts}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
