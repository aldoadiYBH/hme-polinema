/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false })

interface Category {
  id: string
  name: string
}

const generateSlug = (text: string) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

export default function CreateInformasiPage() {
  const titleRef = useRef<HTMLInputElement>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/informasi/category")
        const data = await res.json()
        if (res.ok) setCategories(data.data || [])
        else console.error("Failed to fetch categories:", data.error)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    if (!res.ok || !data.filename) {
      throw new Error("Upload failed")
    }

    return data.filename
  }

  const handleSubmit = async () => {
    const title = titleRef.current?.value?.trim()
    if (!title) return alert("Judul tidak boleh kosong")
    if (!selectedCategory) return alert("Pilih kategori terlebih dahulu")

    setLoading(true)

    const editorInstance = (window as any).editorInstance as import("@editorjs/editorjs").default
    if (!editorInstance) {
      alert("Editor belum siap")
      return
    }

    const content = await editorInstance.save()
    const baseSlug = generateSlug(title!)
    let slug = baseSlug
    let attempt = 1

    while (true) {
      const check = await fetch(`/api/informasi?slug=${slug}`)
      const data = await check.json()
      if (!check.ok || !data.data) break
      const suffix = Math.random().toString(36).substring(2, 5)
      slug = `${baseSlug}-${suffix}-${attempt++}`
    }

    let thumbnailUrl: string | null = null
    if (thumbnailFile) {
      try {
        thumbnailUrl = await uploadImage(thumbnailFile)
      } catch (err) {
        console.error(err)
        alert("Gagal mengunggah thumbnail")
        return
      }
    }

    try {
      const res = await fetch("/api/informasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          content,
          thumbnail: thumbnailUrl,
          categoryId: selectedCategory,
        }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || "Unknown error")

      alert("Informasi berhasil dibuat!")
      router.push("/dashboard/informasi")
    } catch (error) {
      console.error("Failed to save:", error)
      alert("Gagal menyimpan informasi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Tambah Informasi</h1>
        <p className="text-sm text-muted-foreground">
          Buat postingan informasi untuk halaman publik
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Judul</Label>
          <Input ref={titleRef} placeholder="Judul informasi" />
        </div>

        <div>
          <Label>Thumbnail (Opsional)</Label>
          <Input type="file" accept="image/*" onChange={handleThumbnailChange} />
          {thumbnailPreview && (
            <Image
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              width={300}
              height={200}
              className="mt-2 rounded border"
            />
          )}
        </div>

        <div>
          <Label>Kategori</Label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <Editor placeholder="Tulis isi konten di sini..." />

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </div>
  )
}
