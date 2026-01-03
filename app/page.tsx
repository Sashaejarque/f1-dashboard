import { DriverGrid } from "@/components/driver-grid"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2 text-balance">
            F1 <span className="text-[#FF1801]">DRIVERS</span>
          </h1>
          <p className="text-muted-foreground text-lg">Live statistics and AI-powered race analysis</p>
        </div>

        {/* Driver Grid */}
        <DriverGrid />
      </div>
    </main>
  )
}
