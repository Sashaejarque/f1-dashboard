import { Suspense } from "react"
import { DriverGrid } from "@/components/driver-grid"
import { RaceOverviewSummary } from "@/components/race-overview-summary"
import { KeyFindings } from "@/components/key-findings"
import { StrategicReport } from "@/components/strategic-report"
import { RaceClassificationTable, type ClassificationEntry } from "@/components/race-classification-table"
import { ChampionshipStandings, type StandingEntry } from "@/components/championship-standings"
import { TyreStrategySection } from "@/components/tyre-strategy-section"
import type { StrategyRow } from "@/components/tyre-strategy-chart"

const API_BASE = "https://f1-data-bc.vercel.app/api/openf1"

interface RaceResults {
  sessionKey: number
  circuitShortName: string
  year: number
  classification: ClassificationEntry[]
}

interface RaceStrategyResponse {
  sessionKey: number
  strategies: Array<{
    driverNumber: number
    pitStopCount: number
    compoundSequence: string[]
  }>
}

interface StandingsResponse {
  year: number
  computedThroughSessionKey: number
  standings: StandingEntry[]
  updatedAt: string
}

interface KeyFinding {
  topic: string
  description: string
  severity: "high" | "med" | "low"
}

interface RaceOverviewResponse {
  summary: string
  key_findings: KeyFinding[]
  strategic_report: {
    race_narrative: string
    next_race_projections: string
  }
  cached?: boolean
  computedAt?: string
  sessionKey: number
  model?: string
}

async function getRaceResults(): Promise<RaceResults> {
  const res = await fetch(`${API_BASE}/races/latest/results`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error("Failed to fetch race results")
  return res.json()
}

async function getRaceStrategy(): Promise<RaceStrategyResponse> {
  const res = await fetch(`${API_BASE}/races/latest/strategy`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error("Failed to fetch race strategy")
  return res.json()
}

async function getStandings(year: number): Promise<StandingsResponse> {
  const res = await fetch(`${API_BASE}/standings/${year}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error("Failed to fetch standings")
  return res.json()
}

async function getRaceOverview(): Promise<RaceOverviewResponse> {
  // 24h -- el análisis de una carrera ya corrida no cambia, mismo criterio que el
  // análisis por piloto en app/driver/[driverNumber]/page.tsx.
  const res = await fetch(`${API_BASE}/races/latest/overview`, {
    next: { revalidate: 86400 },
  })
  if (!res.ok) throw new Error("Failed to fetch race overview")
  return res.json()
}

async function RaceDashboard() {
  try {
    const year = new Date().getFullYear()
    const [results, strategy, standings, overview] = await Promise.all([
      getRaceResults(),
      getRaceStrategy(),
      getStandings(year),
      getRaceOverview(),
    ])

    const driverInfoByNumber = new Map(results.classification.map((entry) => [entry.driverNumber, entry]))

    const strategyRows: StrategyRow[] = strategy.strategies
      .map((entry) => {
        const info = driverInfoByNumber.get(entry.driverNumber)
        return {
          driverNumber: entry.driverNumber,
          pitStopCount: entry.pitStopCount,
          compoundSequence: entry.compoundSequence,
          fullName: info?.fullName ?? `#${entry.driverNumber}`,
          position: info?.position ?? null,
        }
      })
      .sort((a, b) => {
        if (a.position == null) return 1
        if (b.position == null) return -1
        return a.position - b.position
      })
      .map(({ driverNumber, fullName, pitStopCount, compoundSequence }) => ({
        driverNumber,
        fullName,
        pitStopCount,
        compoundSequence,
      }))

    return (
      <>
        <section id="resumen" className="scroll-mt-24">
          <RaceOverviewSummary
            circuitShortName={results.circuitShortName}
            year={results.year}
            summary={overview.summary}
            cached={overview.cached}
            computedAt={overview.computedAt}
            model={overview.model}
          />
          <KeyFindings findings={overview.key_findings} />
          <StrategicReport report={overview.strategic_report} />
        </section>

        <section id="clasificacion" className="scroll-mt-24">
          <RaceClassificationTable
            classification={results.classification}
            circuitShortName={results.circuitShortName}
            year={results.year}
          />
        </section>

        <section id="campeonato" className="scroll-mt-24">
          <ChampionshipStandings standings={standings.standings} year={standings.year} />
        </section>

        <section id="neumaticos" className="scroll-mt-24">
          <TyreStrategySection strategies={strategyRows} />
        </section>
      </>
    )
  } catch (error) {
    console.error("[v0] Error loading race dashboard:", error)
    return (
      <div className="mb-8 bg-card rounded-xl p-6 border border-border">
        <p className="text-muted-foreground">
          No pudimos cargar el análisis de la última carrera en este momento. La grilla de pilotos sigue disponible
          debajo.
        </p>
      </div>
    )
  }
}

function RaceDashboardSkeleton() {
  return (
    <div className="mb-8 space-y-4">
      <div className="h-10 w-64 bg-card rounded-lg animate-pulse" />
      <div className="h-40 bg-card rounded-xl border border-border animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-32 bg-card rounded-xl border border-border animate-pulse" />
        <div className="h-32 bg-card rounded-xl border border-border animate-pulse" />
        <div className="h-32 bg-card rounded-xl border border-border animate-pulse" />
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Suspense fallback={<RaceDashboardSkeleton />}>
          <RaceDashboard />
        </Suspense>

        {/* Grilla de pilotos */}
        <section id="pilotos" className="scroll-mt-24 mb-6">
          <h2 className="text-2xl font-black tracking-tight mb-2 uppercase">
            Elegí un <span className="text-[#FF1801]">Piloto</span>
          </h2>
          <p className="text-muted-foreground mb-6">Análisis individual con IA por piloto</p>
        </section>
        <DriverGrid />
      </div>
    </main>
  )
}
