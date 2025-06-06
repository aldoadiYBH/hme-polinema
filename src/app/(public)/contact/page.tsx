"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">

      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Kontak Kami</h1>
        <p className="text-muted-foreground text-lg">
          Hubungi kami untuk informasi lebih lanjut mengenai kegiatan dan layanan HME Polinema.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <Card className="w-full">
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Alamat</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Gedung AS2.08, Jl. Soekarno - Hatta No. 09<br />
                Lowokwaru, Kota Malang, Jawa Timur
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-2">Media Sosial</h2>
              <div className="flex gap-4 text-muted-foreground text-2xl">
                <a href="https://www.instagram.com/hmepolinema" aria-label="Instagram" className="hover:text-foreground transition"><FaInstagram /></a>
                <a href="https://www.youtube.com/@hmepolinema6144" aria-label="X" className="hover:text-foreground transition"><FaYoutube /></a>
                <a href="https://www.tiktok.com/@hme.polinema" aria-label="Facebook" className="hover:text-foreground transition"><FaTiktok /></a>
                <a href="mailto:hmepolinema95@gmail.com" aria-label="LINE" className="hover:text-foreground transition"><Mail  /></a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Lokasi HME"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1510.1199413863817!2d112.61292205919162!3d-7.944740085942434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7882746249fd21%3A0x95a035e43dba9a61!2sHME%20polinema!5e1!3m2!1sen!2sid!4v1748275272892!5m2!1sen!2sid"
            width="100%"
            height="350"
            loading="lazy"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      </div>

    </div>
  );
}
