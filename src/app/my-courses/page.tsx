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

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      if (!user) return;

      try {
        setLoading(true);

        // Mock data for students - replace with actual API calls
        setTimeout(() => {
          if (!mounted) return;

          setStudentInfo({
            faculty: "Computer Science",
            roadmap: "Software Engineering",
            credits_earned: 42,
            courses_registered: 14,
            courses_completed: 11,
            completion_rate: 79,
          });

          setEnrolledCourses([
            {
              id: 1,
              course_id: "IT101",
              course_name: "Web Programming",
              teacher_name: "Dr. Nguyen Van A",
              course_credit: 3,
              progress: 75,
              status: "ongoing",
              next_class: "2025-12-05 09:00",
            },
            {
              id: 2,
              course_id: "IT102",
              course_name: "Database Systems",
              teacher_name: "Prof. Tran Thi B",
              course_credit: 4,
              progress: 60,
              status: "ongoing",
              next_class: "2025-12-06 14:00",
            },
            {
              id: 3,
              course_id: "IT103",
              course_name: "Data Structures & Algorithms",
              teacher_name: "Dr. Le Van C",
              course_credit: 3,
              progress: 90,
              status: "completed",
              grade: 8.5,
            },
          ]);

          setAvailableCourses([
            {
              id: 4,
              course_id: "IT201",
              course_name: "Advanced Web Development",
              teacher_name: "Dr. Pham Van D",
              course_credit: 3,
              prerequisites: ["IT101"],
              description:
                "Advanced topics in web development including frameworks and APIs",
            },
            {
              id: 5,
              course_id: "IT202",
              course_name: "Machine Learning",
              teacher_name: "Prof. Hoang Thi E",
              course_credit: 4,
              prerequisites: ["IT103", "MATH201"],
              description:
                "Introduction to machine learning algorithms and applications",
            },
          ]);

          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Load data error:", error);
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
                          {course.status}
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

                      <button className="w-full mt-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Enroll Now
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
