import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react"
import Link from "next/link";

const Menus = [
    {
        title: "Beranda",
        url: "/"
    },
    {
        title: "Info",
        subMenu: [
            {
                title: "Pengumuman",
                url: "/pengumuman"
            },
            {
                title: "Beasiswa",
                url: "/beasiswa"
            },
            {
                title: "Edukasi",
                url: "/edukasi"
            },
            {
                title: "Lowongan Kerja",
                url: "/loker"
            },
            {
                title: "Kritik & Saran",
                url: "/kritik-saran"
            },
        ]
    },
    {
        title: "Database",
        subMenu: [
            {
                title: "Database Internal HME",
                url: "#"
            },
            {
                title: "Database Eksternal HME",
                url: "#"
            },
        ]
    },
    {
        title: "Kontak",
        url: "/contact"
    },
    {
        title: "Aspirasi",
        url: "/aspirasi"
    },
]

export default function SidebarSection() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    <Menu className="" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <VisuallyHidden>
                        <SheetTitle>Menu</SheetTitle>
                    </VisuallyHidden>
                </SheetHeader>
                <div className="flex flex-col gap-y-2">
                    {Menus.map(item => (
                        item.subMenu?.length ? (
                            <DropdownMenu key={item.title}>
                                <DropdownMenuTrigger asChild>
                                    <button className="text-left px-3 py-1 cursor-pointer hover:text-accent-foreground hover:bg-accent transition focus:outline-0">{item.title} <i className="fa-light fa-chevron-down"></i></button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        {item.subMenu.map((item) => (
                                            <DropdownMenuItem key={item.title} asChild>
                                                <Link href={`${item.url}`}>{item.title}</Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link key={item.title} href={`${item.url}`} className="px-3 py-1 hover:bg-accent hover:text-accent-foreground transition focus:outline-0">{item.title}</Link>
                        )
                    ))}

                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-left px-3 py-1 cursor-pointer hover:bg-accent hover:text-accent-foreground transition focus:outline-0 ">Info <i className="fa-light fa-chevron-down"></i></button>
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


                    <Link href="/contact" className="px-3 py-1 hover:bg-accent hover:text-accent-foreground transition focus:outline-0">Kontak</Link>
                    <Link href="/aspirasi" className="px-3 py-1 hover:bg-accent hover:text-accent-foreground transition focus:outline-0">Aspirasi</Link> */}

                </div>
            </SheetContent>
        </Sheet>
    )
};
