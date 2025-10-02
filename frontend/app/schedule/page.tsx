"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function SchedulePage() {
  const [view, setView] = useState<"week" | "month" | "year">("week")

  const days = [
    { name: "Sun", date: 28 },
    { name: "Mon", date: 29 },
    { name: "Tue", date: 30 },
    { name: "Wed", date: 1 },
    { name: "Thu", date: 2 },
    { name: "Fri", date: 3 },
    { name: "Sat", date: 4 },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">View and manage school schedules and events.</p>
        </div>
        <Button>+ Add Event</Button>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold">Week of September 28, 2025</h2>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
                Week
              </Button>
              <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>
                Month
              </Button>
              <Button variant={view === "year" ? "default" : "outline"} size="sm" onClick={() => setView("year")}>
                Year
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="mt-6 grid grid-cols-7 gap-4">
            {days.map((day) => (
              <div key={day.date} className="space-y-2">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">{day.name}</div>
                  <div className="text-2xl font-bold">{day.date}</div>
                </div>
                <div className="h-96 rounded-lg border border-border bg-card p-2">{/* Events would go here */}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
