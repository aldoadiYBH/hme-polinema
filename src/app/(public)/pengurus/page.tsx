"use client";

import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Pengurus {
  id: string;
  fullname: string;
  jabatan: string;
  ttl: string;
  nim: string;
  prodi: string;
  socialLink: string;
  photo?: string | null;
}

export default function PengurusHarianPage() {
  const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));
  const [members, setMembers] = useState<Pengurus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/pengurus");
        const json = await res.json();
        setMembers(json.data || []);
      } catch (err) {
        console.error("Failed to fetch pengurus:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <section className="py-12 bg-background">
      <h2 className="text-3xl font-bold text-center mb-8">Pengurus Harian</h2>
      <Separator />
      {loading ? (
        <p className="text-center py-6">Loading...</p>
      ) : (
        <Carousel
          opts={{ align: "center", loop: true }}
          plugins={[plugin.current]}
          className="max-w-4xl mx-auto"
        >
          <CarouselContent>
            {members.map((member) => (
              <CarouselItem key={member.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square w-full relative">
                    <Image
                      src={member.photo ? `/uploads/${member.photo}` : "/assets/placeholder.jpg"}
                      alt={member.fullname}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold">{member.fullname}</h3>
                    <p className="text-muted-foreground">{member.jabatan}</p>
                    <div className="mt-2 text-sm text-muted-foreground space-y-1">
                      <p><strong>TTL:</strong> {member.ttl}</p>
                      <p><strong>NIM:</strong> {member.nim}</p>
                      <p><strong>Prodi:</strong> {member.prodi}</p>
                    </div>
                    {member.socialLink && (
                      <a
                        href={member.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-blue-500 hover:underline text-sm"
                      >
                        {member.socialLink}
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
      )}
    </section>
  );
}
