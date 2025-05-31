// app/api/galery/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const galery = await prisma.galery.findUnique({
      where: { id },
    });
    if (!galery) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: galery });
  } catch (err) {
    console.error('GET galery by ID error:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const {id} = await params;
    const updatedGalery = await prisma.galery.update({
      where: { id },
      data: body,
    });
    return NextResponse.json({ success: true, data: updatedGalery });
  } catch (err) {
    console.error('PUT galery error:', err);
    return NextResponse.json({ error: 'Failed to update galery' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params;
    await prisma.galery.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE galery error:', err);
    return NextResponse.json({ error: 'Failed to delete galery' }, { status: 500 });
  }
}
