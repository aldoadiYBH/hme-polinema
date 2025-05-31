/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProgramKerja {
    title: string
    slug: string
    content: any
    createdAt: string
    thumbnail?: string
    status?: string
}

export default function ProgramKerjaSection() {
    const [data, setData] = useState<ProgramKerja[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/program-kerja")
                const json = await res.json()
                const published = json.data?.filter((item: ProgramKerja) => item.status === "Published")
                setData(published || [])
                console.log(json);
            } catch (error) {
                console.error("Failed to fetch program kerja:", error)
            }
        }

        fetchData()
    }, [])
    return (
        <div className="">
            <Carousel
                className="relative"
                opts={{
                    align: "start",
                    loop: true
                }}
            >
                <CarouselContent>
                    {data.map((item, index) => (
                        <CarouselItem key={index} className={cn("basis-full", data.length > 3 ? "sm:basis-1/2 md:basis-1/3" : "")}>
                            <div className="p-1">
                                <Link href={`/program-kerja/${item.slug}`}>
                                    <Card className="hover:shadow-md transition">
                                        <CardContent className="p-4">
                                            <p className="font-semibold">{item.title}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
