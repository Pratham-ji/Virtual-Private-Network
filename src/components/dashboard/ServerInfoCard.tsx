
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Network, Globe, PlugZap } from 'lucide-react';

interface ServerInfoCardProps {
  endpoint: string;
  port: number;
  ipRange: string;
  interfaceName: string;
}

const ServerInfoCard: React.FC<ServerInfoCardProps> = ({
  endpoint,
  port,
  ipRange,
  interfaceName
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Server Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center">
          <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Public Endpoint:</span>
          <span className="ml-auto text-sm font-medium">{endpoint}</span>
        </div>
        <div className="flex items-center">
          <PlugZap className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Listen Port:</span>
          <span className="ml-auto text-sm font-medium">UDP {port}</span>
        </div>
        <div className="flex items-center">
          <Network className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">VPN IP Range:</span>
          <span className="ml-auto text-sm font-medium">{ipRange}</span>
        </div>
        <div className="flex items-center">
          <Server className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Interface:</span>
          <span className="ml-auto text-sm font-medium">{interfaceName}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerInfoCard;
