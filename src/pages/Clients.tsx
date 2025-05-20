
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClientTable from '@/components/dashboard/ClientTable';
import AddClientForm from '@/components/dashboard/AddClientForm';
import QRCodeDialog from '@/components/dashboard/QRCodeDialog';
import { toast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ClientsPage = () => {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedClientName, setSelectedClientName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  
  // Mock data for the clients
  const [clients, setClients] = useState([
    { 
      id: '1', 
      name: 'Work Laptop', 
      type: 'desktop' as const, 
      ipAddress: '10.0.0.2/24', 
      lastActive: '2 minutes ago', 
      isActive: true,
      transferredData: '2.3 GB',
      publicKey: 'PuB1icK3y123456789...',
    },
    { 
      id: '2', 
      name: 'Personal Phone', 
      type: 'mobile' as const, 
      ipAddress: '10.0.0.3/24', 
      lastActive: '5 hours ago', 
      isActive: false,
      transferredData: '1.5 GB',
      publicKey: 'PuB1icK3y987654321...',
    },
    { 
      id: '3', 
      name: 'Home Server', 
      type: 'server' as const, 
      ipAddress: '10.0.0.4/24', 
      lastActive: 'Online', 
      isActive: true,
      transferredData: '15.7 GB',
      publicKey: 'PuB1icK3y135792468...',
    },
  ]);

  const handleShowQrCode = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setSelectedClientName(client.name);
      setQrDialogOpen(true);
    }
  };
  
  const handleDeleteClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setClientToDelete(clientId);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDeleteClient = () => {
    if (clientToDelete) {
      const client = clients.find(c => c.id === clientToDelete);
      const updatedClients = clients.filter(c => c.id !== clientToDelete);
      setClients(updatedClients);
      setDeleteDialogOpen(false);
      setClientToDelete(null);
      
      toast({
        title: "Client Removed",
        description: `${client?.name} has been removed successfully.`,
      });
    }
  };
  
  const handleDownloadConfig = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      toast({
        title: "Configuration Downloaded",
        description: `Config file for ${client.name} has been generated.`,
      });
    }
  };
  
  const handleAddClient = (clientData: { name: string; type: string }) => {
    const newClient = {
      id: `${clients.length + 1}`,
      name: clientData.name,
      type: clientData.type as 'desktop' | 'mobile' | 'server',
      ipAddress: `10.0.0.${clients.length + 2}/24`,
      lastActive: 'Just created',
      isActive: false,
      transferredData: '0 KB',
      publicKey: `PuB1icK3y${Math.random().toString(36).substring(2, 10)}...`,
    };
    
    setClients([...clients, newClient]);
    
    toast({
      title: "Client Added",
      description: `${newClient.name} has been added successfully.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Client Management</h1>
          <div className="flex gap-2">
            <Button variant="destructive" className="gap-2">
              <Trash2 size={16} />
              Remove All
            </Button>
            <AddClientForm onAddClient={handleAddClient} />
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Client Configurations</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientTable 
              clients={clients}
              onShowQr={handleShowQrCode}
              onDownloadConfig={handleDownloadConfig}
              onDeleteClient={handleDeleteClient}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* QR Code Dialog */}
      <QRCodeDialog 
        isOpen={qrDialogOpen}
        clientName={selectedClientName}
        onClose={() => setQrDialogOpen(false)}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the client from your VPN configuration. 
              The client will no longer be able to connect using their current configuration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteClient}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default ClientsPage;
