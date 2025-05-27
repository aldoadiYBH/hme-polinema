import React from "react";
import { Toaster } from "sonner";

export default function GaleryLayout({ children }: { children: React.ReactNode }) {
    return (<>
        {children}

        <Toaster richColors position="top-right" />
    </>)
};
