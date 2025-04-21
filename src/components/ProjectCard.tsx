
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, Github, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Project } from "@/data/projects";
import VideoModal from "./VideoModal";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ProjectCard = ({ project }: { project: Project }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVideoOpen(true);
  };
  
  const handleExternalClick = (e: React.MouseEvent, url: string | null) => {
    e.preventDefault();
    if (url) window.open(url, '_blank');
  };
  
  return (
    <>
      <Link to={`/project/${project._id || project.id}`} className="block h-full">
        <Card className="flex flex-col h-full bg-card border-white/5 overflow-hidden hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
          <div className="aspect-video bg-muted overflow-hidden relative">
            <img 
              src={project.cover || "/placeholder.svg"} 
              alt={project.title} 
              className="w-full h-full object-cover" 
            />
            {project.video && (
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-2 right-2 rounded-full bg-black/70 border-0 hover:bg-black/90"
                onClick={handleVideoClick}
              >
                <Play className="h-4 w-4 text-white" />
              </Button>
            )}
          </div>
          
          <CardContent className="flex-grow flex flex-col p-4">
            <div className="mb-2">
              <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.slice(0, 4).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {!isMobile && (
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {project.description.substring(0, 120)}...
              </p>
            )}
          </CardContent>
          
          <CardFooter className="p-4 pt-0 mt-auto">
            <div className="flex justify-between w-full">
              {project.githubUrl ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1" 
                    onClick={(e) => handleExternalClick(e, project.githubUrl)}
                  >
                    <Github className="h-3 w-3" />
                    {!isMobile && "Code"}
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-1"
                    onClick={(e) => handleExternalClick(e, project.liveUrl)}
                  >
                    <ExternalLink className="h-3 w-3" />
                    {!isMobile && "Live Demo"}
                  </Button>
                </>
              ) : (
                <Button 
                  size="sm" 
                  className="gap-1 mx-auto w-full"
                  onClick={(e) => handleExternalClick(e, project.liveUrl)}
                >
                  <ExternalLink className="h-3 w-3" />
                  Live Demo
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </Link>
      
      {project.video && (
        <VideoModal 
          isOpen={isVideoOpen} 
          onClose={() => setIsVideoOpen(false)} 
          videoUrl={project.video || ""} 
        />
      )}
    </>
  );
};

export default ProjectCard;
