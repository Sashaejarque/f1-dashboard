import Link from "next/link"

const SECTIONS = [
  { href: "/#resumen", label: "Resumen IA" },
  { href: "/#clasificacion", label: "Clasificación" },
  { href: "/#campeonato", label: "Campeonato" },
  { href: "/#neumaticos", label: "Neumáticos" },
  { href: "/#pilotos", label: "Pilotos" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black tracking-tight">
              F1 <span className="text-[#FF1801]">DASHBOARD</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1 overflow-x-auto">
            {SECTIONS.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card transition-colors whitespace-nowrap"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
