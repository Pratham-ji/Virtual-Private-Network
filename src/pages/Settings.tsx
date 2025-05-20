
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Settings, Shield, Bell, Eye, Download } from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifyOnConnect: true,
    notifyOnDisconnect: true,
    checkUpdatesAutomatically: true,
    logLevel: "info",
    autoStartServer: false,
    sshAccess: true,
    backupFrequency: "weekly",
    backupLocation: "/var/backups/wireguard",
    configEncryption: true,
  });

  const handleToggle = (field: string) => {
    setSettings({
      ...settings,
      [field]: !settings[field as keyof typeof settings]
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  const handleBackupNow = () => {
    toast({
      title: "Backup Started",
      description: "Creating backup of your WireGuard configuration...",
    });
    
    setTimeout(() => {
      toast({
        title: "Backup Complete",
        description: "Your WireGuard configuration has been backed up successfully.",
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Application Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark theme for the application
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={settings.darkMode}
                    onCheckedChange={() => handleToggle('darkMode')}
                  />
                </div>
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="logLevel">Log Level</Label>
                  <Select 
                    value={settings.logLevel}
                    onValueChange={(value) => handleSelectChange('logLevel', value)}
                  >
                    <SelectTrigger id="logLevel">
                      <SelectValue placeholder="Select log level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Controls the detail level of application logs
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-start">Auto-start Server</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically start WireGuard server when the application launches
                    </p>
                  </div>
                  <Switch
                    id="auto-start"
                    checked={settings.autoStartServer}
                    onCheckedChange={() => handleToggle('autoStartServer')}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="updates">Check for Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically check for application updates
                    </p>
                  </div>
                  <Switch
                    id="updates"
                    checked={settings.checkUpdatesAutomatically}
                    onCheckedChange={() => handleToggle('checkUpdatesAutomatically')}
                  />
                </div>
              </CardContent>
            </Card>
          
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-connect">Client Connection</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when a client connects to the VPN
                    </p>
                  </div>
                  <Switch
                    id="notify-connect"
                    checked={settings.notifyOnConnect}
                    onCheckedChange={() => handleToggle('notifyOnConnect')}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-disconnect">Client Disconnection</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when a client disconnects from the VPN
                    </p>
                  </div>
                  <Switch
                    id="notify-disconnect"
                    checked={settings.notifyOnDisconnect}
                    onCheckedChange={() => handleToggle('notifyOnDisconnect')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ssh-access">SSH Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow SSH access through the VPN tunnel
                    </p>
                  </div>
                  <Switch
                    id="ssh-access"
                    checked={settings.sshAccess}
                    onCheckedChange={() => handleToggle('sshAccess')}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="config-encryption">Config Encryption</Label>
                    <p className="text-sm text-muted-foreground">
                      Encrypt configuration files at rest
                    </p>
                  </div>
                  <Switch
                    id="config-encryption"
                    checked={settings.configEncryption}
                    onCheckedChange={() => handleToggle('configEncryption')}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Access Control
                </CardTitle>
                <CardDescription>
                  Manage who can access the WireGuard Manager interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Change password"
                    />
                    <p className="text-sm text-muted-foreground">
                      Set a new password for admin access
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                    <Input
                      id="ip-whitelist"
                      placeholder="192.168.1.0/24, 10.0.0.5"
                    />
                    <p className="text-sm text-muted-foreground">
                      IPs allowed to access the admin interface (comma separated)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="backups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Backup & Recovery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select 
                      value={settings.backupFrequency}
                      onValueChange={(value) => handleSelectChange('backupFrequency', value)}
                    >
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-location">Backup Location</Label>
                    <Input
                      id="backup-location"
                      value={settings.backupLocation}
                      onChange={(e) => handleInputChange('backupLocation', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleBackupNow}>Backup Now</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Restore Configuration</CardTitle>
                <CardDescription>
                  Restore a previous backup of your WireGuard configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="backup-file">Select Backup File</Label>
                    <Input
                      id="backup-file"
                      type="file"
                      className="mt-2"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">Restore Selected Backup</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
