"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
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

import { DataTable } from "@/components/features/data-table";
import { AddFacultyDialog } from "@/components/features/add-faculty-dialog";
import { EditFacultyDialog } from "@/components/features/edit-faculty-dialog";
export default function FacultyPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [faculties, setFaculties] = useState<any[] | null>(null);
  const [allFaculties, setAllFaculties] = useState<any[] | null>(null); // For stats - unfiltered
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  // Filter states
  const [filters, setFilters] = useState({
    min_teachers: "any",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Load all faculties for stats (unfiltered)
  const loadAllFaculties = async () => {
    try {
      const res = await fetch("/api/faculties", {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const body = await res.json();
      if (body?.success && Array.isArray(body.data)) {
        setAllFaculties(body.data);
      } else {
        setAllFaculties([]);
      }
    } catch (err: any) {
      console.error("Load all faculties error", err);
      setAllFaculties([]);
    }
  };

  // Load faculties with filters
  const loadFaculties = async () => {
    try {
      setLoading(true);

      if (searchTerm.trim()) {
        // Use search functionality
        const filteredData =
          allFaculties?.filter(
            (faculty: any) =>
              faculty.faculty_name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              faculty.office_location
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
          ) || [];
        setFaculties(filteredData);
      } else {
        // Use filter functionality
        let filteredData = allFaculties || [];

        // Client-side filter by min teachers
        if (filters.min_teachers !== "any") {
          const minTeachers = parseInt(filters.min_teachers);
          filteredData = filteredData.filter(
            (faculty: any) =>
              (faculty.number_of_teacher_in_faculty || 0) >= minTeachers
          );
        }

        setFaculties(filteredData);
      }
    } catch (err: any) {
      console.error("Load faculties error", err);
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load all faculties for stats only once (unless faculties are added/updated)
    if (!allFaculties) {
      loadAllFaculties();
    }
    loadFaculties();
  }, [filters, searchTerm, allFaculties]);

  // Reload all faculties when faculties are modified
  const reloadAllFaculties = () => {
    loadAllFaculties();
  };

  const handleAddFaculty = async (data: {
    faculty_name: string;
    office_location?: string;
    phone_number?: string;
    email?: string;
    number_of_teacher_in_faculty?: number;
  }) => {
    try {
      const res = await fetch("/api/faculties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Create faculty failed");
      }

      const result = await res.json();
      if (result.success && result.data) {
        // Add the new faculty to the list
        setFaculties((prev) => (prev ? [...prev, result.data] : [result.data]));
        reloadAllFaculties(); // Refresh stats
        alert("Create faculty successful!");
      } else {
        throw new Error(result.error || "Create faculty failed");
      }
    } catch (error) {
      console.error("Error creating faculty:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Create faculty failed"
        }`
      );
      throw error;
    }
  };

  const handleEditFaculty = async (
    id: number,
    data: {
      faculty_name: string;
      office_location?: string;
      phone_number?: string;
      email?: string;
    }
  ) => {
    try {
      const res = await fetch(`/api/faculties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Update faculty failed");
      }

      const result = await res.json();
      if (result.success && result.data) {
        // Update the faculty in the list
        setFaculties(
          (prev) =>
            prev?.map((f) =>
              (f.faculty_id ?? f.id) === id ? result.data : f
            ) ?? null
        );
        reloadAllFaculties(); // Refresh stats
        alert("Update faculty successful!");
      } else {
        throw new Error(result.error || "Update faculty failed");
      }
    } catch (error) {
      console.error("Error updating faculty:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Update faculty failed"
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
              <h1 className="text-2xl font-bold text-slate-800">Faculty</h1>
              <p className="text-slate-500 mt-1">Faculty management</p>
            </div>

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
                    placeholder="Search by faculty name or office location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Filter Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* Min Teachers Filter */}
                  <div>
                    <Select
                      value={filters.min_teachers}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, min_teachers: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Min Teachers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Teachers</SelectItem>
                        <SelectItem value="1">1+ Teachers</SelectItem>
                        <SelectItem value="5">5+ Teachers</SelectItem>
                        <SelectItem value="10">10+ Teachers</SelectItem>
                        <SelectItem value="15">15+ Teachers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Spacer for alignment */}
                  <div></div>

                  {/* Clear Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters({
                        min_teachers: "any",
                      });
                      setSearchTerm("");
                    }}
                  >
                    Clear
                  </Button>

                  {/* Refresh Button */}
                  <Button size="sm" onClick={loadFaculties} disabled={loading}>
                    {loading ? "Loading..." : "Refresh"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            {faculties && (
              <div className="flex items-center justify-between text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
                <span>
                  Showing {faculties.length} facult
                  {faculties.length !== 1 ? "ies" : "y"}
                  {searchTerm && ` for "${searchTerm}"`}
                  {filters.min_teachers !== "any" &&
                    ` with ${filters.min_teachers}+ teachers`}
                </span>
                <div className="flex items-center gap-2">
                  {(searchTerm || filters.min_teachers !== "any") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFilters({
                          min_teachers: "any",
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
                  { key: "faculty_name", header: "Faculty Name" },
                  { key: "office_location", header: "Office Location" },
                  { key: "phone_number", header: "Phone Number" },
                  { key: "email", header: "Email" },
                  {
                    key: "number_of_teacher_in_faculty",
                    header: "Number of Teachers",
                  },
                ]}
                data={faculties}
                onAdd={() => setShowAddDialog(true)}
                onEdit={(row) => {
                  setSelectedFaculty(row);
                  setShowEditDialog(true);
                }}
                onDelete={async (row) => {
                  const id = row.faculty_id ?? row.id;
                  try {
                    const res = await fetch(`/api/faculties/${id}`, {
                      method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Delete failed");
                    setFaculties(
                      (prev) =>
                        prev?.filter((f) => (f.faculty_id ?? f.id) !== id) ??
                        null
                    );
                    reloadAllFaculties(); // Refresh stats
                  } catch (err) {
                    console.error(err);
                    alert("Xóa thất bại");
                  }
                }}
              />
            </div>

            <AddFacultyDialog
              open={showAddDialog}
              onOpenChange={setShowAddDialog}
              onSubmit={handleAddFaculty}
            />

            <EditFacultyDialog
              open={showEditDialog}
              onOpenChange={setShowEditDialog}
              faculty={selectedFaculty}
              onSubmit={handleEditFaculty}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
