"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Database {
  id: string
  name: string
  link: string
  description: string
}

export default function DatabaseDashboardPage() {
  const [data, setData] = useState<Database[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/database")
        const json = await res.json()
        setData(json.data || [])
      } catch (err) {
        console.error("Failed to fetch data:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p className="py-10 text-center">Loading...</p>

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Yakin ingin menghapus data ini?")
    if (!confirm) return

    try {
      await fetch(`/api/database/${id}`, { method: "DELETE" })
      setData(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      alert("Gagal menghapus data")
      console.error(error)
    }
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar Database</h1>
        <Button asChild>
          <Link href="/dashboard/database/new">+ Tambah Database</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={item.link} target="_blank">Buka</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href={`/dashboard/database/edit/${item.id}`}>Edit</Link>
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
