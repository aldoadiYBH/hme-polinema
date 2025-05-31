"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { useMediaQuery } from "@/lib/use-media-query"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Informasi {
    id: number
    title: string
    slug: string
    status: "Draft" | "Published"
}

export default function InformasiTable() {
    const isMobile = useMediaQuery("(max-width: 768px)")
    const [hoveredRow, setHoveredRow] = useState<number | null>(null)
    const [data, setData] = useState<Informasi[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/program-data");
                const json = await res.json();
                setData(json.data || [])
            } catch (err) {
                console.error("Failed to fetch Informasi:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, []);

    const [statusLoading, setStatusLoading] = useState<number | null>(null)

    const toggleStatus = async (id: number, currentStatus: "Draft" | "Published") => {
        const newStatus = currentStatus === "Draft" ? "Published" : "Draft"
        setStatusLoading(id)
        try {
            const res = await fetch(`/api/informasi`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            })

            if (!res.ok) throw new Error("Failed to update status")

            setData(prev =>
                prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
            )
        } catch (err) {
            alert("Error updating status")
            console.error(err)
        } finally {
            setStatusLoading(null)
        }
    }



    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((item, index) => (
                    <>
                        <TableRow
                            key={item.id}
                            onMouseEnter={() => setHoveredRow(index)}
                            onMouseLeave={() => setHoveredRow(null)}
                            className={`transition ${hoveredRow === index && !isMobile ? "border-b-0 bg-muted/50" : ""}`}
                        >
                            <TableCell className="font-medium">
                                <div className="flex flex-col">
                                    <Link href={`/informasi/${item.slug}`} className="hover:underline">
                                        {item.title}
                                    </Link>
                                    <span className="text-xs text-muted-foreground">{item.slug}</span>
                                </div>
                            </TableCell>
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
                                            <DropdownMenuItem onClick={() => alert("Hapus logic")} className="cursor-pointer">
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
                                <TableCell colSpan={3} className="pt-0 pb-4 px-4 border-t-0">
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/dashboard/informasi/edit/${item.slug}`}>Edit</Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="cursor-pointer"
                                            size="sm"
                                            disabled={statusLoading === item.id}
                                            onClick={() => toggleStatus(item.id, item.status)}
                                        >
                                            {statusLoading === item.id ? "Updating..." : item.status === "Draft" ? "Publish" : "Draft"}
                                        </Button>
                                        <Button variant="destructive" className="cursor-pointer" size="sm" onClick={() => alert("Hapus logic")}>
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
    )
}
