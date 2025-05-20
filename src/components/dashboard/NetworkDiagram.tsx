
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Server, Smartphone } from 'lucide-react';

interface NetworkDiagramProps {
  clients: {
    id: string;
    name: string;
    type: 'desktop' | 'mobile' | 'server';
    isActive: boolean;
  }[];
}

const NetworkDiagram: React.FC<NetworkDiagramProps> = ({ clients }) => {
  const getDeviceIcon = (type: string, isActive: boolean) => {
    const className = `h-8 w-8 ${isActive ? 'text-green-500' : 'text-gray-400'}`;
    
    switch (type) {
      case 'desktop':
        return <Laptop className={className} />;
      case 'mobile':
        return <Smartphone className={className} />;
      case 'server':
        return <Server className={className} />;
      default:
        return <Laptop className={className} />;
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Network Topology</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-4">
          <div className="relative flex flex-col items-center">
            {/* Server */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-3 rounded-full bg-vpn-dark-blue">
                <Server className="h-8 w-8 text-white" />
              </div>
              <span className="mt-2 font-medium text-sm">WireGuard Server</span>
            </div>
            
            {/* Connection lines to clients */}
            <div className="mt-8 relative w-full flex justify-center">
              {/* Horizontal line */}
              <div className="connection-line absolute top-0 w-[80%]"></div>
              
              {/* Client devices */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 w-full pt-2">
                {clients.map((client) => (
                  <div key={client.id} className="flex flex-col items-center">
                    {/* Vertical connection line */}
                    <div className="connection-line w-0.5 h-8 mb-2"></div>
                    
                    <div className={`p-3 rounded-full ${client.isActive ? 'bg-vpn-light-blue' : 'bg-gray-300'}`}>
                      {getDeviceIcon(client.type, client.isActive)}
                    </div>
                    <span className={`mt-2 text-sm font-medium ${client.isActive ? '' : 'text-gray-500'}`}>
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkDiagram;
