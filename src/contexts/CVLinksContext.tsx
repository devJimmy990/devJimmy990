
import { cvService } from "@/services/api";
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CVLink {
  id?: string;
  _id?: string;
  title: string;
  url: string;
  type: string;
}

interface CVLinksContextType {
  cvLinks: CVLink[];
  loading: boolean;
  error: boolean;
  refreshCVLinks: () => Promise<void>;
}

const CVLinksContext = createContext<CVLinksContextType>({
  cvLinks: [],
  loading: true,
  error: false,
  refreshCVLinks: async () => {}
});

export const useCVLinks = () => useContext(CVLinksContext);

export const CVLinksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvLinks, setCVLinks] = useState<CVLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCVLinks = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await cvService.getAll();
      if (Array.isArray(data)) {
        setCVLinks(data);
      } else {
        setCVLinks([]);
        setError(true);
        console.error("Failed to load CV data");
      }
    } catch (err) {
      console.error("Error fetching CV links:", err);
      setCVLinks([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const refreshCVLinks = async () => {
    await fetchCVLinks();
  };

  useEffect(() => {
    fetchCVLinks();
  }, []);

  return (
    <CVLinksContext.Provider value={{ cvLinks, loading, error, refreshCVLinks }}>
      {children}
    </CVLinksContext.Provider>
  );
};
