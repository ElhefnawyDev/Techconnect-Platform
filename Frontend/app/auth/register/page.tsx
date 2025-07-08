"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Zap, User, Building, Mail, Lock, Eye, EyeOff, Phone, MapPin, Upload, X, Plus } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

// Malaysian states
const malaysianStates = [
  "Kuala Lumpur",
  "Selangor",
  "Penang",
  "Johor",
  "Perak",
  "Kedah",
  "Kelantan",
  "Terengganu",
  "Pahang",
  "Negeri Sembilan",
  "Melaka",
  "Perlis",
  "Sabah",
  "Sarawak",
]

// Predefined skills for quick selection
const popularSkills = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "PHP",
  "Mobile Development",
  "iOS",
  "Android",
  "Flutter",
  "React Native",
  "Cloud Computing",
  "AWS",
  "Azure",
  "Google Cloud",
  "DevOps",
  "Database",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Cybersecurity",
  "Blockchain",
  "IoT",
  "AI/ML",
  "Data Science",
]

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")
  const [userRole, setUserRole] = useState("customer")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [portfolioUrls, setPortfolioUrls] = useState<string[]>([])
  const [newPortfolioUrl, setNewPortfolioUrl] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    bio: "",
    hourlyRate: "",
    yearsExperience: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const role = searchParams.get("role")
    if (role === "provider") {
      setUserRole("provider")
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills((prev) => [...prev, customSkill.trim()])
      setCustomSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill))
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setResumeFile(file)
    } else {
      alert("Please upload a PDF file only")
    }
  }

  const handleAddPortfolioUrl = () => {
    if (newPortfolioUrl.trim() && !portfolioUrls.includes(newPortfolioUrl.trim())) {
      setPortfolioUrls((prev) => [...prev, newPortfolioUrl.trim()])
      setNewPortfolioUrl("")
    }
  }

  const handleRemovePortfolioUrl = (url: string) => {
    setPortfolioUrls((prev) => prev.filter((u) => u !== url))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Create FormData for multipart/form-data
      const formDataToSend = new FormData()
      
      // Basic user data
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("password", formData.password)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("role", userRole === "provider" ? "PROVIDER" : "CUSTOMER")
      
      // Provider-specific data
      if (userRole === "provider") {
        formDataToSend.append("bio", formData.bio)
        formDataToSend.append("skills", JSON.stringify(selectedSkills))
        formDataToSend.append("hourlyRate", formData.hourlyRate)
        formDataToSend.append("location", formData.location)
        formDataToSend.append("yearsExperience", formData.yearsExperience)
        formDataToSend.append("portfolioUrls", JSON.stringify(portfolioUrls))
        
        // Resume file
        if (resumeFile) {
          formDataToSend.append("resume", resumeFile)
        }
      }

      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      setSuccess("Account created successfully! Redirecting...")
      
      // Redirect to login after successful registration
    setTimeout(() => {
        window.location.href = "/auth/login"
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <motion.div
        className="w-full max-w-3xl relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div className="text-center mb-8" variants={fadeInUp} initial="initial" animate="animate">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TechConnect
            </span>
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Join TechConnect</CardTitle>
              <CardDescription className="text-gray-600">
                Create your account and start{" "}
                {userRole === "customer" ? "hiring top freelancers" : "offering your ICT services"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Error/Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
              )}

              {/* User Role Selection */}
              <div className="mb-6">
                <Label className="text-base font-medium mb-3 block">I want to:</Label>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 ${
                        userRole === "customer" ? "ring-2 ring-blue-500 bg-blue-50/50" : "hover:bg-gray-50/50"
                      }`}
                      onClick={() => setUserRole("customer")}
                    >
                      <CardContent className="p-4 text-center">
                        <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <h3 className="font-medium">Hire Freelancers</h3>
                        <p className="text-sm text-gray-600">I'm a company looking to hire ICT professionals</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 ${
                        userRole === "provider" ? "ring-2 ring-blue-500 bg-blue-50/50" : "hover:bg-gray-50/50"
                      }`}
                      onClick={() => setUserRole("provider")}
                    >
                      <CardContent className="p-4 text-center">
                        <User className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                        <h3 className="font-medium">Work as Freelancer</h3>
                        <p className="text-sm text-gray-600">I'm a freelancer offering ICT services</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+60 12-345 6789"
                      className="pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pl-10 pr-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location (State)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                      <SelectTrigger className="pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {malaysianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Freelancer-specific fields */}
                {userRole === "provider" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 border-t pt-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">Freelancer Profile</h3>

                    {/* Bio */}
                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell clients about your experience, expertise, and what makes you unique..."
                        className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                        maxLength={500}
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                      />
                      <p className="text-xs text-gray-500">Maximum 500 characters</p>
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                      <Label>Your Skills</Label>

                      {/* Add Custom Skill */}
                      <div className="flex gap-2">
                        <Input
                          value={customSkill}
                          onChange={(e) => setCustomSkill(e.target.value)}
                          placeholder="Type a skill and press Add"
                          className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustomSkill())}
                        />
                        <Button
                          type="button"
                          onClick={handleAddCustomSkill}
                          variant="outline"
                          className="bg-transparent"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Selected Skills */}
                      {selectedSkills.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Selected Skills ({selectedSkills.length})</Label>
                          <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-white/50 max-h-32 overflow-y-auto">
                            {selectedSkills.map((skill) => (
                              <Badge key={skill} className="bg-blue-600 hover:bg-blue-700 text-white pr-1">
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSkill(skill)}
                                  className="ml-1 hover:bg-blue-800 rounded-full p-0.5"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Popular Skills */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Popular Skills (click to add)</Label>
                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 border rounded-lg bg-white/50">
                          {popularSkills
                            .filter((skill) => !selectedSkills.includes(skill))
                            .map((skill) => (
                              <motion.div key={skill} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Badge
                                  variant="outline"
                                  className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                                  onClick={() => handleSkillToggle(skill)}
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Experience and Rate */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Select value={formData.yearsExperience} onValueChange={(value) => handleInputChange("yearsExperience", value)}>
                          <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="2-3">2-3 years</SelectItem>
                            <SelectItem value="4-5">4-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hourlyRate">Hourly Rate (RM)</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          placeholder="e.g., 50"
                          min="10"
                          max="1000"
                          className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          value={formData.hourlyRate}
                          onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="resume">Resume (PDF only)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-white/50 hover:border-blue-400 transition-colors">
                        <input id="resume" type="file" accept=".pdf" onChange={handleResumeUpload} className="hidden" />
                        <label htmlFor="resume" className="cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          {resumeFile ? (
                            <div>
                              <p className="text-sm font-medium text-green-600">{resumeFile.name}</p>
                              <p className="text-xs text-gray-500">Click to change</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm font-medium text-gray-600">Upload your resume</p>
                              <p className="text-xs text-gray-500">PDF files only, max 5MB</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Portfolio URLs */}
                    <div className="space-y-4">
                      <Label>Portfolio URLs</Label>

                      {/* Add Portfolio URL */}
                      <div className="flex gap-2">
                        <Input
                          value={newPortfolioUrl}
                          onChange={(e) => setNewPortfolioUrl(e.target.value)}
                          placeholder="https://your-portfolio.com"
                          className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          type="url"
                        />
                        <Button
                          type="button"
                          onClick={handleAddPortfolioUrl}
                          variant="outline"
                          className="bg-transparent"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Portfolio URLs List */}
                      {portfolioUrls.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Portfolio Links ({portfolioUrls.length})</Label>
                          <div className="space-y-2">
                            {portfolioUrls.map((url, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-white/50 border rounded-lg"
                              >
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 text-sm truncate flex-1"
                                >
                                  {url}
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleRemovePortfolioUrl(url)}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" className="mt-1" required />
                  <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                      Privacy Policy
                    </Link>
                    . I understand that my information will be used in accordance with Malaysian data protection laws.
                  </Label>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      `Create ${userRole === "customer" ? "Company" : "Freelancer"} Account`
                    )}
                  </Button>
                </motion.div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
