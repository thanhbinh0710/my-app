"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { DataTable } from "@/components/features/data-table";
import { AddFacultyDialog } from "@/components/features/add-faculty-dialog";
import { EditFacultyDialog } from "@/components/features/edit-faculty-dialog";
export default function FacultyPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [faculties, setFaculties] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/faculties`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const body = await res.json();
        if (!mounted) return;
        if (body?.success && Array.isArray(body.data)) {
          setFaculties(body.data);
        } else {
          setFaculties([]);
        }
      } catch (err: any) {
        console.error("Load faculties error", err);
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
        alert("Cập nhật khoa thành công!");
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
              <p className="text-slate-500 mt-1">Faculty list</p>
            </div>

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
