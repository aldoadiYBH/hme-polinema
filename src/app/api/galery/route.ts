// app/api/galery/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.galery.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('GET galery error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newGalery = await prisma.galery.create({
      data: body,
    });
    return NextResponse.json({ success: true, data: newGalery });
  } catch (err) {
    console.error('POST galery error:', err);
    return NextResponse.json({ error: 'Failed to create galery' }, { status: 500 });
  }
}
