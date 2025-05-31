"use client";

import { useParams } from "next/navigation";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const posts = [
    {
        id: 1,
        images: ["/assets/galery/post-1.jpg", "/assets/galery/post-2.jpg"],
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti a commodi, voluptates quam, in nam nemo mollitia ipsa animi iste ratione soluta quae delectus, corrupti sit autem laborum maxime suscipit?",
        comments: ["Keren!", "Sukses selalu HME!"],
    },
    {
        id: 3,
        images: ["/assets/galery/post-1.jpg", "/assets/galery/post-2.jpg"],
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti a commodi, voluptates quam, in nam nemo mollitia ipsa animi iste ratione soluta quae delectus, corrupti sit autem laborum maxime suscipit?",
        comments: ["Keren!", "Sukses selalu HME!"],
    },
    {
        id: 4,
        images: ["/assets/galery/post-1.jpg", "/assets/galery/post-2.jpg"],
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti a commodi, voluptates quam, in nam nemo mollitia ipsa animi iste ratione soluta quae delectus, corrupti sit autem laborum maxime suscipit?",
        comments: ["Keren!", "Sukses selalu HME!"],
    },
    {
        id: 2,
        images: ["/assets/galery/post-3.jpg"],
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti a commodi, voluptates quam, in nam nemo mollitia ipsa animi iste ratione soluta quae delectus, corrupti sit autem laborum maxime suscipit?",
        comments: ["MasyaAllah", "Mantap banget!"],
    },
];

export default function PostDetailPage() {
  const { galeryId } = useParams();
  const post = posts.find((p) => p.id === Number(galeryId));
  const [newComment, setNewComment] = useState("");

  if (!post) return <p className="text-center mt-10">Postingan tidak ditemukan.</p>;

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Tautan berhasil disalin!");
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    post.comments.push(newComment);
    setNewComment("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT - Image(s) */}
      <div className="w-full">
        {post.images.length > 1 ? (
          <Carousel>
            <CarouselContent>
              {post.images.map((img, i) => (
                <CarouselItem key={i}>
                  <Image
                    src={img}
                    alt="Post"
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

      {/* RIGHT - Description & Comments */}
      <div className="flex flex-col justify-between space-y-6">
        <div>
          <p className="text-sm mb-4">{post.description}</p>

          <Separator className="mb-3"/>
          <div>
            <ul className="space-y-2 text-sm">
              {post.comments.map((c, i) => (
                <li key={i} className="py-1">{c}</li>
              ))}
            </ul>
          </div>
        </div>

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
  );
}
