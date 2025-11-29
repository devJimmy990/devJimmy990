
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { CVLinksProvider } from "./contexts/CVLinksContext";
import Admin from "./pages/Admin";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  return (
    <CVLinksProvider>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </CVLinksProvider>
  );
}

export default App;
