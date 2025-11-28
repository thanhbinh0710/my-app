import {
  ArrowRight,
  PlayCircle,
  Users,
  BookOpen,
  BarChart,
  CheckCircle,
  Layout,
} from "lucide-react";

export default function HomePage() {
  // Mock data cho phần khóa học
  const featuredCourses = [
    {
      id: 1,
      title: "Cấu trúc dữ liệu và Giải thuật",
      instructor: "TS. Nguyễn Văn A",
      students: 120,
      lessons: 24,
      image: "bg-blue-100",
      progress: 0,
      category: "Công nghệ thông tin",
    },
    {
      id: 2,
      title: "Kinh tế vi mô nhập môn",
      instructor: "ThS. Trần Thị B",
      students: 85,
      lessons: 18,
      image: "bg-green-100",
      progress: 0,
      category: "Kinh tế",
    },
    {
      id: 3,
      title: "Tiếng Anh chuyên ngành",
      instructor: "Ms. Sarah Jenkins",
      students: 200,
      lessons: 30,
      image: "bg-orange-100",
      progress: 0,
      category: "Ngoại ngữ",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-blue-50 via-white to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Hero Content */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                Nền tảng học tập số 1 cho Đại học
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                Học tập không giới hạn <br />
                <span className="text-blue-600">Mọi lúc, Mọi nơi</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Hệ thống quản lý học tập (LMS) tích hợp quản lý khóa học, bài
                giảng video và hệ thống thi trắc nghiệm trực tuyến hiện đại.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-200 transition-all flex items-center justify-center gap-2 group">
                  Bắt đầu học ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-600 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Xem Demo
                </button>
              </div>

              {/* Stats */}
              <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>10k+ Sinh viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span>500+ Khóa học</span>
                </div>
              </div>
            </div>

            {/* Hero Image / Illustration */}
            <div className="flex-1 w-full relative">
              <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Mock UI Interface */}
                <div className="rounded-xl overflow-hidden bg-slate-50">
                  <div className="bg-slate-900 p-3 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
                      <div className="h-8 w-8 bg-blue-100 rounded-full"></div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-32 w-full bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                        <BarChart className="text-blue-200 w-12 h-12" />
                      </div>
                      <div className="h-32 w-full bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                        <CheckCircle className="text-blue-200 w-12 h-12" />
                      </div>
                    </div>
                    <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                    <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Decorative Blobs */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">
              Tính năng nổi bật
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Mọi thứ bạn cần để quản lý đào tạo
            </h3>
            <p className="text-slate-600 text-lg">
              Hệ thống được thiết kế tối ưu cho trải nghiệm giảng dạy và học tập
              của trường Đại học.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layout className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Dashboard trực quan
              </h4>
              <p className="text-slate-600">
                Giao diện tổng quan giúp sinh viên theo dõi tiến độ học tập và
                lịch thi một cách dễ dàng.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Quiz & Thi online
              </h4>
              <p className="text-slate-600">
                Hệ thống thi trắc nghiệm bảo mật, tự động chấm điểm và hỗ trợ
                nhiều dạng câu hỏi phức tạp.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Kho tài liệu số
              </h4>
              <p className="text-slate-600">
                Lưu trữ bài giảng, slide, video và tài liệu tham khảo không giới
                hạn dung lượng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- COURSES PREVIEW SECTION --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Khóa học tiêu biểu
              </h2>
              <p className="text-slate-600">
                Các môn học đang được quan tâm nhất học kỳ này
              </p>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700"
            >
              Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 group"
              >
                <div
                  className={`h-48 ${course.image} relative flex items-center justify-center`}
                >
                  <BookOpen className="w-16 h-16 text-slate-900/10" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                    {course.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" /> {course.instructor}
                  </p>

                  <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {course.students} SV
                    </span>
                    <span className="flex items-center gap-1">
                      <PlayCircle className="w-4 h-4" /> {course.lessons} bài
                    </span>
                  </div>

                  <button className="w-full mt-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all">
                    Vào học
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <button className="text-blue-600 font-semibold">
              Xem tất cả khóa học
            </button>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-center text-white overflow-hidden relative">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold">
                Sẵn sàng học tập?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl">
                Truy cập ngay hàng ngàn tài liệu và tham gia các bài kiểm tra
                trắc nghiệm để nâng cao kiến thức.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-colors">
                  Đăng ký tài khoản
                </button>
                <button className="px-8 py-3 bg-blue-700 text-white rounded-xl font-bold border border-blue-500 hover:bg-blue-800 transition-colors">
                  Liên hệ Admin
                </button>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
