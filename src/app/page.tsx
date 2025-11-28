"use client";
import { useState } from "react";
import {
  Clock,
  BookOpen,
  LayoutDashboard,
  Users,
  BarChart3,
  Award,
  Settings,
  MoreVertical,
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
export default function LMSDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const stats = [
    {
      title: "Tổng học viên",
      value: "1,234",
      change: "+12%",
      icon: Users,
      bgClass: "bg-blue-500/10",
      iconClass: "text-blue-500/40",
    },
    {
      title: "Khóa học active",
      value: "42",
      change: "+5%",
      icon: BookOpen,
      bgClass: "bg-emerald-500/10",
      iconClass: "text-emerald-500/40",
    },
    {
      title: "Doanh thu tháng",
      value: "125tr",
      change: "+18%",
      icon: BarChart3,
      bgClass: "bg-purple-500/10",
      iconClass: "text-purple-500/40",
    },
    {
      title: "Chứng chỉ đã cấp",
      value: "89",
      change: "+2%",
      icon: Award,
      bgClass: "bg-orange-500/10",
      iconClass: "text-orange-500/40",
    },
  ];

  const recentCourses = [
    {
      id: 1,
      title: "ReactJS Nâng cao & Next.js",
      instructor: "Nguyễn Văn A",
      students: 120,
      progress: 75,
      status: "Active",
    },
    {
      id: 2,
      title: "UX/UI Design Masterclass",
      instructor: "Trần Thị B",
      students: 85,
      progress: 45,
      status: "Active",
    },
    {
      id: 3,
      title: "Python cho Phân tích dữ liệu",
      instructor: "Lê Văn C",
      students: 200,
      progress: 100,
      status: "Completed",
    },
    {
      id: 4,
      title: "Tiếng Anh giao tiếp IT",
      instructor: "Sarah J.",
      students: 50,
      progress: 10,
      status: "Pending",
    },
  ];
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Layout */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col h-full relative">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto  lg:p-8 ">
          <div className="max-w-full mx-auto space-y-8 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            {/* Header Section */}
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Tổng quan hệ thống
              </h1>
              <p className="text-slate-500 mt-1">
                Chào mừng trở lại! Đây là tình hình hoạt động hôm nay
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-slate-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgClass}`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconClass}`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-800">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-slate-500">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Recent Courses Table & Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Course List */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-800">
                    Khóa học gần đây
                  </h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Xem tất cả
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
                      <tr>
                        <th className="px-6 py-4">Tên khóa học</th>
                        <th className="px-6 py-4">Giảng viên</th>
                        <th className="px-6 py-4">Tiến độ</th>
                        <th className="px-6 py-4">Trạng thái</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentCourses.map((course) => (
                        <tr
                          key={course.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-slate-800">
                            {course.title}
                          </td>
                          <td className="px-6 py-4">{course.instructor}</td>
                          <td className="px-6 py-4 w-32">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">
                                {course.progress}%
                              </span>
                              <div className="w-full bg-slate-200 rounded-full h-1.5">
                                <div
                                  className="bg-blue-500 h-1.5 rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium border
                              ${
                                course.status === "Active"
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  : ""
                              }
                              ${
                                course.status === "Completed"
                                  ? "bg-blue-50 text-blue-600 border-blue-100"
                                  : ""
                              }
                              ${
                                course.status === "Pending"
                                  ? "bg-orange-50 text-orange-600 border-orange-100"
                                  : ""
                              }
                            `}
                            >
                              {course.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-slate-600">
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Mini Schedule/Widgets */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800 mb-4">
                    Hoạt động sắp tới
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Webinar: AI trong giáo dục",
                        time: "14:00 PM - Hôm nay",
                        color: "bg-purple-100 text-purple-600",
                      },
                      {
                        title: "Bảo trì hệ thống định kỳ",
                        time: "02:00 AM - Ngày mai",
                        color: "bg-orange-100 text-orange-600",
                      },
                      {
                        title: "Họp giảng viên tháng 11",
                        time: "09:00 AM - Thứ 6",
                        color: "bg-blue-100 text-blue-600",
                      },
                    ].map((event, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className={`mt-1 min-w-[36px] h-9 rounded-lg flex items-center justify-center ${event.color}`}
                        >
                          <Clock size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {event.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    Xem lịch biểu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
