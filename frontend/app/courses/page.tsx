import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2 } from "lucide-react"

export default function CoursesPage() {
  const courses = [
    { id: 1, name: "undefined", teacher: "", credits: "" },
    { id: 2, name: "undefined", teacher: "", credits: "" },
    { id: 3, name: "undefined", teacher: "", credits: "" },
    { id: 4, name: "undefined", teacher: "", credits: "" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">Manage course offerings and curriculum.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Courses</p>
            <p className="mt-2 text-3xl font-bold text-purple-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Credits</p>
            <p className="mt-2 text-3xl font-bold text-green-600">NaN</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Avg. Credits</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">NaN</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Active Teachers</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">1</p>
          </CardContent>
        </Card>
      </div>

      {/* Table Card */}
      <Card>
        <CardContent className="p-6">
          {/* View Toggle and Add Button */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="default" size="sm">
                Table
              </Button>
              <Button variant="outline" size="sm">
                Cards
              </Button>
            </div>
            <Button>Add Course</Button>
          </div>

          {/* Section Header and Search */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Courses</h2>
            <Button variant="outline" size="sm">
              + Add Course
            </Button>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search courses..." className="pl-9" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">COURSE NAME</th>
                  <th className="pb-3 font-medium">TEACHER</th>
                  <th className="pb-3 font-medium">CREDITS</th>
                  <th className="pb-3 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-border">
                    <td className="py-4">{course.id}</td>
                    <td className="py-4">
                      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {course.name}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">{course.teacher || "-"}</td>
                    <td className="py-4 text-muted-foreground">{course.credits || "-"}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
