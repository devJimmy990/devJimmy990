
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";
import { Toaster } from "sonner";
import { CVLinksProvider } from "./contexts/CVLinksContext";

function App() {
  return (
    <CVLinksProvider>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CVLinksProvider>
  );
}

export default App;
