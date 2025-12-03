"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import ActionMenu from "@/components/ui/action-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// DataTable: lightweight table used across pages
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  filter,
  onEdit,
  onDelete,
  onAdd,
}: {
  columns: {
    key: keyof T;
    header: string;
    render?: (value: any, row: T) => React.ReactNode;
  }[];
  data: T[] | null;
  filter?: { type: "faculty" | "role" | "course group" | "" };
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onAdd?: () => void;
}) {
  const [qFilter, setQFilter] = React.useState<string | "all">("all");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);

  const options = React.useMemo(() => {
    if (!data) return [] as string[];
    if (filter?.type === "faculty") {
      const set = new Set<string>();
      data.forEach((d) =>
        set.add(String(d.faculty_name ?? d.faculty ?? "Unknown"))
      );
      return ["all", ...Array.from(set)];
    }
    if (filter?.type === "role") {
      const set = new Set<string>();
      data.forEach((d) => set.add(String(d.role ?? "")));
      const opts = Array.from(set).filter(Boolean);
      const base = ["all", "teacher", "student"];
      return Array.from(new Set([...base, ...opts]));
    }
    if (filter?.type === "course group") {
      const set = new Set<string>();
      data.forEach((d) => set.add(String(d.course_group ?? "Unknown")));
      const opts = Array.from(set).filter(Boolean);
      return ["all", ...opts];
    }
    return [] as string[];
  }, [data, filter]);

  const filtered = React.useMemo(() => {
    if (!data) return [] as T[];
    if (!filter || qFilter === "all") return data;
    if (filter.type === "faculty") {
      return data.filter(
        (d) =>
          String(d.faculty_name ?? d.faculty ?? "").toLowerCase() ===
          String(qFilter).toLowerCase()
      );
    }
    if (filter.type === "role") {
      return data.filter(
        (d) =>
          String(d.role ?? "").toLowerCase() === String(qFilter).toLowerCase()
      );
    }
    if (filter.type === "course group") {
      return data.filter(
        (d) =>
          String(d.course_group ?? "").toLowerCase() ===
          String(qFilter).toLowerCase()
      );
    }
    return data;
  }, [data, filter, qFilter]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

  React.useEffect(() => {
    // keep page in range when filtered or rowsPerPage change
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [totalPages, page]);

  const startIdx = (page - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const pageRows = filtered.slice(startIdx, endIdx);

  return (
    <div>
      <div className="flex items-center justify-between px-4 lg:px-6 mb-4">
        {filter ? (
          <div className="w-64">
            <Label htmlFor="filter-select" className="sr-only">
              Filter
            </Label>
            <Select
              value={qFilter}
              onValueChange={(v: string) => setQFilter(v as any)}
            >
              <SelectTrigger className="w-full" id="filter-select">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt === "all" ? "All" : opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div />
        )}

        {onAdd && (
          <Button
            onClick={onAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            + Add New
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table>
          <TableHeader>
            <tr>
              {columns.map((col) => (
                <TableHead key={String(col.key)} className="px-6 py-4">
                  {col.header}
                </TableHead>
              ))}
              <TableHead className="px-6 py-4 text-right">Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {!data || data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="px-6 py-6 text-center"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            ) : (
              (pageRows as T[]).map((row, idx) => (
                <TableRow key={(row as any).id ?? idx}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} className="px-6 py-4">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "-")}
                    </TableCell>
                  ))}
                  <TableCell className="px-6 py-4 text-right">
                    <div className="inline-flex items-center justify-end">
                      <ActionMenu
                        onEdit={() => onEdit?.(row)}
                        onDelete={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this item?"
                            )
                          ) {
                            onDelete?.(row);
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-3 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600">Rows per page</span>
          <div className="w-24">
            <Select
              value={String(rowsPerPage)}
              onValueChange={(v) => {
                setRowsPerPage(Number(v));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 100].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-700">
            Page {page} of {totalPages}
          </div>
          <div className="inline-flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage(1)}
              disabled={page <= 1}
            >
              «
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              ‹
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              ›
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage(totalPages)}
              disabled={page >= totalPages}
            >
              »
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
