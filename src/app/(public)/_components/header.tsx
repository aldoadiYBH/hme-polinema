import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import SidebarSection from "./sidebar";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-background/70 border-b border-accent backdrop-blur-lg text-foreground">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex gap-1">
                    <Image src={"/assets/LOGO-HME.png"} alt="..." width={32} height={32} className="object-cover"></Image>
                    <h1 className="text-2xl font-bold">HME POLINEMA</h1>
                </div>
                <div className="space-x-1 hidden md:flex items-center">
                    <Link href="/" className="px-3 py-1 rounded-xl hover:bg-accent hover:text-accent-foreground transition focus:outline-0">Beranda</Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="px-3 py-1 rounded-xl cursor-pointer hover:bg-accent hover:text-accent-foreground transition focus:outline-0 ">Info <i className="fa-light fa-chevron-down"></i></button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link href="/pengumuman" className="cursor-pointer">Pengumuman</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/beasiswa" className="cursor-pointer">Beasiswa</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/edukasi" className="cursor-pointer">Edukasi</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/loker" className="cursor-pointer">Lowongan Kerja</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/kritik-saran" className="cursor-pointer">Kritik & Saran</Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="px-3 py-1 rounded-xl cursor-pointer hover:text-accent-foreground hover:bg-accent transition focus:outline-0">Database <i className="fa-light fa-chevron-down"></i></button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <a href="#">Database Internal HME</a>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <a href="#">Database External HME</a>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/contact" className="px-3 py-1 rounded-xl hover:bg-accent hover:text-accent-foreground transition focus:outline-0">Kontak</Link>
                    <Link href="/aspirasi" className="px-3 py-1 rounded-xl hover:bg-accent hover:text-accent-foreground transition focus:outline-0">Aspirasi</Link>

                </div>
                <div className="md:hidden">
                    <SidebarSection />
                </div>
            </nav>
        </header>
    )
}