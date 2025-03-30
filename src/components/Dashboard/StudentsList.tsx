
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const studentData = [
  {
    id: 1,
    name: "Emma Johnson",
    email: "emma.j@example.com",
    course: "Advanced Mathematics",
    performance: 92,
    status: "Active",
  },
  {
    id: 2,
    name: "James Smith",
    email: "james.s@example.com",
    course: "Computer Science",
    performance: 85,
    status: "Active",
  },
  {
    id: 3,
    name: "Olivia Brown",
    email: "olivia.b@example.com",
    course: "Physics",
    performance: 78,
    status: "Inactive",
  },
  {
    id: 4,
    name: "William Davis",
    email: "william.d@example.com",
    course: "Biology",
    performance: 88,
    status: "Active",
  },
  {
    id: 5,
    name: "Sophia Miller",
    email: "sophia.m@example.com",
    course: "English Literature",
    performance: 95,
    status: "Active",
  },
];

const StudentsList: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Students</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8 w-[250px]"
            />
          </div>
          <Button variant="outline" size="sm">
            Add Student
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentData.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-full bg-secondary h-2 rounded-full mr-2">
                      <div
                        className={`h-full rounded-full ${
                          student.performance >= 90
                            ? "bg-green-500"
                            : student.performance >= 70
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${student.performance}%` }}
                      />
                    </div>
                    <span className="text-sm">{student.performance}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {student.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentsList;
