import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface DriverHeaderProps {
  driverNumber: string
  driverName?: string
  position: number
  summary: string
}

export function DriverHeader({ driverNumber, driverName, position, summary }: DriverHeaderProps) {
  return (
    <div className="mb-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm uppercase tracking-wider">Back to Drivers</span>
      </Link>

      {/* Header Card */}
      <div className="bg-card rounded-xl p-6 md:p-8 border border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            {driverName && (
              <div className="text-xl md:text-2xl font-bold text-[#FF1801] mb-2 uppercase tracking-wide">
                {driverName}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              DRIVER <span className="text-[#FF1801]">#{driverNumber}</span>
            </h1>
            <p className="text-muted-foreground text-lg">AI-Powered Race Analysis</p>
          </div>

          {/* Position Badge */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Last Race Position</span>
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#FF1801] text-white">
              <span className="text-3xl font-black">P{position}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border-l-4 border-[#FF1801] pl-4 md:pl-6">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">Executive Summary</h2>
          <p className="text-lg leading-relaxed text-foreground">{summary}</p>
        </div>
      </div>
    </div>
  )
}
