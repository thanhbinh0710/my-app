import React from "react";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <GraduationCap className="w-6 h-6" />
              <span className="text-xl font-bold">UniLMS</span>
            </div>
            <p className="text-sm text-slate-400">
              Nền tảng quản lý đào tạo trực tuyến, hỗ trợ sinh viên và giảng
              viên tối ưu hóa việc dạy và học.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Đội ngũ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@unilms.edu.vn</li>
              <li>Hotline: 1900 1234</li>
              <li>Địa chỉ: Khu Công nghệ cao, TP.HCM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2024 UniLMS. All rights reserved.</p>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              F
            </div>
            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              L
            </div>
            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              Y
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
