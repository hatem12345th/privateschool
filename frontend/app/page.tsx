import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, School, DollarSign, TrendingUp, User } from "lucide-react"
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
      <div>
        <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your school.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="mt-2 text-3xl font-bold text-primary">95</p>
                <p className="mt-1 text-xs text-success">+5.2% from last month</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-success shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Teachers</p>
                <p className="mt-2 text-3xl font-bold text-success">12</p>
                <p className="mt-1 text-xs text-success">+2.1% from last month</p>
              </div>
              <div className="rounded-full bg-success/10 p-3">
                <GraduationCap className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-info shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                <p className="mt-2 text-3xl font-bold text-info">8</p>
              </div>
              <div className="rounded-full bg-info/10 p-3">
                <School className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-warning shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="mt-2 text-3xl font-bold text-warning">$45,600</p>
                <p className="mt-1 text-xs text-success">+12.5% from last month</p>
              </div>
              <div className="rounded-full bg-warning/10 p-3">
                <DollarSign className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attendance Overview */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Attendance Rate</span>
                <span className="text-2xl font-bold text-success">92.5%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[92.5%] bg-success" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Present Today:</p>
                <p className="text-xl font-bold">88 students</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absent Today:</p>
                <p className="text-xl font-bold">7 students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{payment.name}</p>
                    <p className="text-sm text-muted-foreground">{payment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">{payment.amount}</p>
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Students */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Recent Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.grade} • Age {student.age}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex-col gap-2 shadow-sm" asChild>
                <a href="/students">
                  <Users className="h-5 w-5" />
                  Add Student
                </a>
              </Button>
              <Button className="h-20 flex-col gap-2 shadow-sm bg-transparent" variant="outline" asChild>
                <a href="/teachers">
                  <GraduationCap className="h-5 w-5" />
                  Add Teacher
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
