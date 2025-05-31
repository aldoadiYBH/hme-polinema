'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function EditGaleryPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [caption, setCaption] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGalery = async () => {
      try {
        const res = await fetch(`/api/galery/${id}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Gagal mengambil data');
        setCaption(json.data.caption);
        setImages(json.data.images || []);
      } catch (err) {
        alert('Gagal memuat galeri');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGalery();
    }
  }, [id]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/galery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Gagal memperbarui galeri');
      }

      router.push('/dashboard/galery');
    } catch (err) {
      alert('Gagal menyimpan perubahan');
      console.error(err);
    }
  };

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto flex flex-col space-y-6">
      <h1 className="text-2xl font-bold">Edit Galeri</h1>

      {images.length > 0 && (
        <div className="relative h-48 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="absolute left-2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition"
            aria-label="Previous image"
          >
            ‹
          </button>

          <img
            src={images[currentIndex]}
            alt={`Gambar ${currentIndex + 1}`}
            className="h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />

          <button
            onClick={handleNext}
            className="absolute right-2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}

      <div>
        <Label>Caption</Label>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>

      <Button onClick={handleSubmit}>Simpan Perubahan</Button>
    </div>
  );
}
