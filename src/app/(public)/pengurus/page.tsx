"use client";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const members = [
    {
        name: "Nama",
        role: "Ketua Umum",
        image: "/assets/user-profile/user-profile-placeholder.jpg",
        ttl: "Malang, 5 Januari 2002",
        nim: "2241720001",
        prodi: "D4 Teknik Elektronika",
        instagram: "https://instagram.com/budi.santoso",
    },
    {
        name: "Nama",
        role: "Wakil Ketua",
        image: "/assets/user-profile/user-profile-placeholder.jpg",
        ttl: "Surabaya, 17 Maret 2002",
        nim: "2241720002",
        prodi: "D3 Teknik Listrik",
        instagram: "https://instagram.com/siti.rahma",
    },
    {
        name: "Nama",
        role: "Sekretaris",
        image: "/assets/user-profile/user-profile-placeholder.jpg",
        ttl: "Kediri, 12 Juni 2001",
        nim: "2241720003",
        prodi: "D4 Teknik Elektronika",
        instagram: "https://instagram.com/budi.santoso",
    },
    {
        name: "Nama",
        role: "Bendahara",
        image: "/assets/user-profile/user-profile-placeholder.jpg",
        ttl: "Blitar, 22 Februari 2002",
        nim: "2241720004",
        prodi: "D3 Teknik Elektronika",
        instagram: "https://instagram.com/andi.prasetyo",
    },
];

export default function PengurusHarianPage() {
    const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));

    return (
        <section className="py-12 bg-background">
            <h2 className="text-3xl font-bold text-center mb-8">Pengurus Harian</h2>
            <Separator />
            <Carousel
                opts={{
                    align: "center",
                    loop: true,
                }}
                plugins={[plugin.current]}
                className="max-w-4xl mx-auto"
            >
                <CarouselContent>
                    {members.map((member, idx) => (
                        <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="aspect-square w-full relative">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="text-xl font-semibold">{member.name}</h3>
                                    <p className="text-muted-foreground">{member.role}</p>
                                    <div className="mt-2 text-sm text-muted-foreground space-y-1">
                                        <p><strong>TTL:</strong> {member.ttl}</p>
                                        <p><strong>NIM:</strong> {member.nim}</p>
                                        <p><strong>Prodi:</strong> {member.prodi}</p>
                                    </div>
                                    {member.instagram && (
                                        <a
                                            href={member.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-3 text-blue-500 hover:underline text-sm"
                                        >
                                            Instagram ↗
                                        </a>
                                    )}
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:-left-6" />
                <CarouselNext className="right-2 md:-right-6" />
            </Carousel>
        </section>
    );
}
