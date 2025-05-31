import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarSection } from "./_components/sidebar";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import AuthProvider from "@/components/auth/authProvider";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Dashboard HME Polinema</title>

                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-thin.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-solid.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-regular.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-light.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-thin.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-solid.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-regular.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-light.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-thin.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-regular.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-light.css" />

            </head>
            <body>
                <header className="sticky top-0 z-50 bg-background/70 border-b border-accent backdrop-blur-lg text-foreground">
                    <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex gap-1">
                            <Image src={"/assets/LOGO-HME.png"} alt="..." width={32} height={32} className="object-cover"></Image>
                            <Link href={"/"} className="text-2xl font-bold">HME POLINEMA</Link>
                        </div>
                    </nav>
                </header>
                <AuthProvider>
                    <SidebarProvider>
                        <SidebarSection />
                        <main className="w-full p-3">
                            <SidebarTrigger className="border cursor-pointer" />
                            {children}
                        </main>
                    </SidebarProvider>
                </AuthProvider>
            </body>
        </html>
    )
};
