const FALLBACK_TEAM_COLOUR = "666666"

export interface ClassificationEntry {
  driverNumber: number
  fullName: string
  teamName?: string
  teamColour?: string
  position: number | null
  points: number
  dnf: boolean
  gapToLeader: number | string
}

interface RaceClassificationTableProps {
  classification: ClassificationEntry[]
  circuitShortName: string
  year: number
}

function formatGap(entry: ClassificationEntry) {
  if (entry.dnf) return "DNF"
  if (typeof entry.gapToLeader === "number") {
    return entry.gapToLeader === 0 ? "Líder" : `+${entry.gapToLeader.toFixed(3)}s`
  }
  return entry.gapToLeader
}

export function RaceClassificationTable({ classification, circuitShortName, year }: RaceClassificationTableProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-black tracking-tight mb-4 uppercase">
        Clasificación de la <span className="text-[#FF1801]">Carrera</span>
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        {circuitShortName} {year} &middot; Resultado completo del campo
      </p>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase text-xs tracking-wider">
                <th className="text-left px-4 py-3 font-bold">Pos</th>
                <th className="text-left px-4 py-3 font-bold">Piloto</th>
                <th className="text-left px-4 py-3 font-bold hidden sm:table-cell">Equipo</th>
                <th className="text-right px-4 py-3 font-bold">Pts</th>
                <th className="text-right px-4 py-3 font-bold">Gap</th>
              </tr>
            </thead>
            <tbody>
              {classification.map((entry) => {
                const teamColour = entry.teamColour || FALLBACK_TEAM_COLOUR
                return (
                  <tr
                    key={entry.driverNumber}
                    className={`border-b border-border last:border-0 ${entry.dnf ? "opacity-50" : ""}`}
                  >
                    <td className="px-4 py-3 font-bold">{entry.position != null ? `P${entry.position}` : "DNF"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-block w-1.5 h-6 rounded-full shrink-0"
                          style={{ backgroundColor: `#${teamColour}` }}
                        />
                        <span className="font-medium">{entry.fullName}</span>
                        <span className="text-muted-foreground text-xs">#{entry.driverNumber}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                      {entry.teamName ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-bold">{entry.points}</td>
                    <td className={`px-4 py-3 text-right ${entry.dnf ? "text-[#FF1801] font-bold" : "text-muted-foreground"}`}>
                      {formatGap(entry)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
