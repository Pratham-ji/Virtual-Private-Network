
import React from 'react';
import { Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/clients':
        return 'Client Management';
      case '/server':
        return 'Server Configuration';
      case '/logs':
        return 'System Logs';
      case '/settings':
        return 'Settings';
      case '/help':
        return 'Help & Documentation';
      default:
        return 'WireGuard Manager';
    }
  };
  
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="md:hidden" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-vpn-blue to-vpn-teal p-1">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">WireGuard Manager</span>
              <span className="text-xs text-muted-foreground">{getPageTitle()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Server Status: Online
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
