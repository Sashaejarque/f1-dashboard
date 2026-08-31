import Link from "next/link"
import { AlertTriangle, ChevronLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-6" strokeWidth={1.5} />
        <h1 className="text-2xl font-bold mb-2 text-balance">Página no encontrada</h1>
        <p className="text-muted-foreground mb-8">
          No pudimos encontrar lo que estás buscando. Puede que el piloto o la página ya no exista.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
