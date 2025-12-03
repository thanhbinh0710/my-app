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

interface AddFacultyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    faculty_name: string;
    office_location?: string;
    phone_number?: string;
    email?: string;
    number_of_teacher_in_faculty?: number;
  }) => Promise<void>;
}

export function AddFacultyDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddFacultyDialogProps) {
  const [formData, setFormData] = React.useState({
    faculty_name: "",
    office_location: "",
    phone_number: "",
    email: "",
    number_of_teacher_in_faculty: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      await onSubmit(submitData);

      // Reset form
      setFormData({
        faculty_name: "",
        office_location: "",
        phone_number: "",
        email: "",
        number_of_teacher_in_faculty: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating faculty:", error);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Faculty</DialogTitle>
          <DialogDescription>
            Create a new faculty in the system. Faculty name is required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="faculty_name">
                Tên khoa <span className="text-red-500">*</span>
              </Label>
              <Input
                id="faculty_name"
                value={formData.faculty_name}
                onChange={handleInputChange("faculty_name")}
                placeholder="Nhập tên khoa"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="office_location">Office Location</Label>
              <Input
                id="office_location"
                value={formData.office_location}
                onChange={handleInputChange("office_location")}
                placeholder="Enter office location"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleInputChange("phone_number")}
                placeholder="Enter phone number"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
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
                min="0"
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
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
