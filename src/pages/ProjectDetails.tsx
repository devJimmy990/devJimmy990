import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectDetailsSkeleton from "@/components/ProjectDetailsSkeleton";
import ProjectInfo from "@/components/ProjectInfo";
import ProjectMedia from "@/components/ProjectMedia";
import { ReviewItem } from "@/components/ProjectReview";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProjectModel } from "@/model/project";
import { projectService } from "@/services/project_service";
import { ArrowLeft, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectModel | null>(null);
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
                  <ProjectMedia project={project} />
                </div>
                <div className={`${isMobile ? 'order-1' : 'order-2'} lg:col-span-1`}>
                  <ProjectInfo project={project} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Ratings and reviews</h3>

                <AddReviewForm onSubmit={undefined} />
                {
                  project.reviews.length === 0 ?
                    (<p className="text-gray-500 text-sm">No reviews yet.</p>) :
                    (project.reviews.map((review) => (
                      <ReviewItem
                        key={review._id}
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



export function AddReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) return alert("Please select a rating.");
    if (comment.trim().length < 3) return alert("Comment is too short.");

    onSubmit({ rating, comment });

    setRating(0);
    setComment("");
  };

  return (
    <form
      className="bg-card p-5 border border-white/10 rounded-xl space-y-3"
      onSubmit={handleSubmit}
    >
      {/* STAR RATING */}
      <div className="flex text-green-500 text-2xl">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer transition ${star <= rating
              ? "text-green-600 fill-green-600"
              : "opacity-30"
              }`}
          />
        ))}
      </div>

      {/* COMMENT TEXTAREA */}
      <div>
        <label className="block text-sm mb-1">Your Review</label>
        <textarea
          className="w-full p-3 bg-muted border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
          rows={3}
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition"
      >
        Submit Review
      </button>
    </form>
  );
}