/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"
import EditorJS from "@editorjs/editorjs"
import Header from "@editorjs/header"
import List from "@editorjs/list"
import Paragraph from "@editorjs/paragraph"
import ImageTool from "@editorjs/image"

interface EditorProps {
  onReady?: () => void
  placeholder?: string
  data?: any
}

export default function Editor({ onReady, placeholder, data }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: placeholder,
      tools: {
        header: Header,
        list: List,
        paragraph: Paragraph,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "/api/upload/editor"
            }
          }
        }
      },
      data: data || { time: new Date().getTime(), blocks: [] },
      onReady: () => {
        editorRef.current = editor
          ; (window as any).editorInstance = editor
        onReady?.()
      }
    })

    return () => {
      editorRef.current?.destroy()
      editorRef.current = null
    }
  }, [data, placeholder])

  return <div id="editorjs" className="border rounded-md p-4 bg-white" />
}
