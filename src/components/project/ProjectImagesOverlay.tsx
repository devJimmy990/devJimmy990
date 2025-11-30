import { CONFIG } from "@/config";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

const ProjectImagesOverlay = ({ showIndex, closeOverlay, images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(showIndex || 0);

    const goToNextImage = () => {
        const nextIndex = (currentImageIndex + 1) % images.length;
        setCurrentImageIndex(nextIndex);
        document.getElementById(`image-${nextIndex}`)?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
        });
    };

    const goToPrevImage = () => {
        const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
        setCurrentImageIndex(prevIndex);
        document.getElementById(`image-${prevIndex}`)?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
        });
    };

    return (
        <div
            className="fixed inset-0 bg-black/95 z-50 flex flex-col"
            onClick={(e) => {
                if (e.target === e.currentTarget) closeOverlay();
            }}
        >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-b from-black/90 to-transparent p-4 flex items-center justify-between backdrop-blur-sm">
                <div className="text-white">
                    <p className="text-sm text-gray-400">
                        Image {currentImageIndex + 1} of {images.length}
                    </p>
                </div>
                <button
                    onClick={closeOverlay}
                    className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                    aria-label="Close overlay"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Main content */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Navigation buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={goToNextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Main image - centered and max width */}
                <div className="w-full flex items-center justify-center">
                    {images.map((src, i) => (
                        <img
                            key={i}
                            id={`image-${i}`}
                            src={`${CONFIG.BUCKET}/${src}`}
                            alt={`Project full image ${i + 1}`}
                            className={`max-h-[80vh] max-w-[90%] object-contain transition-opacity duration-500 ${i === currentImageIndex ? "opacity-100" : "opacity-0 absolute"
                                }`}
                            loading={i === currentImageIndex ? "eager" : "lazy"}
                        />
                    ))}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="sticky bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 backdrop-blur-sm">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentImageIndex(i)}
                            className={`flex-shrink-0 w-20 h-14 rounded-md overflow-hidden transition-all ${i === currentImageIndex ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"
                                }`}
                        >
                            <img
                                src={`${CONFIG.BUCKET}/${src}`}
                                alt={`Thumbnail ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectImagesOverlay;
