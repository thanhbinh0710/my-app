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
import { RoleBadge } from "@/components/ui/role-badge";
import { EditUserDialog } from "@/components/features/edit-user-dialog";
// DataTable handles table rendering

export default function UsersPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<any[] | null>(null);
  const [allUsers, setAllUsers] = useState<any[] | null>(null); // For stats - unfiltered
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Filter states
  const [filters, setFilters] = useState({
    role: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Load all users for stats (unfiltered)
  const loadAllUsers = async () => {
    try {
      const res = await fetch("/api/users", {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const body = await res.json();
      if (body?.success && Array.isArray(body.data)) {
        setAllUsers(body.data);
      } else {
        setAllUsers([]);
      }
    } catch (err: any) {
      console.error("Load all users error", err);
      setAllUsers([]);
    }
  };

  // Load users with filters
  const loadUsers = async () => {
    try {
      setLoading(true);

      if (searchTerm.trim()) {
        // Use search functionality
        const filteredData =
          allUsers?.filter(
            (user: any) =>
              user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.full_name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              user.email?.toLowerCase().includes(searchTerm.toLowerCase())
          ) || [];
        setUsers(filteredData);
      } else {
        // Use filter functionality
        let filteredData = allUsers || [];

        // Client-side filter by role
        if (filters.role !== "all") {
          filteredData = filteredData.filter(
            (user: any) => user.role === filters.role
          );
        }

        setUsers(filteredData);
      }
    } catch (err: any) {
      console.error("Load users error", err);
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load all users for stats only once (unless users are added/updated)
    if (!allUsers) {
      loadAllUsers();
    }
    loadUsers();
  }, [filters, searchTerm, allUsers]);

  // Reload all users when users are modified
  const reloadAllUsers = () => {
    loadAllUsers();
  };

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
        reloadAllUsers(); // Refresh stats
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
              <p className="text-slate-500 mt-1">User management</p>
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
                    placeholder="Search by username, full name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Filter Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* Role Filter */}
                  <div>
                    <Select
                      value={filters.role}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
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
                        role: "all",
                      });
                      setSearchTerm("");
                    }}
                  >
                    Clear
                  </Button>

                  {/* Refresh Button */}
                  <Button size="sm" onClick={loadUsers} disabled={loading}>
                    {loading ? "Loading..." : "Refresh"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            {users && (
              <div className="flex items-center justify-between text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
                <span>
                  Showing {users.length} user
                  {users.length !== 1 ? "s" : ""}
                  {searchTerm && ` for "${searchTerm}"`}
                  {filters.role !== "all" && ` with ${filters.role} role`}
                </span>
                <div className="flex items-center gap-2">
                  {(searchTerm || filters.role !== "all") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFilters({
                          role: "all",
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
                    reloadAllUsers(); // Refresh stats
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
