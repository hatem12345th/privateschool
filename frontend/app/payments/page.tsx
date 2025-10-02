import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2 } from "lucide-react"

export default function PaymentsPage() {
  const payments = [
    { id: 1, student: "Alice Johnson", amount: "$1200.00", date: "2024-01-10", status: "Paid" },
    { id: 2, student: "Bob Smith", amount: "$1200.00", date: "2024-01-12", status: "Paid" },
    { id: 3, student: "Charlie Brown", amount: "$1200.00", date: "2024-01-15", status: "Pending" },
    { id: 4, student: "Diana Prince", amount: "$800.00", date: "2024-01-08", status: "Paid" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">Track tuition payments and financial records.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="mt-2 text-3xl font-bold text-green-600">$4400.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Paid Amount</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">$3200.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="mt-2 text-3xl font-bold text-red-600">0</p>
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
            <Button>Add Payment</Button>
          </div>

          {/* Section Header and Search */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Payments</h2>
            <Button variant="outline" size="sm">
              + Add Payment
            </Button>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search payments..." className="pl-9" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">STUDENT</th>
                  <th className="pb-3 font-medium">AMOUNT</th>
                  <th className="pb-3 font-medium">DATE</th>
                  <th className="pb-3 font-medium">STATUS</th>
                  <th className="pb-3 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-border">
                    <td className="py-4">{payment.id}</td>
                    <td className="py-4 font-medium">{payment.student}</td>
                    <td className="py-4 text-muted-foreground">{payment.amount}</td>
                    <td className="py-4 text-muted-foreground">{payment.date}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                          payment.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
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
