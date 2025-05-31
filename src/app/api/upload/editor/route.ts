import { writeFile } from "fs/promises"
import { join } from "path"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ success: 0, error: "No file provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const randomPrefix = Math.random().toString(36).substring(2, 8)
    const fileName = `${randomPrefix}-${file.name}`
    const filePath = join(process.cwd(), "public", "uploads", fileName)

    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: 1,
      file: {
        url: `/uploads/${fileName}`,
      },
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: 0, error: "Upload failed" }, { status: 500 })
  }
}
