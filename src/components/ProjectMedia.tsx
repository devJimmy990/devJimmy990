
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import VideoModal from "@/components/VideoModal";
import { CONFIG } from "@/config";
import { ProjectModel } from "@/model/project";

interface ProjectMediaProps {
  project: ProjectModel;
}

const ProjectMedia = ({
  project,
}: ProjectMediaProps) => {
  return (
    <>
      {project.video ? (
        <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-6">
          <VideoModal
            videoUrl={project.video}
          />
        </div>
      ) : project.cover && (
        <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-6">
          <img
            loading="lazy" 
            alt={project.title}
            className="w-full h-full object-cover"
            src={`${CONFIG.BUCKET}/${project.cover}`}
          />
        </div>
      )}
      {project.images && project.images.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Project Gallery</h3>
          <Carousel>
            <CarouselContent>
              {project.video && project.cover && <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3 gap-1">
                <div className="aspect-video rounded-md overflow-hidden p-1">
                  <img
                    loading="lazy"
                    src={`${CONFIG.BUCKET}/${project.cover}`}
                    alt={`${project.title} cover`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </CarouselItem>}
              {project.images.map((image, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="aspect-video rounded-md overflow-hidden p-1">
                    <img
                      loading="lazy"
                      src={`${CONFIG.BUCKET}/${image}`}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </>
  );
};

export default ProjectMedia;
