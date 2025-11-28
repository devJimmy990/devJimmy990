import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectDetailsSkeleton from "@/components/ProjectDetailsSkeleton";
import ProjectInfo from "@/components/ProjectInfo";
import ProjectMedia from "@/components/ProjectMedia";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import VideoModal from "@/components/VideoModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProjectModel } from "@/model/project";
import { projectService } from "@/services/project_service";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectModel | null>(null);
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
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto">
            {loading ? (
              <ProjectDetailsSkeleton />
            ) : error ? (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Error Loading Project</h1>
                <p className="text-muted-foreground mb-6">
                  Unable to load project details. Please try again later.
                </p>
                <Button onClick={handleBackClick}>Back to Projects</Button>
              </div>
            ) : !project ? (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                <Button onClick={handleBackClick}>Back to Projects</Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                  onClick={handleBackClick}
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Projects
                </Button>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className={`${isMobile ? 'order-2' : 'order-1'} lg:col-span-2`}>
                    <ProjectMedia
                      project={project}
                      isVideoOpen={isVideoOpen}
                      setIsVideoOpen={setIsVideoOpen}
                    />
                  </div>
                  <div className={`${isMobile ? 'order-1' : 'order-2'} lg:col-span-1`}>
                    <ProjectInfo project={project} />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
        {project?.video && (
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