import VideoModal from "@/components/VideoModal";
import { CONFIG } from "@/config";
import { ProjectModel } from "@/model/project";
import { useEffect, useRef, useState } from "react";
import ProjectImagesOverlay from "./ProjectImagesOverlay";

interface ProjectMediaProps {
  project: ProjectModel;
}

const ProjectMedia = ({
  project,
}: ProjectMediaProps) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || project.images.length === 0) return;

    let animationId: number;
    let direction: 'forward' | 'backward' = 'forward';
    const speed = 0.5;

    const scroll = () => {
      if (!container) return;

      if (overlayOpen) {
        animationId = requestAnimationFrame(scroll);
        return;
      }

      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      const atEnd = currentScroll >= maxScroll - 1;
      const atStart = currentScroll <= 1;

      if (direction === 'forward' && atEnd) direction = 'backward';
      if (direction === 'backward' && atStart) direction = 'forward';

      container.scrollBy({
        left: direction === 'forward' ? speed : -speed,
        behavior: 'auto',
      });

      animationId = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      if (!overlayOpen) {
        animationId = requestAnimationFrame(scroll);
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Start scrolling
    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [project.images.length, overlayOpen]);

  const openOverlay = (index: number) => {
    setCurrentImageIndex(index);
    setOverlayOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
    document.body.style.overflow = 'unset';
  };


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
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {project.video && project.cover && (
              <div
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 cursor-pointer"
                onClick={() => openOverlay(0)}
              >
                <div className="aspect-video rounded-md overflow-hidden p-1 hover:scale-105 transition-transform">
                  <img
                    loading="lazy"
                    src={`${CONFIG.BUCKET}/${project.cover}`}
                    alt={`${project.title} cover`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            )}
            {project.images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 cursor-pointer"
                onClick={() => openOverlay(project.video && project.cover ? index + 1 : index)}
              >
                <div className="aspect-video rounded-md overflow-hidden p-1 hover:scale-105 transition-transform">
                  <img
                    loading="lazy"
                    src={`${CONFIG.BUCKET}/${image}`}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overlay */}
      {overlayOpen && (
        <ProjectImagesOverlay
          closeOverlay={closeOverlay}
          showIndex={currentImageIndex}
          images={[
            ...(project.video && project.cover ? [project.cover] : []),
            ...(project.images ?? []),
          ]}
        />

      )}


    </>
  );
};

export default ProjectMedia;
