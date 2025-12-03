"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { Award, TrendingUp, BarChart3, BookOpen } from "lucide-react";

export default function GradesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - replace with actual API call
    setTimeout(() => {
      setGrades([
        {
          id: 1,
          course: "Web Programming",
          code: "IT101",
          assignments: [
            { name: "Assignment 1", score: 8.5, maxScore: 10, weight: 10 },
            { name: "Midterm Exam", score: 7.5, maxScore: 10, weight: 30 },
            { name: "Final Project", score: null, maxScore: 10, weight: 40 },
          ],
          finalGrade: null,
          credits: 3,
        },
        {
          id: 2,
          course: "Database Systems",
          code: "IT102",
          assignments: [
            { name: "Quiz 1", score: 9.0, maxScore: 10, weight: 15 },
            { name: "Quiz 2", score: 8.0, maxScore: 10, weight: 15 },
            { name: "Midterm Exam", score: 7.8, maxScore: 10, weight: 30 },
            { name: "Final Exam", score: 8.2, maxScore: 10, weight: 40 },
          ],
          finalGrade: 8.1,
          credits: 3,
        },
        {
          id: 3,
          course: "Data Structures & Algorithms",
          code: "IT103",
          assignments: [
            { name: "Assignment 1", score: 7.5, maxScore: 10, weight: 20 },
            { name: "Assignment 2", score: 8.5, maxScore: 10, weight: 20 },
            { name: "Midterm Exam", score: 6.8, maxScore: 10, weight: 30 },
            { name: "Final Exam", score: null, maxScore: 10, weight: 30 },
          ],
          finalGrade: null,
          credits: 4,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const calculateCurrentGrade = (assignments: any[]) => {
    const completedAssignments = assignments.filter((a) => a.score !== null);
    if (completedAssignments.length === 0) return null;

    const totalWeight = completedAssignments.reduce(
      (sum, a) => sum + a.weight,
      0
    );
    const weightedSum = completedAssignments.reduce(
      (sum, a) => sum + a.score * a.weight,
      0
    );

    return (weightedSum / totalWeight).toFixed(1);
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 8.5) return "text-green-600";
    if (grade >= 7.0) return "text-blue-600";
    if (grade >= 5.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeLetter = (grade: number) => {
    if (grade >= 8.5) return "A";
    if (grade >= 7.0) return "B";
    if (grade >= 5.5) return "C";
    if (grade >= 4.0) return "D";
    return "F";
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full relative">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto lg:p-8">
          <div className="max-w-full mx-auto space-y-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Grades</h1>
              <p className="text-slate-500 mt-1">
                Track your academic results and achievements
              </p>
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl border border-slate-200 animate-pulse"
                  >
                    <div className="w-1/2 h-4 bg-slate-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-slate-200 rounded"></div>
                      <div className="w-3/4 h-3 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {grades.map((course) => {
                  const currentGrade =
                    course.finalGrade ||
                    calculateCurrentGrade(course.assignments);

                  return (
                    <div
                      key={course.id}
                      className="bg-white p-6 rounded-xl border border-slate-200"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800 mb-1">
                              {course.course}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {course.code} • {course.credits} credits
                            </p>
                          </div>
                        </div>

                        {currentGrade && (
                          <div className="text-right">
                            <div
                              className={`text-2xl font-bold ${getGradeColor(
                                parseFloat(currentGrade)
                              )}`}
                            >
                              {currentGrade}
                            </div>
                            <div
                              className={`text-sm font-medium ${getGradeColor(
                                parseFloat(currentGrade)
                              )}`}
                            >
                              {getGradeLetter(parseFloat(currentGrade))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-slate-700 mb-3">
                          Grade Details:
                        </h4>

                        {course.assignments.map(
                          (assignment: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                            >
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-slate-700">
                                    {assignment.name}
                                  </span>
                                  <span className="text-sm text-slate-500">
                                    Weight: {assignment.weight}%
                                  </span>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                {assignment.score !== null ? (
                                  <div
                                    className={`font-semibold ${getGradeColor(
                                      assignment.score
                                    )}`}
                                  >
                                    {assignment.score}/{assignment.maxScore}
                                  </div>
                                ) : (
                                  <div className="text-slate-400 font-medium">
                                    Not Available
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      {!course.finalGrade && currentGrade && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-blue-700">
                            <TrendingUp className="w-4 h-4" />
                            <span>
                              Current grade based on completed assignments
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
