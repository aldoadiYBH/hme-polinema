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
    // CardDescription,
    // CardFooter,
    // CardHeader,
    // CardTitle,
} from "@/components/ui/card"

export default function InformasiSection() {
    return (
        <div className="w-full px-4">
            <Carousel
                opts={{
                    align: "start",
                    loop: true
                }}
            >
                <CarouselContent>
                    <CarouselItem className="md:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="w-full h-full">
                                    <p>Pemilihan Ketua Kelas</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="w-full h-full">
                                    <p>Pemilihan Ketua Kelas</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="w-full h-full">
                                    <p>Pemilihan Ketua Kelas</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="w-full h-full">
                                    <p>Pemilihan Ketua Kelas</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}