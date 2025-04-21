
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  const [embedUrl, setEmbedUrl] = useState<string>("");

  useEffect(() => {
    // Convert various YouTube URL formats to embed URL
    if (!videoUrl) return;
    
    const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = videoUrl.match(youtubeRegex);
    
    if (match && match[2].length === 11) {
      setEmbedUrl(`https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`);
    } else {
      // Use as is if not a recognizable YouTube URL
      setEmbedUrl(videoUrl);
    }
  }, [videoUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] p-0 bg-black overflow-hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 z-10 bg-black/80 text-white hover:bg-black/60 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        {embedUrl && (
          <div className="relative pb-[56.25%] w-full h-0">
            <iframe 
              src={embedUrl} 
              className="absolute top-0 left-0 w-full h-full" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="Video Player"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
