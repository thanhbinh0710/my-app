"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function QuizPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - replace with actual API call
    setTimeout(() => {
      setQuizzes([
        {
          id: 1,
          title: "Midterm Exam - Web Programming",
          course: "Web Programming (IT101)",
          dueDate: "2025-12-10",
          duration: 90,
          questions: 25,
          status: "available",
          attempts: 0,
          maxAttempts: 2,
        },
        {
          id: 2,
          title: "Quiz Chapter 5 - Database Systems",
          course: "Database Systems (IT102)",
          dueDate: "2025-12-05",
          duration: 45,
          questions: 15,
          status: "completed",
          attempts: 1,
          maxAttempts: 3,
          score: 85,
        },
        {
          id: 3,
          title: "Homework Assignment - Algorithms",
          course: "Data Structures & Algorithms (IT103)",
          dueDate: "2025-12-03",
          duration: 60,
          questions: 20,
          status: "overdue",
          attempts: 0,
          maxAttempts: 1,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "available":
        return {
          color: "text-green-600",
          bg: "bg-green-100",
          text: "Available",
        };
      case "completed":
        return { color: "text-blue-600", bg: "bg-blue-100", text: "Completed" };
      case "overdue":
        return { color: "text-red-600", bg: "bg-red-100", text: "Overdue" };
      default:
        return { color: "text-gray-600", bg: "bg-gray-100", text: "Unknown" };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full relative">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto lg:p-8">
          <div className="max-w-full mx-auto space-y-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Quizzes</h1>
              <p className="text-slate-500 mt-1">
                Manage and take your quizzes
              </p>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl border border-slate-200 animate-pulse"
                  >
                    <div className="w-3/4 h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="w-1/2 h-3 bg-slate-200 rounded mb-4"></div>
                    <div className="flex gap-4">
                      <div className="w-20 h-3 bg-slate-200 rounded"></div>
                      <div className="w-20 h-3 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {quizzes.map((quiz) => {
                  const statusInfo = getStatusInfo(quiz.status);

                  return (
                    <div
                      key={quiz.id}
                      className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-100 rounded-lg">
                            <FileText className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 mb-1">
                              {quiz.title}
                            </h3>
                            <p className="text-sm text-slate-500 mb-2">
                              {quiz.course}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {quiz.duration} minutes
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="w-4 h-4" />
                                {quiz.questions} questions
                              </div>
                              <div className="flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                Due: {formatDate(quiz.dueDate)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}
                        >
                          {statusInfo.text}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-slate-600">
                            Attempts: {quiz.attempts}/{quiz.maxAttempts}
                          </span>
                          {quiz.status === "completed" && quiz.score && (
                            <span className="text-green-600 font-medium">
                              Score: {quiz.score}/100
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {quiz.status === "available" && (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              Start Quiz
                            </button>
                          )}
                          {quiz.status === "completed" && (
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                              View Results
                            </button>
                          )}
                          {quiz.status === "overdue" && (
                            <button
                              className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                              disabled
                            >
                              Overdue
                            </button>
                          )}
                        </div>
                      </div>
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
