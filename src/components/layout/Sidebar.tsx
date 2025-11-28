import {
  BookOpen,
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";
const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const menuItems = [
    { name: "Tổng quan", icon: LayoutDashboard, active: true },
    { name: "Khóa học", icon: BookOpen, active: false },
    { name: "Học viên", icon: Users, active: false },
    { name: "Phân tích", icon: BarChart3, active: false },
    { name: "Cài đặt", icon: Settings, active: false },
  ];

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
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                item.active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:bg-blue-800 hover:text-white cursor-pointer"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-200">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-400 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer">
            <LogOut className="w-5 h-5 mr-3" />
            Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
