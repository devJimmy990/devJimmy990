
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Check if the path contains admin and redirect if needed
    if (location.pathname.includes("admin")) {
      navigate("/admin", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
