import { Sparkles } from "lucide-react"

interface RaceOverviewSummaryProps {
  circuitShortName: string
  year: number
  summary: string
  cached?: boolean
  computedAt?: string
  model?: string
}

function formatComputedAt(computedAt: string) {
  return new Date(computedAt).toLocaleString("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

export function RaceOverviewSummary({
  circuitShortName,
  year,
  summary,
  cached,
  computedAt,
  model,
}: RaceOverviewSummaryProps) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2 text-balance">
          {circuitShortName} <span className="text-[#FF1801]">{year}</span>
        </h1>
        <p className="text-muted-foreground text-lg">Análisis de la última carrera con IA</p>
      </div>

      <div className="bg-card rounded-xl p-6 md:p-8 border border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Resumen de la Carrera</h2>

          {/* Badge de IA -- deja claro que es un análisis real, persistido, no mockeado */}
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-[#FF1801]" />
            {cached && computedAt ? (
              <span>
                Analizado con IA el <span className="text-foreground font-medium">{formatComputedAt(computedAt)}</span>
                {model ? <span className="text-muted-foreground"> &middot; {model}</span> : null}
              </span>
            ) : (
              <span>Analizado con IA ahora mismo</span>
            )}
          </div>
        </div>

        <div className="border-l-4 border-[#FF1801] pl-4 md:pl-6">
          <p className="text-lg leading-relaxed text-foreground">{summary}</p>
        </div>
      </div>
    </div>
  )
}
