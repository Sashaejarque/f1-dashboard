import { AlertTriangle, AlertCircle, Info } from "lucide-react"

interface KeyFinding {
  topic: string
  description: string
  severity: "high" | "med" | "low"
}

interface KeyFindingsProps {
  findings: KeyFinding[]
}

function getSeverityStyles(severity: string) {
  switch (severity) {
    case "high":
      return {
        icon: AlertTriangle,
        iconColor: "text-[#FF1801]",
        borderColor: "border-[#FF1801]",
        bgColor: "bg-[#FF1801]/10",
      }
    case "med":
      return {
        icon: AlertCircle,
        iconColor: "text-yellow-500",
        borderColor: "border-yellow-500",
        bgColor: "bg-yellow-500/10",
      }
    case "low":
      return {
        icon: Info,
        iconColor: "text-blue-500",
        borderColor: "border-blue-500",
        bgColor: "bg-blue-500/10",
      }
    default:
      return {
        icon: Info,
        iconColor: "text-muted-foreground",
        borderColor: "border-muted",
        bgColor: "bg-muted/10",
      }
  }
}

export function KeyFindings({ findings }: KeyFindingsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-black tracking-tight mb-4 uppercase">
        Key <span className="text-[#FF1801]">Findings</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {findings.map((finding, index) => {
          const styles = getSeverityStyles(finding.severity)
          const Icon = styles.icon

          return (
            <div
              key={index}
              className={`bg-card rounded-xl p-5 border-l-4 ${styles.borderColor} ${styles.bgColor} transition-all hover:scale-105`}
            >
              {/* Icon and Topic */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`mt-0.5 ${styles.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg leading-tight">{finding.topic}</h3>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">{finding.description}</p>

              {/* Severity Badge */}
              <div className="mt-3">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${styles.iconColor}`}
                >
                  {finding.severity} Priority
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
