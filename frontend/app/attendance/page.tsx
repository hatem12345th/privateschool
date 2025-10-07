"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Edit, Trash2, ClipboardCheck, CheckCircle, XCircle, TrendingUp, TableIcon, LayoutGrid, Plus, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AttendanceRecord {
  id: number
  student: string
  date: string
  status: "Present" | "Absent"
}

export default function AttendancePage() {
  const [view, setView] = useState<"table" | "cards">("table")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null)
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    { id: 1, student: "Alice Johnson", date: "2024-01-15", status: "Present" },
    { id: 2, student: "Bob Smith", date: "2024-01-15", status: "Present" },
    { id: 3, student: "Charlie Brown", date: "2024-01-15", status: "Absent" },
    { id: 4, student: "Diana Prince", date: "2024-01-15", status: "Present" },
  ])

  const [formData, setFormData] = useState({
    student: "",
    date: "",
    status: "Present" as "Present" | "Absent"
  })

  // Sample students list
  const students = [
    "Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince", 
    "Eva Wilson", "Frank Miller", "Grace Davis", "Henry Taylor"
  ]

  const filteredAttendance = attendance.filter(record =>
    record.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.date.includes(searchQuery) ||
    record.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleAddAttendance = () => {
    const newRecord: AttendanceRecord = {
      id: attendance.length + 1,
      student: formData.student,
      date: formData.date,
      status: formData.status
    }
    setAttendance([...attendance, newRecord])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditAttendance = () => {
    if (selectedRecord) {
      const updatedAttendance = attendance.map(record =>
        record.id === selectedRecord.id
          ? {
              ...record,
              student: formData.student,
              date: formData.date,
              status: formData.status
            }
          : record
      )
      setAttendance(updatedAttendance)
      setIsEditDialogOpen(false)
      setSelectedRecord(null)
      resetForm()
    }
  }

  const handleDeleteAttendance = (id: number) => {
    setAttendance(attendance.filter(record => record.id !== id))
  }

  const openEditDialog = (record: AttendanceRecord) => {
    setSelectedRecord(record)
    setFormData({
      student: record.student,
      date: record.date,
      status: record.status
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      student: "",
      date: "",
      status: "Present"
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Attendance</h1>
        <p className="text-muted-foreground">Track student attendance and participation.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-primary/15 to-primary/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Records</p>
                <p className="text-4xl font-bold tracking-tight">4</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 transition-transform group-hover:scale-110">
                <ClipboardCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-success/15 to-success/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Present</p>
                <p className="text-4xl font-bold tracking-tight">3</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3 transition-transform group-hover:scale-110">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-red-500/15 to-red-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Absent</p>
                <p className="text-4xl font-bold tracking-tight">1</p>
              </div>
              <div className="rounded-lg bg-red-500/10 p-3 transition-transform group-hover:scale-110">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-blue-500/15 to-blue-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <p className="text-4xl font-bold tracking-tight">75%</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3 transition-transform group-hover:scale-110">
                <TrendingUp className="h-6 w-6 text-blue-600" />
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
                Add Attendance
              </Button>
          </div>

          {/* Section Header and Search */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Attendance Records</h2>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search attendance..."
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
                    <th className="p-4 font-medium">STUDENT</th>
                    <th className="p-4 font-medium">DATE</th>
                    <th className="p-4 font-medium">STATUS</th>
                    <th className="p-4 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((record) => (
                    <tr key={record.id} className="border-b border-border transition-colors hover:bg-muted/30">
                      <td className="p-4">{record.id}</td>
                      <td className="p-4 font-medium">{record.student}</td>
                      <td className="p-4 text-muted-foreground">{record.date}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                            record.status === "Present" 
                              ? "bg-success/10 text-success" 
                              : "bg-red-500/10 text-red-600"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-primary/10 hover:text-primary"
                            onClick={() => openEditDialog(record)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeleteAttendance(record.id)}
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
              {filteredAttendance.map((record) => (
                <Card key={record.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Student Avatar */}
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-2xl font-bold text-white shadow-lg">
                        {getInitials(record.student)}
                      </div>

                      {/* Attendance Info */}
                      <div className="w-full space-y-3 text-center">
                        <div>
                          <h3 className="text-lg font-semibold text-balance">{record.student}</h3>
                          <p className="text-sm text-muted-foreground">Record ID: {record.id}</p>
                        </div>

                        <div className="flex justify-center">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                              record.status === "Present" 
                                ? "bg-success/10 text-success" 
                                : "bg-red-500/10 text-red-600"
                            }`}
                          >
                            {record.status}
                          </span>
                        </div>

                        {/* Date Info */}
                        <div className="space-y-2 border-t pt-3">
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{record.date}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 border-t pt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 hover:bg-primary/10 hover:text-primary"
                            onClick={() => openEditDialog(record)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeleteAttendance(record.id)}
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

      {/* Add Attendance Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Attendance Record</DialogTitle>
            <DialogDescription>
              Record a new attendance entry for a student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="student">Student</Label>
              <Select value={formData.student} onValueChange={(value) => setFormData({ ...formData, student: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student} value={student}>
                      {student}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: "Present" | "Absent") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAttendance}>Add Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Attendance Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Attendance Record</DialogTitle>
            <DialogDescription>
              Modify the attendance record details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-student">Student</Label>
              <Select value={formData.student} onValueChange={(value) => setFormData({ ...formData, student: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student} value={student}>
                      {student}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value: "Present" | "Absent") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedRecord) {
                  handleDeleteAttendance(selectedRecord.id)
                  setIsEditDialogOpen(false)
                  setSelectedRecord(null)
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
            <Button onClick={handleEditAttendance}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
