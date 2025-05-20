
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    // Close sidebar on route change (for mobile)
    setSidebarOpen(false);
    
    // Close sidebar when clicking outside on mobile
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <main className="flex-1 md:pl-64 pt-6 pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
