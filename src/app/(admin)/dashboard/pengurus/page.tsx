// app/(admin)/dashboard/pengurus/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Link from "next/link"

interface Pengurus {
  id: string
  fullname: string
  jabatan: string
  nim: string
  prodi: string
}

export default function PengurusDashboard() {
  const [data, setData] = useState<Pengurus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/pengurus")
      .then(res => res.json())
      .then(json => setData(json.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Yakin ingin menghapus data ini?")
    if (!confirm) return

    try {
      await fetch(`/api/pengurus/${id}`, { method: "DELETE" })
      setData(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      alert("Gagal menghapus data")
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pengurus</h1>
        <Button asChild>
          <Link href="/dashboard/pengurus/new">+ Tambah Pengurus</Link>
        </Button>
      </div>

      <div className="border rounded-md overflow-x-auto">
        {loading ? (
          <p className="p-4 text-center">Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>NIM</TableHead>
                <TableHead>Prodi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.fullname}</TableCell>
                  <TableCell>{item.jabatan}</TableCell>
                  <TableCell>{item.nim}</TableCell>
                  <TableCell>{item.prodi}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/pengurus/edit/${item.id}`}>Edit</Link>
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
