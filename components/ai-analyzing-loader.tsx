export function AIAnalyzingLoader({ driverName }: { driverName?: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-card rounded-xl p-8 border border-border">
          {/* Animated Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Rotating outer ring */}
              <div className="w-24 h-24 rounded-full border-4 border-border border-t-[#FF1801] animate-spin" />

              {/* Pulsing inner circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FF1801]/20 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#FF1801]" />
                </div>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold">
              {driverName ? (
                <>
                  Analizando a <span className="text-[#FF1801]">{driverName}</span>
                </>
              ) : (
                "Analizando Piloto"
              )}
            </h2>
            <p className="text-muted-foreground">La IA ingeniera de carreras está procesando la telemetría...</p>

            {/* Animated dots */}
            <div className="flex justify-center gap-2 pt-2">
              <div className="w-2 h-2 rounded-full bg-[#FF1801] animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-[#FF1801] animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-[#FF1801] animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>

          {/* Terminal-style status messages */}
          <div className="mt-6 space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-green-500">✓</span>
              <span>Cargando datos de telemetría...</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-green-500">✓</span>
              <span>Procesando análisis de carrera...</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <span className="text-[#FF1801] animate-pulse">●</span>
              <span>Generando reporte estratégico...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
