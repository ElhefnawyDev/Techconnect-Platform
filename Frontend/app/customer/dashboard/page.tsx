"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Plus, CheckCircle, DollarSign, Briefcase, TrendingUp, MessageSquare, Star, MapPin } from "lucide-react"
import Link from "next/link"
import { CustomerLayout } from "@/components/customer-layout"

export default function CustomerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const stats = {
    activeProjects: 3,
    completedProjects: 12,
    totalSpent: 45000,
    avgRating: 4.8,
  }

  const recentProjects = [
    {
      id: 1,
      title: "E-commerce Mobile App",
      provider: "Ahmad Tech Solutions",
      status: "in_progress",
      progress: 65,
      budget: 15000,
      deadline: "2024-02-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Company Website Redesign",
      provider: "Digital Craft Studio",
      status: "completed",
      progress: 100,
      budget: 8000,
      deadline: "2024-01-20",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "Cloud Migration Services",
      provider: "CloudTech Malaysia",
      status: "pending",
      progress: 0,
      budget: 22000,
      deadline: "2024-03-01",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const recommendedProviders = [
    {
      id: 1,
      name: "Sarah Lim",
      specialty: "Mobile App Development",
      rating: 4.9,
      completedJobs: 45,
      hourlyRate: 120,
      location: "Kuala Lumpur",
      avatar: "/placeholder.svg?height=60&width=60",
      skills: ["React Native", "Flutter", "iOS", "Android"],
    },
    {
      id: 2,
      name: "Tech Innovators Sdn Bhd",
      specialty: "Web Development",
      rating: 4.8,
      completedJobs: 78,
      hourlyRate: 150,
      location: "Selangor",
      avatar: "/placeholder.svg?height=60&width=60",
      skills: ["Next.js", "React", "Node.js", "AWS"],
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
      default:
        return status
    }
  }

  return (
    <CustomerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
          </div>
          <Link href="/customer/projects/new">
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedProjects}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">RM{stats.totalSpent.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Projects</CardTitle>
                  <Link href="/customer/projects">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={project.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{project.provider.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.title}</h4>
                          <p className="text-sm text-gray-600">{project.provider}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                            <span className="text-xs text-gray-500">
                              Due: {new Date(project.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">RM{project.budget.toLocaleString()}</p>
                        {project.status === "in_progress" && (
                          <div className="mt-2 w-24">
                            <Progress value={project.progress} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">{project.progress}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Providers */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Providers</CardTitle>
                <CardDescription>Top-rated ICT professionals for your next project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedProviders.map((provider) => (
                    <div key={provider.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={provider.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{provider.name}</h4>
                          <p className="text-sm text-gray-600">{provider.specialty}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{provider.rating}</span>
                            <span className="text-sm text-gray-500">({provider.completedJobs} jobs)</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{provider.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {provider.skills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {provider.skills.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{provider.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-blue-600 mt-2">RM{provider.hourlyRate}/hour</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  ))}
                </div>
                <Link href="/customer/providers">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Browse All Providers
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
