"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">

      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">HME Polinema</h1>
      </section>

      <section className="space-y-4 bg-accent p-4">
        <h2 className="text-2xl font-bold">Tentang HME</h2>
        <p className="text-muted-foreground leading-relaxed">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita tenetur neque quod, reprehenderit reiciendis ut in, modi unde officia iusto ipsam nobis numquam placeat fugit! Repellat modi deleniti ducimus saepe.
        </p>
      </section>

      <Separator />

      <section className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">Visi</h2>
          <p className="text-muted-foreground leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione perspiciatis ex dolores aperiam quam tenetur velit necessitatibus veniam exercitationem corporis!
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Misi</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>a</li>
            <li>b</li>
            <li>c</li>
            <li>d</li>
          </ul>
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Makna Lambang</h2>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Image
            src="/assets/LOGO-HME.png"
            alt="Logo HME"
            width={160}
            height={160}
            className="object-contain"
          />
          <div className="text-muted-foreground space-y-2 text-sm leading-relaxed">
            <p><strong>point a:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
            <p><strong>point b:</strong> Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p><strong>point c:</strong> Lorem ipsum dolor sit.</p>
            <p><strong>point d:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, possimus.</p>
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video Perkenalan 1"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow">
            <iframe
              src="https://www.youtube.com/embed/2Z4m4lnjxkY"
              title="Video Perkenalan 2"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow">
            <iframe
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              title="Video Perkenalan 3"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
