"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
    "https://picsum.photos/id/1015/1600/600",
    "https://picsum.photos/id/1003/1600/600",
    "https://picsum.photos/id/1039/1600/600",
];

export default function BannerSection() {

    return (
        <div className="max-w-6xl mx-auto">
            <Carousel opts={{
                align: "start",
                loop: true
            }}
                plugins={[
                    Autoplay({
                        delay:5000
                    })
                ]}
            >
                <CarouselContent>
                    {images.map((img, index) => (
                        <CarouselItem key={index}>
                            <img src={img} alt={`banner ${index + 1}`} className="w-full h-[250px] md:h-[400px] object-cover md:rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}