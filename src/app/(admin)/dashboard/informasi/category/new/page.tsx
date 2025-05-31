"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function CreateCategoryPage() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Nama kategori tidak boleh kosong")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/informasi/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name.trim() })
      })

      const data = await res.json()

      if (!res.ok) {
        alert("Gagal menyimpan: " + (data?.error || "Unknown error"))
        return
      }

      alert("Kategori berhasil ditambahkan!")
      router.push("/dashboard/informasi")
    } catch (err) {
      console.error("Error submitting category", err)
      alert("Terjadi kesalahan saat mengirim data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 space-y-4 max-w-md">
      <div>
        <h1 className="text-2xl font-bold">Tambah Kategori</h1>
        <p className="text-sm text-muted-foreground">
          Buat kategori baru untuk Informasi
        </p>
      </div>

      <div>
        <Label htmlFor="name" className="text-sm font-medium">Nama Kategori</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Beasiswa"
        />
      </div>

      <Button type="button" onClick={handleSubmit} disabled={loading} className="mt-2">
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  )
}
