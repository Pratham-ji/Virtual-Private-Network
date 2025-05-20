
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Server, QrCode, Download, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Client {
  id: string;
  name: string;
  type: 'desktop' | 'mobile' | 'server';
  ipAddress: string;
  lastActive: string;
  isActive: boolean;
  transferredData: string;
  publicKey?: string;
}

interface ClientTableProps {
  clients: Client[];
  onShowQr: (clientId: string) => void;
  onDownloadConfig: (clientId: string) => void;
  onDeleteClient?: (clientId: string) => void;
}

const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  onShowQr,
  onDownloadConfig,
  onDeleteClient
}) => {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'desktop':
        return <Laptop className="h-4 w-4" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'server':
        return <Server className="h-4 w-4" />;
      default:
        return <Laptop className="h-4 w-4" />;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead>Data Transfer</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.name}</TableCell>
            <TableCell>
              <div className="flex items-center">
                {getDeviceIcon(client.type)}
                <span className="ml-2 text-xs capitalize">{client.type}</span>
              </div>
            </TableCell>
            <TableCell className="font-mono text-xs">{client.ipAddress}</TableCell>
            <TableCell>
              <Badge className={cn(
                "font-medium",
                client.isActive 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
              )}>
                {client.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell className="text-sm">{client.lastActive}</TableCell>
            <TableCell className="text-sm">{client.transferredData}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => onShowQr(client.id)}
                  title="Show QR Code"
                >
                  <QrCode className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onDownloadConfig(client.id)}
                  title="Download Config"
                >
                  <Download className="h-4 w-4" />
                </Button>
                {onDeleteClient && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => onDeleteClient(client.id)}
                    title="Delete Client"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientTable;
