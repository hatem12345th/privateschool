"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  BookOpen, 
  Users, 
  GraduationCap,
  MapPin,
  Filter,
  Search
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ScheduleEvent {
  id: number
  title: string
  type: "class" | "meeting" | "exam" | "event"
  teacher?: string
  subject?: string
  location?: string
  startTime: string
  endTime: string
  date: string
  description?: string
  color: string
}

export default function SchedulePage() {
  const [view, setView] = useState<"week" | "month" | "day">("week")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: 1,
      title: "Mathematics - Grade 9A",
      type: "class",
      teacher: "Dr. Smith",
      subject: "Mathematics",
      location: "Room 101",
      startTime: "09:00",
      endTime: "10:30",
      date: "2024-01-15",
      description: "Algebra and Geometry",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Physics - Grade 10A",
      type: "class",
      teacher: "Prof. Johnson",
      subject: "Physics",
      location: "Lab 201",
      startTime: "10:45",
      endTime: "12:15",
      date: "2024-01-15",
      description: "Mechanics and Thermodynamics",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Faculty Meeting",
      type: "meeting",
      location: "Conference Room",
      startTime: "14:00",
      endTime: "15:30",
      date: "2024-01-15",
      description: "Weekly faculty meeting",
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Chemistry Exam",
      type: "exam",
      teacher: "Dr. Williams",
      subject: "Chemistry",
      location: "Room 103",
      startTime: "13:00",
      endTime: "15:00",
      date: "2024-01-16",
      description: "Midterm examination",
      color: "bg-red-500"
    }
  ])

  const [formData, setFormData] = useState({
    title: "",
    type: "class" as const,
    teacher: "",
    subject: "",
    location: "",
    startTime: "",
    endTime: "",
    date: "",
    description: ""
  })

  // Generate days for current week
  const generateWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return {
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        fullDate: date.toISOString().split('T')[0],
        isToday: date.toDateString() === new Date().toDateString()
      }
    })
  }

  const weekDays = generateWeekDays()

  // Time slots for the day view
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return `${hour}:00`
  })

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.teacher?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getEventsForDate = (date: string) => {
    return filteredEvents.filter(event => event.date === date)
  }

  const getEventsForTimeSlot = (date: string, timeSlot: string) => {
    return getEventsForDate(date).filter(event => {
      const eventStart = parseInt(event.startTime.split(':')[0])
      const slotHour = parseInt(timeSlot.split(':')[0])
      return eventStart === slotHour
    })
  }

  const handleAddEvent = () => {
    const newEvent: ScheduleEvent = {
      id: events.length + 1,
      title: formData.title,
      type: formData.type,
      teacher: formData.teacher,
      subject: formData.subject,
      location: formData.location,
      startTime: formData.startTime,
      endTime: formData.endTime,
      date: formData.date,
      description: formData.description,
      color: getColorForType(formData.type)
    }
    setEvents([...events, newEvent])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id
          ? {
              ...event,
              title: formData.title,
              type: formData.type,
              teacher: formData.teacher,
              subject: formData.subject,
              location: formData.location,
              startTime: formData.startTime,
              endTime: formData.endTime,
              date: formData.date,
              description: formData.description,
              color: getColorForType(formData.type)
            }
          : event
      )
      setEvents(updatedEvents)
      setIsEditDialogOpen(false)
      setSelectedEvent(null)
      resetForm()
    }
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const getColorForType = (type: string) => {
    switch (type) {
      case "class": return "bg-blue-500"
      case "meeting": return "bg-purple-500"
      case "exam": return "bg-red-500"
      case "event": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      type: "class",
      teacher: "",
      subject: "",
      location: "",
      startTime: "",
      endTime: "",
      date: "",
      description: ""
    })
  }

  const openEditDialog = (event: ScheduleEvent) => {
    setSelectedEvent(event)
    setFormData({
      title: event.title,
      type: event.type,
      teacher: event.teacher || "",
      subject: event.subject || "",
      location: event.location || "",
      startTime: event.startTime,
      endTime: event.endTime,
      date: event.date,
      description: event.description || ""
    })
    setIsEditDialogOpen(true)
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7))
    setCurrentDate(newDate)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "class": return <BookOpen className="h-4 w-4" />
      case "meeting": return <Users className="h-4 w-4" />
      case "exam": return <GraduationCap className="h-4 w-4" />
      case "event": return <Calendar className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Schedule
        </h1>
        <p className="text-lg text-muted-foreground">View and manage school schedules and events.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border bg-gradient-to-br from-primary/15 to-primary/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-4xl font-bold tracking-tight">{events.length}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 transition-transform group-hover:scale-110">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-blue-500/15 to-blue-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Classes</p>
                <p className="text-4xl font-bold tracking-tight">{events.filter(e => e.type === 'class').length}</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3 transition-transform group-hover:scale-110">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-purple-500/15 to-purple-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Meetings</p>
                <p className="text-4xl font-bold tracking-tight">{events.filter(e => e.type === 'meeting').length}</p>
              </div>
              <div className="rounded-lg bg-purple-500/10 p-3 transition-transform group-hover:scale-110">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border bg-gradient-to-br from-red-500/15 to-red-500/5 transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Exams</p>
                <p className="text-4xl font-bold tracking-tight">{events.filter(e => e.type === 'exam').length}</p>
              </div>
              <div className="rounded-lg bg-red-500/10 p-3 transition-transform group-hover:scale-110">
                <GraduationCap className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls and Search */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigateWeek('prev')}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold">
                Week of {currentDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => navigateWeek('next')}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={view === "day" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("day")}
                >
                  Day
                </Button>
                <Button
                  variant={view === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("week")}
                >
                  Week
                </Button>
                <Button
                  variant={view === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("month")}
                >
                  Month
                </Button>
              </div>
              
              <Button className="gap-2 shadow-sm" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          {view === "week" ? (
            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day) => (
                <div key={day.date} className="space-y-2">
                  <div className={`text-center p-2 rounded-lg ${day.isToday ? 'bg-primary text-primary-foreground' : 'bg-muted/50'}`}>
                    <div className="text-sm font-medium">{day.name}</div>
                    <div className="text-lg font-bold">{day.date}</div>
                  </div>
                  <div className="h-96 rounded-lg border border-border bg-card p-2 space-y-2 overflow-y-auto">
                    {getEventsForDate(day.fullDate).map((event) => (
                      <div
                        key={event.id}
                        className={`${event.color} text-white p-2 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity`}
                        onClick={() => openEditDialog(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-xs opacity-90">
                          {event.startTime} - {event.endTime}
                        </div>
                        {event.location && (
                          <div className="text-xs opacity-75 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : view === "day" ? (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </h3>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2 space-y-2">
                  {timeSlots.slice(8, 18).map((time) => (
                    <div key={time} className="h-16 flex items-center justify-end pr-2 text-sm text-muted-foreground">
                      {time}
                    </div>
                  ))}
                </div>
                <div className="col-span-10 space-y-2">
                  {timeSlots.slice(8, 18).map((time) => {
                    const dayEvents = getEventsForTimeSlot(weekDays[0].fullDate, time)
                    return (
                      <div key={time} className="h-16 border-b border-border relative">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`${event.color} text-white p-2 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity absolute inset-1`}
                            onClick={() => openEditDialog(event)}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-xs opacity-90">
                              {event.startTime} - {event.endTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Month View</h3>
              <p className="text-muted-foreground">Month view will be implemented soon.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event in the schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="type">Event Type</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
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
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            {formData.type === "class" && (
              <>
                <div>
                  <Label htmlFor="teacher">Teacher</Label>
                  <Input
                    id="teacher"
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Modify the event details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Event Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Event Type</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-startTime">Start Time</Label>
                <Input
                  id="edit-startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-endTime">End Time</Label>
                <Input
                  id="edit-endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
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
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            {formData.type === "class" && (
              <>
                <div>
                  <Label htmlFor="edit-teacher">Teacher</Label>
                  <Input
                    id="edit-teacher"
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-subject">Subject</Label>
                  <Input
                    id="edit-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedEvent) {
                  handleDeleteEvent(selectedEvent.id)
                  setIsEditDialogOpen(false)
                  setSelectedEvent(null)
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
            <Button onClick={handleEditEvent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}