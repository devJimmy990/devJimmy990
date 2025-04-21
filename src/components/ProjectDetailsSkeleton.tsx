
import { Skeleton } from "@/components/ui/skeleton";

const ProjectDetailsSkeleton = () => (
  <div className="container mx-auto">
    <div className="mb-8">
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Skeleton className="aspect-video w-full rounded-lg mb-6" />
        <div className="mb-8">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="aspect-video w-full rounded-md" />
            <Skeleton className="aspect-video w-full rounded-md" />
            <Skeleton className="aspect-video w-full rounded-md" />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-2/3 mb-2" />
          <div className="flex flex-wrap gap-2 mb-4">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex flex-wrap gap-4 pt-4">
          <Skeleton className="h-10 w-32 rounded" />
          <Skeleton className="h-10 w-32 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export default ProjectDetailsSkeleton;
