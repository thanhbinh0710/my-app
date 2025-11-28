import { Bell, Menu, Search } from "lucide-react";
const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="bg-white border border-slate-200 h-16 w-full flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1 text-slate-600 hover:bg-slate-100 rounded-md"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học, học viên..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-700">Admin User</p>
            <p className="text-xs text-slate-500">Quản trị viên</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border-2 border-white shadow-sm">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
