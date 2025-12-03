"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle,
  Award,
  TrendingUp,
  MapPin,
  GraduationCap,
} from "lucide-react";

export default function MyCoursesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [studentStats, setStudentStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"enrolled" | "available">(
    "enrolled"
  );

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);

        // Load enrolled courses, available courses, and student stats in parallel
        const [enrolledCoursesRes, availableCoursesRes, statsRes] =
          await Promise.all([
            fetch("/api/my-courses", { credentials: "include" }),
            fetch("/api/courses", { credentials: "include" }),
            fetch("/api/students/me/stats", { credentials: "include" }),
          ]);

        if (!mounted) return;

        // Handle enrolled courses response
        let enrolledCoursesData: any[] = [];
        if (enrolledCoursesRes.ok) {
          const enrolledData = await enrolledCoursesRes.json();
          if (
            enrolledData.success &&
            enrolledData.data &&
            enrolledData.data.courses
          ) {
            enrolledCoursesData = enrolledData.data.courses;
            setEnrolledCourses(enrolledCoursesData);
          } else {
            setEnrolledCourses([]);
          }
        } else {
          setEnrolledCourses([]);
        }

        // Handle available courses response
        if (availableCoursesRes.ok) {
          const availableData = await availableCoursesRes.json();
          if (
            availableData.success &&
            availableData.data &&
            availableData.data.courses
          ) {
            // Get enrolled course IDs
            const enrolledIds = enrolledCoursesData.map(
              (c: any) => c.course_id
            );

            // Filter out already enrolled courses
            const available = availableData.data.courses.filter(
              (course: any) => !enrolledIds.includes(course.course_id)
            );
            setAvailableCourses(available);
          } else {
            setAvailableCourses([]);
          }
        } else {
          setAvailableCourses([]);
        }

        // Handle stats response
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          if (statsData.success && statsData.data) {
            setStudentStats(statsData.data);
          }
        }
      } catch (error) {
        console.error("Load data error:", error);
        if (mounted) {
          setEnrolledCourses([]);
          setAvailableCourses([]);
          setStudentStats(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

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
            {studentStats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">
                        Credits Earned
                      </p>
                      <p className="text-3xl font-bold text-blue-700">
                        {studentStats.total_credit_earn || 0}
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
                        {studentStats.total_course_register || 0}
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
                        {studentStats.total_course_complete || 0}
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
                        {studentStats.total_course_register > 0
                          ? Math.round(
                              (studentStats.total_course_complete /
                                studentStats.total_course_register) *
                                100
                            )
                          : 0}
                        %
                      </p>
                    </div>
                    <TrendingUp className="h-10 w-10 text-orange-500" />
                  </div>
                </div>
              </div>
            )}

            {/* Academic Information */}
            {studentStats && (
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Faculty:</span>
                    <span>
                      {studentStats.faculty_name ||
                        `Faculty ${studentStats.faculty_id}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-medium">Roadmap:</span>
                    <span>
                      {studentStats.roadmap_name ||
                        `Roadmap ${studentStats.roadmap_id}`}
                    </span>
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
                <div className="flex bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab("enrolled")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === "enrolled"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Enrolled ({enrolledCourses.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("available")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === "available"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Available ({availableCourses.length})
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
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
            ) : (activeTab === "enrolled" ? enrolledCourses : availableCourses)
                .length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">
                  {activeTab === "enrolled"
                    ? "No Courses Enrolled"
                    : "No Available Courses"}
                </h3>
                <p className="text-slate-500">
                  {activeTab === "enrolled"
                    ? "You haven't enrolled in any courses yet."
                    : "No additional courses are available for enrollment."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeTab === "enrolled"
                  ? enrolledCourses
                  : availableCourses
                ).map((course: any) => (
                  <div
                    key={course.id || course.course_id}
                    className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {course.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {course.code}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4" />
                        {course.instructor}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium">
                            {course.progress || 0}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress || 0}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <CheckCircle className="w-3 h-3" />
                          {course.completedLessons || 0}/
                          {course.totalLessons || 0} lessons
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            Next lesson: {course.nextLesson || "Not Available"}
                          </span>
                        </div>
                      </div>

                      {course.grade && (
                        <div className="pt-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-600">
                              Current Grade:
                            </span>
                            <span className="font-medium text-green-600">
                              {course.grade}/10
                            </span>
                          </div>
                        </div>
                      )}

                      <button className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        {activeTab === "enrolled"
                          ? "Continue Learning"
                          : "Enroll Now"}
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
