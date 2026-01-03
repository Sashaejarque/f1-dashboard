import Link from "next/link"
import Image from "next/image"

interface Driver {
  driver_number: number
  full_name: string
  team_name: string
  team_colour: string
  headshot_url: string
}

async function getDrivers(): Promise<Driver[]> {
  const res = await fetch("https://f1-data-bc.vercel.app/api/openf1/drivers", {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!res.ok) {
    throw new Error("Failed to fetch drivers")
  }

  return res.json()
}

export async function DriverGrid() {
  const drivers = await getDrivers()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {drivers.map((driver) => (
        <Link
          key={driver.driver_number}
          href={`/driver/${driver.driver_number}?name=${encodeURIComponent(driver.full_name)}`}
          className="group relative overflow-hidden rounded-xl bg-card transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
          style={{
            borderLeft: `4px solid ${driver.team_colour}`,
          }}
        >
          {/* Card Content */}
          <div className="relative aspect-[3/4] bg-gradient-to-b from-card to-background">
            {/* Driver Image */}
            <div className="relative h-full w-full">
              <Image
                src={driver.headshot_url || "/placeholder.svg"}
                alt={driver.full_name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            {/* Driver Number - Large Background */}
            <div
              className="absolute top-4 right-4 text-8xl font-black opacity-20 group-hover:opacity-30 transition-opacity"
              style={{ color: driver.team_colour }}
            >
              {driver.driver_number}
            </div>

            {/* Driver Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Driver Number Badge */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 font-black text-xl"
                style={{
                  backgroundColor: driver.team_colour,
                  color: "#FFFFFF",
                }}
              >
                {driver.driver_number}
              </div>

              {/* Driver Name */}
              <h3 className="text-2xl font-bold mb-1 text-balance">{driver.full_name}</h3>

              {/* Team Name */}
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{driver.team_name}</p>
            </div>
          </div>

          {/* Hover Effect - Team Color Accent */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
            style={{ backgroundColor: driver.team_colour }}
          />
        </Link>
      ))}
    </div>
  )
}
