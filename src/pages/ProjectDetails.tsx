import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectInfo from "@/components/project/ProjectInfo";
import ProjectMedia from "@/components/project/ProjectMedia";
import { ReviewItem } from "@/components/project/ProjectReview";
import ProjectReviewForm from "@/components/project/ProjectReviewForm";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/contexts/ProjectsContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProjectModel } from "@/model/project";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ProjectDetails = () => {
  const { projects } = useProjects();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectModel | null>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    const foundProject = projects.find((proj) => proj._id === id);
    if (foundProject) {
      setProject(foundProject);
    } else {
      setProject(null);
    }
  }, [projects, id]);
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

    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto">
          {!project ? (
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
                  <ProjectMedia project={project} />
                </div>
                <div className={`${isMobile ? 'order-1' : 'order-2'} lg:col-span-1`}>
                  <ProjectInfo project={project} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Ratings and reviews</h3>

                <ProjectReviewForm id={id} />
                {
                  project.reviews.length === 0 ?
                    (<p className="text-gray-500 text-sm">No reviews yet.</p>) :
                    (project.reviews.map((review) => (
                      <ReviewItem
                        key={review._id}
                        date={review.date}
                        rating={review.rate}
                        comment={review.comment}
                      />
                    )))
                }
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />

    </div>
  );
};

export default ProjectDetails;

