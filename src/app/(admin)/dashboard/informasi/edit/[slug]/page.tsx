/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from "next/dynamic"
import Image from "next/image"

const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false })

export default function EditInformasiPage() {
  const { slug } = useParams() as { slug: string }
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [editorData, setEditorData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [infoRes, catRes] = await Promise.all([
          fetch(`/api/informasi/${slug}`),
          fetch(`/api/informasi/category`),
        ])
        const infoJson = await infoRes.json()
        const catJson = await catRes.json()

        if (!infoJson?.data) {
          alert("Informasi tidak ditemukan")
          router.push("/dashboard/informasi")
          return
        }

        const informasi = infoJson.data

        setTitle(informasi.title)

        setThumbnail(informasi.thumbnail || null)
        setThumbnailPreview(informasi.thumbnail || null)
        setCategoryId(informasi.categoryId)
        setEditorData(informasi.content)
        setCategories(catJson?.data || [])
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchInitialData()
  }, [slug, router])

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
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !categoryId) {
      alert("Judul dan kategori wajib diisi");
      return;
    }
    if (!title || !categoryId) {
      alert("Judul dan kategori wajib diisi")
      return
    }

    const editorInstance = (window as any).editorInstance as import("@editorjs/editorjs").default
    if (!editorInstance) {
      alert("Editor belum siap")
      return
    }

    const content = await editorInstance.save()

    let thumbnailUrl = thumbnail
    if (thumbnailFile) {
      try {
        thumbnailUrl = await uploadImage(thumbnailFile)
      } catch (err) {
        console.error(err)
        alert("Gagal mengunggah thumbnail")
        return
      }
    }

    const res = await fetch(`/api/informasi/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: trimmedTitle,
        content,
        thumbnail: thumbnailUrl,
        categoryId,
      }),
    })

    const result = await res.json()
    if (res.ok) {
      alert("Berhasil diperbarui!")
      router.push("/dashboard/informasi")
    } else {
      alert("Gagal menyimpan: " + result.error)
    }
  }

  if (loading) return <p className="text-center py-10">Loading...</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Informasi</h1>
        <p className="text-sm text-muted-foreground">Perbarui data informasi</p>
      </div>

      <div className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul informasi"
          className="text-lg"
        />
        <div>
          <Label className="text-sm font-medium">Thumbnail (Opsional)</Label>
          <Input type="file" accept="image/*" onChange={handleThumbnailChange} className="cursor-pointer" />
          {thumbnailPreview ? (
            <Image
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              width={300}
              height={200}
              className="mt-2 rounded border"
            />
          ) : thumbnail ? (
            <Image
              src={`/uploads/${thumbnail}`}
              alt="Thumbnail Preview"
              width={300}
              height={200}
              className="mt-2 rounded border"
            />
          ) : null}

        </div>

        <div>
          <Label className="text-sm font-medium mb-2">Kategori</Label>
          <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {editorData ? (
          <Editor placeholder="Ubah isi konten..." data={editorData} />
        ) : (
          <p>Loading editor...</p>
        )}

        <Button onClick={handleSubmit} className="mt-4 cursor-pointer">
          Simpan Perubahan
        </Button>
      </div>
    </div>
  )
}
