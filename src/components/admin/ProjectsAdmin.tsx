
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { ProjectModel } from "@/model/project";
import { projectService } from "@/services/project_service";
import { Edit, Loader2, Plus, Trash2, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectModel | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<ProjectModel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const defaultProject: ProjectModel = {
    _id: "",
    title: "",
    description: "",
    type: "frontend",
    tags: [],
    images: [],
    video: null,
    cover: null,
    iosUrl: null,
    liveUrl: null,
    githubUrl: null,
    androidUrl: null,
    reviews: [],
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

  const handleOpenModal = (project: ProjectModel | null = null) => {
    if (project) {
      setCurrentProject(project);
      setTagsInput(project.tags.join(", "));
    } else {
      setCurrentProject({ ...defaultProject });
      setTagsInput("");
    }
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentProject(null);
    setTagsInput("");
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
      images: imagesArray.length > 0 ? imagesArray : [],
    });
  };

  const handleSelectChange = (value: string) => {
    if (!currentProject) return;

    setCurrentProject({
      ...currentProject,
      type: value as "frontend" | "mobile",
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  const handleTagsInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!currentProject) return;

    if (e.key === ',') {
      e.preventDefault();

      // Extract tags, handling the case where the user just typed a comma
      const newTagsInput = tagsInput.trim();
      if (newTagsInput && !newTagsInput.endsWith(',')) {
        setTagsInput(newTagsInput + ', ');
      } else {
        setTagsInput(newTagsInput + ' ');
      }

      // Update the project tags
      const tagsArray = newTagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      setCurrentProject({
        ...currentProject,
        tags: tagsArray,
      });
    }
  };

  const handleTagsInputBlur = () => {
    if (!currentProject) return;

    const tagsArray = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

    setCurrentProject({
      ...currentProject,
      tags: tagsArray,
    });
  };

  const handleSubmit = async () => {
    if (!currentProject) return;

    // Ensure tags are properly processed before submitting
    const tagsArray = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

    const projectToSubmit = {
      ...currentProject,
      tags: tagsArray,
    };

    setIsSubmitting(true);

    try {
      if (projectToSubmit._id) {
        // Update existing project
        await projectService.update(projectToSubmit);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        // Add new project
        await projectService.create(projectToSubmit);
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

  const handleDeleteClick = (project: ProjectModel) => {
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
    ? projects.filter(p => p.type === categoryFilter)
    : projects;

  // Group projects by category for rendering
  const groupedProjects = filteredProjects.reduce((acc, project) => {
    const type = project.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(project);
    return acc;
  }, {} as Record<string, ProjectModel[]>);

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
                <label htmlFor="type" className="text-sm font-medium">Platform</label>
                <Select
                  value={currentProject?.type || "frontend"}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
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
                value={tagsInput}
                onChange={handleTagsChange}
                onKeyDown={handleTagsInputKeyDown}
                onBlur={handleTagsInputBlur}
                placeholder="React, Node.js, MongoDB, etc."
              />
              <p className="text-xs text-muted-foreground">Press comma to add a tag</p>
              {currentProject?.tags && currentProject.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentProject.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              )}
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