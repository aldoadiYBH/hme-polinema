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
          Himpunan Mahasiswa Elektro atau yang disingkat HME merupakan oraganisasi mahasiswa yang ada di Jurusan Teknik Elektro, yang bertujuan untuk membina dan mengembangkan mahasiswa dalam bidang ilmu pengetahuan dan teknologi, serta sebagai wadah dan sarana untuk menyampaikan aspirasi mahasiswa.
        </p>
      </section>

      <Separator />

      <section className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">Visi</h2>
          <p className="text-muted-foreground leading-relaxed">
            Menjadikan Himpunan Mahasiswa Elektro sebagai Organisasi yang Interaktif demi Terciptanya Jurusan Teknik Elektro yang Unggul
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Misi</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>
              Mewujudkan Fungsionaris yang Komunikatif, Kritis, dan Harmonis
            </li>
            <li>
              Mengoptimalisasikan Himpunan Mahasiswa Elektro sebagai Wadah Aspirasi Mahasiswa Jurusan Teknik Elektro
            </li>
            <li>
              Mewujudkan Himpunan Mahasiswa Elektro sebagai Saranan Pengembangan Minat dan Bakat dalam Bidang Akademik maupun non-Akademik
            </li>
            <li>
              Menjalin Hubungan Baik dengan Internal dan Eksternal Jurusan Teknik Elektro
            </li>
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
            <p><strong>Lingkaran berwarna dasar merah :</strong> Melambangkan mahasiswa dinamis, kreatif, dengan intelektualitas serta dedikasi tinggi sebagai pelaku pendidikan didukung dengan sistem pendidikan yang profesional.</p>
            <p><strong>Tulisan HME berwarna biru :</strong> Melambangkan organisasi sebagai satu kesatuan Mahasiswa Jurusan Teknik Elektro yang terbagi dalam tujuh program studi.</p>
            <p><strong>Lima garis berwarna Merah :</strong> Memotong tulisan HME dari tengah sampai atas melambangkan organisasi yang berjiwa dan kepribadian pancasila.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
