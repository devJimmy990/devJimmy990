
import { useEffect, useState } from "react";

interface VideoModalProps {
  videoUrl: string;
}

const VideoModal = ({ videoUrl }: VideoModalProps) => {
  const [embedUrl, setEmbedUrl] = useState<string>("");

  useEffect(() => {
    const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = videoUrl.match(youtubeRegex);
    setEmbedUrl(`https://www.youtube.com/embed/${match[2]}?&rel=0`);

  }, [videoUrl]);

  return (
    (
      <iframe
        src={embedUrl}
        allowFullScreen
        frameBorder="0"
        title="Video Player"
        className="w-full h-full"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
      />
    )
  );
};

export default VideoModal;
