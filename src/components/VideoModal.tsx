import { useEffect, useState } from "react";

interface VideoModalProps {
  videoUrl: string;
}

const VideoModal = ({ videoUrl }: VideoModalProps) => {
  const [embedUrl, setEmbedUrl] = useState<string>("");

  useEffect(() => {
    if (!videoUrl) return;

    if (videoUrl.includes("drive")) {
      setEmbedUrl(videoUrl);
      return;
    }
    // Supports:
    // - youtube.com/watch?v=ID
    // - youtu.be/ID
    // - youtube.com/embed/ID
    // - youtube.com/v/ID
    // - youtube.com/shorts/ID
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/;

    const match = videoUrl.match(regex);

    if (match && match[1]) {
      const videoId = match[1];
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}?rel=0`);
    }
  }, [videoUrl]);

  if (!embedUrl) return null;

  return (
    <iframe
      src={embedUrl}
      allowFullScreen
      frameBorder="0"
      title="Video Player"
      className="w-full h-full"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
    />
  );
};

export default VideoModal;
