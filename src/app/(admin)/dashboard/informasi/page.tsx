"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { useMediaQuery } from "@/lib/use-media-query"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Informasi {
    id: string
    title: string
    slug: string
    status: "Draft" | "Published"
    category: { id: string; name: string }
}

interface Category {
    id: string
    name: string
}

export default function InformasiTable() {
    const isMobile = useMediaQuery("(max-width: 768px)")
    const [hoveredRow, setHoveredRow] = useState<number | null>(null)
    const [data, setData] = useState<Informasi[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resData, resCat] = await Promise.all([
                    fetch("/api/informasi"),
                    fetch("/api/informasi/category")
                ])

                const [jsonData, jsonCat] = await Promise.all([
                    resData.json(),
                    resCat.json()
                ])

                setData(jsonData.data || [])
                setCategories(jsonCat.data || [])
            } catch (err) {
                console.error("Failed to fetch informasi or categories:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const [statusLoading, setStatusLoading] = useState<string | null>(null)

    const toggleStatus = async (id: string, currentStatus: "Draft" | "Published") => {
        const newStatus = currentStatus === "Draft" ? "Published" : "Draft"
        setStatusLoading(id)
        try {
            const res = await fetch(`/api/informasi`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus })
            })

            if (!res.ok) throw new Error("Failed to update status")

            setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item))
        } catch (err) {
            alert("Gagal memperbarui status")
            console.error(err)
        } finally {
            setStatusLoading(null)
        }
    }

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Yakin ingin menghapus program kerja ini?");
        if (!confirm) return;

        try {
            const res = await fetch("/api/informasi", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) throw new Error("Failed to delete");

            // Remove the deleted item from UI
            setData(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            alert("Gagal menghapus");
            console.error(err);
        }
    };

    const handleDeleteCategory = async (categoryId: string, categoryName: string) => {
        const confirm = window.confirm(
            `Menghapus kategori "${categoryName}" akan menghapus semua informasi terkait. Lanjutkan?`
        );

        if (!confirm) return;

        try {
            const res = await fetch("/api/informasi/category", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: categoryId }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Gagal menghapus kategori");
            }

            // Refresh local data or re-fetch
            setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
        } catch (error) {
            alert("Gagal menghapus kategori");
            console.error(error);
        }
    };

    const filteredData = (selectedCategory && selectedCategory !== "all")
        ? data.filter(item => item.category.id === selectedCategory)
        : data

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="space-y-2 w-full max-w-md">
                    <Label className="block">Kelola Kategori:</Label>
                    <div className="space-y-1">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="flex justify-between items-center border px-3 py-1 rounded-md bg-muted/50"
                            >
                                <span>{(cat.name.charAt(0).toUpperCase() + cat.name.slice(1))}</span>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                >
                                    Hapus
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Label>Kategori:</Label>
                    <Select onValueChange={(val) => setSelectedCategory(val)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Semua Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kategori</SelectItem>
                            {categories.map(cat => (
                                <SelectItem key={cat.id} value={cat.id}>{(cat.name.charAt(0).toUpperCase() + cat.name.slice(1))}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-2">
                    <Button asChild variant="outline">
                        <Link href="/dashboard/informasi/category/new">+ Tambah Kategori</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard/informasi/new">+ Tambah Informasi</Link>
                    </Button>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Judul</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((item, index) => (
                            <>
                                <TableRow
                                    key={item.id}
                                    onMouseEnter={() => setHoveredRow(index)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    className={`transition ${hoveredRow === index && !isMobile ? "border-b-0 bg-muted/50" : ""}`}
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <Link href={`/informasi/${item.category.name}/${item.slug}`} className="hover:underline">
                                                {item.title}
                                            </Link>
                                            <span className="text-xs text-muted-foreground">{item.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.category.name}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                item.status === "Published"
                                                    ? "default"
                                                    : item.status === "Draft"
                                                        ? "secondary"
                                                        : "outline"
                                            }
                                        >
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {isMobile && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild className="cursor-pointer">
                                                        <Link href={`/dashboard/informasi/edit/${item.slug}`}>Edit</Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        disabled={statusLoading === item.id}
                                                        onClick={() => toggleStatus(item.id, item.status)}
                                                    >
                                                        {statusLoading === item.id
                                                            ? "Updating..."
                                                            : item.status === "Draft"
                                                                ? "Publish"
                                                                : "Draftkan"}
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-destructive cursor-pointer"
                                                    >
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}

                                    </TableCell>
                                </TableRow>

                                {!isMobile && hoveredRow === index && (
                                    <TableRow
                                        className="bg-muted/50"
                                        onMouseEnter={() => setHoveredRow(index)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                    >
                                        <TableCell colSpan={4} className="pt-0 pb-4 px-4 border-t-0">
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/dashboard/informasi/edit/${item.slug}`}>Edit</Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={statusLoading === item.id}
                                                    onClick={() => toggleStatus(item.id, item.status)}
                                                >
                                                    {statusLoading === item.id ? "Updating..." : item.status === "Draft" ? "Publish" : "Draftkan"}
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
