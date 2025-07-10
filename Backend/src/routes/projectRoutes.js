const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ GET /api/projects - list all projects
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const projects = await prisma.project.findMany({
      include: {
        serviceRequest: true,
        customer: {
          select: { id: true, name: true, email: true },
        },
        provider: {
          select: { id: true, name: true, email: true },
        },
        review: true,
        milestones: true,
        payments: true,
      },
      orderBy: {
        createdAt: "desc", // (optional: add createdAt field to model if needed)
      },
      where: {
        customerId: userId,
      },
    });

    res.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.get("/customers/:userId/stats", async (req, res) => {
  const { userId } = req.params;

  try {
    const [
      activeProjects,
      completedProjects,
      totalSpentResult,
      customerProfile,
    ] = await Promise.all([
      // Count in-progress projects
      prisma.project.count({
        where: {
          customerId: userId,
          status: "IN_PROGRESS",
        },
      }),
      // Count completed projects
      prisma.project.count({
        where: {
          customerId: userId,
          status: "COMPLETED",
        },
      }),

      // Sum paid invoices
      prisma.invoice.aggregate({
        _sum: {
          totalAmount: true,
        },
        where: {
          customerId: userId,
          status: {
            not: "draft", // or 'paid' if you use that
          },
        },
      }),
    ]);

    return res.json({
      activeProjects,
      completedProjects,
      totalSpent: totalSpentResult._sum.totalAmount || 0,
      rating: null, // Not tracked for customer
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch customer stats" });
  }
});

module.exports = router;
