/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter} from 'next/navigation'
import { useParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Editor = dynamic(() => import('@/components/editor/editor'), { ssr: false })

export default function EditProgramKerjaPage() {
  const titleRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { slug } = useParams() as { slug: string }

  const [loading, setLoading] = useState(true)
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [editorData, setEditorData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/program-kerja/${slug}`)
        const json = await res.json()

        if (!res.ok || !json.data) {
          alert('Data tidak ditemukan')
          router.push('/dashboard/program-kerja')
          return
        }

        if (titleRef.current) {
          titleRef.current.value = json.data.title
        }

        setThumbnail(json.data.thumbnail)
        setThumbnailPreview(json.data.thumbnail)
        setEditorData(json.data.content)
      } catch (error) {
        console.error('Failed to fetch post', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchData()
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
    formData.append('image', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    if (!res.ok || !data.file?.url) {
      throw new Error('Upload failed')
    }

    return data.file.url
  }

  const handleSubmit = async () => {
    const title = titleRef.current?.value?.trim()
    if (!title) {
      alert('Judul tidak boleh kosong')
      return
    }

    const editorInstance = (window as any).editorInstance as import('@editorjs/editorjs').default
    if (!editorInstance) {
      alert('Editor belum siap')
      return
    }

    const content = await editorInstance.save()

    let thumbnailUrl = thumbnail
    if (thumbnailFile) {
      try {
        thumbnailUrl = await uploadImage(thumbnailFile)
      } catch (err) {
        console.error(err)
        alert('Gagal mengunggah thumbnail')
        return
      }
    }

    const res = await fetch(`/api/program-kerja/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        thumbnail: thumbnailUrl
      })
    })

    if (res.ok) {
      alert('Berhasil diperbarui!')
      router.push('/dashboard/program-kerja')
    } else {
      const err = await res.json()
      alert('Gagal menyimpan: ' + err.error)
    }
  }

  if (loading) return <p className="text-center py-10">Loading...</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Program Kerja</h1>
        <p className="text-sm text-muted-foreground">Ubah program kerja yang sudah dibuat</p>
      </div>

      <div className="space-y-4">
        <Input ref={titleRef} placeholder="Judul program kerja" className="text-lg" />

        <div>
          <label className="text-sm font-medium">Thumbnail (Opsional)</label>
          <Input type="file" accept="image/*" onChange={handleThumbnailChange} className="cursor-pointer" />
          {thumbnailPreview && (
            <Image
              src={`/uploads/${thumbnailPreview}`}
              alt="Thumbnail Preview"
              width={300}
              height={200}
              className="mt-2 rounded border"
            />
          )}
        </div>

        {editorData ? <Editor placeholder="Ubah isi konten..." data={editorData} /> : <p>Loading editor...</p>}

        <Button onClick={handleSubmit} className="mt-4 cursor-pointer">
          Simpan Perubahan
        </Button>
      </div>
    </div>
  )
}
