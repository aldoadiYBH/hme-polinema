"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardLoading() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className={cn("animate-spin text-primary")} size={40} />
                <p className="text-muted-foreground">Memuat ...</p>
            </div>
        </div>
    )
}
