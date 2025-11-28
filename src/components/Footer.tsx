
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useCVLinks } from '@/contexts/CVLinksContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { cvLinks } = useCVLinks();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Get Mobile and Frontend CV links from context
  const mobileCVLink = cvLinks.find(link => link.type?.toLowerCase() === 'mobile')?.url;
  const frontendCVLink = cvLinks.find(link => link.type?.toLowerCase() === 'frontend')?.url;



  return (
    <footer className="bg-card py-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Avatar className="hidden md:flex items-center gap-2">
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
              href={mobileCVLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Mobile <span className="hidden md:inline">CV</span>
            </a>
            <a
              href={frontendCVLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Frontend <span className="hidden md:inline">CV</span>
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
