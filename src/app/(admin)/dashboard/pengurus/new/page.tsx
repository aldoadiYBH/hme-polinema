"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function NewPengurusPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        fullname: "",
        jabatan: "",
        ttl: "",
        nim: "",
        prodi: "",
        socialLink: "",
        photo: "",
    });

    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)

    const uploadPhoto = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        if (!res.ok || !data.filename) throw new Error("Upload failed")
        return data.filename
    }


    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPhotoFile(file)
            setPhotoPreview(URL.createObjectURL(file))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleSubmit = async () => {
        setLoading(true)

        try {
            let photoUrl: string | null = null
            if (photoFile) {
                try {
                    photoUrl = await uploadPhoto(photoFile)
                } catch (err) {
                    console.error(err)
                    alert("Gagal mengunggah foto")
                    return
                }
            }

            const res = await fetch("/api/pengurus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    photo: photoUrl,
                }),
            })

            if (!res.ok) throw new Error("Gagal menyimpan")

            router.push("/dashboard/pengurus")
        } catch (err) {
            console.error(err)
            alert("Gagal menyimpan data")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="space-y-4 max-w-lg">
            <h1 className="text-2xl font-bold">Tambah Pengurus</h1>
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
                    <Input name={field.field} value={form[field.field as keyof typeof form]} onChange={handleChange} />
                </div>
            ))}
            <label className="text-sm font-medium">Foto (Opsional)</label>
            <Input type="file" accept="image/*" onChange={handlePhotoChange} />
            {photoPreview && (
                <Image
                    src={photoPreview}
                    alt="Foto Preview"
                    width={150}
                    height={150}
                    className="mt-2 rounded border object-cover"
                />
            )}
            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
            </Button>
        </div>
    )
}
