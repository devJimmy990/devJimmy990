
import { ProjectModel } from "@/model/project";
import { projectService } from "@/services/project_service";
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ProjectsContextType {
  projects: ProjectModel[];
  loading: boolean;
  error: boolean;
  refreshProjects: () => Promise<void>;
  getProjectById: (id: string) => Promise<void>;
  updateProject: (review: { rate: number, comment: string }, id: string) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  loading: true,
  error: false,
  updateProject: async () => { },
  refreshProjects: async () => { },
  getProjectById: (id: string) => null,
});

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await projectService.getAll();
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
        setError(true);
        console.error("Failed to load project data");
      }
    } catch (err) {
      console.error("Error fetching project data:", err);
      setProjects([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getProjectById = async (id: string) => {
    try {
      setLoading(true);
      setError(false);
      const data = await projectService.getById(id);
      if (data) {
        setProjects([...projects, data]);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
      setError(true);

    } finally {
      setLoading(false);
    }
  }
  const updateProject = async (review: { rate: number, comment: string }, id: string) => {
    try {
      const updatedProject = await projectService.addReview(id, review);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === updatedProject._id ? updatedProject : project
        )
      );
    } catch (err) {
      console.error("Error updating project with new review:", err);
    }
  };

  const refreshProjects = async () => {
    await fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, refreshProjects, updateProject, getProjectById }}>
      {children}
    </ProjectsContext.Provider>
  );
};
