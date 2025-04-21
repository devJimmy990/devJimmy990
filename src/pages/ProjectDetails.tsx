
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { projectService } from "@/services/api";
import { Project } from "@/data/projects";
import ProjectDetailsSkeleton from "@/components/ProjectDetailsSkeleton";
import ProjectMedia from "@/components/ProjectMedia";
import ProjectInfo from "@/components/ProjectInfo";
import VideoModal from "@/components/VideoModal";
import { useIsMobile } from "@/hooks/use-mobile";

// Always fetch current project by id from API on mount/param change
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setProject(null);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(false);
        // Always call API
        const projects = await projectService.getAll();
        if (Array.isArray(projects) && projects.length > 0) {
          const foundProject = projects.find(
            (p) =>
              (p._id && p._id.toString() === id) ||
              (p.id && p.id.toString() === id)
          );
          if (foundProject) {
            setProject(foundProject);
          } else {
            setProject(null);
            toast.error("Project not found");
          }
        } else {
          setProject(null);
          setError(true);
          toast.error("Failed to load project data");
        }
      } catch (error) {
        setProject(null);
        setError(true);
        toast.error("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleBackClick = () => {
    navigate("/");
    setTimeout(() => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-4">
          {loading ? (
            <ProjectDetailsSkeleton />
          ) : error ? (
            <div className="container mx-auto">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Error Loading Project</h1>
                <p className="text-muted-foreground mb-6">
                  Unable to load project details. Please try again later.
                </p>
                <Button onClick={handleBackClick}>Back to Projects</Button>
              </div>
            </div>
          ) : !project ? (
            <div className="container mx-auto">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                <Button onClick={handleBackClick}>Back to Projects</Button>
              </div>
            </div>
          ) : (
            <div className="container mx-auto">
              <Button
                variant="ghost"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                onClick={handleBackClick}
              >
                <ArrowLeft className="h-4 w-4" /> Back to Projects
              </Button>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ProjectMedia
                    project={project}
                    isVideoOpen={isVideoOpen}
                    setIsVideoOpen={setIsVideoOpen}
                  />
                </div>
                <ProjectInfo
                  project={project}
                  onOpenVideo={() => setIsVideoOpen(true)}
                />
              </div>
            </div>
          )}
        </main>
        <Footer />
        {project?.video && isMobile && (
          <VideoModal
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            videoUrl={project.video}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default ProjectDetails;

