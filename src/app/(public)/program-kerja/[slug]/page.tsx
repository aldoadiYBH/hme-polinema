import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProgramKerjaContent from "./_components/renderBlock"

export default async function ShowProker({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const {slug} = await params;
  const program = await prisma.programKerja.findUnique({
    where: { slug: slug },
  })

  if (!program) return notFound()
  if(program.status !== "Published") return notFound();

  return (
    <div className="md:mx-8 md:px-5 border-x">
      <ProgramKerjaContent data={program.content} />
    </div>
  )
}
