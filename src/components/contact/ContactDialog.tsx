
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Phone } from "lucide-react";

interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog = ({ isOpen, onOpenChange }: ContactDialogProps) => {
  const openWhatsapp = () => {
    window.open(`https://wa.me/201289223643`, "_blank");
    onOpenChange(false);
  };

  const openPhoneCall = () => {
    window.open(`tel:+201289223643`, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact via Phone</DialogTitle>
          <DialogDescription>
            Choose how you would like to contact me
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button 
            onClick={openWhatsapp} 
            className="flex flex-col items-center gap-2 h-auto py-4"
            variant="outline"
          >
            <MessageSquare className="h-8 w-8 text-green-500" />
            <span>WhatsApp</span>
          </Button>
          <Button 
            onClick={openPhoneCall} 
            className="flex flex-col items-center gap-2 h-auto py-4"
            variant="outline"
          >
            <Phone className="h-8 w-8 text-primary" />
            <span>Phone Call</span>
          </Button>
        </div>
        <DialogFooter>
          <Button 
            variant="secondary" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
