import { Router, Request, Response } from "express";
import { StudentCourseController } from "../controllers/StudentCourseController";
import { createConnection } from "../utils/database";

const router = Router();
const studentCourseController = new StudentCourseController();

// Middleware to ensure database connection
async function ensureDbConnection(req: Request, res: Response, next: Function) {
  try {
    await createConnection();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(500).json({
      success: false,
      error: "Database connection failed",
    });
  }
}

// Apply middleware to all routes
router.use(ensureDbConnection);

// GET /api/student-courses/:student_id - Get all courses for a student
router.get("/:student_id", async (req: Request, res: Response) => {
  try {
    const student_id = parseInt(req.params.student_id);

    if (isNaN(student_id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid student ID",
      });
    }

    const result = await studentCourseController.getStudentCourses(student_id);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("Route Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// GET /api/student-courses/:student_id/active - Get active courses for a student
router.get("/:student_id/active", async (req: Request, res: Response) => {
  try {
    const student_id = parseInt(req.params.student_id);

    if (isNaN(student_id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid student ID",
      });
    }

    const result = await studentCourseController.getStudentActiveCourses(
      student_id
    );
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("Route Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// GET /api/student-courses/:student_id/stats - Get course statistics for a student
router.get("/:student_id/stats", async (req: Request, res: Response) => {
  try {
    const student_id = parseInt(req.params.student_id);

    if (isNaN(student_id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid student ID",
      });
    }

    const result = await studentCourseController.getStudentCourseStats(
      student_id
    );
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("Route Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;
