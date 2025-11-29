
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CONFIG } from "@/config";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProjectModel } from "@/model/project";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ProjectCard = ({ project }: { project: ProjectModel }) => {
  const isMobile = useIsMobile();
  console.log(CONFIG.BUCKET);
  const handleExternalClick = (e: React.MouseEvent, url: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    if (url) window.open(url, '_blank');
  };

  return (
    <>
      <Link to={`/project/${project._id}`} className="block h-full">
        <Card className="flex flex-col h-full bg-card border-white/5 overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
          <div className="aspect-video bg-muted overflow-hidden relative">
            <img
              loading="lazy" alt={project.title}
              src={`${CONFIG.BUCKET}/${project.cover ?? project.images[0]}`}
              className="w-full h-full object-fill hover:scale-105 transition-transform duration-500"
            />
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
            <div className="flex justify-center gap-4 w-full">
              {project.githubUrl &&
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={(e) => handleExternalClick(e, project.githubUrl)}
                >
                  <Github className="h-3 w-3" />
                  {!isMobile && "View Code"}
                </Button>
              }

              {project.liveUrl &&

                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={(e) => handleExternalClick(e, project.liveUrl)}
                >
                  <ExternalLink className="h-3 w-3" />
                  {!isMobile && "Live Demo"}
                </Button>
              }

              {project.androidUrl && <Button
                size="sm"
                variant="outline"
                className="gap-1"
                onClick={(e) => handleExternalClick(e, project.androidUrl)}
              >
                <ExternalLink className="h-3 w-3" />
                {!isMobile && "Google Play"}
              </Button>
              }

              {project.iosUrl && <Button
                size="sm"
                variant="outline"
                className="gap-1"
                onClick={(e) => handleExternalClick(e, project.iosUrl)}
              >
                <ExternalLink className="h-3 w-3" />
                {!isMobile && "App Store"}
              </Button>
              }

            </div>
          </CardFooter>
        </Card>
      </Link>

    </>
  );
};

export default ProjectCard;
