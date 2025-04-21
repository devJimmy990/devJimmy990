import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-card py-6">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Avatar className="flex items-center gap-2">
              <AvatarImage
                src="/profile.png"
                alt="DevJimmy"
                className="h-10 w-10 rounded-full object-cover border-2 border-primary"
              />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gradient">DevJimmy</span>
              <span className="text-sm text-muted-foreground">Frontend & Mobile Developer</span>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="https://drive.google.com/file/d/1mnpK_HWyWzv7qllnfnPi1K5dOcRhEUxh/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Mobile CV
            </a>
            <a
              href="https://drive.google.com/file/d/1IjxmoaMeLrs7pAiLi_PR5SdNDF8umUoY/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Frontend CV
            </a>
          </div>


        </div>

        <div className="mt-6 flex justify-center">
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            © {currentYear} <em className="text-gradient font-semibold">DevJimmy</em>.
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;