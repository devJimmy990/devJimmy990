import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/contexts/ProjectsContext";
import { useState } from "react";
import ProjectCard from "../project/ProjectCard";

// Always fetches projects from API on mount, no cache
const ProjectSkeleton = () => (
  <div className="flex flex-col h-full">
    <Skeleton className="aspect-video w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <div className="flex justify-between pt-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
);

const ProjectsSection = () => {
  const { projects, loading, error } = useProjects();
  const [filter, setFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(6);


  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.type === filter);

  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = filteredProjects.length > visibleProjects;

  const showMoreProjects = () => {
    setVisibleProjects(prevCount => prevCount + 3);
  };

  return (
    <section id="projects" className="section bg-secondary/30">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
            My Projects
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mt-6">
            A selection of my recent web and mobile development projects.
            Each project showcases different skills and technologies.
          </p>

          <div className="flex gap-2 mt-8">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="px-6"
            >
              All
            </Button>
            <Button
              variant={filter === "frontend" ? "default" : "outline"}
              onClick={() => setFilter("frontend")}
              className="px-6"
            >
              Frontend
            </Button>
            <Button
              variant={filter === "mobile" ? "default" : "outline"}
              onClick={() => setFilter("mobile")}
              className="px-6"
            >
              Mobile
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="bg-card border border-white/5 rounded-md overflow-hidden" key={i}>
                <ProjectSkeleton />
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">Unable to load projects. Please try again later.</p>
            </div>
          ) : displayedProjects.length > 0 ? (
            displayedProjects.map((project) => (
              <div key={project._id}>
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No projects found for this category.</p>
            </div>
          )}
        </div>

        {!loading && !error && hasMoreProjects && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" onClick={showMoreProjects}>
              View More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
