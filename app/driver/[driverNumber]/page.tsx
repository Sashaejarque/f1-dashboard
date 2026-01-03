import { Suspense } from "react"
import { notFound } from "next/navigation"
import { DriverHeader } from "@/components/driver-header"
import { KeyFindings } from "@/components/key-findings"
import { StrategicReport } from "@/components/strategic-report"
import { AIAnalyzingLoader } from "@/components/ai-analyzing-loader"

interface LastRaceData {
  session_key: number
  position: number
}

interface KeyFinding {
  topic: string
  description: string
  severity: "high" | "med" | "low"
}

interface AnalysisData {
  summary: string
  key_findings: KeyFinding[]
  strategic_report: {
    race_narrative: string
    next_race_projections: string
  }
}

async function getLastRace(driverNumber: string): Promise<LastRaceData> {
  const res = await fetch(
    `https://f1-data-bc.vercel.app/api/openf1/drivers/${driverNumber}/last-race`,
    { next: { revalidate: 300 } }, // Cache for 5 minutes
  )

  if (!res.ok) {
    throw new Error("Failed to fetch last race data")
  }

  return res.json()
}

async function getAnalysis(sessionKey: number, driverNumber: string): Promise<AnalysisData> {
  const res = await fetch(`https://f1-data-bc.vercel.app/api/openf1/telemetry/${sessionKey}/${driverNumber}/analysis`, {
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch analysis")
  }

  return res.json()
}

async function DriverContent({
  driverNumber,
  driverName,
}: {
  driverNumber: string
  driverName?: string
}) {
  try {
    // Fetch last race data
    const lastRace = await getLastRace(driverNumber)

    // Fetch AI analysis
    const analysis = await getAnalysis(lastRace.session_key, driverNumber)

    return (
      <>
        {/* Driver Header */}
        <DriverHeader
          driverNumber={driverNumber}
          driverName={driverName}
          position={lastRace.position}
          summary={analysis.summary}
        />

        {/* Key Findings */}
        <KeyFindings findings={analysis.key_findings} />

        {/* Strategic Report */}
        <StrategicReport report={analysis.strategic_report} />
      </>
    )
  } catch (error) {
    console.error("[v0] Error loading driver data:", error)
    notFound()
  }
}

export default async function DriverDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ driverNumber: string }>
  searchParams: Promise<{ name?: string }>
}) {
  const { driverNumber } = await params
  const { name } = await searchParams

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <Suspense fallback={<AIAnalyzingLoader driverName={name} />}>
          <DriverContent driverNumber={driverNumber} driverName={name} />
        </Suspense>
      </div>
    </main>
  )
}

export function generateMetadata({ params }: { params: Promise<{ driverNumber: string }> }) {
  return {
    title: "F1 Driver Analysis",
  }
}
