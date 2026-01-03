import { FileText, TrendingUp } from "lucide-react"

interface StrategicReportProps {
  report: {
    race_narrative: string
    next_race_projections: string
  }
}

export function StrategicReport({ report }: StrategicReportProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black tracking-tight uppercase">
        Strategic <span className="text-[#FF1801]">Report</span>
      </h2>

      {/* Race Narrative */}
      <div className="bg-card rounded-xl p-6 md:p-8 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#FF1801]">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide">Race Narrative</h3>
        </div>

        <div className="space-y-4 text-muted-foreground leading-relaxed font-mono text-sm">
          {report.race_narrative.split("\n\n").map((paragraph, index) => (
            <p key={index} className="pl-4 border-l-2 border-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Next Race Projections */}
      <div className="bg-card rounded-xl p-6 md:p-8 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#FF1801]">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide">Next Race Projections</h3>
        </div>

        <div className="space-y-4 text-muted-foreground leading-relaxed font-mono text-sm">
          {report.next_race_projections.split("\n\n").map((paragraph, index) => (
            <p key={index} className="pl-4 border-l-2 border-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
