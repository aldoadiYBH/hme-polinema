import Link from "next/link";
import BannerSection from "./_components/banner";
import InformasiSection from "./_components/informasi";
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image";

export default function HomePage() {
  return (
    <div>

      <section className="bg-accent py-20 md:py-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Himpunan Mahasiswa Elektro
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit quo illo magni dignissimos, repellendus ipsam dicta iusto! Omnis, consequatur nesciunt.
          </p>
        </div>
      </section>

      <div className="my-16">
        <BannerSection />
      </div>

      <section className="py-16 bg-accent">
        <div className="min-h-64 px-6 flex flex-col gap-5 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-center">Program Kerja</h3>
            <p className="text-muted-foreground text-sm text-center">
              Informasi terbaru seputar kegiatan dan agenda HME Polinema.
            </p>
          </div>
          <div className="max-w-screen px-16">
            <InformasiSection />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="min-h-64 px-6 flex flex-col md:flex-row gap-x-44 gap-y-10 items-center justify-between">
          <div className="md:w-1/2">
            <h3 className="mb-2 text-5xl font-bold">Profile</h3>
            <p className="mb-2 text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sint inventore nesciunt voluptate laudantium accusantium maxime praesentium culpa adipisci fugit.</p>
            <Link href={"/profile"} className={buttonVariants({ variant: "default" })}>Lihat <i className="fa-light fa-arrow-right"></i></Link>
          </div>
          <div className="md:w-1/2 flex md:justify-center order-first md:order-last">
            {/* <img src="./hme-logo.png" alt="..." className="grayscale-75" /> */}
            <Image src={"/assets/LOGO-HME.png"} alt="brand" width={200} height={200} className="grayscale-25"></Image>
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="min-h-64 py-5 px-6 flex flex-col md:flex-row gap-x-44 gap-y-10 items-center justify-between">
          <div className="md:w-1/2">
            <h3 className="mb-2 text-5xl font-bold">Badan Pengurus Harian</h3>
            <p className="mb-2 text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sint inventore nesciunt voluptate laudantium accusantium maxime praesentium culpa adipisci fugit.</p>
            <Link href={"/pengurus"} className={buttonVariants({ variant: "default" })}>Lihat <i className="fa-light fa-arrow-right"></i></Link>
          </div>
          <div className="md:w-1/2 h-full flex md:justify-center text-9xl order-first">
            <i className="fa-thin fa-users-line"></i>
          </div>
        </div>
      </section>
      {/* 
      <section className="py-16">
        <div className="min-h-64 py-5 px-6 flex flex-col md:flex-row gap-x-44 gap-y-10 items-center justify-between">
          <div className="md:w-1/2">
            <h3 className="mb-2 text-5xl font-bold">Agenda</h3>
            <p className="mb-2 text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sint inventore nesciunt voluptate laudantium accusantium maxime praesentium culpa adipisci fugit.</p>
            <Link href={"#"} className={buttonVariants({ variant: "default" })}>Lihat <i className="fa-light fa-arrow-right"></i></Link>
          </div>
          <div className="md:w-1/2 h-full flex md:justify-center text-9xl order-first md:order-last">
            <i className="fa-light fa-calendars"></i>
          </div>
        </div>
      </section> */}

      <section className="py-16">
        <div className="min-h-64 py-5 px-6 flex flex-col md:flex-row gap-x-44 gap-y-10 items-center justify-between">
          <div className="md:w-1/2">
            <h3 className="mb-2 text-5xl font-bold">Database HME</h3>
            <p className="mb-2 text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sint inventore nesciunt voluptate laudantium accusantium maxime praesentium culpa adipisci fugit.</p>
            <Link href={"database-hme"} className={buttonVariants({ variant: "default" })}>Lihat <i className="fa-light fa-arrow-right"></i></Link>
          </div>
          <div className="md:w-1/2 h-full flex md:justify-center text-9xl order-first md:order-last">
            <i className="fa-light fa-database"></i>
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="min-h-64 py-5 px-6 flex flex-col md:flex-row gap-x-44 gap-y-10 items-center justify-between">
          <div className="md:w-1/2">
            <h3 className="mb-2 text-5xl font-bold">Galeri HME</h3>
            <p className="mb-2 text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sint inventore nesciunt voluptate laudantium accusantium maxime praesentium culpa adipisci fugit.</p>
            <Link href={"/galery"} className={buttonVariants({ variant: "default" })}>Lihat <i className="fa-light fa-arrow-right"></i></Link>
          </div>
          <div className="md:w-1/2 h-full flex md:justify-center text-9xl order-first">
            <i className="fa-light fa-rectangle-vertical-history"></i>
          </div>
        </div>
      </section>
    </div>
  );
}
