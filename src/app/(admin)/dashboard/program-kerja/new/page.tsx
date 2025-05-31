/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false });

export default function CreateProgramKerjaPage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const router = useRouter();

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || !data.filename) {
      throw new Error("Upload failed");
    }

    return data.filename;
  };

  const handleSubmit = async () => {
    const title = titleRef.current?.value?.trim();
    if (!title) {
      alert("Judul tidak boleh kosong");
      return;
    }

    const editorInstance = (window as any).editorInstance as import("@editorjs/editorjs").default;
    if (!editorInstance) {
      alert("Editor belum siap");
      return;
    }

    const content = await editorInstance.save();

    let thumbnailUrl: string | null = null;
    if (thumbnailFile) {
      try {
        thumbnailUrl = await uploadImage(thumbnailFile);
      } catch (err) {
        console.error(err);
        alert("Gagal mengunggah thumbnail");
        return;
      }
    }
    const res = await fetch("/api/program-kerja", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        thumbnail: thumbnailUrl,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Berhasil disimpan!");
      router.push("/dashboard/program-kerja");
    } else {
      alert("Gagal menyimpan: " + data.error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tambah Program Kerja</h1>
        <p className="text-sm text-muted-foreground">
          Buat program kerja baru untuk ditampilkan di halaman publik
        </p>
      </div>

      <div className="space-y-4">
        <Input ref={titleRef} placeholder="Judul program kerja" className="text-lg" />

        <div>
          <label className="text-sm font-medium">Thumbnail (Opsional)</label>
          <Input type="file" accept="image/*" onChange={handleThumbnailChange} className="cursor-pointer" />
          {thumbnailPreview && (
            <Image
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              width={300}
              height={200}
              className="mt-2 rounded border"
            />
          )}
        </div>

        <Editor placeholder="Ketik sesuatu..." />
        <Button onClick={handleSubmit} className="mt-4 cursor-pointer">
          Simpan
        </Button>
      </div>
    </div>
  );
}
