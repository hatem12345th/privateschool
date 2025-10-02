import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  color?: "purple" | "green" | "orange" | "red" | "blue"
}

const colorClasses = {
  purple: "text-primary",
  green: "text-success",
  orange: "text-warning",
  red: "text-destructive",
  blue: "text-info",
}

export function StatCard({ title, value, icon: Icon, color = "purple" }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`mt-2 text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
          </div>
          {Icon && (
            <div className={`rounded-lg bg-accent p-3 ${colorClasses[color]}`}>
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
