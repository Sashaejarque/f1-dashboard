"use client"

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const FALLBACK_TEAM_COLOUR = "666666"

interface StandingEntry {
  driverNumber: number
  fullName: string
  teamName?: string
  teamColour?: string
  points: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ payload: StandingEntry }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  const entry = payload[0].payload
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl text-sm">
      <p className="font-bold text-foreground">{entry.fullName}</p>
      <p className="text-muted-foreground text-xs mb-1">{entry.teamName ?? "—"}</p>
      <p className="text-foreground">
        <span className="font-bold">{entry.points}</span> <span className="text-muted-foreground">pts</span>
      </p>
    </div>
  )
}

export function StandingsPointsChart({ standings }: { standings: StandingEntry[] }) {
  const data = standings.map((entry) => ({
    ...entry,
    // apellido corto para que el eje Y no se coma el espacio del gráfico
    shortName: entry.fullName.split(" ").slice(-1)[0],
  }))

  const height = Math.max(320, data.length * 28)

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 4 }} barCategoryGap={6}>
          <XAxis type="number" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            dataKey="shortName"
            type="category"
            width={90}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
          <Bar dataKey="points" barSize={18} radius={[0, 4, 4, 0]}>
            {data.map((entry) => (
              <Cell key={entry.driverNumber} fill={`#${entry.teamColour || FALLBACK_TEAM_COLOUR}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
