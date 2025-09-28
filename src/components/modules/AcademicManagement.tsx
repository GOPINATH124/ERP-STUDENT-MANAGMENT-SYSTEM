import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  Plus,
  Edit,
  MapPin,
  User
} from 'lucide-react';
import type { User } from '../../App';

interface AcademicManagementProps {
  user: User;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  class: string;
  section: string;
  teacher: string;
  credits: number;
  description: string;
}

interface TimeTableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  class: string;
  section: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  description: string;
  status: 'active' | 'completed' | 'overdue';
}

const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    code: 'MATH401',
    class: 'Grade 10',
    section: 'A',
    teacher: 'Dr. Robert Smith',
    credits: 4,
    description: 'Advanced topics in algebra, geometry, and calculus'
  },
  {
    id: '2',
    name: 'Physics',
    code: 'PHY301',
    class: 'Grade 10',
    section: 'A',
    teacher: 'Prof. Sarah Johnson',
    credits: 4,
    description: 'Fundamental principles of physics including mechanics and thermodynamics'
  },
  {
    id: '3',
    name: 'English Literature',
    code: 'ENG201',
    class: 'Grade 10',
    section: 'A',
    teacher: 'Ms. Jennifer Davis',
    credits: 3,
    description: 'Study of classical and contemporary literature'
  },
  {
    id: '4',
    name: 'Chemistry',
    code: 'CHEM301',
    class: 'Grade 10',
    section: 'A',
    teacher: 'Dr. Michael Chen',
    credits: 4,
    description: 'Organic and inorganic chemistry fundamentals'
  }
];

const mockTimeTable: TimeTableEntry[] = [
  // Monday
  { id: '1', day: 'Monday', time: '09:00-10:00', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 201', class: 'Grade 10', section: 'A' },
  { id: '2', day: 'Monday', time: '10:00-11:00', subject: 'Physics', teacher: 'Prof. Johnson', room: 'Lab 1', class: 'Grade 10', section: 'A' },
  { id: '3', day: 'Monday', time: '11:30-12:30', subject: 'English Literature', teacher: 'Ms. Davis', room: 'Room 105', class: 'Grade 10', section: 'A' },
  { id: '4', day: 'Monday', time: '14:00-15:00', subject: 'History', teacher: 'Mr. Wilson', room: 'Room 301', class: 'Grade 10', section: 'A' },
  
  // Tuesday
  { id: '5', day: 'Tuesday', time: '09:00-10:00', subject: 'Chemistry', teacher: 'Dr. Chen', room: 'Lab 2', class: 'Grade 10', section: 'A' },
  { id: '6', day: 'Tuesday', time: '10:00-11:00', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 201', class: 'Grade 10', section: 'A' },
  { id: '7', day: 'Tuesday', time: '11:30-12:30', subject: 'Biology', teacher: 'Dr. Martinez', room: 'Lab 3', class: 'Grade 10', section: 'A' },
  { id: '8', day: 'Tuesday', time: '14:00-15:00', subject: 'Geography', teacher: 'Ms. Thompson', room: 'Room 205', class: 'Grade 10', section: 'A' },
  
  // Wednesday
  { id: '9', day: 'Wednesday', time: '09:00-10:00', subject: 'Physics', teacher: 'Prof. Johnson', room: 'Lab 1', class: 'Grade 10', section: 'A' },
  { id: '10', day: 'Wednesday', time: '10:00-11:00', subject: 'English Literature', teacher: 'Ms. Davis', room: 'Room 105', class: 'Grade 10', section: 'A' },
  { id: '11', day: 'Wednesday', time: '11:30-12:30', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 201', class: 'Grade 10', section: 'A' },
  { id: '12', day: 'Wednesday', time: '14:00-15:00', subject: 'Computer Science', teacher: 'Mr. Anderson', room: 'Computer Lab', class: 'Grade 10', section: 'A' },
  
  // Thursday
  { id: '13', day: 'Thursday', time: '09:00-10:00', subject: 'Chemistry', teacher: 'Dr. Chen', room: 'Lab 2', class: 'Grade 10', section: 'A' },
  { id: '14', day: 'Thursday', time: '10:00-11:00', subject: 'History', teacher: 'Mr. Wilson', room: 'Room 301', class: 'Grade 10', section: 'A' },
  { id: '15', day: 'Thursday', time: '11:30-12:30', subject: 'Physical Education', teacher: 'Coach Brown', room: 'Gymnasium', class: 'Grade 10', section: 'A' },
  { id: '16', day: 'Thursday', time: '14:00-15:00', subject: 'Art', teacher: 'Ms. Garcia', room: 'Art Studio', class: 'Grade 10', section: 'A' },
  
  // Friday
  { id: '17', day: 'Friday', time: '09:00-10:00', subject: 'Biology', teacher: 'Dr. Martinez', room: 'Lab 3', class: 'Grade 10', section: 'A' },
  { id: '18', day: 'Friday', time: '10:00-11:00', subject: 'Geography', teacher: 'Ms. Thompson', room: 'Room 205', class: 'Grade 10', section: 'A' },
  { id: '19', day: 'Friday', time: '11:30-12:30', subject: 'Computer Science', teacher: 'Mr. Anderson', room: 'Computer Lab', class: 'Grade 10', section: 'A' },
  { id: '20', day: 'Friday', time: '14:00-15:00', subject: 'Music', teacher: 'Ms. Rodriguez', room: 'Music Room', class: 'Grade 10', section: 'A' },
];

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Calculus Problem Set',
    subject: 'Mathematics',
    class: 'Grade 10',
    dueDate: '2024-03-25',
    description: 'Complete problems 1-20 from Chapter 5',
    status: 'active'
  },
  {
    id: '2',
    title: 'Physics Lab Report',
    subject: 'Physics',
    class: 'Grade 10',
    dueDate: '2024-03-22',
    description: 'Write a comprehensive lab report on the pendulum experiment',
    status: 'active'
  },
  {
    id: '3',
    title: 'Literature Essay',
    subject: 'English Literature',
    class: 'Grade 10',
    dueDate: '2024-03-20',
    description: 'Analyze the themes in Shakespeare\'s Hamlet',
    status: 'overdue'
  }
];

export function AcademicManagement({ user }: AcademicManagementProps) {
  const [selectedClass, setSelectedClass] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaySchedule = (day: string) => {
    return mockTimeTable.filter(entry => entry.day === day && entry.class === selectedClass && entry.section === selectedSection);
  };

  const renderSubjects = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Subjects</h3>
            <p className="text-muted-foreground">Manage course subjects and curriculum</p>
          </div>
          {(user.role === 'admin' || user.role === 'teacher') && (
            <Button onClick={() => setIsAddSubjectOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSubjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription>{subject.code}</CardDescription>
                  </div>
                  <Badge variant="outline">{subject.credits} Credits</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="w-4 h-4 mr-2" />
                  {subject.teacher}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {subject.class} - Section {subject.section}
                </div>
                <p className="text-sm text-muted-foreground">
                  {subject.description}
                </p>
                {(user.role === 'admin' || user.role === 'teacher') && (
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderTimeTable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = [
      '09:00-10:00',
      '10:00-11:00', 
      '11:00-12:00',
      '11:30-12:30',
      '12:00-13:00',
      '14:00-15:00',
      '15:00-16:00'
    ];
    
    const getScheduleForDayAndTime = (day: string, time: string) => {
      return mockTimeTable.find(entry => 
        entry.day === day && 
        entry.time === time && 
        entry.class === selectedClass && 
        entry.section === selectedSection
      );
    };

    const getAllTimeSlotsForClass = () => {
      const classSchedule = mockTimeTable.filter(entry => 
        entry.class === selectedClass && entry.section === selectedSection
      );
      const uniqueTimeSlots = [...new Set(classSchedule.map(entry => entry.time))].sort();
      return uniqueTimeSlots.length > 0 ? uniqueTimeSlots : timeSlots.slice(0, 4);
    };

    const relevantTimeSlots = getAllTimeSlotsForClass();
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Class Schedule</h3>
            <p className="text-muted-foreground">Weekly timetable for classes</p>
          </div>
          <div className="flex space-x-2">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
                <SelectItem value="Grade 11">Grade 11</SelectItem>
                <SelectItem value="Grade 12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium text-sm min-w-[120px] sticky left-0 bg-muted/50 border-r">
                      Time
                    </th>
                    {days.map((day) => (
                      <th key={day} className="text-center p-4 font-medium text-sm min-w-[180px]">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {relevantTimeSlots.map((timeSlot, timeIndex) => (
                    <tr key={timeSlot} className={`border-b hover:bg-muted/30 ${timeIndex % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                      <td className="p-4 font-medium text-sm border-r sticky left-0 bg-background min-w-[120px]">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          {timeSlot}
                        </div>
                      </td>
                      {days.map((day) => {
                        const scheduleEntry = getScheduleForDayAndTime(day, timeSlot);
                        return (
                          <td key={`${day}-${timeSlot}`} className="p-3 align-top min-w-[180px]">
                            {scheduleEntry ? (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition-colors">
                                <div className="space-y-2">
                                  <div className="font-medium text-sm text-blue-900 leading-tight">
                                    {scheduleEntry.subject}
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center text-xs text-blue-700">
                                      <User className="w-3 h-3 mr-1 flex-shrink-0" />
                                      <span className="leading-tight">{scheduleEntry.teacher}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-blue-700">
                                      <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                      <span className="leading-tight">{scheduleEntry.room}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="h-16 border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">Free</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="flex items-center space-x-3 p-4">
              <div className="w-4 h-4 bg-blue-200 rounded border border-blue-300"></div>
              <span className="text-sm text-blue-900">Scheduled Classes</span>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="flex items-center space-x-3 p-4">
              <div className="w-4 h-4 border-2 border-dashed border-gray-400 rounded bg-white"></div>
              <span className="text-sm text-gray-700">Free Periods</span>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="flex items-center space-x-3 p-4">
              <div className="w-4 h-4 bg-green-200 rounded border border-green-300"></div>
              <span className="text-sm text-green-900">Break Time</span>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderAssignments = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Assignments</h3>
            <p className="text-muted-foreground">Manage homework and assignments</p>
          </div>
          {(user.role === 'admin' || user.role === 'teacher') && (
            <Button onClick={() => setIsAddAssignmentOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Assignment
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {mockAssignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold">{assignment.title}</h4>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {assignment.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {assignment.subject}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due: {assignment.dueDate}
                      </div>
                    </div>
                  </div>
                  {(user.role === 'admin' || user.role === 'teacher') && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Academic Management</h2>
        <p className="text-muted-foreground">Manage courses, schedules, and academic content</p>
      </div>

      <Tabs defaultValue="subjects">
        <TabsList>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="timetable">Time Table</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subjects">
          {renderSubjects()}
        </TabsContent>
        
        <TabsContent value="timetable">
          {renderTimeTable()}
        </TabsContent>
        
        <TabsContent value="assignments">
          {renderAssignments()}
        </TabsContent>
      </Tabs>

      {/* Add Subject Dialog */}
      <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>Create a new subject for the curriculum</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subjectName">Subject Name</Label>
              <Input id="subjectName" placeholder="Enter subject name" />
            </div>
            <div>
              <Label htmlFor="subjectCode">Subject Code</Label>
              <Input id="subjectCode" placeholder="Enter subject code" />
            </div>
            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input id="credits" type="number" placeholder="Enter credits" />
            </div>
            <div>
              <Label htmlFor="teacher">Teacher</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher1">Dr. Robert Smith</SelectItem>
                  <SelectItem value="teacher2">Prof. Sarah Johnson</SelectItem>
                  <SelectItem value="teacher3">Ms. Jennifer Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="class">Class</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade9">Grade 9</SelectItem>
                  <SelectItem value="grade10">Grade 10</SelectItem>
                  <SelectItem value="grade11">Grade 11</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="section">Section</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter subject description" />
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsAddSubjectOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddSubjectOpen(false)}>
              Add Subject
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Assignment Dialog */}
      <Dialog open={isAddAssignmentOpen} onOpenChange={setIsAddAssignmentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Assignment</DialogTitle>
            <DialogDescription>Create a new assignment for students</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assignmentTitle">Assignment Title</Label>
              <Input id="assignmentTitle" placeholder="Enter assignment title" />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="english">English Literature</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" />
            </div>
            <div>
              <Label htmlFor="class">Class</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade9">Grade 9</SelectItem>
                  <SelectItem value="grade10">Grade 10</SelectItem>
                  <SelectItem value="grade11">Grade 11</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="assignmentDescription">Description</Label>
            <Textarea id="assignmentDescription" placeholder="Enter assignment description and instructions" />
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsAddAssignmentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddAssignmentOpen(false)}>
              Create Assignment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}