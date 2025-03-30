
import React, { useState, useEffect } from 'react';
import { Search, Filter, UserPlus, ChevronDown, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Mock student data
const mockStudents = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    grade: 'A',
    performance: 92,
    attendance: 97,
    assignments: 8,
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Sophia Williams',
    email: 'sophia.w@example.com',
    grade: 'A-',
    performance: 88,
    attendance: 95,
    assignments: 7,
    lastActive: '1 day ago'
  },
  {
    id: '3',
    name: 'Michael Lee',
    email: 'michael.l@example.com',
    grade: 'A+',
    performance: 95,
    attendance: 98,
    assignments: 9,
    lastActive: '4 hours ago'
  },
  {
    id: '4',
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    grade: 'B+',
    performance: 85,
    attendance: 92,
    assignments: 6,
    lastActive: '3 days ago'
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.w@example.com',
    grade: 'C',
    performance: 75,
    attendance: 85,
    assignments: 5,
    lastActive: '1 week ago'
  },
  {
    id: '6',
    name: 'Olivia Martinez',
    email: 'olivia.m@example.com',
    grade: 'B',
    performance: 82,
    attendance: 90,
    assignments: 7,
    lastActive: '2 days ago'
  },
  {
    id: '7',
    name: 'Daniel Brown',
    email: 'daniel.b@example.com',
    grade: 'B-',
    performance: 78,
    attendance: 88,
    assignments: 6,
    lastActive: '5 days ago'
  }
];

// Define student type
interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  performance: number;
  attendance: number;
  assignments: number;
  lastActive: string;
}

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Student>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchStudents = async () => {
      setLoading(true);
      // In a real app, this would be an API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 800));
      setStudents(mockStudents);
      setLoading(false);
    };
    
    fetchStudents();
  }, []);
  
  const handleSort = (column: keyof Student) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  const sortedStudents = [...students].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];
    
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    return 0;
  });
  
  const filteredStudents = sortedStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const SortIcon = ({ column }: { column: keyof Student }) => (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => handleSort(column)}
      className="ml-1 h-8 data-[state=open]:bg-accent"
    >
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );
  
  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-500';
    if (performance >= 80) return 'text-emerald-500';
    if (performance >= 70) return 'text-amber-500';
    return 'text-red-500';
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Students</h1>
        <p className="text-muted-foreground">
          View and manage your students and their performance.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Students</DropdownMenuItem>
              <DropdownMenuItem>High Performers</DropdownMenuItem>
              <DropdownMenuItem>Needs Improvement</DropdownMenuItem>
              <DropdownMenuItem>Low Attendance</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" type="button">Cancel</Button>
                  <Button type="submit">Add Student</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Name
                <SortIcon column="name" />
              </TableHead>
              <TableHead>
                Grade
                <SortIcon column="grade" />
              </TableHead>
              <TableHead>
                Performance
                <SortIcon column="performance" />
              </TableHead>
              <TableHead>
                Attendance
                <SortIcon column="attendance" />
              </TableHead>
              <TableHead>
                Assignments
                <SortIcon column="assignments" />
              </TableHead>
              <TableHead>
                Last Active
                <SortIcon column="lastActive" />
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 7 }).map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-xs text-muted-foreground">{student.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <span className={getPerformanceColor(student.performance)}>
                      {student.performance}%
                    </span>
                  </TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell>{student.assignments} / 9</TableCell>
                  <TableCell>{student.lastActive}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem>View Progress</DropdownMenuItem>
                        <DropdownMenuItem>Generate Report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No students found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentsList;
