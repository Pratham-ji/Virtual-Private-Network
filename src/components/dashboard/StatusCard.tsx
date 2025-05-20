
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  status: 'online' | 'offline' | 'degraded';
  uptime: string;
  lastChecked: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, uptime, lastChecked }) => {
  const statusConfig = {
    online: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', text: 'Online' },
    offline: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', text: 'Offline' },
    degraded: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', text: 'Degraded' },
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">WireGuard Server Status</CardTitle>
          <Badge className={cn("font-medium", statusConfig[status].color)}>
            {statusConfig[status].text}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Server IP:</span>
            <span className="ml-auto font-medium">203.0.113.1</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Uptime:</span>
            <span className="ml-auto font-medium">{uptime}</span>
          </div>
          <div className="flex items-center text-sm">
            <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Last Checked:</span>
            <span className="ml-auto font-medium">{lastChecked}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
