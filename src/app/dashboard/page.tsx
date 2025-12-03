"use client";
import { useEffect, useState } from "react";
import { BookOpen, Users2, GraduationCap, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<any[] | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadStats() {
      try {
        const res = await fetch("/api/stats", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load stats");
        const body = await res.json();
        if (!mounted) return;
        if (body?.success && body.data) {
          const d = body.data;
          setStats([
            {
              title: "Total Students",
              value:
                typeof d.totalStudents === "number"
                  ? d.totalStudents.toLocaleString()
                  : String(d.totalStudents ?? 0),
              icon: GraduationCap,
              bgClass: "bg-blue-500/10",
              iconClass: "text-blue-500/40",
            },
            {
              title: "Total Teachers",
              value: String(d.totalTeachers ?? 0),
              icon: Users2,
              bgClass: "bg-orange-500/10",
              iconClass: "text-orange-500/40",
            },
            {
              title: "Total Courses",
              value: String(d.totalCourses ?? 0),
              icon: BookOpen,
              bgClass: "bg-emerald-500/10",
              iconClass: "text-emerald-500/40",
            },
            {
              title: "Total Faculty",
              value: String(d.totalFaculty ?? 0),
              icon: Warehouse,
              bgClass: "bg-purple-500/10",
              iconClass: "text-purple-500/40",
            },
          ]);
        } else {
          setStats(null);
        }
      } catch (err) {
        console.error("Load stats error", err);
        setStats(null);
      } finally {
        if (mounted) setLoadingStats(false);
      }
    }
    loadStats();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full relative">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto  lg:p-8 ">
          <div className="max-w-full mx-auto space-y-8 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                System Dashboard
              </h1>
              <p className="text-slate-500 mt-1">
                Welcome back! Here's today's activity overview
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loadingStats && (
                <div className="col-span-4 text-center py-6">
                  Đang tải số liệu...
                </div>
              )}
              {!loadingStats && (!stats || stats.length === 0) && (
                <div className="col-span-4 text-center py-6">
                  Không có dữ liệu
                </div>
              )}
              {!loadingStats &&
                stats?.map((stat, index) => (
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
          </div>
        </main>
      </div>
    </div>
  );
}
