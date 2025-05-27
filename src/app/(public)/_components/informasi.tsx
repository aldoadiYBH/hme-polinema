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

const prokers = [
    {
        title: "Open Recruitment Staff Ahli",
        slug: "program-1-ss",
    },
    {
        title: "Workshop Desain Elektronika",
        slug: "program-fffs",
    },
    {
        title: "Kegiatan Bakti Sosial",
        slug: "program-s",
    },
];

export default function InformasiSection() {
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
                    {prokers.map((item, index) => (
                        <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
                            <div className="p-1">
                                <a href={`/program-kerja/${item.slug}`}>
                                    <Card className="hover:shadow-md transition">
                                        <CardContent className="p-4">
                                            <p className="font-semibold">{item.title}</p>
                                        </CardContent>
                                    </Card>
                                </a>
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
