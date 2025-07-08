"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Star,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Eye,
  ThumbsUp,
  Calendar,
  Award,
  Target,
  Users,
} from "lucide-react"
import Link from "next/link"
import { ProviderLayout } from "@/components/provider-layout"

export default function ProviderDashboard() {
  // Mock data
  const stats = {
    activeProjects: 4,
    completedProjects: 23,
    totalEarnings: 85000,
    rating: 4.9,
    responseRate: 98,
    profileViews: 156,
  }

  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Platform Development",
      client: "TechStart Sdn Bhd",
      budget: 18000,
      progress: 75,
      deadline: "2024-02-20",
      status: "in_progress",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      client: "Digital Solutions",
      budget: 8000,
      progress: 45,
      deadline: "2024-02-15",
      status: "in_progress",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const recentOpportunities = [
    {
      id: 1,
      title: "React Native Food Delivery App",
      budget: "RM 15,000 - RM 20,000",
      skills: ["React Native", "Node.js", "MongoDB"],
      postedTime: "2 hours ago",
      matchScore: 95,
      proposals: 3,
    },
    {
      id: 2,
      title: "Cloud Migration Services",
      budget: "RM 25,000 - RM 35,000",
      skills: ["AWS", "Docker", "Kubernetes"],
      postedTime: "5 hours ago",
      matchScore: 88,
      proposals: 7,
    },
    {
      id: 3,
      title: "Corporate Website Redesign",
      budget: "RM 8,000 - RM 12,000",
      skills: ["Next.js", "Tailwind CSS", "Figma"],
      postedTime: "1 day ago",
      matchScore: 82,
      proposals: 12,
    },
  ]

  const recentMessages = [
    {
      id: 1,
      client: "Ahmad Rahman",
      project: "E-commerce Platform",
      message: "Great progress on the dashboard! Can we schedule a review call?",
      time: "10 minutes ago",
      unread: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      client: "Sarah Tech Solutions",
      project: "Mobile App Design",
      message: "The wireframes look perfect. Please proceed with the next phase.",
      time: "2 hours ago",
      unread: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100"
    return "text-yellow-600 bg-yellow-100"
  }

  return (
    <ProviderLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your business overview.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/provider/profile">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </Link>
            <Link href="/provider/opportunities">
              <Button>
                <Target className="w-4 h-4 mr-2" />
                Browse Jobs
              </Button>
            </Link>
          </div>
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
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">RM{stats.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.profileViews}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Projects */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Projects</CardTitle>
                  <Link href="/provider/projects">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={project.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{project.client.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.title}</h4>
                          <p className="text-sm text-gray-600">{project.client}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                            <span className="text-xs text-gray-500">
                              Due: {new Date(project.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">RM{project.budget.toLocaleString()}</p>
                        <div className="mt-2 w-24">
                          <Progress value={project.progress} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{project.progress}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Opportunities */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recommended Opportunities</CardTitle>
                  <Link href="/provider/opportunities">
                    <Button variant="outline" size="sm">
                      Browse All
                    </Button>
                  </Link>
                </div>
                <CardDescription>AI-matched projects based on your skills and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOpportunities.map((opportunity) => (
                    <div key={opportunity.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{opportunity.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{opportunity.budget}</p>
                        </div>
                        <Badge className={`${getMatchScoreColor(opportunity.matchScore)} font-semibold`}>
                          {opportunity.matchScore}% match
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {opportunity.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{opportunity.postedTime}</span>
                          <span>{opportunity.proposals} proposals</span>
                        </div>
                        <Button size="sm">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Submit Proposal
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="font-semibold">{stats.responseRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed Projects</span>
                  <span className="font-semibold">{stats.completedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Repeat Clients</span>
                  <span className="font-semibold">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">On-time Delivery</span>
                  <span className="font-semibold">94%</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Messages</CardTitle>
                  <Link href="/provider/messages">
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.client.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900 truncate">{message.client}</p>
                          {message.unread && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                        </div>
                        <p className="text-xs text-gray-500">{message.project}</p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{message.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/provider/profile/edit">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                </Link>
                <Link href="/provider/portfolio">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Manage Portfolio
                  </Button>
                </Link>
                <Link href="/provider/availability">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Set Availability
                  </Button>
                </Link>
                <Link href="/provider/earnings">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <DollarSign className="w-4 h-4 mr-2" />
                    View Earnings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProviderLayout>
  )
}
