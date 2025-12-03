"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
  Archive,
  Clock,
} from "lucide-react";

interface CourseStatsProps {
  courses: any[] | null;
}

export function CourseStats({ courses }: CourseStatsProps) {
  if (!courses) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-slate-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalCourses = courses.length;
  const activeCourses = courses.filter(
    (c) => c.course_status === "active"
  ).length;
  const archivedCourses = courses.filter(
    (c) => c.course_status === "archived"
  ).length;
  const inactiveCourses = courses.filter(
    (c) => c.course_status === "inactive"
  ).length;

  // Group by course_group
  const courseGroups = courses.reduce((acc, course) => {
    const group = course.course_group || "Other";
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topGroup = Object.entries(courseGroups).sort(
    ([, a], [, b]) => b - a
  )[0];

  // Average credits
  const totalCredits = courses.reduce(
    (sum, course) => sum + (course.course_credit || 0),
    0
  );
  const avgCredits =
    totalCourses > 0 ? (totalCredits / totalCourses).toFixed(1) : "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">
            Total Courses
          </CardTitle>
          <BookOpen className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{totalCourses}</div>
          <p className="text-xs text-blue-600">
            {activeCourses} active, {archivedCourses} archived
          </p>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Active Courses
          </CardTitle>
          <GraduationCap className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {activeCourses}
          </div>
          <p className="text-xs text-green-600">
            {totalCourses > 0
              ? ((activeCourses / totalCourses) * 100).toFixed(1)
              : "0"}
            % of total
          </p>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700">
            Top Course Group
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900">
            {topGroup ? topGroup[0] : "N/A"}
          </div>
          <p className="text-xs text-orange-600">
            {topGroup ? `${topGroup[1]} courses` : "No data"}
          </p>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">
            Average Credits
          </CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">{avgCredits}</div>
          <p className="text-xs text-purple-600">
            Total: {totalCredits} credits
          </p>
        </CardContent>
      </Card>

      {/* Status breakdown - only show if there are inactive or archived courses */}
      {(inactiveCourses > 0 || archivedCourses > 0) && (
        <>
          {inactiveCourses > 0 && (
            <Card className="border-yellow-200 bg-yellow-50/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-700">
                  Inactive Courses
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-900">
                  {inactiveCourses}
                </div>
                <p className="text-xs text-yellow-600">Temporarily disabled</p>
              </CardContent>
            </Card>
          )}

          {archivedCourses > 0 && (
            <Card className="border-gray-200 bg-gray-50/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Archived Courses
                </CardTitle>
                <Archive className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {archivedCourses}
                </div>
                <p className="text-xs text-gray-600">No longer active</p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
