
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { CVLinksProvider } from "./contexts/CVLinksContext";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import Admin from "./pages/Admin";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";

const App = () => {
  return (
    <ThemeProvider>
      <Toaster richColors position="top-right" />
      <CVLinksProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProjectsProvider>
      </CVLinksProvider>
    </ThemeProvider>
  );
}

export default App;
