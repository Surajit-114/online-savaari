import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const FlightSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div>
      <div className="mb-4 grid grid-cols-12 gap-3 rounded bg-background p-4 shadow">
        <div className="col-span-12 flex gap-2 md:col-span-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <FlightSkeleton className="w-[5rem]" />
        </div>
        <FlightSkeleton className="col-span-6 md:col-span-3" />
        <FlightSkeleton className="col-span-6 md:col-span-3" />
        <FlightSkeleton className="col-span-6 md:col-span-1" />
        <FlightSkeleton className="col-span-6 md:col-span-2" />
        <FlightSkeleton className="col-span-12 md:col-span-1" />
      </div>
      <div className="mb-4 grid grid-cols-12 gap-3 rounded bg-background p-4 shadow">
        <div className="col-span-12 flex gap-2 md:col-span-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <FlightSkeleton className="w-[5rem]" />
        </div>
        <FlightSkeleton className="col-span-6 md:col-span-3" />
        <FlightSkeleton className="col-span-6 md:col-span-3" />
        <FlightSkeleton className="col-span-6 md:col-span-1" />
        <FlightSkeleton className="col-span-6 md:col-span-2" />
        <FlightSkeleton className="col-span-12 md:col-span-1" />
      </div>
      <div className="mb-4 grid grid-cols-12 gap-3 rounded bg-background p-4 shadow">
        <div className="col-span-12 flex gap-2 md:col-span-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <FlightSkeleton className="w-[5rem]" />
        </div>
        <FlightSkeleton className="col-span-6 md:col-span-3" />
        <FlightSkeleton className="col-span-6 md:col-span-3" />
        <FlightSkeleton className="col-span-6 md:col-span-1" />
        <FlightSkeleton className="col-span-6 md:col-span-2" />
        <FlightSkeleton className="col-span-12 md:col-span-1" />
      </div>
      <div className="mb-4 grid grid-cols-12 gap-3 rounded bg-background p-4 shadow">
        <div className="col-span-12 flex gap-2 md:col-span-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <FlightSkeleton className="w-[5rem]" />
        </div>
        <FlightSkeleton className="col-span-6 md:col-span-3" />
        <FlightSkeleton className="col-span-6 md:col-span-3" />
        <FlightSkeleton className="col-span-6 md:col-span-1" />
        <FlightSkeleton className="col-span-6 md:col-span-2" />
        <FlightSkeleton className="col-span-12 md:col-span-1" />
      </div>
      <div className="mb-4 grid grid-cols-12 gap-3 rounded bg-background p-4 shadow">
        <div className="col-span-12 flex gap-2 md:col-span-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <FlightSkeleton className="w-[5rem]" />
        </div>
        <FlightSkeleton className="col-span-6 md:col-span-3" />
        <FlightSkeleton className="col-span-6 md:col-span-3" />
        <FlightSkeleton className="col-span-6 md:col-span-1" />
        <FlightSkeleton className="col-span-6 md:col-span-2" />
        <FlightSkeleton className="col-span-12 md:col-span-1" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
