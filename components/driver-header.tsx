import Link from "next/link"
import { ChevronLeft, Sparkles } from "lucide-react"

interface DriverHeaderProps {
  driverNumber: string
  driverName?: string
  position: number | null
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

export function DriverHeader({
  driverNumber,
  driverName,
  position,
  summary,
  cached,
  computedAt,
  model,
}: DriverHeaderProps) {
  return (
    <div className="mb-8">
      {/* Volver */}
      <Link
        href="/#pilotos"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm uppercase tracking-wider">Volver a Pilotos</span>
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
              PILOTO <span className="text-[#FF1801]">#{driverNumber}</span>
            </h1>
            <p className="text-muted-foreground text-lg">Análisis de Carrera con IA</p>
          </div>

          {/* Badge de posición */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Posición en la Última Carrera</span>
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#FF1801] text-white">
              <span className="text-3xl font-black">{position != null ? `P${position}` : "DNF"}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border-l-4 border-[#FF1801] pl-4 md:pl-6 mb-4">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">Resumen Ejecutivo</h2>
          <p className="text-lg leading-relaxed text-foreground">{summary}</p>
        </div>

        {/* Badge de IA -- deja claro que es un análisis real, persistido, no mockeado */}
        {(cached !== undefined || computedAt) && (
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground">
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
        )}
      </div>
    </div>
  )
}
