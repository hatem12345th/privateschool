"use client"

import { Search, Bell, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-6">
      {/* Search */}
      <div className="flex flex-1 items-center gap-2">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search students, teachers, classes..." className="pl-9" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-warning text-[10px] font-bold text-foreground">
            3
          </span>
        </Button>
        <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
          <User className="h-5 w-5" />
          <div className="text-sm">
            <div className="font-medium">Admin User</div>
            <div className="text-xs text-muted-foreground">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  )
}
