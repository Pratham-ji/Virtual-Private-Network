
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mock QR code image for demonstration
const qrCodeImage = `data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='200' fill='white'/%3E%3Cpath d='M20,20 L50,20 L50,50 L20,50 Z' fill='black'/%3E%3Cpath d='M60,20 L80,20 L80,50 L60,50 Z' fill='black'/%3E%3Cpath d='M90,20 L130,20 L130,50 L90,50 Z' fill='black'/%3E%3Cpath d='M140,20 L180,20 L180,50 L140,50 Z' fill='black'/%3E%3Cpath d='M20,60 L50,60 L50,90 L20,90 Z' fill='black'/%3E%3Cpath d='M70,60 L100,60 L100,80 L70,80 Z' fill='black'/%3E%3Cpath d='M110,60 L130,60 L130,90 L110,90 Z' fill='black'/%3E%3Cpath d='M140,60 L180,60 L180,90 L140,90 Z' fill='black'/%3E%3Cpath d='M30,100 L50,100 L50,130 L30,130 Z' fill='black'/%3E%3Cpath d='M60,100 L90,100 L90,130 L60,130 Z' fill='black'/%3E%3Cpath d='M100,100 L120,100 L120,130 L100,130 Z' fill='black'/%3E%3Cpath d='M140,100 L160,100 L160,130 L140,130 Z' fill='black'/%3E%3Cpath d='M20,140 L50,140 L50,180 L20,180 Z' fill='black'/%3E%3Cpath d='M60,140 L80,140 L80,160 L60,160 Z' fill='black'/%3E%3Cpath d='M90,140 L110,140 L110,180 L90,180 Z' fill='black'/%3E%3Cpath d='M120,150 L150,150 L150,170 L120,170 Z' fill='black'/%3E%3Cpath d='M160,140 L180,140 L180,180 L160,180 Z' fill='black'/%3E%3C/svg%3E`;

interface QRCodeDialogProps {
  isOpen: boolean;
  clientName: string;
  onClose: () => void;
}

const QRCodeDialog: React.FC<QRCodeDialogProps> = ({ isOpen, clientName, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Client Configuration: {clientName}</DialogTitle>
          <DialogDescription>
            Scan this QR code with your WireGuard mobile app to connect
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center p-4 bg-white dark:bg-gray-800 rounded-md">
          <img
            src={qrCodeImage}
            alt="WireGuard Configuration QR Code"
            className="w-64 h-64"
          />
        </div>
        <DialogFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Works with iOS and Android WireGuard apps
          </div>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
