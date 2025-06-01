import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SidebarSection from "./sidebar";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Header() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 bg-background/70 border-b border-accent backdrop-blur-lg text-foreground">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center md:gap-x-3 gap-1">
          <Image src="/assets/Logo-JTE-Color-New.png" alt="Logo JTE" width={60} height={60} className="object-cover" />
          <Image src="/assets/LOGO-HME.png" alt="Logo HME" width={50} height={50} className="object-cover" />
          <h1 className="text-2xl font-bold">HME POLINEMA</h1>
        </div>

        {/* Desktop Menu */}
        <div className="space-x-1 hidden md:flex items-center">
          <Link href="/" className="px-3 py-1 rounded-xl hover:bg-accent hover:text-accent-foreground transition">
            Beranda
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-1 rounded-xl cursor-pointer hover:bg-accent hover:text-accent-foreground transition">
                Info <i className="fa-light fa-chevron-down"></i>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {categories.map((cat, i) => (
                  <div key={cat.id}>
                    <DropdownMenuItem asChild>
                      <Link href={`/informasi/${cat.name}`} className="cursor-pointer">
                        {cat.name}
                      </Link>
                    </DropdownMenuItem>
                    {i < categories.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/galery" className="px-3 py-1 rounded-xl hover:bg-accent hover:text-accent-foreground transition">
            Galeri
          </Link>
          <Link href="/contact" className="px-3 py-1 rounded-xl hover:bg-accent hover:text-accent-foreground transition">
            Kontak
          </Link>
          <Link href="/kritik-saran" className="px-3 py-1 rounded-xl hover:bg-accent hover:text-accent-foreground transition">
            Kritik & Saran
          </Link>

          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="default" className="cursor-pointer">Dashboard</Button>
              </Link>
              <form action="/api/auth/signout" method="POST">
                <Button variant="outline" type="submit" className="cursor-pointer">Logout</Button>
              </form>
            </>
          ) : (
            <Link href="/login">
              <Button variant="default" className="cursor-pointer">Login</Button>
            </Link>
          )}

        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <SidebarSection categories={categories} />
        </div>
      </nav>
    </header>
  );
}
