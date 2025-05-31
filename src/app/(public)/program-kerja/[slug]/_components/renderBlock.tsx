/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import dynamic from 'next/dynamic'

const Output = dynamic(() => import('editorjs-react-renderer'), { ssr: false })

export default function ProgramKerjaContent({ data }: { data: any }) {
  return (
    <div className="prose dark:prose-invert">
      <Output data={data} />
    </div>
  )
}
