import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, X, Plus, Trash2 } from "lucide-react";
import { CV, cvService } from "@/services/api";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Always fetches latest data from API, never reuses local cache
const CVLinksAdmin = () => {
  const [cvLinks, setCvLinks] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newCV, setNewCV] = useState<CV>({ _id: "", url: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch fresh from API
  const fetchCVLinks = async () => {
    setLoading(true);
    try {
      const data = await cvService.getAll();
      setCvLinks(data);
    } catch (error) {
      console.error("Error fetching CV links:", error);
      toast({
        title: "Error",
        description: "Failed to fetch CV links",
        variant: "destructive",
      });
      setCvLinks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVLinks();
  }, []); // only on mount

  // Add always triggers fetch after success
  const handleAddCV = async () => {
    if (!newCV._id || !newCV.url) {
      toast({
        title: "Validation Error",
        description: "Title and URL are required",
        variant: "destructive",
      });
      return;
    }
    setIsSaving(true);
    try {
      await cvService.create(newCV);
      toast({
        title: "Success",
        description: "CV link added successfully",
      });
      setNewCV({ _id: "", url: "" });
      await fetchCVLinks(); // Always refresh from API
    } catch (error) {
      console.error("Error saving CV link:", error);
      toast({
        title: "Error",
        description: "Failed to add CV link",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Delete always triggers fresh fetch
  const handleDeleteCV = async (id: string) => {
    try {
      await cvService.delete(id);
      toast({
        title: "Success",
        description: "CV link deleted successfully",
      });
      await fetchCVLinks(); // Always refresh from API
    } catch (error) {
      console.error("Error deleting CV link:", error);
      toast({
        title: "Error",
        description: "Failed to delete CV link",
        variant: "destructive",
      });
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>CV Links</CardTitle>
          <CardDescription>Manage your resume/CV links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add new CV link */}
          <div className="space-y-4 border-b pb-6">
            <h3 className="text-md font-medium">Add New CV Link</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Title (ID)</label>
              <div className="relative">
                <Input 
                  value={newCV._id} 
                  onChange={(e) => setNewCV({ ...newCV, _id: e.target.value })}
                  placeholder="e.g., mobile, frontend"
                  className="pr-10"
                />
                {newCV._id && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setNewCV({ ...newCV, _id: "" })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">URL</label>
              <div className="relative">
                <Input 
                  value={newCV.url} 
                  onChange={(e) => setNewCV({ ...newCV, url: e.target.value })}
                  placeholder="Enter Google Drive or document URL"
                  className="pr-10"
                />
                {newCV.url && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setNewCV({ ...newCV, url: "" })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleAddCV} 
                disabled={isSaving || !newCV._id || !newCV.url}
                className="flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" /> Add CV Link
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* CV Links Table */}
          <div>
            <h3 className="text-md font-medium mb-4">Existing CV Links</h3>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : cvLinks.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cvLinks.map((cv) => (
                    <TableRow key={cv._id}>
                      <TableCell className="font-medium">{cv._id}</TableCell>
                      <TableCell className="truncate max-w-[200px]">
                        <a 
                          href={cv.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {cv.url}
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setDeleteConfirm(cv._id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No CV links found. Add your first CV link above.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this CV link.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => deleteConfirm && handleDeleteCV(deleteConfirm)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CVLinksAdmin;
