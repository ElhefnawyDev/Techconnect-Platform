"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Eye, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"
import { CustomerLayout } from "@/components/customer-layout"

export default function CustomerProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const projects = [
    {
      id: 1,
      title: "E-commerce Mobile App",
      description: "React Native app for online marketplace with payment integration",
      provider: "Ahmad Tech Solutions",
      status: "in_progress",
      progress: 65,
      budget: 15000,
      spent: 9750,
      deadline: "2024-02-15",
      startDate: "2024-01-01",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Mobile Development",
      milestones: 4,
      completedMilestones: 2,
    },
    {
      id: 2,
      title: "Company Website Redesign",
      description: "Modern responsive website with CMS integration",
      provider: "Digital Craft Studio",
      status: "completed",
      progress: 100,
      budget: 8000,
      spent: 8000,
      deadline: "2024-01-20",
      startDate: "2023-12-01",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Web Development",
      milestones: 3,
      completedMilestones: 3,
    },
    {
      id: 3,
      title: "Cloud Migration Services",
      description: "Migrate existing infrastructure to AWS cloud platform",
      provider: "CloudTech Malaysia",
      status: "pending",
      progress: 0,
      budget: 22000,
      spent: 0,
      deadline: "2024-03-01",
      startDate: "2024-02-01",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Cloud Services",
      milestones: 5,
      completedMilestones: 0,
    },
    {
      id: 4,
      title: "Data Analytics Dashboard",
      description: "Business intelligence dashboard with real-time analytics",
      provider: "DataViz Solutions",
      status: "in_progress",
      progress: 30,
      budget: 12000,
      spent: 3600,
      deadline: "2024-02-28",
      startDate: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Data Analytics",
      milestones: 4,
      completedMilestones: 1,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "on_hold":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in_progress":
        return "In Progress"
      case "pending":
        return "Pending"
      case "on_hold":
        return "On Hold"
      default:
        return status
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.provider.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <CustomerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
            <p className="text-gray-600">Manage and track all your ICT projects</p>
          </div>
          <Link href="/customer/projects/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects Tabs */}
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription className="mt-1">{project.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={project.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{project.provider.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{project.provider}</p>
                        <p className="text-xs text-gray-500">{project.category}</p>
                      </div>
                    </div>

                    {project.status === "in_progress" && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Budget</p>
                        <p className="font-semibold">RM{project.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Spent</p>
                        <p className="font-semibold">RM{project.spent.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </div>
                      <span>
                        {project.completedMilestones}/{project.milestones} milestones
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <Avatar>
                            <AvatarImage src={project.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{project.provider.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-semibold text-gray-900">{project.title}</h3>
                              <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{project.provider}</span>
                              <span>•</span>
                              <span>{project.category}</span>
                              <span>•</span>
                              <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Budget</p>
                            <p className="font-semibold">RM{project.budget.toLocaleString()}</p>
                          </div>
                          {project.status === "in_progress" && (
                            <div className="w-24">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
