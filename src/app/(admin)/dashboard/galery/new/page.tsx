'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CreateGaleryPage() {
  const router = useRouter();
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!caption || images.length === 0) {
      alert('Caption dan minimal 1 gambar harus diisi');
      return;
    }

    try {
      setUploading(true);

      // Upload each file to /api/upload
      const uploadedImageUrls: string[] = [];

      for (const file of images) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error('Gagal upload gambar');
        }

        const data = await res.json();
        uploadedImageUrls.push(`/uploads/${data.filename}`);
      }

      // Send final post data
      const response = await fetch('/api/galery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption,
          images: uploadedImageUrls,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan galeri');
      }

      router.push('/dashboard/galery');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat membuat galeri.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-lg">
      <h1 className="text-2xl font-bold">Buat Galeri Baru</h1>

      <div>
        <Label>Caption</Label>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Tulis caption di sini..."
        />
      </div>

      <div>
        <Label>Upload Gambar</Label>
        <Input type="file" accept="image/*" multiple onChange={handleImageUpload} />

        <div className="grid grid-cols-3 gap-2 mt-4">
          {previews.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1 opacity-80 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={uploading}>
        {uploading ? 'Mengunggah...' : 'Kirim'}
      </Button>
    </div>
  );
}
