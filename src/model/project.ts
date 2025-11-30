export interface ProjectModel {
  _id: string;
  title: string;
  tags: string[];
  images: string[];
  description: string;
  cover: string | null;
  video: string | null;
  githubUrl: string | null;
  type: "frontend" | "mobile";
  reviews: { comment: string, date: string, rate: number, _id: string }[];

  /** live - url */
  iosUrl: string | null;
  liveUrl: string | null;
  androidUrl: string | null;
}


/**
  **General Data:
  * _id: string
  * title: string
  * tags: string[]
  * description: string
  * cover: string | null
  * video: string | null
  * githubUrl: string | null
  * images: string[] | null
  * category: "frontend" | "mobile"


  ** Frontend Data:
  * liveUrl: string | null
  * *** githubUrl || liveUrl


  ** Mobile Data:
  * androidUrl: string | null 
  * iosUrl: string | null
  * *** githubUrl || iosUrl || androidUrl
 */