import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2 } from "lucide-react"

export default function StaffPage() {
  const staff = [
    { id: 1, name: "Jennifer Adams", position: "undefined", email: "jennifer@school.com", phone: "555-0001" },
    { id: 2, name: "Robert Taylor", position: "undefined", email: "robert@school.com", phone: "555-0002" },
    { id: 3, name: "Lisa Garcia", position: "undefined", email: "lisa@school.com", phone: "555-0003" },
    { id: 4, name: "David Martinez", position: "undefined", email: "david@school.com", phone: "555-0004" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Staff</h1>
        <p className="text-muted-foreground">Manage administrative and support staff.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Staff</p>
            <p className="mt-2 text-3xl font-bold text-purple-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Positions</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">With Email</p>
            <p className="mt-2 text-3xl font-bold text-green-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">With Phone</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">4</p>
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
            <Button>Add Staff Member</Button>
          </div>

          {/* Section Header and Search */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Staff</h2>
            <Button variant="outline" size="sm">
              + Add Staff Member
            </Button>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search staff..." className="pl-9" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">NAME</th>
                  <th className="pb-3 font-medium">POSITION</th>
                  <th className="pb-3 font-medium">EMAIL</th>
                  <th className="pb-3 font-medium">PHONE</th>
                  <th className="pb-3 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((member) => (
                  <tr key={member.id} className="border-b border-border">
                    <td className="py-4">{member.id}</td>
                    <td className="py-4 font-medium">{member.name}</td>
                    <td className="py-4">
                      <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                        {member.position}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">{member.email}</td>
                    <td className="py-4 text-muted-foreground">{member.phone}</td>
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
