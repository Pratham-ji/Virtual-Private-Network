
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, Wifi } from 'lucide-react';

interface StatsCardProps {
  totalClients: number;
  activeClients: number;
  dataReceived: string;
  dataSent: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  totalClients, 
  activeClients, 
  dataReceived, 
  dataSent 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Network Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Clients</p>
            <div className="flex items-center">
              <Wifi className="mr-2 h-4 w-4 text-primary" />
              <p className="text-2xl font-bold">{totalClients}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Active Clients</p>
            <div className="flex items-center">
              <Wifi className="mr-2 h-4 w-4 text-green-500" />
              <p className="text-2xl font-bold">{activeClients}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Data Received</p>
            <div className="flex items-center">
              <Download className="mr-2 h-4 w-4 text-primary" />
              <p className="text-2xl font-bold">{dataReceived}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Data Sent</p>
            <div className="flex items-center">
              <Upload className="mr-2 h-4 w-4 text-primary" />
              <p className="text-2xl font-bold">{dataSent}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
