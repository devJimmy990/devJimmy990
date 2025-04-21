
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, FileText } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const resumeLinks = {
    mobile: "https://drive.google.com/file/d/1mnpK_HWyWzv7qllnfnPi1K5dOcRhEUxh/view?usp=drive_link",
    frontend: "https://drive.google.com/file/d/1IjxmoaMeLrs7pAiLi_PR5SdNDF8umUoY/view?usp=drive_link"
  };

  const downloadCV = (type: 'mobile' | 'frontend') => {
    // Convert Google Drive view link to direct download link
    const driveLink = resumeLinks[type];
    window.open(driveLink, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavItemClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const renderNavItems = () => {
    if (isHomePage) {
      return navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="text-muted-foreground hover:text-primary transition-colors"
          onClick={handleNavItemClick}
        >
          {item.name}
        </a>
      ));
    } else {
      return (
        <Link
          to="/"
          className="text-muted-foreground hover:text-primary transition-colors"
          onClick={handleNavItemClick}
        >
          Back to Home
        </Link>
      );
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-background/90 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          to="/"
          className="flex items-center gap-2"
        >
          <img 
            src="/profile.png" 
            alt="DevJimmy" 
            className="h-10 w-10 rounded-full object-cover border-2 border-primary"
          />
          <span className="text-2xl font-bold text-gradient">DevJimmy</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {renderNavItems()}
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-portfolio-blue to-portfolio-purple hover:opacity-90 transition-opacity">
                <FileText className="h-4 w-4" />
                Resume
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-md border border-white/10">
              <DropdownMenuItem 
                onClick={() => downloadCV('mobile')}
                className="cursor-pointer hover:bg-primary/20"
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>Mobile CV</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => downloadCV('frontend')}
                className="cursor-pointer hover:bg-primary/20"
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>Frontend CV</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="relative z-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-lg z-40 flex flex-col pt-24">
          <div className="container py-4 flex flex-col space-y-6">
            {renderNavItems()}
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-3">Resume</h3>
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  className="justify-start bg-card/50" 
                  onClick={() => {
                    downloadCV('mobile');
                    setIsMenuOpen(false);
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Mobile CV
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start bg-card/50" 
                  onClick={() => {
                    downloadCV('frontend');
                    setIsMenuOpen(false);
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Frontend CV
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
