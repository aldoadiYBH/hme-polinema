/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: any) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
        console.log("no file providedd")
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const randomPrefix = Math.random().toString(36).substring(2, 6);
    const fileName = `${randomPrefix}-${file.name}`;
    const filePath = join(process.cwd(), "public", "uploads", fileName); // Adjust path as needed

    try {
        await writeFile(filePath, Buffer.from(buffer));
        console.log('file uploaded successfully')
        return NextResponse.json(
            { message: "File uploaded successfully", filename: fileName },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error writing file:", error);
        return NextResponse.json(
            { error: "Error uploading file" },
            { status: 500 }
        );
    }
}