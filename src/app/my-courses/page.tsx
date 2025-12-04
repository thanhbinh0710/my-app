"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";
import {
  BookOpen,
  Clock,
  CheckCircle,
  Award,
  GraduationCap,
  MapPin,
  Route,
} from "lucide-react";

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("enrolled");
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollingCourses, setEnrollingCourses] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      if (!user || !user.user_id) return;

      try {
        setLoading(true);

        // Get student information first
        const studentResponse = await fetch(`/api/students/${user.user_id}`);
        if (!studentResponse.ok) {
          throw new Error("Failed to fetch student info");
        }
        const studentData = await studentResponse.json();

        if (!studentData.success || !studentData.data) {
          throw new Error("Student not found");
        }

        const student = studentData.data;
        // Use user_id instead of student_id for API calls since our backend methods expect user_id
        const student_user_id = student.user_id;

        // Fetch student course statistics
        const statsResponse = await fetch(
          `/api/enrollments/student/${student_user_id}/stats`
        );
        let studentStats = null;
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          if (statsData.success) {
            studentStats = statsData.data;
          }
        }

        // Fetch enrolled courses
        const enrolledResponse = await fetch(
          `/api/enrollments/student/${student_user_id}`
        );
        let enrolledCoursesData = [];
        if (enrolledResponse.ok) {
          const enrolledData = await enrolledResponse.json();
          if (enrolledData.success && enrolledData.data) {
            enrolledCoursesData = enrolledData.data.courses || [];
          }
        }

        // Fetch available courses
        const availableResponse = await fetch("/api/courses/available");
        let availableCoursesData = [];
        if (availableResponse.ok) {
          const availableData = await availableResponse.json();
          if (availableData.success && availableData.data) {
            // Filter out courses the student is already enrolled in
            const enrolledCourseIds = enrolledCoursesData.map(
              (course: any) => course.course_id
            );
            availableCoursesData = (availableData.data || []).filter(
              (course: any) => !enrolledCourseIds.includes(course.course_id)
            );
          }
        }

        if (!mounted) return;

        // Set student info with faculty and roadmap
        setStudentInfo({
          faculty: student.faculty_name || "Unknown Faculty",
          roadmap: student.roadmap_name || "No Roadmap Assigned",
          credits_earned:
            studentStats?.completed_credits || student.total_credit_earn || 0,
          courses_registered:
            studentStats?.total_courses || student.total_course_register || 0,
          courses_completed:
            studentStats?.completed_courses ||
            student.total_course_complete ||
            0,
          completion_rate:
            studentStats?.completion_rate ||
            (student.total_course_register > 0
              ? Math.round(
                  (student.total_course_complete /
                    student.total_course_register) *
                    100
                )
              : 0),
        });

        // Format enrolled courses
        const formattedEnrolled = enrolledCoursesData.map((course: any) => ({
          id: course.course_id,
          course_id: course.course_id,
          course_name: course.course_name,
          teacher_name: course.instructor || "Not Assigned",
          course_credit: course.credits || course.course_credit || 0,
          progress: course.progress || 0,
          status: course.complete_date ? "completed" : "ongoing",
          grade: course.grade,
          start_date: course.start_date,
          complete_date: course.complete_date,
          faculty: course.faculty,
        }));

        // Format available courses
        const formattedAvailable = availableCoursesData.map((course: any) => ({
          id: course.course_id,
          course_id: course.course_id,
          course_name: course.course_name,
          teacher_name: course.teacher_name || "Not Assigned",
          course_credit: course.course_credit || 0,
          prerequisites: [], // Would need additional API call to get prerequisites
          description: `${course.course_group || ""} course with ${
            course.course_credit || 0
          } credits`.trim(),
        }));

        setEnrolledCourses(formattedEnrolled);
        setAvailableCourses(formattedAvailable);
        setLoading(false);
      } catch (error) {
        console.error("Load data error:", error);
        if (mounted) {
          setLoading(false);
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load student data"
          );
          // Set default values on error
          setStudentInfo({
            faculty: "Unknown Faculty",
            roadmap: "No Roadmap Assigned",
            credits_earned: 0,
            courses_registered: 0,
            courses_completed: 0,
            completion_rate: 0,
          });
          setEnrolledCourses([]);
          setAvailableCourses([]);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [user]);

  const handleEnrollCourse = async (courseId: string) => {
    if (!user || !studentInfo) return;

    setEnrollingCourses((prev) => new Set([...prev, courseId]));

    try {
      // First get the student record to get the auto-increment student_id
      const studentResponse = await fetch(`/api/students/${user.user_id}`);
      if (!studentResponse.ok) {
        throw new Error("Failed to get student information");
      }
      const studentData = await studentResponse.json();

      if (!studentData.success || !studentData.data) {
        throw new Error("Student not found");
      }

      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          course_id: courseId,
          student_id: studentData.data.student_id, // Use the auto-increment student_id
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to enroll in course");
      }

      const result = await response.json();

      if (result.success) {
        // Show success message
        alert("Successfully enrolled in the course!");
        // Refresh the data to show updated enrollment
        window.location.reload();
      } else {
        throw new Error(result.error || "Enrollment failed");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      alert(
        `Failed to enroll: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setEnrollingCourses((prev) => {
        const newSet = new Set(prev);
        newSet.delete(courseId);
        return newSet;
      });
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full relative">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto lg:p-8">
          <div className="max-w-full mx-auto space-y-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                My Academic Dashboard
              </h1>
              <p className="text-slate-500 mt-1">
                Track your learning progress and academic achievements
              </p>
            </div>

            {/* Student Statistics */}
            {studentInfo && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">
                        Credits Earned
                      </p>
                      <p className="text-3xl font-bold text-blue-700">
                        {studentInfo.credits_earned}
                      </p>
                    </div>
                    <Award className="h-10 w-10 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">
                        Courses Registered
                      </p>
                      <p className="text-3xl font-bold text-green-700">
                        {studentInfo.courses_registered}
                      </p>
                    </div>
                    <BookOpen className="h-10 w-10 text-green-500" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">
                        Courses Completed
                      </p>
                      <p className="text-3xl font-bold text-purple-700">
                        {studentInfo.courses_completed}
                      </p>
                    </div>
                    <CheckCircle className="h-10 w-10 text-purple-500" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">
                        Completion Rate
                      </p>
                      <p className="text-3xl font-bold text-orange-700">
                        {studentInfo.completion_rate}%
                      </p>
                    </div>
                    <GraduationCap className="h-10 w-10 text-orange-500" />
                  </div>
                </div>
              </div>
            )}

            {/* Academic Information */}
            {studentInfo && (
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Faculty:</span>
                    <span>{studentInfo.faculty}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Route className="h-4 w-4" />
                    <span className="font-medium">Roadmap:</span>
                    <span>{studentInfo.roadmap}</span>
                  </div>
                </div>
              </div>
            )}

            {/* My Courses Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-800">
                  My Courses
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("enrolled")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === "enrolled"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Enrolled ({enrolledCourses.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("available")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === "available"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Available ({availableCourses.length})
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-200 p-6 rounded-xl animate-pulse"
                    >
                      <div className="w-3/4 h-4 bg-slate-200 rounded mb-2"></div>
                      <div className="w-1/2 h-8 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white p-6 rounded-xl border border-slate-200 animate-pulse"
                    >
                      <div className="w-full h-4 bg-slate-200 rounded mb-4"></div>
                      <div className="w-3/4 h-3 bg-slate-200 rounded mb-2"></div>
                      <div className="w-1/2 h-3 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 text-red-300 mx-auto mb-4">⚠️</div>
                <h3 className="text-lg font-medium text-red-600 mb-2">
                  Error Loading Data
                </h3>
                <p className="text-slate-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : activeTab === "enrolled" ? (
              enrolledCourses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 mb-2">
                    No Courses Enrolled
                  </h3>
                  <p className="text-slate-500">
                    You haven't enrolled in any courses yet. Browse available
                    courses to get started.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course: any) => (
                    <div
                      key={course.id}
                      className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800">
                              {course.course_name}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {course.course_id} - {course.teacher_name}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            course.status === "ongoing"
                              ? "bg-green-100 text-green-800"
                              : course.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {course.status === "ongoing"
                            ? "In Progress"
                            : course.status === "completed"
                            ? "Completed"
                            : course.status}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Award className="w-4 h-4" />
                          <span>{course.course_credit} credits</span>
                        </div>

                        {course.status === "ongoing" && (
                          <>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600">Progress</span>
                              <span className="font-medium text-blue-600">
                                {course.progress}%
                              </span>
                            </div>
                            {course.next_class && (
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Clock className="w-4 h-4" />
                                <span>
                                  Next:{" "}
                                  {new Date(
                                    course.next_class
                                  ).toLocaleDateString("vi-VN")}{" "}
                                  at{" "}
                                  {new Date(
                                    course.next_class
                                  ).toLocaleTimeString("vi-VN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        {course.status === "completed" && course.grade && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>Final Grade: {course.grade}/10</span>
                          </div>
                        )}

                        <button className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          {course.status === "ongoing"
                            ? "Continue Learning"
                            : "View Details"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : availableCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">
                  No Available Courses
                </h3>
                <p className="text-slate-500">
                  There are no available courses matching your current progress.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map((course: any) => (
                  <div
                    key={course.id}
                    className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <BookOpen className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">
                          {course.course_name}
                        </h3>
                        <p className="text-sm text-slate-500 mb-2">
                          {course.course_id} - {course.teacher_name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Award className="w-4 h-4" />
                        <span>{course.course_credit} credits</span>
                      </div>

                      {course.prerequisites &&
                        course.prerequisites.length > 0 && (
                          <div className="text-sm text-slate-600">
                            <span className="font-medium">Prerequisites: </span>
                            <span>{course.prerequisites.join(", ")}</span>
                          </div>
                        )}

                      <button
                        onClick={() => handleEnrollCourse(course.course_id)}
                        disabled={enrollingCourses.has(course.course_id)}
                        className="w-full mt-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {enrollingCourses.has(course.course_id) ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Enrolling...</span>
                          </div>
                        ) : (
                          "Enroll Now"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
