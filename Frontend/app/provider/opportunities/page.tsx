"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ThumbsUp, Eye, Clock, DollarSign, Users, MapPin, Zap } from "lucide-react"
import { ProviderLayout } from "@/components/provider-layout"

export default function ProviderOpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const opportunities = [
    {
      id: 1,
      title: "React Native Food Delivery App",
      description:
        "Build a comprehensive food delivery mobile application with real-time tracking, payment integration, and restaurant management system.",
      client: "FoodTech Startup",
      budget: "RM 15,000 - RM 20,000",
      budgetType: "fixed",
      timeline: "8-10 weeks",
      skills: ["React Native", "Node.js", "MongoDB", "Payment Gateway", "Real-time"],
      postedTime: "2 hours ago",
      matchScore: 95,
      proposals: 3,
      category: "Mobile Development",
      location: "Kuala Lumpur",
      clientRating: 4.8,
      clientJobs: 12,
      avatar: "/placeholder.svg?height=40&width=40",
      urgent: false,
      verified: true,
    },
    {
      id: 2,
      title: "Cloud Migration Services",
      description:
        "Migrate existing on-premise infrastructure to AWS cloud platform. Includes database migration, security setup, and performance optimization.",
      client: "Manufacturing Corp",
      budget: "RM 25,000 - RM 35,000",
      budgetType: "fixed",
      timeline: "12-16 weeks",
      skills: ["AWS", "Docker", "Kubernetes", "DevOps", "Database Migration"],
      postedTime: "5 hours ago",
      matchScore: 88,
      proposals: 7,
      category: "Cloud Services",
      location: "Selangor",
      clientRating: 4.9,
      clientJobs: 25,
      avatar: "/placeholder.svg?height=40&width=40",
      urgent: true,
      verified: true,
    },
    {
      id: 3,
      title: "Corporate Website Redesign",
      description: "Complete redesign of corporate website with modern UI/UX, CMS integration, and SEO optimization.",
      client: "Legal Firm KL",
      budget: "RM 8,000 - RM 12,000",
      budgetType: "fixed",
      timeline: "6-8 weeks",
      skills: ["Next.js", "Tailwind CSS", "Figma", "CMS", "SEO"],
      postedTime: "1 day ago",
      matchScore: 82,
      proposals: 12,
      category: "Web Development",
      location: "Kuala Lumpur",
      clientRating: 4.6,
      clientJobs: 8,
      avatar: "/placeholder.svg?height=40&width=40",
      urgent: false,
      verified: true,
    },
    {
      id: 4,
      title: "IoT Smart Home System",
      description:
        "Develop IoT solution for smart home automation including mobile app, hardware integration, and cloud backend.",
      client: "PropTech Solutions",
      budget: "RM 30,000 - RM 45,000",
      budgetType: "fixed",
      timeline: "16-20 weeks",
      skills: ["IoT", "Arduino", "React Native", "AWS IoT", "MQTT"],
      postedTime: "2 days ago",
      matchScore: 75,
      proposals: 5,
      category: "IoT Solutions",
      location: "Penang",
      clientRating: 4.7,
      clientJobs: 15,
      avatar: "/placeholder.svg?height=40&width=40",
      urgent: false,
      verified: true,
    },
  ]

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-gray-600 bg-gray-100"
  }

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory =
      categoryFilter === "all" || opportunity.category.toLowerCase().includes(categoryFilter.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <ProviderLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Opportunities</h1>
            <p className="text-gray-600">Discover projects that match your skills and expertise</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
            <Button>
              <Zap className="w-4 h-4 mr-2" />
              AI Recommendations
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search opportunities by title, client, or skills..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="mobile">Mobile Development</SelectItem>
                  <SelectItem value="cloud">Cloud Services</SelectItem>
                  <SelectItem value="iot">IoT Solutions</SelectItem>
                  <SelectItem value="data">Data Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Tabs defaultValue="recommended" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recommended">AI Recommended</TabsTrigger>
            <TabsTrigger value="recent">Most Recent</TabsTrigger>
            <TabsTrigger value="budget">Highest Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="space-y-6">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                        {opportunity.urgent && (
                          <Badge className="bg-red-100 text-red-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                        {opportunity.verified && <Badge className="bg-blue-100 text-blue-800">Verified Client</Badge>}
                      </div>
                      <CardDescription className="text-base">{opportunity.description}</CardDescription>
                    </div>
                    <Badge className={`${getMatchScoreColor(opportunity.matchScore)} font-semibold text-sm px-3 py-1`}>
                      {opportunity.matchScore}% match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={opportunity.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{opportunity.client.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{opportunity.client}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1">{opportunity.clientRating}</span>
                          </div>
                          <span>•</span>
                          <span>{opportunity.clientJobs} jobs posted</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {opportunity.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {opportunity.budget}
                      </div>
                      <p className="text-sm text-gray-500">{opportunity.timeline}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {opportunity.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{opportunity.postedTime}</span>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {opportunity.proposals} proposals
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Submit Proposal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="recent">
            <div className="text-center py-12">
              <p className="text-gray-500">Recent opportunities will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="budget">
            <div className="text-center py-12">
              <p className="text-gray-500">Highest budget opportunities will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProviderLayout>
  )
}
