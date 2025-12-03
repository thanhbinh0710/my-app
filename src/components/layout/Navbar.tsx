import { Bell, Menu, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user, loading } = useAuth();

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      admin: "Administrator",
      teacher: "Teacher",
      student: "Student",
    };
    return roleMap[role] || role;
  };
  return (
    <header className="bg-white border border-slate-200 h-16 w-full flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1 text-slate-600 hover:bg-slate-100 rounded-md"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          {loading ? (
            <div className="text-right hidden sm:block">
              <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
              <div className="w-16 h-3 bg-slate-200 rounded animate-pulse mt-1"></div>
            </div>
          ) : user ? (
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-700">
                {user.full_name}
              </p>
              <p className="text-xs text-slate-500">
                {getRoleDisplayName(user.role)}
              </p>
            </div>
          ) : (
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-700">Guest</p>
              <p className="text-xs text-slate-500">Guest</p>
            </div>
          )}
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border-2 border-white shadow-sm">
            {loading ? (
              <div className="w-6 h-6 bg-slate-200 rounded animate-pulse"></div>
            ) : user?.full_name ? (
              getInitials(user.full_name)
            ) : (
              "G"
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
