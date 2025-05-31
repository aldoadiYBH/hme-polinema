// app/(admin)/dashboard/galery/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface Galery {
  id: string;
  caption: string;
  images: string[];
  comments: string[];
}

export default function GaleryDashboard() {
  const [data, setData] = useState<Galery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/galery')
      .then((res) => res.json())
      .then((json) => setData(json.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Yakin ingin menghapus galeri ini?');
    if (!confirm) return;

    try {
      await fetch(`/api/galery/${id}`, { method: 'DELETE' });
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Gagal menghapus data');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Galeri</h1>
        <Button asChild>
          <Link href="/dashboard/galery/new">+ Tambah Galeri</Link>
        </Button>
      </div>

      <div className="border rounded-md overflow-x-auto">
        {loading ? (
          <p className="p-4 text-center">Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Caption</TableHead>
                <TableHead>Jumlah Gambar</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className='max-w-40 overflow-hidden'>{item.caption}</TableCell>
                  <TableCell>{item.images.length}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/galery/edit/${item.id}`}>Edit</Link>
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
