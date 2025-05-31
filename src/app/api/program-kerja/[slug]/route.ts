import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        if (slug) {
            const data = await prisma.programKerja.findUnique({
                where: {
                    slug: slug
                }
            });

            if (!data) {
                return NextResponse.json({ error: "Data not found", data: {} }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: data }, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching data", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const body = await req.json()
        const { title, content, thumbnail } = body

        if (!slug) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 })
        }

        const updated = await prisma.programKerja.update({
            where: { slug },
            data: { title, content, thumbnail },
        })

        return NextResponse.json({ success: true, data: updated })
    } catch (err) {
        console.error("Error updating program kerja:", err)
        return NextResponse.json({ error: "Failed to update" }, { status: 500 })
    }
}
