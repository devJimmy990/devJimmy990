
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ScrollToTop from "../ScrollToTop";

const roles: string[] = ["Frontend Developer", "Mobile Developer"];
const HeroSection = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const completedTextRef = useRef(false);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      if (!isDeleting && text === fullText) {
        completedTextRef.current = true;
        setTypingSpeed(2000); // Pause at the end
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      } else {
        setTypingSpeed(isDeleting ? 80 : 150);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-12 section">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div
          className="absolute top-20 left-20 w-72 h-72 bg-portfolio-purple/20 rounded-full filter blur-3xl opacity-80"
          style={{
            animation: "bubbleFloat 8s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-72 h-72 bg-portfolio-blue/20 rounded-full filter blur-3xl opacity-80"
          style={{
            animation: "bubbleFloat 5s ease-in-out infinite",
            animationDelay: "2s"
          }}
        ></div>
      </div>

      <div className="container mx-auto grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-3 space-y-4">
          <div className="flex flex-col">
            <p className="text-primary font-medium">Hello, I`m</p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-gradient">Muhammed Gamal</span>
              <br />
              <div className="h-[1.2em] mt-1">
                <span className="relative inline-flex">{text}</span>
                <span className="animate-blink inline-block bg-primary ml-1" style={{ width: "2px", height: "80%", marginBottom: "-4px" }}></span>
              </div>
            </h1>
            <div className="mt-4">
              <p className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl ${isMobile ? 'text-justify' : ''}`}>
                I craft responsive websites and mobile apps with modern technologies,
                specializing in <span className="text-primary">React</span>, <span className="text-primary">React Native</span>, and <span className="text-accent">Flutter</span>.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size={isMobile ? "default" : "lg"} className="gap-2" asChild>
              <a href="#projects">View My Projects</a>
            </Button>
            <Button size={isMobile ? "default" : "lg"} variant="outline" className="gap-2" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 relative animate-slide-in-right animation-delay-200">
          <div className="aspect-square bg-secondary rounded-3xl overflow-hidden relative shadow-xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-tr from-portfolio-blue/20 to-portfolio-purple/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/profile.png"
                alt="Muhammed Gamal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div
            className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full -z-10"
            style={{ animation: "bubbleFloat 5s ease-in-out infinite" }}
          ></div>
          <div
            className="absolute -top-4 -left-4 w-16 h-16 bg-accent rounded-full -z-10"
            style={{ animation: "bubbleFloat 7s ease-in-out infinite", animationDelay: "1.5s" }}
          ></div>
        </div>
      </div>

      <div className="flex justify-center mt-24 pb-8">
        <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors animate-bounce" style={{ animationDuration: "2s" }}>
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>

      <ScrollToTop />
    </section>
  );
};

export default HeroSection;
