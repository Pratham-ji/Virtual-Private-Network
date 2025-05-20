
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, FileText, Globe, BookOpen, MessageSquare, ExternalLink } from 'lucide-react';

const HelpPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Help & Documentation</h1>
          <Button className="gap-2">
            <HelpCircle size={16} />
            Get Support
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentation
              </CardTitle>
              <CardDescription>
                Access comprehensive guides and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex gap-2">
                  <BookOpen size={16} />
                  User Manual
                  <ExternalLink size={14} className="ml-auto" />
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Online Resources
              </CardTitle>
              <CardDescription>
                External resources for WireGuard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://www.wireguard.com" target="_blank" rel="noopener noreferrer" className="flex gap-2">
                  <Globe size={16} />
                  WireGuard Official Website
                  <ExternalLink size={14} className="ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://github.com/WireGuard" target="_blank" rel="noopener noreferrer" className="flex gap-2">
                  <Globe size={16} />
                  WireGuard GitHub
                  <ExternalLink size={14} className="ml-auto" />
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Community Support
              </CardTitle>
              <CardDescription>
                Get help from the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://www.reddit.com/r/WireGuard/" target="_blank" rel="noopener noreferrer" className="flex gap-2">
                  <MessageSquare size={16} />
                  Reddit Community
                  <ExternalLink size={14} className="ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://discord.gg/wireguard" target="_blank" rel="noopener noreferrer" className="flex gap-2">
                  <MessageSquare size={16} />
                  Discord Channel
                  <ExternalLink size={14} className="ml-auto" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I add a new client?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    To add a new client, click on the "Add New Client" button on the Clients page. 
                    Fill in the client name and choose the device type. The system will automatically 
                    generate a new key pair and assign an IP address from your VPN subnet.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I configure port forwarding on my router?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Access your router's administration panel (usually at 192.168.1.1 or 192.168.0.1), 
                    then navigate to the port forwarding section. Create a new rule to forward UDP traffic 
                    on your chosen port (default is 51820) to the internal IP address of the device 
                    running your WireGuard server.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I use the QR code for mobile setup?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    First, install the official WireGuard app on your mobile device. 
                    Then, in the WireGuard Manager, go to the Clients page, find your mobile client, 
                    and click the QR code button. On your mobile device, open the WireGuard app and 
                    select "Add a tunnel" → "Scan from QR code", then scan the displayed QR code.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>What's the difference between "peer" and "client"?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    In WireGuard terminology, all endpoints are called "peers" because the protocol 
                    treats all connections as equal. However, in practical usage, we typically refer 
                    to the central server as the "server" and the connecting devices as "clients" or "peers." 
                    This application uses "client" to refer to any device connecting to your central WireGuard server.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Why is my client showing as inactive?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    A client shows as inactive if there hasn't been a successful handshake recently. 
                    This could be because the client is turned off, has lost internet connectivity, or 
                    there might be a configuration issue. Check that the client device has internet access 
                    and that the WireGuard app is running. Also verify that your server's public endpoint 
                    is correctly configured and accessible from the client's network.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>How do I back up my WireGuard configuration?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    You can set up automatic backups in the Settings → Backups page. Choose your preferred 
                    backup frequency and location. You can also trigger a manual backup by clicking the 
                    "Backup Now" button. The backup includes all server and client configurations, 
                    including encryption keys.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HelpPage;
