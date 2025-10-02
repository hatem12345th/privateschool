"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  BookOpen,
  Calendar,
  ClipboardCheck,
  CreditCard,
  Briefcase,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Students", href: "/students", icon: Users },
  { name: "Teachers", href: "/teachers", icon: GraduationCap },
  { name: "Classes", href: "/classes", icon: School },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Attendance", href: "/attendance", icon: ClipboardCheck },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Staff", href: "/staff", icon: Briefcase },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <School className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">SchoolMS</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground">© 2025 School Management System</p>
        </div>
      </div>
    </aside>
  )
}
