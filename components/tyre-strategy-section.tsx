import { TyreStrategyChart, type StrategyRow } from "@/components/tyre-strategy-chart"

export function TyreStrategySection({ strategies }: { strategies: StrategyRow[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-black tracking-tight mb-4 uppercase">
        Tyre <span className="text-[#FF1801]">Strategy</span>
      </h2>
      <div className="bg-card rounded-xl border border-border p-4 md:p-6">
        <TyreStrategyChart strategies={strategies} />
      </div>
    </div>
  )
}
