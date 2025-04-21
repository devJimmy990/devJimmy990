
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const toggleVisibility = () => {
    const heroSection = document.getElementById('home');
    const footer = document.querySelector('footer');
    
    if (heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      setIsVisible(window.scrollY > heroBottom - 100);
    }
    
    if (footer) {
      const footerTop = footer.getBoundingClientRect().top;
      setIsFooterVisible(footerTop <= window.innerHeight);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        isVisible && !isFooterVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <Button 
        variant="default" 
        size="icon" 
        className="rounded-full h-12 w-12 shadow-lg hover:scale-110 transition-transform" 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ScrollToTop;
