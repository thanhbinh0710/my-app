"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { BookOpen, Clock, Users, CheckCircle } from "lucide-react";

export default function MyCoursesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadCourses() {
      try {
        setLoading(true);
        const res = await fetch("/api/my-courses", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Status ${res.status}`);
        }

        const data = await res.json();

        if (!mounted) return;

        if (data.success && data.data && data.data.courses) {
          setCourses(data.data.courses);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Load courses error:", error);
        if (mounted) {
          setCourses([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCourses();

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
              <h1 className="text-2xl font-bold text-slate-800">My Courses</h1>
              <p className="text-slate-500 mt-1">
                Manage and track your learning progress
              </p>
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
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">
                  No Courses Enrolled
                </h3>
                <p className="text-slate-500">
                  You haven't enrolled in any courses yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
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
                        Continue Learning
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
