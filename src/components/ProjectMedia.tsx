
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import VideoModal from "@/components/VideoModal";
import { Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProjectMediaProps {
  project: Project;
  isVideoOpen: boolean;
  setIsVideoOpen: (open: boolean) => void;
}

const ProjectMedia = ({
  project,
  isVideoOpen,
  setIsVideoOpen,
}: ProjectMediaProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-6 relative group">
        <img
          src={project.cover || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {project.video && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="lg"
              className="bg-black/60 border-white text-white hover:bg-black/80"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="h-6 w-6 mr-2" /> Watch Demo
            </Button>
          </div>
        )}
      </div>
      {project.images && project.images.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Project Gallery</h3>
          <Carousel>
            <CarouselContent>
              {project.images.map((image, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="aspect-video rounded-md overflow-hidden p-1">
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
      {project.video && !isMobile && (
        <VideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl={project.video}
        />
      )}
    </>
  );
};

export default ProjectMedia;
