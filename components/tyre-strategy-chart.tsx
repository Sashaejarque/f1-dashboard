"use client"

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Paleta oficial de compuestos F1. HARD lleva borde propio (border-border) porque
// su blanco/gris claro pierde contraste directo sobre el fondo oscuro de la tarjeta.
const COMPOUND_COLORS: Record<string, string> = {
  SOFT: "#FF3333",
  MEDIUM: "#FFF200",
  HARD: "#F0F0F0",
  INTERMEDIATE: "#43B02A",
  WET: "#0067AD",
}
const FALLBACK_COMPOUND_COLOR = "#8A8A8A"
const LEGEND_ORDER = ["SOFT", "MEDIUM", "HARD", "INTERMEDIATE", "WET"]

function compoundColor(compound?: string | null) {
  if (!compound) return "transparent"
  return COMPOUND_COLORS[compound] ?? FALLBACK_COMPOUND_COLOR
}

export interface StrategyRow {
  driverNumber: number
  fullName: string
  pitStopCount: number
  compoundSequence: string[]
}

interface StrategyTooltipProps {
  active?: boolean
  payload?: Array<{ payload: StrategyRow }>
}

function StrategyTooltip({ active, payload }: StrategyTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  const row = payload[0].payload
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl text-sm max-w-xs">
      <p className="font-bold text-foreground mb-1">{row.fullName}</p>
      <p className="text-muted-foreground text-xs mb-2">
        {row.pitStopCount} pit stop{row.pitStopCount === 1 ? "" : "s"}
      </p>
      <div className="flex flex-wrap items-center gap-1">
        {row.compoundSequence.map((compound, index) => (
          <span key={index} className="inline-flex items-center gap-1 text-xs text-foreground">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm border border-border shrink-0"
              style={{ backgroundColor: compoundColor(compound) }}
            />
            {compound}
            {index < row.compoundSequence.length - 1 && <span className="text-muted-foreground">&rarr;</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

export function TyreStrategyChart({ strategies }: { strategies: StrategyRow[] }) {
  const maxStints = Math.max(1, ...strategies.map((s) => s.compoundSequence.length))

  // Sin duración de vuelta por stint (no viene del endpoint a propósito, ver
  // DASHBOARD-PLAN.md), así que cada segmento pesa lo mismo -- es una vista de
  // secuencia de compuestos, no de proporción real de vueltas por stint.
  const data = strategies.map((s) => {
    const row: Record<string, unknown> = { ...s }
    for (let i = 0; i < maxStints; i++) {
      row[`stint_${i}`] = s.compoundSequence[i] ? 1 : 0
      row[`stint_${i}_compound`] = s.compoundSequence[i] ?? null
    }
    return row
  })

  const compoundsPresent = new Set(strategies.flatMap((s) => s.compoundSequence))
  const legendCompounds = [
    ...LEGEND_ORDER.filter((c) => compoundsPresent.has(c)),
    ...[...compoundsPresent].filter((c) => !LEGEND_ORDER.includes(c)),
  ]

  const height = Math.max(360, data.length * 26)

  return (
    <div>
      {/* Leyenda manual: los compuestos son un vocabulario fijo del dominio (no series generadas) */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {legendCompounds.map((compound) => (
          <div key={compound} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="inline-block w-3 h-3 rounded-sm border border-border"
              style={{ backgroundColor: compoundColor(compound) }}
            />
            {compound}
          </div>
        ))}
      </div>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 24, bottom: 4, left: 4 }}
            barCategoryGap={4}
          >
            <XAxis type="number" hide domain={[0, maxStints]} />
            <YAxis
              dataKey="fullName"
              type="category"
              width={140}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <Tooltip content={<StrategyTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.2 }} />
            {Array.from({ length: maxStints }).map((_, stintIndex) => (
              <Bar key={stintIndex} dataKey={`stint_${stintIndex}`} stackId="strategy" barSize={16}>
                {data.map((row, rowIndex) => (
                  <Cell
                    key={rowIndex}
                    fill={compoundColor(row[`stint_${stintIndex}_compound`] as string | null)}
                    stroke="var(--card)"
                    strokeWidth={2}
                  />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
