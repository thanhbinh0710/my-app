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

interface Course {
  course_id: string;
  course_name: string;
  course_group?: string;
  course_passing_grade?: number;
  course_credit: number;
  teacher_id: number;
  teacher_name?: string;
}

interface EditCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course | null;
  onSubmit: (
    id: string,
    data: {
      course_name: string;
      course_group?: string;
      course_passing_grade?: number;
      course_credit: number;
      teacher_id: number;
    }
  ) => Promise<void>;
}

export function EditCourseDialog({
  open,
  onOpenChange,
  course,
  onSubmit,
}: EditCourseDialogProps) {
  const [formData, setFormData] = React.useState<{
    course_name: string;
    course_group: string;
    course_passing_grade: number | string;
    course_credit: number | string;
    teacher_id: string;
  }>({
    course_name: "",
    course_group: "",
    course_passing_grade: 5,
    course_credit: 3,
    teacher_id: "",
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

  // Update form data when course changes
  React.useEffect(() => {
    if (course) {
      setFormData({
        course_name: course.course_name || "",
        course_group: course.course_group || "",
        course_passing_grade: course.course_passing_grade || 5,
        course_credit: course.course_credit || 3,
        teacher_id: course.teacher_id?.toString() || "",
      });
    } else {
      setFormData({
        course_name: "",
        course_group: "",
        course_passing_grade: 5,
        course_credit: 3,
        teacher_id: "",
      });
    }
  }, [course]);

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

    if (!course) return;

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
        course_name: formData.course_name.trim(),
        course_credit:
          typeof formData.course_credit === "string"
            ? parseFloat(formData.course_credit) || 3
            : formData.course_credit,
        teacher_id: parseInt(formData.teacher_id),
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

      await onSubmit(course.course_id, submitData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (field === "course_credit" || field === "course_passing_grade") {
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

  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Update course information. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Course ID</Label>
              <Input value={course.course_id} disabled className="bg-gray-50" />
              <p className="text-xs text-gray-500">
                Course ID cannot be changed
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit_course_credit">
                  Course Credit <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit_course_credit"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.course_credit}
                  onChange={handleInputChange("course_credit")}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit_course_passing_grade">Passing Grade</Label>
                <Input
                  id="edit_course_passing_grade"
                  type="number"
                  min="1"
                  max="10"
                  step="0.1"
                  value={formData.course_passing_grade}
                  onChange={handleInputChange("course_passing_grade")}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit_course_name">
                Course Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit_course_name"
                value={formData.course_name}
                onChange={handleInputChange("course_name")}
                placeholder="Enter course name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit_course_group">Course Group</Label>
              <Input
                id="edit_course_group"
                value={formData.course_group}
                onChange={handleInputChange("course_group")}
                placeholder="E.g., Computer Science"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit_teacher_id">
                Giảng viên <span className="text-red-500">*</span>
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
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
