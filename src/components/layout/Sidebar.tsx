
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Settings, 
  Server, 
  Users, 
  Shield,
  HelpCircle,
  GanttChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Users, label: 'Clients', href: '/clients' },
    { icon: Server, label: 'Server Config', href: '/server' },
    { icon: GanttChart, label: 'Logs', href: '/logs' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help', href: '/help' },
  ];

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out bg-sidebar border-r md:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 h-16 px-4 border-b">
          <div className="rounded-full bg-gradient-to-r from-vpn-blue to-vpn-teal p-1">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold">WireGuard Manager</span>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                currentPath === item.href && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              )}
              onClick={() => window.innerWidth < 768 && onClose()}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t">
          <div className="rounded-md bg-sidebar-accent p-4">
            <h4 className="font-medium mb-2">Server Status</h4>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs">Running</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Port: UDP 51820
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" 
        onClick={onClose}
        style={{ display: isOpen ? 'block' : 'none' }}
      />
    </div>
  );
};

export default Sidebar;
