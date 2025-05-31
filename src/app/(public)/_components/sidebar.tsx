// components/_components/sidebar.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Menu } from "lucide-react"
import Link from "next/link"

type SidebarProps = {
  categories: { id: string; name: string }[]
}

export default function SidebarSection({ categories }: SidebarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>
        <div className="flex flex-col gap-y-2 mt-4">
          <Link
            href="/"
            className="px-3 py-1 hover:bg-accent hover:text-accent-foreground rounded transition"
          >
            Beranda
          </Link>

          <DropdownMenu open={openDropdown === "info"} onOpenChange={(open) => setOpenDropdown(open ? "info" : null)}>
            <DropdownMenuTrigger asChild>
              <button className="text-left px-3 py-1 rounded hover:bg-accent hover:text-accent-foreground transition w-full">
                Info <i className="fa-light fa-chevron-down ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
              <DropdownMenuGroup>
                {categories.map((cat, i) => (
                  <div key={cat.id}>
                    <DropdownMenuItem asChild>
                      <Link href={`/informasi/${cat.name}`}>{cat.name}</Link>
                    </DropdownMenuItem>
                    {i < categories.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/galery"
            className="px-3 py-1 hover:bg-accent hover:text-accent-foreground rounded transition"
          >
            Galeri
          </Link>
          <Link
            href="/contact"
            className="px-3 py-1 hover:bg-accent hover:text-accent-foreground rounded transition"
          >
            Kontak
          </Link>
          <Link
            href="/kritik-saran"
            className="px-3 py-1 hover:bg-accent hover:text-accent-foreground rounded transition"
          >
            Kritik & Saran
          </Link>

          <Link href="/login">
            <Button className="mt-2 w-full">Login</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
