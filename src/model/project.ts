export interface ProjectModel {
  _id: string;
  title: string;
  tags: string[];
  description: string;
  cover: string | null;
  video: string | null;
  liveUrl: string | null;
  images: string[] | null;
  githubUrl: string | null;
  category: "frontend" | "mobile";
}
