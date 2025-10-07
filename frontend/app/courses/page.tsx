"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Edit, Trash2, BookOpen, Award, TrendingUp, GraduationCap, TableIcon, LayoutGrid, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Course {
  id: number
  name: string
  teacher: string
  credits: string
}

export default function CoursesPage() {
  const [view, setView] = useState<"table" | "cards">("table")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Mathematics", teacher: "Dr. Smith", credits: "6" },
    { id: 2, name: "Physics", teacher: "Prof. Johnson", credits: "5" },
    { id: 3, name: "Chemistry", teacher: "Dr. Williams", credits: "4" },
    { id: 4, name: "Biology", teacher: "Prof. Brown", credits: "5" },
  ])

  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    credits: ""
  })

  // Sample teachers list
  const teachers = [
    "Dr. Smith", "Prof. Johnson", "Dr. Williams", "Prof. Brown",
    "Dr. Davis", "Prof. Miller", "Dr. Wilson", "Prof. Taylor"
  ]

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: courses.length + 1,
      name: formData.name,
      teacher: formData.teacher,
      credits: formData.credits
    }
    setCourses([...courses, newCourse])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditCourse = () => {
    if (selectedCourse) {
      const updatedCourses = courses.map(course =>
        course.id === selectedCourse.id
          ? {
              ...course,
              name: formData.name,
              teacher: formData.teacher,
              credits: formData.credits
            }
          : course
      )
      setCourses(updatedCourses)
      setIsEditDialogOpen(false)
      setSelectedCourse(null)
      resetForm()
    }
  }

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  const openEditDialog = (course: Course) => {
    setSelectedCourse(course)
    setFormData({
      name: course.name,
      teacher: course.teacher,
      credits: course.credits
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      teacher: "",
      credits: ""
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">Manage course offerings and curriculum.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-primary/15 to-primary/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-4xl font-bold tracking-tight">4</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 transition-transform group-hover:scale-110">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-success/15 to-success/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
                <p className="text-4xl font-bold tracking-tight">24</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3 transition-transform group-hover:scale-110">
                <Award className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-warning/15 to-warning/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Avg. Credits</p>
                <p className="text-4xl font-bold tracking-tight">6</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3 transition-transform group-hover:scale-110">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-blue-500/15 to-blue-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Active Teachers</p>
                <p className="text-4xl font-bold tracking-tight">1</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3 transition-transform group-hover:scale-110">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Card */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          {/* View Toggle and Add Button */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={view === "table" ? "default" : "outline"}
                size="sm"
                className="gap-2 shadow-sm"
                onClick={() => setView("table")}
              >
                <TableIcon className="h-4 w-4" />
                Table
              </Button>
              <Button
                variant={view === "cards" ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={() => setView("cards")}
              >
                <LayoutGrid className="h-4 w-4" />
                Cards
              </Button>
            </div>
              <Button className="gap-2 shadow-sm" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Course
              </Button>
          </div>

          {/* Section Header and Search */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Courses</h2>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Conditional rendering for table vs cards view */}
          {view === "table" ? (
            /* Table View */
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">COURSE NAME</th>
                    <th className="p-4 font-medium">TEACHER</th>
                    <th className="p-4 font-medium">CREDITS</th>
                    <th className="p-4 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b border-border transition-colors hover:bg-muted/30">
                      <td className="p-4">{course.id}</td>
                      <td className="p-4">
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {course.name}
                        </span>
                      </td>
                      <td className="p-4 font-medium">{course.teacher}</td>
                      <td className="p-4">
                        <span className="inline-flex rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                          {course.credits} credits
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-primary/10 hover:text-primary"
                            onClick={() => openEditDialog(course)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Cards View */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Course Icon */}
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-2xl font-bold text-white shadow-lg">
                        {getInitials(course.name)}
                      </div>

                      {/* Course Info */}
                      <div className="w-full space-y-3 text-center">
                        <div>
                          <h3 className="text-lg font-semibold text-balance">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">Course ID: {course.id}</p>
                        </div>

                        <div className="flex justify-center">
                          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            {course.credits} credits
                          </span>
                        </div>

                        {/* Teacher Info */}
                        <div className="space-y-2 border-t pt-3">
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{course.teacher}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 border-t pt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 hover:bg-primary/10 hover:text-primary"
                            onClick={() => openEditDialog(course)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Course Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Create a new course in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                placeholder="e.g., Mathematics"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="teacher">Teacher</Label>
              <Select value={formData.teacher} onValueChange={(value) => setFormData({ ...formData, teacher: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher} value={teacher}>
                      {teacher}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                placeholder="e.g., 6"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCourse}>Add Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Modify the course details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Course Name</Label>
              <Input
                id="edit-name"
                placeholder="e.g., Mathematics"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-teacher">Teacher</Label>
              <Select value={formData.teacher} onValueChange={(value) => setFormData({ ...formData, teacher: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher} value={teacher}>
                      {teacher}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-credits">Credits</Label>
              <Input
                id="edit-credits"
                placeholder="e.g., 6"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedCourse) {
                  handleDeleteCourse(selectedCourse.id)
                  setIsEditDialogOpen(false)
                  setSelectedCourse(null)
                  resetForm()
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCourse}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
