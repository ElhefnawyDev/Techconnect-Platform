"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, FileText, Download, User, Building } from "lucide-react"
import { AdminLayout } from "@/components/admin-layout"

export default function AdminVerificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedVerification, setSelectedVerification] = useState<any>(null)
  const [reviewNotes, setReviewNotes] = useState("")

  const verifications = [
    {
      id: 1,
      name: "Ahmad Rahman",
      email: "ahmad@techexpert.com",
      type: "provider",
      status: "pending",
      submittedDate: "2024-01-25",
      documents: [
        { name: "MyKad", type: "identity", status: "uploaded", url: "#" },
        { name: "Portfolio", type: "portfolio", status: "uploaded", url: "#" },
        { name: "Certificates", type: "certification", status: "uploaded", url: "#" },
        { name: "Bank Statement", type: "financial", status: "uploaded", url: "#" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+60123456789",
      location: "Kuala Lumpur",
      businessType: "Individual",
      experience: "5 years",
      specialization: "Full Stack Development",
    },
    {
      id: 2,
      name: "TechInnovate Sdn Bhd",
      email: "info@techinnovate.my",
      type: "customer",
      status: "pending",
      submittedDate: "2024-01-24",
      documents: [
        { name: "SSM Certificate", type: "business", status: "uploaded", url: "#" },
        { name: "Company Profile", type: "profile", status: "uploaded", url: "#" },
        { name: "Director's MyKad", type: "identity", status: "uploaded", url: "#" },
        { name: "Bank Account", type: "financial", status: "uploaded", url: "#" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+60312345678",
      location: "Selangor",
      businessType: "Sdn Bhd",
      registrationNo: "202301234567",
      industry: "Technology Services",
    },
    {
      id: 3,
      name: "Sarah Digital Solutions",
      email: "sarah@digitalsolutions.my",
      type: "provider",
      status: "approved",
      submittedDate: "2024-01-20",
      reviewedDate: "2024-01-22",
      documents: [
        { name: "MyKad", type: "identity", status: "verified", url: "#" },
        { name: "Portfolio", type: "portfolio", status: "verified", url: "#" },
        { name: "Certificates", type: "certification", status: "verified", url: "#" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+60198765432",
      location: "Penang",
      businessType: "Sole Proprietorship",
      experience: "8 years",
      specialization: "UI/UX Design",
    },
    {
      id: 4,
      name: "CloudTech Enterprise",
      email: "admin@cloudtech.my",
      type: "provider",
      status: "rejected",
      submittedDate: "2024-01-18",
      reviewedDate: "2024-01-21",
      rejectionReason: "Incomplete documentation - Missing valid business registration",
      documents: [
        { name: "Business License", type: "business", status: "rejected", url: "#" },
        { name: "Portfolio", type: "portfolio", status: "verified", url: "#" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+60712345678",
      location: "Johor",
      businessType: "Enterprise",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-600"
      case "uploaded":
        return "text-blue-600"
      case "rejected":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredVerifications = verifications.filter((verification) => {
    const matchesSearch =
      verification.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verification.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || verification.status === statusFilter
    const matchesType = typeFilter === "all" || verification.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    totalVerifications: verifications.length,
    pendingVerifications: verifications.filter((v) => v.status === "pending").length,
    approvedVerifications: verifications.filter((v) => v.status === "approved").length,
    rejectedVerifications: verifications.filter((v) => v.status === "rejected").length,
  }

  const handleApprove = (id: number) => {
    console.log("Approving verification:", id, "Notes:", reviewNotes)
    setSelectedVerification(null)
    setReviewNotes("")
  }

  const handleReject = (id: number) => {
    console.log("Rejecting verification:", id, "Notes:", reviewNotes)
    setSelectedVerification(null)
    setReviewNotes("")
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Verifications</h1>
            <p className="text-gray-600">Review and approve user verification requests</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Verification Guidelines
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalVerifications}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingVerifications}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approvedVerifications}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejectedVerifications}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name or email..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="provider">Providers</SelectItem>
                  <SelectItem value="customer">Customers</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Verifications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Requests ({filteredVerifications.length})</CardTitle>
            <CardDescription>Review user verification documents and approve or reject requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVerifications.map((verification) => (
                  <TableRow key={verification.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={verification.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{verification.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{verification.name}</p>
                          <p className="text-sm text-gray-500">{verification.email}</p>
                          <p className="text-xs text-gray-400">{verification.location}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {verification.type === "provider" ? (
                          <User className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Building className="w-4 h-4 text-purple-600" />
                        )}
                        <Badge
                          className={
                            verification.type === "provider"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }
                        >
                          {verification.type.charAt(0).toUpperCase() + verification.type.slice(1)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(verification.status)}>
                        {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {verification.documents.map((doc, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <FileText className={`w-3 h-3 ${getDocumentStatusColor(doc.status)}`} />
                            <span className="truncate">{doc.name}</span>
                            <Badge variant="outline" className={`text-xs ${getDocumentStatusColor(doc.status)}`}>
                              {doc.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{verification.submittedDate}</p>
                        {verification.reviewedDate && (
                          <p className="text-xs text-gray-500">Reviewed: {verification.reviewedDate}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedVerification(verification)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Verification Review - {verification.name}</DialogTitle>
                            <DialogDescription>Review all submitted documents and user information</DialogDescription>
                          </DialogHeader>

                          {selectedVerification && (
                            <div className="space-y-6">
                              {/* User Info */}
                              <div className="grid md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">User Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="w-12 h-12">
                                        <AvatarImage src={selectedVerification.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>{selectedVerification.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{selectedVerification.name}</p>
                                        <p className="text-sm text-gray-500">{selectedVerification.email}</p>
                                      </div>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <span className="font-medium">Phone:</span> {selectedVerification.phone}
                                      </p>
                                      <p>
                                        <span className="font-medium">Location:</span> {selectedVerification.location}
                                      </p>
                                      <p>
                                        <span className="font-medium">Business Type:</span>{" "}
                                        {selectedVerification.businessType}
                                      </p>
                                      {selectedVerification.experience && (
                                        <p>
                                          <span className="font-medium">Experience:</span>{" "}
                                          {selectedVerification.experience}
                                        </p>
                                      )}
                                      {selectedVerification.specialization && (
                                        <p>
                                          <span className="font-medium">Specialization:</span>{" "}
                                          {selectedVerification.specialization}
                                        </p>
                                      )}
                                      {selectedVerification.registrationNo && (
                                        <p>
                                          <span className="font-medium">Registration No:</span>{" "}
                                          {selectedVerification.registrationNo}
                                        </p>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Verification Status</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Badge className={getStatusColor(selectedVerification.status)}>
                                        {selectedVerification.status.charAt(0).toUpperCase() +
                                          selectedVerification.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <div className="text-sm space-y-1">
                                      <p>
                                        <span className="font-medium">Submitted:</span>{" "}
                                        {selectedVerification.submittedDate}
                                      </p>
                                      {selectedVerification.reviewedDate && (
                                        <p>
                                          <span className="font-medium">Reviewed:</span>{" "}
                                          {selectedVerification.reviewedDate}
                                        </p>
                                      )}
                                      {selectedVerification.rejectionReason && (
                                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                          <p className="font-medium text-red-800">Rejection Reason:</p>
                                          <p className="text-red-700 text-sm">{selectedVerification.rejectionReason}</p>
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Documents */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Submitted Documents</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    {selectedVerification.documents.map((doc, index) => (
                                      <div key={index} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center gap-2">
                                            <FileText className={`w-4 h-4 ${getDocumentStatusColor(doc.status)}`} />
                                            <span className="font-medium">{doc.name}</span>
                                          </div>
                                          <Badge variant="outline" className={getDocumentStatusColor(doc.status)}>
                                            {doc.status}
                                          </Badge>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">Type: {doc.type}</p>
                                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                                          <Download className="w-4 h-4 mr-2" />
                                          Download
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Review Notes */}
                              {selectedVerification.status === "pending" && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Review Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Textarea
                                      placeholder="Add your review notes here..."
                                      value={reviewNotes}
                                      onChange={(e) => setReviewNotes(e.target.value)}
                                      className="min-h-[100px]"
                                    />
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          )}

                          <DialogFooter>
                            {selectedVerification?.status === "pending" && (
                              <div className="flex gap-3">
                                <Button
                                  variant="outline"
                                  onClick={() => handleReject(selectedVerification.id)}
                                  className="text-red-600 border-red-300 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                                <Button
                                  onClick={() => handleApprove(selectedVerification.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                              </div>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
