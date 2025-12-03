"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { Calendar, Clock, MapPin, Video } from "lucide-react";

export default function SchedulePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - replace with actual API call
    setTimeout(() => {
      setSchedule([
        {
          id: 1,
          course: "Web Programming",
          code: "IT101",
          time: "08:00 - 10:00",
          date: "2025-12-04",
          room: "Room A101",
          type: "lecture",
          instructor: "Dr. Nguyen Van A",
        },
        {
          id: 2,
          course: "Database Systems",
          code: "IT102",
          time: "10:15 - 12:15",
          date: "2025-12-04",
          room: "Online - Zoom",
          type: "online",
          instructor: "Prof. Tran Thi B",
        },
        {
          id: 3,
          course: "Data Structures & Algorithms",
          code: "IT103",
          time: "14:00 - 16:00",
          date: "2025-12-05",
          room: "Room B203",
          type: "practice",
          instructor: "Dr. Le Van C",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeInfo = (type: string) => {
    switch (type) {
      case "lecture":
        return {
          color: "text-blue-600",
          bg: "bg-blue-100",
          text: "Lecture",
          icon: Calendar,
        };
      case "practice":
        return {
          color: "text-green-600",
          bg: "bg-green-100",
          text: "Practice",
          icon: Calendar,
        };
      case "online":
        return {
          color: "text-purple-600",
          bg: "bg-purple-100",
          text: "Online",
          icon: Video,
        };
      default:
        return {
          color: "text-gray-600",
          bg: "bg-gray-100",
          text: "Other",
          icon: Calendar,
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
      return "Today";
    }

    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full relative">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto lg:p-8">
          <div className="max-w-full mx-auto space-y-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Schedule</h1>
              <p className="text-slate-500 mt-1">
                Track your class schedule and upcoming sessions
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
                {schedule.map((item) => {
                  const typeInfo = getTypeInfo(item.type);
                  const TypeIcon = typeInfo.icon;

                  return (
                    <div
                      key={item.id}
                      className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${typeInfo.bg}`}>
                            <TypeIcon className={`w-6 h-6 ${typeInfo.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 mb-1">
                              {item.course}
                            </h3>
                            <p className="text-sm text-slate-500 mb-2">
                              {item.code}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {item.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(item.date)}
                              </div>
                              <div className="flex items-center gap-1">
                                {item.type === "online" ? (
                                  <Video className="w-4 h-4" />
                                ) : (
                                  <MapPin className="w-4 h-4" />
                                )}
                                {item.room}
                              </div>
                            </div>

                            <p className="text-sm text-slate-600">
                              Instructor: {item.instructor}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${typeInfo.bg} ${typeInfo.color}`}
                        >
                          {typeInfo.text}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        {item.type === "online" && (
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            Join Class
                          </button>
                        )}
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
