"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Teacher {
  user_id: number;
  full_name: string;
  teacher_id: string;
  email?: string;
  username?: string;
  role?: string;
  faculty_name?: string;
}

interface AddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    course_id: string;
    course_name: string;
    course_group?: string;
    course_passing_grade?: number;
    course_credit: number;
    teacher_id: number;
    course_status?: string;
  }) => Promise<void>;
}

export function AddCourseDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddCourseDialogProps) {
  const [formData, setFormData] = React.useState<{
    course_id: string;
    course_name: string;
    course_group: string;
    course_passing_grade: number | string;
    course_credit: number | string;
    teacher_id: string;
    course_status: string;
  }>({
    course_id: "",
    course_name: "",
    course_group: "",
    course_passing_grade: 5,
    course_credit: 3,
    teacher_id: "",
    course_status: "active",
  });
  const [teachers, setTeachers] = React.useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingTeachers, setLoadingTeachers] = React.useState(false);

  // Load teachers when dialog opens
  React.useEffect(() => {
    if (open) {
      loadTeachers();
    }
  }, [open]);

  const loadTeachers = async () => {
    setLoadingTeachers(true);
    try {
      const res = await fetch("/api/teachers", {
        credentials: "include",
      });
      if (res.ok) {
        const body = await res.json();
        if (body?.success && Array.isArray(body.data)) {
          setTeachers(body.data);
        }
      }
    } catch (error) {
      console.error("Error loading teachers:", error);
    } finally {
      setLoadingTeachers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.course_id.trim()) {
      alert("Course ID is required");
      return;
    }
    if (!formData.course_name.trim()) {
      alert("Course name is required");
      return;
    }
    if (!formData.teacher_id) {
      alert("Teacher is required");
      return;
    }

    setIsLoading(true);
    try {
      const submitData = {
        course_id: formData.course_id.trim(),
        course_name: formData.course_name.trim(),
        course_credit:
          typeof formData.course_credit === "string"
            ? parseFloat(formData.course_credit) || 3
            : formData.course_credit,
        teacher_id: parseInt(formData.teacher_id),
        course_status: formData.course_status,
        ...(formData.course_group.trim() && {
          course_group: formData.course_group.trim(),
        }),
        ...(formData.course_passing_grade && {
          course_passing_grade:
            typeof formData.course_passing_grade === "string"
              ? parseFloat(formData.course_passing_grade) || 5
              : formData.course_passing_grade,
        }),
      };

      await onSubmit(submitData);

      // Reset form
      setFormData({
        course_id: "",
        course_name: "",
        course_group: "",
        course_passing_grade: 5,
        course_credit: 3,
        teacher_id: "",
        course_status: "active",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (field === "course_credit" || field === "course_passing_grade") {
        // For number fields, store the raw string value to preserve user input
        // Only convert to number when empty or valid number
        if (value === "") {
          setFormData((prev) => ({ ...prev, [field]: "" }));
        } else {
          const numValue = parseFloat(value);
          if (!isNaN(numValue)) {
            setFormData((prev) => ({ ...prev, [field]: numValue }));
          }
        }
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Course</DialogTitle>
          <DialogDescription>
            Create a new course in the system. Fields marked with * are
            required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="course_id">
                  Course ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="course_id"
                  value={formData.course_id}
                  onChange={handleInputChange("course_id")}
                  placeholder="e.g., CS101"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="course_credit">
                  Number of Credits <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="course_credit"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.course_credit}
                  onChange={handleInputChange("course_credit")}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="course_name">
                Course Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="course_name"
                value={formData.course_name}
                onChange={handleInputChange("course_name")}
                placeholder="Enter course name  "
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="course_group">Course Group</Label>
              <Input
                id="course_group"
                value={formData.course_group}
                onChange={handleInputChange("course_group")}
                placeholder="e.g., Computer Science"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="course_passing_grade">Passing Grade</Label>
              <Input
                id="course_passing_grade"
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={formData.course_passing_grade}
                onChange={handleInputChange("course_passing_grade")}
                placeholder="5.0"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="teacher_id">
                Teacher <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.teacher_id}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, teacher_id: value }))
                }
                disabled={loadingTeachers}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loadingTeachers ? "Loading..." : "Select a teacher"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => {
                    const displayName =
                      teacher.full_name || `Teacher ${teacher.user_id}`;
                    return (
                      <SelectItem
                        key={teacher.user_id}
                        value={teacher.user_id.toString()}
                      >
                        {displayName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="course_status">Course Status</Label>
              <Select
                value={formData.course_status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, course_status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading || loadingTeachers}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
