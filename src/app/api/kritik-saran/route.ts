import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET: fetch the first record
export async function GET() {
  const record = await prisma.kritikSaran.findFirst()
  if (!record) {
    return NextResponse.json({ kiritikSaranLink: "", aspirasiLink: "" })
  }
  return NextResponse.json(record)
}

// PUT: update the only record (create if doesn't exist)
export async function PUT(req: NextRequest) {
  const { kiritikSaranLink, aspirasiLink } = await req.json()

  const existing = await prisma.kritikSaran.findFirst()

  let result
  if (existing) {
    result = await prisma.kritikSaran.update({
      where: { id: existing.id },
      data: { kiritikSaranLink, aspirasiLink },
    })
  } else {
    result = await prisma.kritikSaran.create({
      data: { kiritikSaranLink, aspirasiLink },
    })
  }

  return NextResponse.json(result)
}
