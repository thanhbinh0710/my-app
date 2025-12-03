"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { DataTable } from "@/components/features/data-table";
import { RoleBadge } from "@/components/ui/role-badge";
import { EditUserDialog } from "@/components/features/edit-user-dialog";
// DataTable handles table rendering

export default function UsersPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/users`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const body = await res.json();
        if (!mounted) return;
        if (body?.success && Array.isArray(body.data)) setUsers(body.data);
        else setUsers([]);
      } catch (err: any) {
        console.error("Load users error", err);
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

  const handleEditUser = async (
    id: number,
    data: {
      role: string;
    }
  ) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Update user failed");
      }

      const result = await res.json();
      if (result.success && result.data) {
        // Update the user in the list
        setUsers(
          (prev) =>
            prev?.map((u) => ((u.user_id ?? u.id) === id ? result.data : u)) ??
            null
        );
        alert("Update user successful!");
      } else {
        throw new Error(result.error || "Update user failed");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Update user failed"
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
              <h1 className="text-2xl font-bold text-slate-800">Users</h1>
              <p className="text-slate-500 mt-1">User list</p>
            </div>

            <div>
              <DataTable
                columns={[
                  { key: "username", header: "Username" },
                  { key: "full_name", header: "Full Name" },
                  { key: "email", header: "Email" },
                  {
                    key: "role",
                    header: "Role",
                    render: (value: string) => <RoleBadge role={value} />,
                  },
                ]}
                data={users}
                filter={{ type: "role" }}
                onEdit={(row) => {
                  setSelectedUser(row);
                  setShowEditDialog(true);
                }}
                onDelete={async (row) => {
                  const id = row.id ?? row.user_id;
                  try {
                    const res = await fetch(`/api/users/${id}`, {
                      method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Delete failed");
                    setUsers(
                      (prev) =>
                        prev?.filter((u) => (u.id ?? u.user_id) !== id) ?? null
                    );
                  } catch (err) {
                    console.error(err);
                    alert("Delete failed");
                  }
                }}
              />
            </div>

            <EditUserDialog
              open={showEditDialog}
              onOpenChange={setShowEditDialog}
              user={selectedUser}
              onSubmit={handleEditUser}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
