import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
    return (
        <div className="flex-shrink-0 w-[160px] md:w-[200px] lg:w-[240px] space-y-3">
            <Skeleton className="aspect-[2/3] rounded-xl w-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    );
}
