"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
    "/assets/banner/banner-1.jpg",
    "/assets/banner/banner-2.jpg",
    "/assets/banner/banner-3.jpg",
    "/assets/banner/banner-4.jpg",
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
                            <img src={img} alt={`banner ${index + 1}`} className="w-full h-[250px] md:h-[450px] object-fill md:rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}