import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectInfoProps {
  project: Project;
}

const ProjectInfo = ({ project }: ProjectInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
        <Badge className="mb-3 capitalize">{project.category}</Badge>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground">{project.description}</p>
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
      </div>
    </div>
  );
};

export default ProjectInfo;