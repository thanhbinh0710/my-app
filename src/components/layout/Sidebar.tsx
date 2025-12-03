"use client";

import {
  BookOpen,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  X,
  GraduationCap,
  FileText,
  Award,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { logout, loading, user } = useAuth();

  // Define menu items based on user role
  const getMenuItems = (userRole: string) => {
    switch (userRole) {
      case "student":
        return [
          { name: "My Courses", icon: BookOpen, href: "/my-courses" },
          { name: "Quiz", icon: FileText, href: "/quiz" },
        ];

      case "teacher":
        return [
          { name: "My Courses", icon: BookOpen, href: "/my-courses" },
          { name: "Students", icon: GraduationCap, href: "/students" },
          { name: "Quiz Management", icon: FileText, href: "/quiz-management" },
        ];

      case "admin":
      default:
        return [
          { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
          { name: "Faculty", icon: Users, href: "/faculty" },
          { name: "Courses", icon: BookOpen, href: "/courses" },
          { name: "Users", icon: Users, href: "/users" },
        ];
    }
  };

  const menuItems = getMenuItems(user?.role || "admin");
  const pathname = usePathname();

  const handleLogout = async () => {
    if (loading) return;
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Sidebar Content */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white text-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 min-h-16 px-6 py-4 bg-white border-b border-slate-200">
          <div className="w-full flex flex-col items-center justify-center text-center">
            <h1 className="font-bold text-xl text-blue-400 leading-none">
              LMS
            </h1>
            <span className="text-xs font-medium text-slate-500 mt-1">
              Learning Management System
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(String(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose()}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:bg-blue-800 hover:text-white cursor-pointer"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-400 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
