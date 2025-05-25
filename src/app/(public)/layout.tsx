import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HME Polinema",
  description: "Website resmi HME Polinema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HME POLINEMA</title>

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
      <body className="bg-background text-foreground">
        <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-lg border-b border-accent text-foreground">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">HME POLINEMA</h1>
            <nav className="space-x-6 hidden md:flex">
              <a href="#" className="hover:text-accent-foreground transition">Beranda</a>
              <a href="#" className="hover:text-accent-foreground transition">Info</a>
              <a href="#" className="hover:text-accent-foreground transition">Database</a>
              <a href="#" className="hover:text-accent-foreground transition">Kontak</a>
              <a href="#" className="hover:text-accent-foreground transition">Aspirasi</a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-gray-950 border-t border-gray-800 py-12">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Kontak</h4>
              <p className="text-sm text-gray-400">
                Gedung AS2.08, Jl. Soekarno – Hatta No. 09<br />
                Lowokwaru, Kota Malang
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold mb-2">Media Sosial</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-foreground transition">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-foreground transition">X</a>
                <a href="#" className="text-gray-400 hover:text-foreground transition">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-foreground transition">LINE</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600 text-sm">
            © 2025 HME POLINEMA. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
