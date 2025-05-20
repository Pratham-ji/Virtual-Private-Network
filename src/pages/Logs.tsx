
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDown, Search, Download, RefreshCw } from 'lucide-react';

// Mock log data
const generateLogs = () => {
  const logTypes = ['info', 'warning', 'error', 'success'];
  const logSources = ['wg0', 'system', 'firewall', 'dhcp', 'dns'];
  const logMessages = [
    'Handshake initiated with peer',
    'Connection established',
    'Interface wg0 created',
    'Peer added with public key',
    'Routing table updated',
    'Invalid handshake attempt',
    'Peer disconnected',
    'UDP port binding successful',
    'MTU value adjusted',
    'DNS resolution failed',
    'Firewall rule added',
    'Packet dropped by firewall',
    'Memory allocation failed',
    'Service restarted'
  ];
  
  const logs = [];
  
  for (let i = 0; i < 100; i++) {
    const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
    const logSource = logSources[Math.floor(Math.random() * logSources.length)];
    const logMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 120));
    
    const publicKey = Math.random() < 0.7 ? `PuB1icK3y${Math.random().toString(36).substring(2, 8)}...` : null;
    
    logs.push({
      id: i,
      timestamp: timestamp.toISOString(),
      type: logType,
      source: logSource,
      message: `${logMessage}${publicKey ? ` (${publicKey})` : ''}`,
      details: `Process ID: ${Math.floor(Math.random() * 10000)}, Thread: ${Math.floor(Math.random() * 10)}`
    });
  }
  
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const LogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState(generateLogs());
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({
    info: true,
    warning: true,
    error: true,
    success: true
  });
  
  // Apply filters when logs or search term changes
  useEffect(() => {
    let result = logs;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(log => 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by log type
    result = result.filter(log => activeFilters[log.type]);
    
    setFilteredLogs(result);
  }, [logs, searchTerm, activeFilters]);
  
  const toggleFilter = (type: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  const refreshLogs = () => {
    setLogs(generateLogs());
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">System Logs</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={refreshLogs}>
              <RefreshCw size={16} />
              Refresh
            </Button>
            <Button className="gap-2">
              <Download size={16} />
              Export Logs
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Log Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search logs..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Badge 
                    variant="outline" 
                    className={`cursor-pointer ${activeFilters.info ? getTypeBadgeClass('info') : ''}`}
                    onClick={() => toggleFilter('info')}
                  >
                    Info
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`cursor-pointer ${activeFilters.warning ? getTypeBadgeClass('warning') : ''}`}
                    onClick={() => toggleFilter('warning')}
                  >
                    Warning
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`cursor-pointer ${activeFilters.error ? getTypeBadgeClass('error') : ''}`}
                    onClick={() => toggleFilter('error')}
                  >
                    Error
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`cursor-pointer ${activeFilters.success ? getTypeBadgeClass('success') : ''}`}
                    onClick={() => toggleFilter('success')}
                  >
                    Success
                  </Badge>
                </div>
              </div>
              
              <ScrollArea className="h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead className="w-[100px]">Type</TableHead>
                      <TableHead className="w-[120px]">Source</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-xs font-mono">
                          {formatTimestamp(log.timestamp)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeBadgeClass(log.type)}>
                            {log.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.source}</TableCell>
                        <TableCell>
                          <div className="truncate max-w-md" title={log.message}>
                            {log.message}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {log.details}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
              
              <div className="flex justify-center">
                <Button variant="ghost" className="gap-2">
                  <ArrowDown size={16} />
                  Load More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LogsPage;
