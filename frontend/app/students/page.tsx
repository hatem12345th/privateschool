"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Edit,
  Trash2,
  Plus,
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  Mail,
  Phone,
  LayoutGrid,
  TableIcon,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/axios"

interface Class {
  id: number
  name: string
  teacherId: number | null
}

interface Student {
  id: number
  name: string
  email: string
  age: number
  phone?: string
  classId?: number | null
  class?: Class | null
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])

  const [view, setView] = useState<"table" | "cards">("table")

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
    email: "",
    phone: "",
  })

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) 
  )

  const handleAdd = async () => {
    const newStudent = {
      name: formData.name,
      age: Number.parseInt(formData.age),
      classId: Number.parseInt(formData.class),
      email: formData.email,
    }
    await api.post('/students', newStudent);
    fetchStudents();
    setIsAddDialogOpen(false)
    setFormData({ name: "", age: "", class: "", email: "", phone: "" })
  }

  const handleEdit = () => {
    api.put(`/students/${selectedStudent.id}`, {
      name: formData.name,
      age: Number.parseInt(formData.age),
      classId: Number.parseInt(formData.class),
      email: formData.email,
    });
    fetchStudents();
    setIsEditDialogOpen(false)
    setSelectedStudent(null)
    setFormData({ name: "", age: "", class: "", email: "", phone: "" })
  }

  const handleDelete = async () => {
    await api.delete(`/students/${selectedStudent.id}`);
    fetchStudents();
    setIsDeleteDialogOpen(false)
    setSelectedStudent(null)
  }

  const openEditDialog = (student: any) => {
    setSelectedStudent(student)
    setFormData({
      name: student.name,
      age: student.age.toString(),
      class: student.classId,
      email: student.email,
      phone: student.phone,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (student: any) => {
    setSelectedStudent(student)
    setIsDeleteDialogOpen(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }
  const fetchStudents = async () => {
    try {
      const data  = await api.get('/students');
      setStudents(data.data);         
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  
  }

   useEffect(() => {
   
    fetchStudents()
   },[])


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Students</h1>
        <p className="text-muted-foreground">Manage student information and enrollment.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-primary/15 to-primary/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-4xl font-bold tracking-tight">{students.length}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Adults (18+)</p>
                <p className="text-4xl font-bold tracking-tight">{students.filter((s) => s.age >= 18).length}</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3 transition-transform group-hover:scale-110">
                <UserCheck className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-warning/15 to-warning/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Minors (&lt;18)</p>
                <p className="text-4xl font-bold tracking-tight">{students.filter((s) => s.age < 18).length}</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3 transition-transform group-hover:scale-110">
                <UserX className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-info/15 to-info/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Classes</p>
                <p className="text-4xl font-bold tracking-tight">{new Set(students.map((s) => s.class)).size}</p>
              </div>
              <div className="rounded-lg bg-info/10 p-3 transition-transform group-hover:scale-110">
                <GraduationCap className="h-6 w-6 text-info" />
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
              Add Student
            </Button>
          </div>

          {/* Section Header and Search */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Students</h2>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
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
                    <th className="p-4 font-medium">NAME</th>
                    <th className="p-4 font-medium">AGE</th>
                    <th className="p-4 font-medium">CLASS</th>
                    <th className="p-4 font-medium">EMAIL</th>
                    <th className="p-4 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border transition-colors hover:bg-muted/30">
                      <td className="p-4">{student.id}</td>
                      <td className="p-4 font-medium">{student.name}</td>
                      <td className="p-4">{student.age}</td>
                      <td className="p-4">
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {student.class?.name || "N/A"}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{student.email}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(student)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(student)}
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
            /* Cards View - new grid layout for student cards */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Avatar */}
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-2xl font-bold text-white shadow-lg">
                        {getInitials(student.name)}
                      </div>

                      {/* Student Info */}
                      <div className="w-full space-y-3 text-center">
                        <div>
                          <h3 className="text-lg font-semibold text-balance">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">Age {student.age}</p>
                        </div>

                        <div className="flex justify-center">
                          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            {student.classId}
                          </span>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 border-t pt-3">
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span className="truncate">{student.email}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{student.class?.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex w-full gap-2 border-t pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 bg-transparent"
                          onClick={() => openEditDialog(student)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                          onClick={() => openDeleteDialog(student)}
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

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>Enter the student's information below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter student name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Enter age"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Input
                id="class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                placeholder="e.g., Grade 10A"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>Update the student's information below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-age">Age</Label>
              <Input
                id="edit-age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-class">Class</Label>
              <Input
                id="edit-class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStudent?.name}? This action cannot be undone.
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
