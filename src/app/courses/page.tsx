"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { DataTable } from "@/components/features/data-table";
import { AddCourseDialog } from "@/components/features/add-course-dialog";
import { EditCourseDialog } from "@/components/features/edit-course-dialog";

export default function CoursesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/courses", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const body = await res.json();
        if (!mounted) return;
        if (body?.success && Array.isArray(body.data)) setCourses(body.data);
        else setCourses([]);
      } catch (err: any) {
        console.error("Load courses error", err);
        if (mounted) setError(String(err?.message ?? err));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddCourse = async (data: {
    course_id: string;
    course_name: string;
    course_group?: string;
    course_passing_grade?: number;
    course_credit: number;
    teacher_id: number;
  }) => {
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create course");
      }

      const result = await res.json();
      if (result.success && result.data) {
        // Add the new course to the list
        setCourses((prev) => (prev ? [...prev, result.data] : [result.data]));
        alert("Course created successfully!");
      } else {
        throw new Error(result.error || "Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Failed to create course"
        }`
      );
      throw error;
    }
  };

  const handleEditCourse = async (
    id: string,
    data: {
      course_name: string;
      course_group?: string;
      course_passing_grade?: number;
      course_credit: number;
      teacher_id: number;
    }
  ) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update course");
      }

      const result = await res.json();
      if (result.success && result.data) {
        // Update the course in the list
        setCourses(
          (prev) =>
            prev?.map((c) =>
              (c.course_id ?? c.id) === id ? result.data : c
            ) ?? null
        );
        alert("Course updated successfully!");
      } else {
        throw new Error(result.error || "Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Failed to update course"
        }`
      );
      throw error;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full relative">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto lg:p-8">
          <div className="max-w-full mx-auto space-y-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Courses</h1>
              <p className="text-slate-500 mt-1">Course list</p>
            </div>

            <div>
              <DataTable
                columns={[
                  { key: "course_id", header: "Course ID" },
                  { key: "course_name", header: "Course Name" },
                  { key: "course_group", header: "Course Group" },
                  { key: "course_passing_grade", header: "Passing Grade" },
                  { key: "course_credit", header: "Credits" },
                  { key: "teacher_name", header: "Teacher" },
                ]}
                data={courses}
                filter={{ type: "course group" }}
                onAdd={() => setShowAddDialog(true)}
                onEdit={(row) => {
                  setSelectedCourse(row);
                  setShowEditDialog(true);
                }}
                onDelete={async (row) => {
                  const id = row.course_id ?? row.id;
                  try {
                    const res = await fetch(`/api/courses/${id}`, {
                      method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Delete failed");
                    setCourses(
                      (prev) =>
                        prev?.filter((c) => (c.course_id ?? c.id) !== id) ??
                        null
                    );
                  } catch (err) {
                    console.error(err);
                    alert("Delete failed");
                  }
                }}
              />
            </div>

            <AddCourseDialog
              open={showAddDialog}
              onOpenChange={setShowAddDialog}
              onSubmit={handleAddCourse}
            />

            <EditCourseDialog
              open={showEditDialog}
              onOpenChange={setShowEditDialog}
              course={selectedCourse}
              onSubmit={handleEditCourse}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
