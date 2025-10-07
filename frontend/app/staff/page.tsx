"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2, Briefcase, Users, Mail, Phone, TableIcon, LayoutGrid, Plus } from "lucide-react"

interface Staff {
  id: number
  name: string
  position: string
  email: string
  phone: string
}

export default function StaffPage() {
  const [view, setView] = useState<"table" | "cards">("table")
  const [searchQuery, setSearchQuery] = useState("")
  const [staff, setStaff] = useState<Staff[]>([
    { id: 1, name: "Jennifer Adams", position: "Administrator", email: "jennifer@school.com", phone: "555-0001" },
    { id: 2, name: "Robert Taylor", position: "Administrator", email: "robert@school.com", phone: "555-0002" },
    { id: 3, name: "Maria Garcia", position: "Administrator", email: "maria@school.com", phone: "555-0003" },
    { id: 4, name: "David Wilson", position: "Administrator", email: "david@school.com", phone: "555-0004" },
  ])

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone.includes(searchQuery)
  )

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
        <h1 className="text-3xl font-bold">Staff</h1>
        <p className="text-muted-foreground">Manage administrative and support staff.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-primary/15 to-primary/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
                <p className="text-4xl font-bold tracking-tight">4</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 transition-transform group-hover:scale-110">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-blue-500/15 to-blue-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Positions</p>
                <p className="text-4xl font-bold tracking-tight">1</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3 transition-transform group-hover:scale-110">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-success/15 to-success/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">With Email</p>
                <p className="text-4xl font-bold tracking-tight">4</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3 transition-transform group-hover:scale-110">
                <Mail className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-warning/15 to-warning/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">With Phone</p>
                <p className="text-4xl font-bold tracking-tight">4</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3 transition-transform group-hover:scale-110">
                <Phone className="h-6 w-6 text-warning" />
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
            <Button className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              Add Staff Member
            </Button>
          </div>

          {/* Section Header and Search */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Staff</h2>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search staff..."
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
                    <th className="p-4 font-medium">POSITION</th>
                    <th className="p-4 font-medium">EMAIL</th>
                    <th className="p-4 font-medium">PHONE</th>
                    <th className="p-4 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((member) => (
                    <tr key={member.id} className="border-b border-border transition-colors hover:bg-muted/30">
                      <td className="p-4">{member.id}</td>
                      <td className="p-4 font-medium">{member.name}</td>
                      <td className="p-4">
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {member.position}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{member.email}</td>
                      <td className="p-4 text-muted-foreground">{member.phone}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
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
              {filteredStaff.map((member) => (
                <Card key={member.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Staff Avatar */}
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-2xl font-bold text-white shadow-lg">
                        {getInitials(member.name)}
                      </div>

                      {/* Staff Info */}
                      <div className="w-full space-y-3 text-center">
                        <div>
                          <h3 className="text-lg font-semibold text-balance">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">Staff ID: {member.id}</p>
                        </div>

                        <div className="flex justify-center">
                          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            {member.position}
                          </span>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 border-t pt-3">
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{member.email}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{member.phone}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 border-t pt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 hover:bg-primary/10 hover:text-primary"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
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
    </div>
  )
}