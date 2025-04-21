
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsAdmin from "@/components/admin/ProjectsAdmin";
import CVLinksAdmin from "@/components/admin/CVLinksAdmin";
import AdminLogin from "@/components/admin/AdminLogin";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">DevJimmy Admin</h1>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
        
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'md:w-[400px] grid-cols-2'}`}>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="cv-links">CV Links</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-6">
            <ProjectsAdmin />
          </TabsContent>
          <TabsContent value="cv-links" className="mt-6">
            <CVLinksAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
