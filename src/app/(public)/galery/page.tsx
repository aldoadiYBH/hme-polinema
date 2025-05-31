"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Share2 } from "lucide-react"
import Link from "next/link"

interface GaleryPost {
  id: string
  caption: string
  images: string[] // stored as JSON
  comments?: string[]
}

export default function GaleriPage() {
  const [posts, setPosts] = useState<GaleryPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/galery")
        const json = await res.json()
        if (json.success) {
          setPosts(json.data)
        }
      } catch (err) {
        console.error("Failed to fetch galery:", err)
        toast.error("Gagal memuat galeri")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleShare = (id: string) => {
    const shareUrl = `${window.location.origin}/galery#post-${id}`
    navigator.clipboard.writeText(shareUrl)
    toast.success("Tautan berhasil disalin!")
  }

  if (loading) return <p className="text-center py-10">Memuat galeri...</p>

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
      {posts.map((post) => (
        <Card key={post.id} id={`post-${post.id}`} className="overflow-hidden pt-0 flex flex-col justify-between hover:shadow-md transition">
          <CardContent className="p-0">
            <Image
              src={post.images[0] || "/placeholder.jpg"}
              alt="gallery"
              width={600}
              height={600}
              className="w-full aspect-square object-cover"
            />
          </CardContent>

          <div className="p-4 space-y-3">
            <p className="text-sm">{post.caption}</p>

            <div className="space-y-2 text-sm flex flex-col">
              <Link href={`/galery/${post.id}`} className="text-muted-foreground">View all comments</Link>
              <Button size="icon" variant="ghost" onClick={() => handleShare(post.id)}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <CardFooter />
        </Card>
      ))}
    </div>
  )
}
