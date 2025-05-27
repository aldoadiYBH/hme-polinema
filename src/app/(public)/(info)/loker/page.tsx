import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import Banner from "../_components/banner";

const announcements = [
    {
        title: "Judul loker 1",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, delectus!",
        date: "24 Mei 2025",
        image: "/assets/placeholder.jpg",
        slug: "loker-1"
    },
    {
        title: "Judul loker 2",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, delectus!",
        date: "22 Mei 2025",
        image: "/assets/placeholder.jpg",
        slug: "loker-2"
    },
    {
        title: "Judul loker 3",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, delectus!",
        date: "20 Mei 2025",
        image: "/assets/placeholder.jpg",
        slug: "loker-3"
    },
];

export default function LokerPage() {
    return (
        <div>
            <Banner text="Lowongan Kerja" />

            <section className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {announcements.map((item, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                            <CardHeader>
                                <CardTitle className="text-xl underline">
                                    <a href={`/loker/${item.slug}`}>{item.title}</a>
                                </CardTitle>
                                <CardDescription>{item.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
