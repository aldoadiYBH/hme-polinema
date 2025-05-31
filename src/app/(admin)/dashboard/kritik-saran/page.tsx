"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function KritikSaranAdminPage() {
  const [kritik, setKritik] = useState("")
  const [aspirasi, setAspirasi] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/kritik-saran")
        const data = await res.json()
        setKritik(data.kiritikSaranLink || "")
        setAspirasi(data.aspirasiLink || "")
      } catch (err) {
        console.error("Failed to fetch links:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)

    try {
      const res = await fetch("/api/kritik-saran", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kiritikSaranLink: kritik, aspirasiLink: aspirasi }),
      })

      if (!res.ok) throw new Error("Gagal update")
      setSuccess(true)
    } catch (err) {
      console.error(err)
      alert("Gagal menyimpan data.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-bold">Edit Link Kritik & Saran</h1>

      {loading ? (
        <div className="space-y-4">
          <div>
            <Label>Kritik & Saran Link</Label>
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Label>Aspirasi Link</Label>
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Kritik & Saran Link</Label>
            <Input
              value={kritik}
              onChange={(e) => setKritik(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Aspirasi Link</Label>
            <Input
              value={aspirasi}
              onChange={(e) => setAspirasi(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan"}
          </Button>
          {success && <p className="text-green-600">Tersimpan!</p>}
        </form>
      )}
    </div>
  )
}
