
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
    e.stopPropagation();
    setIsVideoOpen(true);
  };
  
  const handleExternalClick = (e: React.MouseEvent, url: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    if (url) window.open(url, '_blank');
  };
  
  return (
    <>
      <Link to={`/project/${project._id || project.id}`} className="block h-full">
        <Card className="flex flex-col h-full bg-card border-white/5 overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
          <div className="aspect-video bg-muted overflow-hidden relative">
            <img 
              src={project.cover || "/placeholder.svg"} 
              alt={project.title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
            />
            {project.video && (
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-3 right-3 rounded-full bg-black/70 border-0 hover:bg-black/90 z-10"
                onClick={handleVideoClick}
              >
                <Play className="h-4 w-4 text-white" />
              </Button>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <Badge className="absolute top-3 left-3 capitalize bg-primary/90">{project.category}</Badge>
          </div>
          
          <CardContent className="flex-grow flex flex-col p-4">
            <div className="mb-2">
              <h3 className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            <p className={`text-muted-foreground text-sm ${isMobile ? 'line-clamp-2' : 'line-clamp-3'} mb-4`}>
              {project.description}
            </p>
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
