"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function EditDatabasePage() {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState({ name: "", link: "", description: "" })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/database/${id}`)
      const json = await res.json()
      setForm(json.data)
      setLoading(false)
    }

    if (id) fetchData()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/database/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Gagal memperbarui data")

      router.push("/dashboard/database")
    } catch (err) {
      alert("Gagal memperbarui data")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold">Edit Database</h1>

      <Label>Nama</Label>
      <Input name="name" value={form.name} onChange={handleChange} />

      <Label>Link Google Form</Label>
      <Input name="link" value={form.link} onChange={handleChange} />

      <Label>Deskripsi</Label>
      <Textarea name="description" value={form.description} onChange={handleChange} />

      <Button onClick={handleSubmit} disabled={saving}>
        {saving ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </div>
  )
}
