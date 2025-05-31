"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function NewDatabasePage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", link: "", description: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Gagal menyimpan")

      router.push("/dashboard/database")
    } catch (err) {
      alert("Gagal menyimpan data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold">Tambah Database</h1>

      <Label>Nama</Label>
      <Input name="name" value={form.name} onChange={handleChange} />

      <Label>Link Google Form</Label>
      <Input name="link" value={form.link} onChange={handleChange} placeholder="https://docs.google.com/forms/..." />

      <Label>Deskripsi</Label>
      <Textarea name="description" value={form.description} onChange={handleChange} />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  )
}
