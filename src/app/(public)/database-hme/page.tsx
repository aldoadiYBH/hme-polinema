import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText} from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function DatabaseHMEPage() {
  const data = await prisma.database.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Pusat Data HME POLINEMA</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Akses informasi lengkap dan terkini seputar Himpunan Mahasiswa Elektro POLINEMA.
            Transparan, akurat, dan dapat diakses oleh anggota maupun publik.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center items-start max-w-4xl mx-auto">
          {data.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center gap-4">

                <FileText className="text-primary w-6 h-6" />

                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <Button variant="outline" asChild>
                  <Link href={item.link} target="_blank" rel="noopener noreferrer">
                    Lihat {item.name}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
