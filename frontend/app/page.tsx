import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, School, DollarSign, TrendingUp, User, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const recentPayments = [
    { name: "Alice Johnson", type: "Tuition Fee", amount: "$1200", date: "2024-01-10" },
    { name: "Bob Smith", type: "Tuition Fee", amount: "$1200", date: "2024-01-12" },
    { name: "Charlie Brown", type: "Tuition Fee", amount: "$1200", date: "2024-01-15" },
  ]

  const recentStudents = [
    { name: "Alice Johnson", grade: "Grade 10A", age: 16 },
    { name: "Bob Smith", grade: "Grade 11B", age: 17 },
    { name: "Charlie Brown", grade: "Grade 9A", age: 15 },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">Welcome back! Here's what's happening at your school today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-primary/15 to-primary/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-4xl font-bold tracking-tight">95</p>
                <p className="text-xs text-success">+5.2% from last month</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 transition-transform group-hover:scale-110">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-success/15 to-success/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Teachers</p>
                <p className="text-4xl font-bold tracking-tight">12</p>
                <p className="text-xs text-success">+2.1% from last month</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3 transition-transform group-hover:scale-110">
                <GraduationCap className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-blue-500/15 to-blue-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                <p className="text-4xl font-bold tracking-tight">8</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3 transition-transform group-hover:scale-110">
                <School className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-amber-500/15 to-amber-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-4xl font-bold tracking-tight">$45,600</p>
                <p className="text-xs text-success">+12.5% from last month</p>
              </div>
              <div className="rounded-lg bg-amber-500/10 p-3 transition-transform group-hover:scale-110">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Attendance Overview */}
        <Card className="border bg-gradient-to-br from-green-50 to-transparent dark:from-green-950/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Overall Rate</span>
                <span className="text-3xl font-bold text-green-600">92.5%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-green-100 dark:bg-green-900/30">
                <div className="h-full w-[92.5%] rounded-full bg-gradient-to-r from-green-500 to-green-600" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950/20">
                <p className="text-xs font-medium text-green-700 dark:text-green-300">Present</p>
                <p className="text-xl font-bold text-green-600">88</p>
              </div>
              <div className="rounded-lg bg-red-50 p-3 dark:bg-red-950/20">
                <p className="text-xs font-medium text-red-700 dark:text-red-300">Absent</p>
                <p className="text-xl font-bold text-red-600">7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card className="border bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg p-3 hover:bg-emerald-50 dark:hover:bg-emerald-950/10">
                  <div className="space-y-1">
                    <p className="font-medium">{payment.name}</p>
                    <p className="text-xs text-muted-foreground">{payment.type}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-bold text-emerald-600">{payment.amount}</p>
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Students */}
        <Card className="border bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-blue-600" />
              Recent Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50 dark:hover:bg-blue-950/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {student.grade} • Age {student.age}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg transition-all hover:scale-105" asChild>
              <a href="/students">
                <Users className="h-6 w-6" />
                <span className="text-sm font-medium">Add Student</span>
              </a>
            </Button>
            <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-success to-success/80 hover:from-success/90 hover:to-success shadow-lg transition-all hover:scale-105" asChild>
              <a href="/teachers">
                <GraduationCap className="h-6 w-6" />
                <span className="text-sm font-medium">Add Teacher</span>
              </a>
            </Button>
            <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-blue-600 to-blue-600/80 hover:from-blue-600/90 hover:to-blue-600 shadow-lg transition-all hover:scale-105" asChild>
              <a href="/classes">
                <School className="h-6 w-6" />
                <span className="text-sm font-medium">Add Class</span>
              </a>
            </Button>
            <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-amber-600 to-amber-600/80 hover:from-amber-600/90 hover:to-amber-600 shadow-lg transition-all hover:scale-105" asChild>
              <a href="/payments">
                <DollarSign className="h-6 w-6" />
                <span className="text-sm font-medium">Record Payment</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
