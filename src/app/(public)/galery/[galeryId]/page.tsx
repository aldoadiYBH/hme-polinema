"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Share2, Trash } from "lucide-react"
import { useSession } from "next-auth/react"

interface GaleryPost {
  id: string
  caption: string
  images: string[]
  comments: string[]
}

export default function PostDetailPage() {
  const { data: session } = useSession()
  const { galeryId } = useParams()
  const [post, setPost] = useState<GaleryPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/galery/${galeryId}`)
        const json = await res.json()
        if (json.success) {
          setPost({
            ...json.data,
            images: json.data.images || [],
            comments: json.data.comments || [],
          })
        }
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat galeri")
      } finally {
        setLoading(false)
      }
    }

    if (galeryId) fetchPost()
  }, [galeryId])

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast.success("Tautan berhasil disalin!")
  }

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !post) return

    const updatedComments = [...post.comments, newComment]

    try {
      const res = await fetch(`/api/galery/${galeryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: updatedComments }),
      })

      if (res.ok) {
        setPost({ ...post, comments: updatedComments })
        setNewComment("")
      } else {
        toast.error("Gagal menambahkan komentar")
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan")
    }
  }

  const handleDeleteComment = async (index: number) => {
    if (!post) return

    const updatedComments = [...post.comments]
    updatedComments.splice(index, 1)

    try {
      const res = await fetch(`/api/galery/${galeryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: updatedComments }),
      })

      if (res.ok) {
        setPost({ ...post, comments: updatedComments })
        toast.success("Komentar dihapus")
      } else {
        toast.error("Gagal menghapus komentar")
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan")
    }
  }

  if (loading) return <p className="text-center py-10">Memuat...</p>
  if (!post) return <p className="text-center py-10">Postingan tidak ditemukan.</p>

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Images */}
      <div className="w-full">
        {post.images.length > 1 ? (
          <Carousel>
            <CarouselContent>
              {post.images.map((img, i) => (
                <CarouselItem key={i}>
                  <Image
                    src={img}
                    alt={`Post Image ${i + 1}`}
                    width={600}
                    height={600}
                    className="w-full aspect-square object-contain rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <Image
            src={post.images[0]}
            alt="Post"
            width={600}
            height={600}
            className="w-full aspect-square object-contain rounded-lg"
          />
        )}
      </div>

      {/* Caption & Comments */}
      <div className="flex flex-col justify-between space-y-6">
        <div>
          <p className="text-sm mb-4">{post.caption}</p>

          <Separator className="mb-3" />
          <ul className="space-y-2 text-sm">
            {post.comments.map((comment, index) => (
              <li
                key={index}
                className="flex justify-between items-center group hover:bg-muted px-2 py-1 rounded"
              >
                <span>{comment}</span>
                {session?.user && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteComment(index)}
                    className="invisible group-hover:visible text-red-500"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Comment Form */}
        <div className="space-y-2">
          <Textarea
            placeholder="Tulis komentar..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <Button onClick={handleCommentSubmit}>Kirim</Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
