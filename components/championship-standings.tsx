import { StandingsPointsChart } from "@/components/standings-points-chart"

const FALLBACK_TEAM_COLOUR = "666666"

export interface StandingEntry {
  driverNumber: number
  fullName: string
  teamName?: string
  teamColour?: string
  points: number
}

interface ChampionshipStandingsProps {
  standings: StandingEntry[]
  year: number
}

export function ChampionshipStandings({ standings, year }: ChampionshipStandingsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-black tracking-tight mb-4 uppercase">
        Campeonato <span className="text-[#FF1801]">{year}</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tabla */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border text-muted-foreground uppercase text-xs tracking-wider">
                  <th className="text-left px-4 py-3 font-bold">Pos</th>
                  <th className="text-left px-4 py-3 font-bold">Piloto</th>
                  <th className="text-left px-4 py-3 font-bold hidden sm:table-cell">Equipo</th>
                  <th className="text-right px-4 py-3 font-bold">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((entry, index) => {
                  const teamColour = entry.teamColour || FALLBACK_TEAM_COLOUR
                  return (
                    <tr key={entry.driverNumber} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-bold">P{index + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-block w-1.5 h-6 rounded-full shrink-0"
                            style={{ backgroundColor: `#${teamColour}` }}
                          />
                          <span className="font-medium">{entry.fullName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                        {entry.teamName ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-right font-bold">{entry.points}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">
            Puntos por piloto
          </h3>
          <StandingsPointsChart standings={standings} />
        </div>
      </div>
    </div>
  )
}
