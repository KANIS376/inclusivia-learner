
import React, { useState } from 'react';
import { 
  Plus, Calendar, Clock, CheckSquare, 
  Tag, Search, Filter, MoreHorizontal,
  Download, Share, Eye, Edit, Trash, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  subject: string;
  status: 'draft' | 'published' | 'closed';
  submissionCount: number;
  totalStudents: number;
  gradingStatus: 'not_started' | 'in_progress' | 'completed';
}

// Mock data
const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Data Structures and Algorithms Quiz',
    description: 'Multiple choice and short answer questions covering linked lists, trees, and sorting algorithms.',
    dueDate: new Date('2023-01-20T23:59:59'),
    subject: 'Computer Science',
    status: 'published',
    submissionCount: 18,
    totalStudents: 28,
    gradingStatus: 'in_progress'
  },
  {
    id: '2',
    title: 'AI Ethics Essay',
    description: 'Write a 1000-word essay on the ethical implications of artificial intelligence in healthcare.',
    dueDate: new Date('2023-01-15T23:59:59'),
    subject: 'Ethics',
    status: 'published',
    submissionCount: 25,
    totalStudents: 28,
    gradingStatus: 'not_started'
  },
  {
    id: '3',
    title: 'Linear Algebra Problem Set',
    description: 'Solve problems covering vectors, matrices, linear transformations, and eigenvalues.',
    dueDate: new Date('2023-01-10T23:59:59'),
    subject: 'Mathematics',
    status: 'closed',
    submissionCount: 26,
    totalStudents: 28,
    gradingStatus: 'completed'
  },
  {
    id: '4',
    title: 'Python Programming Challenge',
    description: 'Implement a machine learning algorithm to classify handwritten digits.',
    dueDate: new Date('2023-01-25T23:59:59'),
    subject: 'Computer Science',
    status: 'published',
    submissionCount: 10,
    totalStudents: 28,
    gradingStatus: 'not_started'
  },
  {
    id: '5',
    title: 'Literary Analysis: Modernism',
    description: 'Analyze the use of symbolism in modernist literature, focusing on works by Joyce, Woolf, or Eliot.',
    dueDate: new Date('2023-01-18T23:59:59'),
    subject: 'Literature',
    status: 'published',
    submissionCount: 15,
    totalStudents: 28,
    gradingStatus: 'not_started'
  },
  {
    id: '6',
    title: 'Quantum Physics Quiz',
    description: 'Test covering quantum mechanics principles, including wave-particle duality and uncertainty principle.',
    dueDate: new Date('2023-01-12T23:59:59'),
    subject: 'Physics',
    status: 'closed',
    submissionCount: 27,
    totalStudents: 28,
    gradingStatus: 'completed'
  },
  {
    id: '7',
    title: 'Data Visualization Project',
    description: 'Create interactive visualizations using a dataset of your choice using D3.js or Python.',
    dueDate: new Date('2023-01-30T23:59:59'),
    subject: 'Data Science',
    status: 'draft',
    submissionCount: 0,
    totalStudents: 28,
    gradingStatus: 'not_started'
  }
];

const AssignmentManager: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  
  const getFilteredAssignments = () => {
    let filtered = [...assignments];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(assignment => 
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by status (tab)
    if (currentTab !== 'all') {
      filtered = filtered.filter(assignment => assignment.status === currentTab);
    }
    
    // Sort by due date (most recent first)
    filtered = filtered.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    
    return filtered;
  };
  
  const filteredAssignments = getFilteredAssignments();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
  };
  
  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'closed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return '';
    }
  };
  
  const getGradingStatusColor = (status: Assignment['gradingStatus']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'not_started':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return '';
    }
  };
  
  const getGradingStatusText = (status: Assignment['gradingStatus']) => {
    switch (status) {
      case 'completed':
        return 'Grading Completed';
      case 'in_progress':
        return 'Grading In Progress';
      case 'not_started':
        return 'Not Graded';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Assignments</h1>
        <p className="text-muted-foreground">
          Create, manage, and grade student assignments.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs 
          defaultValue="all" 
          value={currentTab} 
          onValueChange={setCurrentTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Active</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search assignments..." 
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>
                  Add details for the new assignment. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input id="title" placeholder="Assignment title" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <select 
                    id="subject" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select a subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Ethics">Ethics</option>
                    <option value="Literature">Literature</option>
                    <option value="Physics">Physics</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <textarea 
                    id="description" 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Assignment description"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="due-date" className="text-sm font-medium">Due Date</label>
                    <Input id="due-date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="due-time" className="text-sm font-medium">Due Time</label>
                    <Input id="due-time" type="time" defaultValue="23:59" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Save as Draft</Button>
                <Button>Publish Assignment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover-lift">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <Badge className={getStatusColor(assignment.status)} variant="outline">
                      {assignment.status === 'published' ? 'Active' : 
                       assignment.status === 'draft' ? 'Draft' : 'Closed'}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Assignment
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckSquare className="h-4 w-4 mr-2" />
                        Grade Submissions
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download All
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-500 focus:text-red-500"
                        onClick={() => deleteAssignment(assignment.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2 h-10">
                  {assignment.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formatDate(assignment.dueDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {assignment.dueDate.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {assignment.status === 'draft' ? '-' : `${assignment.submissionCount}/${assignment.totalStudents}`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{assignment.subject}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Badge 
                  className={`w-full justify-center ${getGradingStatusColor(assignment.gradingStatus)}`} 
                  variant="outline"
                >
                  {getGradingStatusText(assignment.gradingStatus)}
                </Badge>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No assignments found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try a different search term or filter.' : 'Create your first assignment to get started.'}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* Dialog content reused from above */}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentManager;
