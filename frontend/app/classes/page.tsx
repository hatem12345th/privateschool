"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2, Plus, Users, GraduationCap, User, TrendingUp, LayoutGrid, TableIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function ClassesPage() {
  const [classes, setClasses] = useState([
    { id: 1, name: "Grade 9A", teacher: "Ms. Emily Chen", students: 25 },
    { id: 2, name: "Grade 10A", teacher: "Dr. Sarah Miller", students: 28 },
    { id: 3, name: "Grade 11B", teacher: "Prof. John Davis", students: 22 },
    { id: 4, name: "Grade 12A", teacher: "Mr. Michael Brown", students: 20 },
  ])

  const [view, setView] = useState<"table" | "cards">("table")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    students: "",
  })

  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalStudents = classes.reduce((sum, c) => sum + c.students, 0)
  const avgClassSize = Math.round(totalStudents / classes.length)
  const largestClass = Math.max(...classes.map((c) => c.students))

  const handleAdd = () => {
    const newClass = {
      id: classes.length + 1,
      name: formData.name,
      teacher: formData.teacher,
      students: Number.parseInt(formData.students),
    }
    setClasses([...classes, newClass])
    setIsAddDialogOpen(false)
    setFormData({ name: "", teacher: "", students: "" })
  }

  const handleEdit = () => {
    setClasses(
      classes.map((c) =>
        c.id === selectedClass.id ? { ...c, ...formData, students: Number.parseInt(formData.students) } : c,
      ),
    )
    setIsEditDialogOpen(false)
    setSelectedClass(null)
    setFormData({ name: "", teacher: "", students: "" })
  }

  const handleDelete = () => {
    setClasses(classes.filter((c) => c.id !== selectedClass.id))
    setIsDeleteDialogOpen(false)
    setSelectedClass(null)
  }

  const openEditDialog = (classItem: any) => {
    setSelectedClass(classItem)
    setFormData({
      name: classItem.name,
      teacher: classItem.teacher,
      students: classItem.students.toString(),
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (classItem: any) => {
    setSelectedClass(classItem)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Classes</h1>
        <p className="text-muted-foreground">Manage class assignments and teacher allocations.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                <p className="text-4xl font-bold tracking-tight">{classes.length}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 transition-transform group-hover:scale-110">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-success/5 to-transparent transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-4xl font-bold tracking-tight">{totalStudents}</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3 transition-transform group-hover:scale-110">
                <Users className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-warning/5 to-transparent transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Avg. Class Size</p>
                <p className="text-4xl font-bold tracking-tight">{avgClassSize}</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3 transition-transform group-hover:scale-110">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-info/5 to-transparent transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Largest Class</p>
                <p className="text-4xl font-bold tracking-tight">{largestClass}</p>
              </div>
              <div className="rounded-lg bg-info/10 p-3 transition-transform group-hover:scale-110">
                <Users className="h-6 w-6 text-info" />
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
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              Add Class
            </Button>
          </div>

          {/* Section Header and Search */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Classes</h2>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search classes..."
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
                    <th className="p-4 font-medium">CLASS NAME</th>
                    <th className="p-4 font-medium">TEACHER</th>
                    <th className="p-4 font-medium">STUDENTS</th>
                    <th className="p-4 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClasses.map((classItem) => (
                    <tr key={classItem.id} className="border-b border-border transition-colors hover:bg-muted/30">
                      <td className="p-4">{classItem.id}</td>
                      <td className="p-4">
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {classItem.name}
                        </span>
                      </td>
                      <td className="p-4 font-medium">{classItem.teacher}</td>
                      <td className="p-4">{classItem.students}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(classItem)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(classItem)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
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
              {filteredClasses.map((classItem) => (
                <Card key={classItem.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      {/* Class Header */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-md">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-balance">{classItem.name}</h3>
                          <span className="text-xs text-muted-foreground">Class ID: {classItem.id}</span>
                        </div>
                      </div>

                      {/* Class Info */}
                      <div className="space-y-2 border-t pt-3">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{classItem.teacher}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{classItem.students} Students</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 border-t pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 bg-transparent"
                          onClick={() => openEditDialog(classItem)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                          onClick={() => openDeleteDialog(classItem)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Class Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>Enter the class information below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Grade 10A"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                value={formData.teacher}
                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                placeholder="Enter teacher name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="students">Number of Students</Label>
              <Input
                id="students"
                type="number"
                value={formData.students}
                onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                placeholder="Enter number of students"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>Update the class information below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Class Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-teacher">Teacher</Label>
              <Input
                id="edit-teacher"
                value={formData.teacher}
                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-students">Number of Students</Label>
              <Input
                id="edit-students"
                type="number"
                value={formData.students}
                onChange={(e) => setFormData({ ...formData, students: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Class</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedClass?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
