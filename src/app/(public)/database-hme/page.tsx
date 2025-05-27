
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, FileSearch, Briefcase, ShieldCheck, FolderSearch } from "lucide-react";

export default function DatabaseHMEPage() {
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

        <div>
          <h3 className="text-2xl font-semibold mb-6">Database Internal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="text-primary w-6 h-6" />
                <CardTitle>Struktur Organisasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Lihat struktur kepengurusan HME secara lengkap dan terupdate.</p>
                <Button variant="outline">Lihat Detail</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="text-primary w-6 h-6" />
                <CardTitle>Dokumen Resmi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Akses notulen, proposal, dan laporan pertanggungjawaban.</p>
                <Button variant="outline">Lihat Dokumen</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ShieldCheck className="text-primary w-6 h-6" />
                <CardTitle>Inventaris</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Daftar aset dan perlengkapan milik HME.</p>
                <Button variant="outline">Lihat Inventaris</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6">Database Eksternal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileSearch className="text-primary w-6 h-6" />
                <CardTitle>Kegiatan HME</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Lihat dokumentasi dan laporan kegiatan HME terbaru.</p>
                <Button variant="outline">Lihat Kegiatan</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="text-primary w-6 h-6" />
                <CardTitle>Kemitraan & Sponsor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Informasi mengenai kolaborasi eksternal HME.</p>
                <Button variant="outline">Lihat Detail</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FolderSearch className="text-primary w-6 h-6" />
                <CardTitle>Publikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Artikel, jurnal, dan publikasi seputar HME.</p>
                <Button variant="outline">Lihat Publikasi</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
