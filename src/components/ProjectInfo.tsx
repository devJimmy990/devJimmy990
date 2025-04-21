
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Play } from "lucide-react";
import { Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProjectInfoProps {
  project: Project;
  onOpenVideo: () => void;
}

const ProjectInfo = ({ project, onOpenVideo }: ProjectInfoProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <Badge className="mb-4 capitalize">{project.category}</Badge>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <p>{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-4 pt-4">
        {project.githubUrl && (
          <Button className="flex items-center gap-2" variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> View Code
            </a>
          </Button>
        )}
        {project.liveUrl && (
          <Button
            className={`flex items-center gap-2 ${!project.githubUrl ? 'w-full justify-center' : ''}`}
            asChild
          >
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          </Button>
        )}
        {project.video && !isMobile && (
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={onOpenVideo}
          >
            <Play className="h-4 w-4" /> Watch Demo
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;
