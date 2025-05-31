/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import Banner from "./_components/banner";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function InformasiPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  if (!await prisma.category.findFirst({where: {name: category}})){
    return notFound();
  }

  const data = await prisma.informasi.findMany({
    where: {
      category: {
        name: category
      },
      status: "Published"
    },
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div>
      <Banner text={category.charAt(0).toUpperCase() + category.slice(1)} />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => {
            let parsedContent: any = null;

            try {
              parsedContent = typeof item.content === "string" ? JSON.parse(item.content) : item.content;
            } catch (error) {
              console.error("Failed to parse content JSON", error);
            }

            return (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={item.thumbnail ? `/uploads/${item.thumbnail}` : "/assets/placeholder.jpg"}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-xl underline">
                    <Link href={`/informasi/${category}/${item.slug}`}>{item.title}</Link>
                  </CardTitle>
                  <CardDescription>
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {parsedContent?.blocks?.[0]?.data?.text || ""}
                  </p>
                </CardContent>
              </Card>
            );
          })}

        </div>
      </section>
    </div>
  );
}
