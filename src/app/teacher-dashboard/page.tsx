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
  Calendar,
} from "lucide-react";

export default function TeacherDashboardPage() {
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [teacherCourses, setTeacherCourses] = useState<any[]>([]);
  const [teacherInfo, setTeacherInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      if (!user) return;

      try {
        setLoading(true);

        // Load teacher-specific data
        const [teacherInfoRes, coursesRes] = await Promise.all([
          fetch(`/api/teachers/${user.user_id}/with-info`, {
            credentials: "include",
          }),
          fetch(`/api/courses/teacher/${user.user_id}`, {
            credentials: "include",
          }),
        ]);

        if (!mounted) return;

        // Handle teacher info response
        if (teacherInfoRes.ok) {
          const teacherData = await teacherInfoRes.json();
          if (teacherData.success && teacherData.data) {
            setTeacherInfo(teacherData.data);
          }
        }

        // Handle courses response - get courses taught by this teacher
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          if (coursesData.success && coursesData.data) {
            // coursesData.data is directly the array of courses
            const courses = Array.isArray(coursesData.data)
              ? coursesData.data
              : [];
            setTeacherCourses(courses);
          } else {
            setTeacherCourses([]);
          }
        } else {
          setTeacherCourses([]);
        }
      } catch (error) {
        console.error("Load data error:", error);
        if (mounted) {
          setTeacherCourses([]);
          setTeacherInfo(null);
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
  }, [user]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full relative">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto lg:p-8">
          <div className="max-w-full mx-auto space-y-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
              <p className="text-slate-500 mt-1">
                Welcome back, Teacher! Manage your courses and track student
                progress
              </p>
            </div>

            {/* Teacher Statistics */}
            {teacherInfo && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">
                        My Courses
                      </p>
                      <p className="text-3xl font-bold text-blue-700">
                        {teacherCourses.length}
                      </p>
                    </div>
                    <BookOpen className="h-10 w-10 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">
                        Total Credits
                      </p>
                      <p className="text-3xl font-bold text-green-700">
                        {teacherCourses.reduce(
                          (total, course) =>
                            total + (course.course_credit || 0),
                          0
                        )}
                      </p>
                    </div>
                    <Award className="h-10 w-10 text-green-500" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">
                        Active Courses
                      </p>
                      <p className="text-3xl font-bold text-purple-700">
                        {
                          teacherCourses.filter(
                            (course) => course.course_status === "active"
                          ).length
                        }
                      </p>
                    </div>
                    <CheckCircle className="h-10 w-10 text-purple-500" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">
                        Faculty
                      </p>
                      <p className="text-lg font-bold text-orange-700">
                        {teacherInfo.faculty_name ||
                          `ID: ${teacherInfo.faculty_id}`}
                      </p>
                    </div>
                    <Award className="h-10 w-10 text-orange-500" />
                  </div>
                </div>
              </div>
            )}

            {/* Teacher Academic Information */}
            {teacherInfo && (
              <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Teaching Profile
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Certificate:</span>
                    <span className="text-blue-700">
                      {teacherInfo.certificate || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* My Courses Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  My Teaching Schedule
                </h2>
                <span className="text-sm text-slate-500 bg-blue-100 px-3 py-1 rounded-full">
                  {teacherCourses.length} Course
                  {teacherCourses.length !== 1 ? "s" : ""}
                </span>
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
            ) : teacherCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">
                  No Courses Assigned
                </h3>
                <p className="text-slate-500">
                  You don't have any courses assigned to teach yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacherCourses.map((course: any) => (
                  <div
                    key={course.course_id}
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
                            {course.course_id}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          course.course_status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {course.course_status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Award className="w-4 h-4" />
                        <span>{course.course_credit} credits</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>
                          Pass Grade: {course.course_passing_grade || 5}/10
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>Group: {course.course_group || "No group"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Created:{" "}
                          {course.creation_date
                            ? new Date(course.creation_date).toLocaleDateString(
                                "vi-VN"
                              )
                            : "N/A"}
                        </span>
                      </div>

                      <button className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Manage Course
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
