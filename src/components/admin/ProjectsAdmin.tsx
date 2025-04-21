import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Plus, Loader2, ExternalLink, Youtube } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Project } from "@/data/projects";
import { projectService } from "@/services/api";

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const defaultProject: Project = {
    title: "",
    description: "",
    cover: "/placeholder.svg",
    images: [],
    video: null,
    tags: [],
    githubUrl: null,
    liveUrl: null,
    category: "frontend",
  };

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // Remove [toast] from dependency, only want on mount
    // eslint-disable-next-line
  }, []);

  const handleOpenModal = (project: Project | null = null) => {
    setCurrentProject(project || { ...defaultProject });
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentProject(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProject) return;
    
    setCurrentProject({
      ...currentProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentProject) return;
    
    const imagesArray = e.target.value.split(",").map(img => img.trim()).filter(img => img);
    
    setCurrentProject({
      ...currentProject,
      images: imagesArray.length > 0 ? imagesArray : null,
    });
  };

  const handleSelectChange = (value: string) => {
    if (!currentProject) return;
    
    setCurrentProject({
      ...currentProject,
      category: value as "frontend" | "mobile",
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentProject) return;
    
    const tagsArray = e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag);
    
    setCurrentProject({
      ...currentProject,
      tags: tagsArray,
    });
  };

  const handleSubmit = async () => {
    if (!currentProject) return;
    
    setIsSubmitting(true);
    
    try {
      if (currentProject._id) {
        // Update existing project
        await projectService.update(currentProject);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        // Add new project
        await projectService.create(currentProject);
        toast({
          title: "Success",
          description: "Project added successfully",
        });
      }
      
      handleCloseModal();
      await fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete || !projectToDelete._id) return;
    
    try {
      await projectService.delete(projectToDelete._id);
      
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
      await fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const filteredProjects = categoryFilter 
    ? projects.filter(p => p.category === categoryFilter) 
    : projects;

  // Group projects by category for rendering
  const groupedProjects = filteredProjects.reduce((acc, project) => {
    const category = project.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  // Responsive table renderer
  const renderProjectTable = () => {
    if (isMobile) {
      return (
        <div className="space-y-6">
          {Object.entries(groupedProjects).map(([category, categoryProjects]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-medium capitalize">{category}</h3>
              <div className="space-y-4">
                {categoryProjects.map(project => (
                  <Card key={project._id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between gap-2 mt-2">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleOpenModal(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteClick(project)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {Object.entries(groupedProjects).map(([category, categoryProjects]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-lg font-medium capitalize">{category}</h3>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Video</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryProjects.map(project => (
                      <TableRow key={project._id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {project.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{project.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {project.video ? (
                            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                              <Youtube className="h-3 w-3 mr-1" /> Video
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleOpenModal(project)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteClick(project)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Manage Projects</h2>
          <Select value={categoryFilter || "all"} onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground mb-4">No projects found</p>
            <Button onClick={() => handleOpenModal()}>Add Your First Project</Button>
          </CardContent>
        </Card>
      ) : renderProjectTable()}
      
      {/* Add/Edit Project Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentProject?._id ? "Edit Project" : "Add New Project"}</DialogTitle>
            <DialogDescription>
              {currentProject?._id 
                ? "Update the details of your existing project" 
                : "Fill in the details to add a new project to your portfolio"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input 
                  id="title" 
                  name="title"
                  value={currentProject?.title || ""} 
                  onChange={handleInputChange}
                  placeholder="Project title" 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select 
                  value={currentProject?.category || "frontend"}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                name="description"
                value={currentProject?.description || ""} 
                onChange={handleInputChange}
                placeholder="Write a brief description of the project" 
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cover" className="text-sm font-medium">Cover Image URL</label>
              <Input 
                id="cover" 
                name="cover"
                value={currentProject?.cover || ""} 
                onChange={handleInputChange}
                placeholder="URL to the project cover image" 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="images" className="text-sm font-medium">
                Images URLs (comma-separated)
              </label>
              <Input 
                id="images" 
                name="images"
                value={currentProject?.images?.join(", ") || ""} 
                onChange={handleImagesChange}
                placeholder="URL1, URL2, URL3, ..." 
              />
              <p className="text-xs text-muted-foreground">Add multiple image URLs separated by commas</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="video" className="text-sm font-medium">YouTube Video URL</label>
              <Input 
                id="video" 
                name="video"
                value={currentProject?.video || ""} 
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..." 
              />
              <p className="text-xs text-muted-foreground">YouTube video URL for project demo</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="githubUrl" className="text-sm font-medium">GitHub URL</label>
                <Input 
                  id="githubUrl" 
                  name="githubUrl"
                  value={currentProject?.githubUrl || ""} 
                  onChange={handleInputChange}
                  placeholder="GitHub repository link" 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="liveUrl" className="text-sm font-medium">Live URL</label>
                <Input 
                  id="liveUrl" 
                  name="liveUrl"
                  value={currentProject?.liveUrl || ""} 
                  onChange={handleInputChange}
                  placeholder="Live demo URL" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags (comma-separated)
              </label>
              <Input 
                id="tags" 
                name="tags"
                value={currentProject?.tags.join(", ") || ""} 
                onChange={handleTagsChange}
                placeholder="React, Node.js, MongoDB, etc." 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>Save</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the project "{projectToDelete?.title}"? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsAdmin;
