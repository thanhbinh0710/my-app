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

interface Faculty {
  faculty_id: number;
  faculty_name: string;
  office_location?: string;
  phone_number?: string;
  email?: string;
  number_of_teacher_in_faculty?: number;
}

interface EditFacultyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faculty: Faculty | null;
  onSubmit: (
    id: number,
    data: {
      faculty_name: string;
      office_location?: string;
      phone_number?: string;
      email?: string;
    }
  ) => Promise<void>;
}

export function EditFacultyDialog({
  open,
  onOpenChange,
  faculty,
  onSubmit,
}: EditFacultyDialogProps) {
  const [formData, setFormData] = React.useState({
    faculty_name: "",
    office_location: "",
    phone_number: "",
    email: "",
    number_of_teacher_in_faculty: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  // Update form data when faculty changes
  React.useEffect(() => {
    if (faculty) {
      setFormData({
        faculty_name: faculty.faculty_name || "",
        office_location: faculty.office_location || "",
        phone_number: faculty.phone_number || "",
        email: faculty.email || "",
        number_of_teacher_in_faculty:
          faculty.number_of_teacher_in_faculty?.toString() || "",
      });
    } else {
      setFormData({
        faculty_name: "",
        office_location: "",
        phone_number: "",
        email: "",
        number_of_teacher_in_faculty: "",
      });
    }
  }, [faculty]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!faculty) return;

    if (!formData.faculty_name.trim()) {
      alert("Faculty name is required");
      return;
    }

    setIsLoading(true);
    try {
      const submitData = {
        faculty_name: formData.faculty_name.trim(),
        ...(formData.office_location.trim() && {
          office_location: formData.office_location.trim(),
        }),
        ...(formData.phone_number.trim() && {
          phone_number: formData.phone_number.trim(),
        }),
        ...(formData.email.trim() && { email: formData.email.trim() }),
        ...(formData.number_of_teacher_in_faculty.trim() && {
          number_of_teacher_in_faculty: Number(
            formData.number_of_teacher_in_faculty.trim()
          ),
        }),
      };

      await onSubmit(faculty.faculty_id, submitData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating faculty:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  if (!faculty) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Faculty</DialogTitle>
          <DialogDescription>
            Update faculty information. Faculty name is required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit_faculty_name">
                Faculty Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit_faculty_name"
                value={formData.faculty_name}
                onChange={handleInputChange("faculty_name")}
                placeholder="Enter faculty name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit_office_location">Office Location</Label>
              <Input
                id="edit_office_location"
                value={formData.office_location}
                onChange={handleInputChange("office_location")}
                placeholder="Enter office location"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit_phone_number">Phone Number</Label>
              <Input
                id="edit_phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleInputChange("phone_number")}
                placeholder="Enter phone number"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit_email">Email</Label>
              <Input
                id="edit_email"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                placeholder="Enter email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number_of_teacher_in_faculty">
                Number of Teachers
              </Label>
              <Input
                id="number_of_teacher_in_faculty"
                type="number"
                value={formData.number_of_teacher_in_faculty}
                onChange={handleInputChange("number_of_teacher_in_faculty")}
                placeholder="Enter number of teachers"
              />
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
