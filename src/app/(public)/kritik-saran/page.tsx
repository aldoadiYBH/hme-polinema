"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function KritikSaranPublicPage() {
    const [kritik, setKritik] = useState("")
    const [aspirasi, setAspirasi] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLinks = async () => {
            const res = await fetch("/api/kritik-saran")
            const data = await res.json()
            setKritik(data.kiritikSaranLink)
            setAspirasi(data.aspirasiLink)
            setLoading(false)
        }

        fetchLinks()
    }, [])

    if (loading) return <p className="text-center mt-10">Loading...</p>

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
            <div className="text-center space-y-8 max-w-lg">
                <h1 className="text-3xl font-bold">Kritik & Saran</h1>
                <p className="text-gray-600">Kami menghargai pendapat Anda. Silakan pilih salah satu formulir berikut:</p>
                <div className="space-y-4">
                    <Button
                        className="w-full text-lg py-6"
                        onClick={() => window.open(kritik, "_blank")}
                    >
                        Form Kritik & Saran
                    </Button>
                    <Button
                        className="w-full text-lg py-6"
                        variant="outline"
                        onClick={() => window.open(aspirasi, "_blank")}
                    >
                        Form Aspirasi
                    </Button>
                </div>
            </div>
        </div>
    )
}
