import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProkerTable from "./_components/table"

export default function ProgramKerjaPage() {

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Program Kerja</h1>
                    <p className="text-sm text-muted-foreground">Kelola daftar program kerja yang telah dibuat</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/program-kerja/new">+ Tambah Program Kerja</Link>
                </Button>
            </div>

            <div className="border rounded-xl overflow-hidden">
                <ProkerTable />
            </div>
        </div>
    )
}
