"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function EditPengurusPage() {
  const { pengurusId } = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    fullname: "",
    jabatan: "",
    ttl: "",
    nim: "",
    prodi: "",
    socialLink: "",
    photo: "",
  })

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/pengurus/${pengurusId}`)
      const json = await res.json()
      setForm(json.data)
      setPhotoPreview(json.data.photo ? `/uploads/${json.data.photo}` : null)
      setLoading(false)
    }

    if (pengurusId) fetchData()
  }, [pengurusId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const uploadPhoto = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    if (!res.ok || !data.filename) throw new Error("Upload failed")
    return data.filename
  }

  const handleSubmit = async () => {
    let photoUrl = form.photo

    if (photoFile) {
      try {
        photoUrl = await uploadPhoto(photoFile)
      } catch (err) {
        console.error(err)
        alert("Gagal mengunggah foto")
        return
      }
    }

    const res = await fetch(`/api/pengurus/${pengurusId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, photo: photoUrl }),
    })

    if (res.ok) {
      router.push("/dashboard/pengurus")
    } else {
      alert("Gagal memperbarui data")
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="space-y-4 max-w-lg">
      <h1 className="text-2xl font-bold">Edit Pengurus</h1>

      {[
        { name: "Nama", field: "fullname" },
        { name: "Jabatan", field: "jabatan" },
        { name: "TTL", field: "ttl" },
        { name: "NIM", field: "nim" },
        { name: "Prodi", field: "prodi" },
        { name: "Social Media Link", field: "socialLink" },
      ].map((field) => (
        <div key={field.field}>
          <Label className="capitalize">{field.name}</Label>
          <Input
            name={field.field}
            value={form[field.field as keyof typeof form]}
            onChange={handleChange}
          />
        </div>
      ))}

      <div>
        <Label className="text-sm font-medium">Foto (Opsional)</Label>
        <Input type="file" accept="image/*" onChange={handlePhotoChange} />
        {photoPreview && (
          <Image
            src={photoPreview}
            alt="Preview"
            width={150}
            height={150}
            className="mt-2 rounded border object-cover"
          />
        )}
      </div>

      <Button onClick={handleSubmit}>Simpan Perubahan</Button>
    </div>
  )
}
