// src/routes/userRoutes.js

const express = require("express"); // ✅ REQUIRED
const router = express.Router();    // ✅ YOU FORGOT THIS LINE

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { summarizeResumeWithLangChain } = require("../utils/ai");

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
  res.json({ message: "Backend is running!", timestamp: new Date().toISOString() });
});

// ✅ REGISTER ROUTE
router.post("/register", upload.single("resume"), async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    role,
    bio,
    skills,
    hourlyRate,
    location,
    yearsExperience,
    portfolioUrls
  } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
      },
    });

    if (role === "PROVIDER") {
      await prisma.profile.create({
        data: {
          userId: newUser.id,
          bio,
          skills: JSON.parse(skills),
          hourlyRate: parseFloat(hourlyRate),
          location,
          yearsExperience: parseInt(yearsExperience),
          portfolioUrls: JSON.parse(portfolioUrls),
        },
      });

      if (req.file) {
        const fileUrl = req.file.path;
        const description = await summarizeResumeWithLangChain(fileUrl);

        await prisma.resume.create({
          data: {
            userId: newUser.id,
            fileUrl,
            description,
          },
        });
      }
    }

    return res.status(201).json({ message: "User created", user: newUser.id });
  } catch (err) {
    console.error(err);
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
    return res.json({ userId: user.id, role: user.role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
