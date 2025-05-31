"use client"

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Share2 } from "lucide-react";
import Link from "next/link";


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

export default function GaleriPage() {

    const handleShare = (id: number) => {
        const shareUrl = `${window.location.origin}/galeri#post-${id}`;
        navigator.clipboard.writeText(shareUrl);
        toast.success("Tautan berhasil disalin!");
    };

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
            {posts.map((post) => (
                // <Link href={`/galery/${post.id}`} key={post.id}>
                <Card key={post.id} id={`post-${post.id}`} className="overflow-hidden pt-0 flex flex-col justify-between hover:shadow-md transition">
                    <CardContent className="p-0">
                        <Image src={post.images[0]} alt="gallery" width={600} height={600} className="w-full aspect-square object-cover" />
                    </CardContent>

                    <div className="p-4 space-y-3">
                        <p className="text-sm">{post.description}</p>

                        <div className="space-y-2 text-sm flex flex-col">
                            <Link href={`/galery/${post.id}`} key={post.id} className="text-muted-foreground">View all comments</Link>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleShare(post.id)}
                            >
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <CardFooter />
                </Card>
                // </Link>

            ))}
        </div>
    );
}
