// src/routes/userRoutes.js

const express = require("express"); // ✅ REQUIRED
const router = express.Router(); // ✅ YOU FORGOT THIS LINE

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { summarizeResumeWithLangChain } = require("../utils/ai");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/resumes/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ HEALTH CHECK ROUTE
router.get("/health", (req, res) => {
  res.json({
    message: "Backend is running!",
    timestamp: new Date().toISOString(),
  });
});

// ✅ REGISTER ROUTE
// ✅ Express.js - Updated /register route for CUSTOMER role
router.post("/register", upload.single("resume"), async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    role,
    location,

    // Provider Only (ignore if CUSTOMER)
    bio,
    skills,
    hourlyRate,
    yearsExperience,
    portfolioUrls,
    website,
    languages,
    profileVideoUrl,
    certifications,

    // Customer Only
    companyName,
    companySize,
    industry, // <- frontend field to map to description?
    logoUrl,
    establishedYear,
    employeeCount,
  } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // 1. Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ error: "Email already exists." });

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
      },
    });

    // 4. If role is PROVIDER
    if (role === "PROVIDER") {
      const providerProfile = await prisma.providerProfile.create({
        data: {
          userId: newUser.id,
          bio,
          location,
          skills: JSON.parse(skills),
          hourlyRate: parseFloat(hourlyRate),
          yearsExperience: parseInt(yearsExperience),
          portfolioUrls: JSON.parse(portfolioUrls),
          website,
          profileVideoUrl,
          languages: JSON.parse(languages),
          completion: 70,
        },
      });

      if (certifications) {
        const certs = JSON.parse(certifications);
        for (const cert of certs) {
          await prisma.certification.create({
            data: {
              profileId: providerProfile.id,
              name: cert.name,
              issuer: cert.issuer,
              issuedDate: new Date(cert.issuedDate),
              verified: cert.verified || false,
            },
          });
        }
      }
    }

    // 5. If role is CUSTOMER
    if (role === "CUSTOMER") {
      await prisma.customerProfile.create({
        data: {
          userId: newUser.id,
          location,
          bio: `Registered under ${companyName}`,
          companySize,
          website,
          description: industry,
          logoUrl: logoUrl || null,
          establishedYear: establishedYear ? parseInt(establishedYear) : null,
          employeeCount: employeeCount ? parseInt(employeeCount) : null,
          languages: ["English"], // Update if you gather from form
          completion: 70,
        },
      });
    }

    return res
      .status(201)
      .json({ message: "User created", userId: newUser.id });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials." });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials." });
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.json({
      token,
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});


// ✅ GET ALL USERS (LIMITED FIELDS)
router.get("/providers", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        providerProfile: {
          select: {
            location: true,
            bio: true,
            hourlyRate: true,
            availability: true,
            rating: true,
            totalReviews: true,
            totalProjects: true,
            responseTime: true,
            skills: true,
          },
        },
      },
      where: {
        role: "PROVIDER", // Optional: filter only providers
      },
    });

    return res.json(users);
  } catch (err) {
    console.error("Fetch all users (limited) error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});


// ✅ GET USER BY ID ROUTE
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        kycStatus: true,
        isVerified: true,
        createdAt: true,
        providerProfile: true,
        customerProfile: true,
        resume: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.error("Fetch user by ID error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});


module.exports = router;
