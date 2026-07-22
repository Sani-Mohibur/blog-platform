import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="space-y-6 py-4 w-full h-full">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="border rounded-md">
        <div className="border-b p-4 flex gap-4 bg-muted/20">
          <Skeleton className="h-5 w-full max-w-[200px]" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-5 w-[100px]" />
        </div>
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 flex gap-4 items-center">
              <Skeleton className="h-5 w-full max-w-[200px]" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-6 w-[80px] rounded-full" />
              <div className="flex gap-2 w-[100px]">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-8 w-[200px] rounded-md" />
      </div>
    </div>
  );
}
