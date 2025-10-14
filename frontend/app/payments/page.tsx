"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Edit, Trash2, DollarSign, CheckCircle, Clock, AlertCircle, TableIcon, LayoutGrid, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { api } from "@/lib/axios"

interface Payment {
  id: number
  student: string
  amount: string
  date: string
  status: "Paid" | "Pending" | "Overdue"
}

export default function PaymentsPage() {
  const [view, setView] = useState<"table" | "cards">("table")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])

  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    date: "",
    status: "Pending" as "Paid" | "Pending" | "Overdue"
  })

  // Sample students list
  const students = [
    "Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince", 
    "Eva Wilson", "Frank Miller", "Grace Davis", "Henry Taylor"
  ]
  const filteredPayments = payments.filter(payment =>
    (payment.student?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (payment.amount?.toString() || "").includes(searchQuery) ||
    (payment.date?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (payment.status?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  )
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleAddPayment = async () => {
    const newPayment: Payment = {
      id: payments.length + 1,
      student: formData.student,
      amount: formData.amount,
      date: formData.date,
      status: formData.status
    }
    await api.post("/payment",newPayment)
    fetchPayment()
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditPayment = async () => {
    if (selectedPayment) {
      const updatedPayments = payments.map(payment =>
        payment.id === selectedPayment.id
          ? {
              ...payment,
              student: formData.student,
              amount: formData.amount,
              date: formData.date,
              status: formData.status
            }
          : payment
      )
      await api.put(`"/payments/"${selectedPayment.id}`)
      fetchPayment()
      setIsEditDialogOpen(false)
      setSelectedPayment(null)
      resetForm()
    }
  }

  const handleDeletePayment = async (id: number) => {
    
    setPayments(payments.filter(payment => payment.id !== id))
  
    try {
      await api.delete(`/payments/${id}`)
    } catch (error) {
      console.error("Error deleting payment:", error)
      
      await fetchPayment()
    }
  }
  

  const openEditDialog = (payment: Payment) => {
    setSelectedPayment(payment)
    setFormData({
      student: payment.student,
      amount: payment.amount,
      date: payment.date,
      status: payment.status
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      student: "",
      amount: "",
      date: "",
      status: "Pending"
    })
  }


  const fetchPayment= async () => {
    try {
      const data  = await api.get('/students');
      setPayments(data.data);         
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  
  }

  useEffect(() => {
  
    fetchPayment()
  },[])



  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">Track tuition payments and financial records.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-success/15 to-success/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="text-4xl font-bold tracking-tight">$4400.00</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3 transition-transform group-hover:scale-110">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-blue-500/15 to-blue-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Paid Amount</p>
                <p className="text-4xl font-bold tracking-tight">$3200.00</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3 transition-transform group-hover:scale-110">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-warning/15 to-warning/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-4xl font-bold tracking-tight">1</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3 transition-transform group-hover:scale-110">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-red-500/15 to-red-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-4xl font-bold tracking-tight">0</p>
              </div>
              <div className="rounded-lg bg-red-500/10 p-3 transition-transform group-hover:scale-110">
                <AlertCircle className="h-6 w-6 text-red-600" />
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
                Add Payment
              </Button>
          </div>

          {/* Section Header and Search */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Payments</h2>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payments..."
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
                    <th className="p-4 font-medium">AMOUNT</th>
                    <th className="p-4 font-medium">DATE</th>
                    <th className="p-4 font-medium">STATUS</th>
                    <th className="p-4 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-border transition-colors hover:bg-muted/30">
                      <td className="p-4">{payment.id}</td>
                      <td className="p-4 font-medium">{payment.student}</td>
                      <td className="p-4 font-bold text-success">{payment.amount}</td>
                      <td className="p-4 text-muted-foreground">{payment.date}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                            payment.status === "Paid"
                              ? "bg-success/10 text-success"
                              : payment.status === "Pending"
                              ? "bg-warning/10 text-warning"
                              : "bg-red-500/10 text-red-600"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-primary/10 hover:text-primary"
                            onClick={() => openEditDialog(payment)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeletePayment(payment.id)}
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
              {filteredPayments.map((payment) => (
                <Card key={payment.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Student Avatar */}
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-2xl font-bold text-white shadow-lg">
                        {getInitials(payment.student)}
                      </div>

                      {/* Payment Info */}
                      <div className="w-full space-y-3 text-center">
                        <div>
                          <h3 className="text-lg font-semibold text-balance">{payment.student}</h3>
                          <p className="text-sm text-muted-foreground">Payment ID: {payment.id}</p>
                        </div>

                        <div className="flex justify-center">
                          <span className="inline-flex rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                            {payment.amount}
                          </span>
                        </div>

                        <div className="flex justify-center">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                              payment.status === "Paid"
                                ? "bg-success/10 text-success"
                                : payment.status === "Pending"
                                ? "bg-warning/10 text-warning"
                                : "bg-red-500/10 text-red-600"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </div>

                        {/* Date Info */}
                        <div className="space-y-2 border-t pt-3">
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{payment.date}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 border-t pt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 hover:bg-primary/10 hover:text-primary"
                            onClick={() => openEditDialog(payment)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeletePayment(payment.id)}
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

      {/* Add Payment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Record</DialogTitle>
            <DialogDescription>
              Record a new payment for a student.
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
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="$0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
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
              <Select value={formData.status} onValueChange={(value: "Paid" | "Pending" | "Overdue") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPayment}>Add Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Payment Record</DialogTitle>
            <DialogDescription>
              Modify the payment record details.
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
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-amount"
                placeholder="$0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
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
              <Select value={formData.status} onValueChange={(value: "Paid" | "Pending" | "Overdue") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedPayment) {
                  handleDeletePayment(selectedPayment.id)
                  setIsEditDialogOpen(false)
                  setSelectedPayment(null)
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
            <Button onClick={handleEditPayment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}