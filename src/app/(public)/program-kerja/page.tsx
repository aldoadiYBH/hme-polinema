/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import Banner from "./_components/banner"
import Link from "next/link"

interface ProgramKerja {
  title: string
  slug: string
  content: any
  createdAt: string
  thumbnail?: string
  status?: string
}

export default function ProgramKerjaPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/program-kerja")
        const json = await res.json()
        const published = json.data?.filter((item: ProgramKerja) => item.status === "Published")
        setData(published || [])
      } catch (error) {
        console.error("Failed to fetch program kerja:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <Banner text="Program Kerja" />

      <section className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <p>Memuat data...</p>
        ) : data.length === 0 ? (
          <p>Tidak ada program kerja yang tersedia.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item: ProgramKerja, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.thumbnail || "/assets/placeholder.jpg"}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-xl underline">
                    <Link href={`/program-kerja/${item.slug}`}>{item.title}</Link>
                  </CardTitle>
                  <CardDescription>
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {
                      item.content?.blocks?.find((block: any) => block.type === "paragraph")?.data?.text ??
                      "Tanpa deskripsi."
                    }
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
