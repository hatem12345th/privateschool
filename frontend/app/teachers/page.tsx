"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Edit,
  Trash2,
  Plus,
  Users,
  BookOpen,
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

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Dr. Sarah Miller", subject: "Mathematics", email: "sarah@school.com", phone: "555-0101" },
    { id: 2, name: "Prof. John Davis", subject: "Physics", email: "john@school.com", phone: "555-0102" },
    { id: 3, name: "Ms. Emily Chen", subject: "English", email: "emily@school.com", phone: "555-0103" },
    { id: 4, name: "Mr. Michael Brown", subject: "History", email: "michael@school.com", phone: "555-0104" },
  ])

  const [view, setView] = useState<"table" | "cards">("table")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
  })

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAdd = () => {
    const newTeacher = {
      id: teachers.length + 1,
      name: formData.name,
      subject: formData.subject,
      email: formData.email,
      phone: formData.phone,
    }
    setTeachers([...teachers, newTeacher])
    setIsAddDialogOpen(false)
    setFormData({ name: "", subject: "", email: "", phone: "" })
  }

  const handleEdit = () => {
    setTeachers(teachers.map((t) => (t.id === selectedTeacher.id ? { ...t, ...formData } : t)))
    setIsEditDialogOpen(false)
    setSelectedTeacher(null)
    setFormData({ name: "", subject: "", email: "", phone: "" })
  }

  const handleDelete = () => {
    setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id))
    setIsDeleteDialogOpen(false)
    setSelectedTeacher(null)
  }

  const openEditDialog = (teacher: any) => {
    setSelectedTeacher(teacher)
    setFormData({
      name: teacher.name,
      subject: teacher.subject,
      email: teacher.email,
      phone: teacher.phone,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (teacher: any) => {
    setSelectedTeacher(teacher)
    setIsDeleteDialogOpen(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Teachers</h1>
        <p className="text-muted-foreground">Manage teaching staff and their subjects.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Teachers</p>
                <p className="text-4xl font-bold tracking-tight">{teachers.length}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 transition-transform group-hover:scale-110">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-success/5 to-transparent transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Subjects</p>
                <p className="text-4xl font-bold tracking-tight">{new Set(teachers.map((t) => t.subject)).size}</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3 transition-transform group-hover:scale-110">
                <BookOpen className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-warning/5 to-transparent transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">PhD Holders</p>
                <p className="text-4xl font-bold tracking-tight">
                  {teachers.filter((t) => t.name.startsWith("Dr.") || t.name.startsWith("Prof.")).length}
                </p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3 transition-transform group-hover:scale-110">
                <GraduationCap className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-info/5 to-transparent transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">With Email</p>
                <p className="text-4xl font-bold tracking-tight">{teachers.filter((t) => t.email).length}</p>
              </div>
              <div className="rounded-lg bg-info/10 p-3 transition-transform group-hover:scale-110">
                <Mail className="h-6 w-6 text-info" />
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
              Add Teacher
            </Button>
          </div>

          {/* Section Header and Search */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Teachers</h2>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search teachers..."
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
                    <th className="p-4 font-medium">SUBJECT</th>
                    <th className="p-4 font-medium">EMAIL</th>
                    <th className="p-4 font-medium">PHONE</th>
                    <th className="p-4 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-border transition-colors hover:bg-muted/30">
                      <td className="p-4">{teacher.id}</td>
                      <td className="p-4 font-medium">{teacher.name}</td>
                      <td className="p-4">
                        <span className="inline-flex rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                          {teacher.subject}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{teacher.email}</td>
                      <td className="p-4 text-muted-foreground">{teacher.phone}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(teacher)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(teacher)}
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
              {filteredTeachers.map((teacher) => (
                <Card key={teacher.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Avatar */}
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-2xl font-bold text-white shadow-lg">
                        {getInitials(teacher.name)}
                      </div>

                      {/* Teacher Info */}
                      <div className="w-full space-y-3 text-center">
                        <div>
                          <h3 className="text-lg font-semibold text-balance">{teacher.name}</h3>
                        </div>

                        <div className="flex justify-center">
                          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                            <BookOpen className="h-3 w-3" />
                            {teacher.subject}
                          </span>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 border-t pt-3">
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span className="truncate">{teacher.email}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{teacher.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex w-full gap-2 border-t pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 bg-transparent"
                          onClick={() => openEditDialog(teacher)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                          onClick={() => openDeleteDialog(teacher)}
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

      {/* Add Teacher Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>Enter the teacher's information below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter teacher name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g., Mathematics"
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
            <Button onClick={handleAdd}>Add Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Teacher Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>Update the teacher's information below.</DialogDescription>
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
              <Label htmlFor="edit-subject">Subject</Label>
              <Input
                id="edit-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
            <DialogTitle>Delete Teacher</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedTeacher?.name}? This action cannot be undone.
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
