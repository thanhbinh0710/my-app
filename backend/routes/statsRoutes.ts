import { Router, Request, Response } from "express";
import { createConnection } from "../utils/database";
import { UserRepository } from "../repositories/UserRepository";
import { CourseRepository } from "../repositories/CourseRepository";
import { EnrollmentRepository } from "../repositories/EnrollmentRepository";
import { FacultyRepository } from "../repositories/FacultyRepository";

const router = Router();

async function ensureDbConnection(req: Request, res: Response, next: Function) {
  try {
    await createConnection();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    return res
      .status(500)
      .json({ success: false, error: "Database connection failed" });
  }
}

router.use(ensureDbConnection);

// GET /api/stats - basic aggregated metrics for dashboard
router.get("/", async (req: Request, res: Response) => {
  try {
    const studentRepo = new UserRepository();
    const teacherRepo = new UserRepository();
    const courseRepo = new CourseRepository();
    const facultyRepo = new FacultyRepository();

    const totalStudents = await studentRepo.countByRole("student");
    const totalCourses = await courseRepo.count();
    const totalTeachers = await teacherRepo.countByRole("teacher");
    const totalFaculty = await facultyRepo.count();

    // Build a simple payload
    const data = {
      totalStudents,
      totalTeachers,
      totalCourses,
      totalFaculty,
    };

    return res.json({ success: true, data });
  } catch (error) {
    console.error("Stats route error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch stats" });
  }
});

export default router;
