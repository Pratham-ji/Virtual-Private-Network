
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import StatusCard from '@/components/dashboard/StatusCard';
import StatsCard from '@/components/dashboard/StatsCard';
import ServerInfoCard from '@/components/dashboard/ServerInfoCard';
import NetworkDiagram from '@/components/dashboard/NetworkDiagram';
import ClientTable from '@/components/dashboard/ClientTable';
import QRCodeDialog from '@/components/dashboard/QRCodeDialog';
import AddClientForm from '@/components/dashboard/AddClientForm';
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedClientName, setSelectedClientName] = useState('');
  
  // Mock data for the dashboard
  const [clients, setClients] = useState([
    { 
      id: '1', 
      name: 'Work Laptop', 
      type: 'desktop' as const, 
      ipAddress: '10.0.0.2/24', 
      lastActive: '2 minutes ago', 
      isActive: true,
      transferredData: '2.3 GB'
    },
    { 
      id: '2', 
      name: 'Personal Phone', 
      type: 'mobile' as const, 
      ipAddress: '10.0.0.3/24', 
      lastActive: '5 hours ago', 
      isActive: false,
      transferredData: '1.5 GB'
    },
    { 
      id: '3', 
      name: 'Home Server', 
      type: 'server' as const, 
      ipAddress: '10.0.0.4/24', 
      lastActive: 'Online', 
      isActive: true,
      transferredData: '15.7 GB'
    },
  ]);
  
  const diagramClients = clients.map(client => ({
    id: client.id,
    name: client.name,
    type: client.type,
    isActive: client.isActive
  }));

  const handleShowQrCode = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setSelectedClientName(client.name);
      setQrDialogOpen(true);
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
      transferredData: '0 KB'
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
          <h1 className="text-3xl font-bold gradient-text">
            WireGuard VPN Dashboard
          </h1>
          <AddClientForm onAddClient={handleAddClient} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard status="online" uptime="5d 12h 30m" lastChecked="Just now" />
          <StatsCard 
            totalClients={clients.length} 
            activeClients={clients.filter(c => c.isActive).length}
            dataReceived="45.2 GB"
            dataSent="12.8 GB"
          />
          <ServerInfoCard 
            endpoint="vpn.example.com" 
            port={51820} 
            ipRange="10.0.0.0/24" 
            interfaceName="wg0" 
          />
        </div>

        <NetworkDiagram clients={diagramClients} />

        <ClientTable 
          clients={clients}
          onShowQr={handleShowQrCode}
          onDownloadConfig={handleDownloadConfig}
        />
      </div>
      
      {/* QR Code Dialog */}
      <QRCodeDialog 
        isOpen={qrDialogOpen}
        clientName={selectedClientName}
        onClose={() => setQrDialogOpen(false)}
      />
    </Layout>
  );
};

export default Index;
