
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Shield, Network, Server } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const ServerConfigPage = () => {
  const [serverConfig, setServerConfig] = useState({
    endpoint: "vpn.example.com",
    port: "51820",
    ipRange: "10.0.0.0/24",
    interfaceName: "wg0",
    dns: "1.1.1.1, 1.0.0.1",
    mtu: "1420",
    keepalive: "25",
    privateKey: "****************************",
    publicKey: "PuB1icK3yS3rv3R123456789...",
    postUp: "iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE",
    postDown: "iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE"
  });

  const handleInputChange = (field: string, value: string) => {
    setServerConfig({
      ...serverConfig,
      [field]: value
    });
  };

  const handleSave = () => {
    toast({
      title: "Configuration Saved",
      description: "Server configuration has been updated successfully.",
    });
  };

  const handleRestart = () => {
    toast({
      title: "Server Restarting",
      description: "The WireGuard server service is restarting with the new configuration.",
    });
    
    // Simulate a restart process
    setTimeout(() => {
      toast({
        title: "Server Restarted",
        description: "WireGuard server is now running with the new configuration.",
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Server Configuration</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRestart}>Restart Server</Button>
            <Button onClick={handleSave}>Save Configuration</Button>
          </div>
        </div>

        <Tabs defaultValue="basic">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Settings</TabsTrigger>
            <TabsTrigger value="network">Network Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Basic Server Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="endpoint">Public Endpoint</Label>
                    <Input
                      id="endpoint"
                      value={serverConfig.endpoint}
                      onChange={(e) => handleInputChange('endpoint', e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Domain name or IP address of your server</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="port">Listen Port</Label>
                    <Input
                      id="port"
                      value={serverConfig.port}
                      onChange={(e) => handleInputChange('port', e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">UDP port for WireGuard (default: 51820)</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interfaceName">Interface Name</Label>
                    <Input
                      id="interfaceName"
                      value={serverConfig.interfaceName}
                      onChange={(e) => handleInputChange('interfaceName', e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Name of WireGuard network interface</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dns">DNS Servers</Label>
                    <Input
                      id="dns"
                      value={serverConfig.dns}
                      onChange={(e) => handleInputChange('dns', e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">DNS servers to be used by clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="network" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Network Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ipRange">VPN IP Range</Label>
                  <Input
                    id="ipRange"
                    value={serverConfig.ipRange}
                    onChange={(e) => handleInputChange('ipRange', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">IP range for the VPN network (CIDR notation)</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mtu">MTU Value</Label>
                    <Input
                      id="mtu"
                      value={serverConfig.mtu}
                      onChange={(e) => handleInputChange('mtu', e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Maximum Transmission Unit (default: 1420)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keepalive">Persistent Keepalive</Label>
                    <Input
                      id="keepalive"
                      value={serverConfig.keepalive}
                      onChange={(e) => handleInputChange('keepalive', e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Seconds between keepalive packets</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Cryptographic Keys
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="privateKey">Private Key</Label>
                    <div className="flex">
                      <Input
                        id="privateKey"
                        value={serverConfig.privateKey}
                        type="password"
                        onChange={(e) => handleInputChange('privateKey', e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" className="ml-2">
                        Generate New
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Server's private key (keep this secret!)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publicKey">Public Key</Label>
                    <Input
                      id="publicKey"
                      value={serverConfig.publicKey}
                      readOnly
                      className="bg-muted"
                    />
                    <p className="text-sm text-muted-foreground">Server's public key (shared with clients)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Routing & Firewall Scripts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="postUp">PostUp Script</Label>
                  <Input
                    id="postUp"
                    value={serverConfig.postUp}
                    onChange={(e) => handleInputChange('postUp', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Commands to run after interface is up</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postDown">PostDown Script</Label>
                  <Input
                    id="postDown"
                    value={serverConfig.postDown}
                    onChange={(e) => handleInputChange('postDown', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Commands to run after interface is down</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => window.history.back()}>Cancel</Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </div>
      </div>
    </Layout>
  );
};

export default ServerConfigPage;
