"use client";

import React, { useState } from "react";
import { GraduationCap, Menu, X, Search } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-900 tracking-tight">
              UniLMS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Khóa học
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Tính năng
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Giảng viên
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Liên hệ
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-slate-600 hover:text-blue-600">
              <Search className="w-5 h-5" />
            </button>
            <div className="h-4 w-px bg-slate-300"></div>
            <button className="text-blue-600 font-semibold hover:text-blue-700">
              Đăng nhập
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
              Đăng ký
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#"
              className="block px-3 py-2 rounded-md hover:bg-blue-50 text-slate-700 hover:text-blue-600"
            >
              Khóa học
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md hover:bg-blue-50 text-slate-700 hover:text-blue-600"
            >
              Tính năng
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md hover:bg-blue-50 text-slate-700 hover:text-blue-600"
            >
              Giảng viên
            </a>
            <div className="border-t border-slate-100 my-2"></div>
            <button className="w-full text-left px-3 py-2 font-semibold text-blue-600">
              Đăng nhập
            </button>
            <button className="w-full mt-2 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium">
              Đăng ký ngay
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
