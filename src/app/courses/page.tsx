"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { DataTable } from "@/components/features/data-table";
import { AddCourseDialog } from "@/components/features/add-course-dialog";
import { EditCourseDialog } from "@/components/features/edit-course-dialog";
import { CourseStats } from "@/components/features/course-stats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CoursesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<any[] | null>(null);
  const [allCourses, setAllCourses] = useState<any[] | null>(null); // For stats - unfiltered
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  // Filter states
  const [filters, setFilters] = useState({
    min_credit: "any",
    course_status: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Load all courses for stats (unfiltered)
  const loadAllCourses = async () => {
    try {
      const res = await fetch("/api/courses", {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const body = await res.json();
      if (body?.success && Array.isArray(body.data)) {
        setAllCourses(body.data);
      } else {
        setAllCourses([]);
      }
    } catch (err: any) {
      console.error("Load all courses error", err);
      setAllCourses([]);
    }
  };

  // Load courses with filters
  const loadCourses = async () => {
    try {
      setLoading(true);

      // Build query params
      const params = new URLSearchParams();

      if (searchTerm.trim()) {
        // Use search endpoint if there's a search term
        const res = await fetch(
          `/api/courses/search?q=${encodeURIComponent(searchTerm)}`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const body = await res.json();
        if (body?.success && Array.isArray(body.data)) setCourses(body.data);
        else setCourses([]);
      } else {
        // Use filter endpoint
        if (filters.min_credit !== "any")
          params.append("min_credit", filters.min_credit);

        const url = params.toString()
          ? `/api/courses?${params}`
          : "/api/courses";
        const res = await fetch(url, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const body = await res.json();
        if (body?.success && Array.isArray(body.data)) {
          let filteredData = body.data;

          // Client-side filter by status
          if (filters.course_status !== "all") {
            filteredData = body.data.filter(
              (course: any) => course.course_status === filters.course_status
            );
          }

          setCourses(filteredData);
        } else {
          setCourses([]);
        }
      }
    } catch (err: any) {
      console.error("Load courses error", err);
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load all courses for stats only once (unless courses are added/updated)
    if (!allCourses) {
      loadAllCourses();
    }
    loadCourses();
  }, [filters, searchTerm]);

  // Reload all courses when courses are modified
  const reloadAllCourses = () => {
    loadAllCourses();
  };

  const handleAddCourse = async (data: {
    course_id: string;
    course_name: string;
    course_group?: string;
    course_passing_grade?: number;
    course_credit: number;
    teacher_id: number;
    course_status?: string;
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
      course_status?: string;
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
              <p className="text-slate-500 mt-1">Course management</p>
            </div>

            {/* Course Statistics */}
            <CourseStats courses={allCourses} />

            {/* Filters */}
            <div className="bg-slate-50 rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="h-4 w-4 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                  />
                </svg>
                <h3 className="font-medium text-slate-700">Filters</h3>
              </div>

              <div className="space-y-3">
                {/* Search Bar */}
                <div>
                  <Input
                    placeholder="Search by course name or teacher name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Filter Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* Min Credit Filter */}
                  <div>
                    <Select
                      value={filters.min_credit}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, min_credit: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any Credits" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Credits</SelectItem>
                        <SelectItem value="1">1+ Credits</SelectItem>
                        <SelectItem value="2">2+ Credits</SelectItem>
                        <SelectItem value="3">3+ Credits</SelectItem>
                        <SelectItem value="4">4+ Credits</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <Select
                      value={filters.course_status}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          course_status: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters({
                        min_credit: "any",
                        course_status: "all",
                      });
                      setSearchTerm("");
                    }}
                  >
                    Clear
                  </Button>

                  {/* Refresh Button */}
                  <Button size="sm" onClick={loadCourses} disabled={loading}>
                    {loading ? "Loading..." : "Refresh"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            {courses && (
              <div className="flex items-center justify-between text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
                <span>
                  Showing {courses.length} course
                  {courses.length !== 1 ? "s" : ""}
                  {searchTerm && ` for "${searchTerm}"`}
                  {filters.course_status !== "all" &&
                    ` with ${filters.course_status} status`}
                </span>
                <div className="flex items-center gap-2">
                  {(searchTerm ||
                    filters.min_credit !== "any" ||
                    filters.course_status !== "all") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFilters({
                          min_credit: "any",
                          course_status: "all",
                        });
                        setSearchTerm("");
                      }}
                    >
                      Show All
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div>
              <DataTable
                columns={[
                  { key: "course_id", header: "Course ID" },
                  { key: "course_name", header: "Course Name" },
                  { key: "course_credit", header: "Credits" },
                  {
                    key: "course_passing_grade",
                    header: "Pass Grade",
                    render: (value) => (value ? `${value}/10` : "-"),
                  },
                  { key: "teacher_name", header: "Teacher" },
                  {
                    key: "course_status",
                    header: "Status",
                    render: (value) => (
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          value === "active"
                            ? "bg-green-100 text-green-800"
                            : value === "inactive"
                            ? "bg-yellow-100 text-yellow-800"
                            : value === "archived"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {value || "Unknown"}
                      </span>
                    ),
                  },
                  {
                    key: "creation_date",
                    header: "Created",
                    render: (value) =>
                      value ? new Date(value).toLocaleDateString() : "-",
                  },
                ]}
                data={courses}
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
                    loadCourses(); // Refresh the list after deletion
                    reloadAllCourses(); // Refresh stats
                    alert("Course deleted successfully!");
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
              onSubmit={async (data) => {
                await handleAddCourse(data);
                loadCourses(); // Refresh the list after adding
                reloadAllCourses(); // Refresh stats
              }}
            />

            <EditCourseDialog
              open={showEditDialog}
              onOpenChange={setShowEditDialog}
              course={selectedCourse}
              onSubmit={async (id, data) => {
                await handleEditCourse(id, data);
                loadCourses(); // Refresh the list after editing
                reloadAllCourses(); // Refresh stats
              }}
            />

            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-slate-600 mt-2">Loading courses...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">Error: {error}</p>
                  <Button
                    variant="outline"
                    onClick={loadCourses}
                    className="mt-2"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
