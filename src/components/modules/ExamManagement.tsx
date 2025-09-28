import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Users, 
  Plus,
  Edit,
  Trophy,
  Target,
  TrendingUp
} from 'lucide-react';
import type { User } from '../../App';

interface ExamManagementProps {
  user: User;
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  class: string;
  section: string;
  date: string;
  time: string;
  duration: string;
  totalMarks: number;
  status: 'scheduled' | 'ongoing' | 'completed';
}

interface Result {
  id: string;
  studentName: string;
  examTitle: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  percentage: number;
}

const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Mid-Term Mathematics',
    subject: 'Mathematics',
    class: 'Grade 10',
    section: 'A',
    date: '2024-03-25',
    time: '09:00',
    duration: '3 hours',
    totalMarks: 100,
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Physics Unit Test',
    subject: 'Physics',
    class: 'Grade 10',
    section: 'A',
    date: '2024-03-22',
    time: '10:00',
    duration: '2 hours',
    totalMarks: 50,
    status: 'completed'
  },
  {
    id: '3',
    title: 'English Literature Essay',
    subject: 'English',
    class: 'Grade 10',
    section: 'A',
    date: '2024-03-20',
    time: '11:00',
    duration: '2.5 hours',
    totalMarks: 75,
    status: 'completed'
  }
];

const mockResults: Result[] = [
  {
    id: '1',
    studentName: 'Alex Rodriguez',
    examTitle: 'Physics Unit Test',
    subject: 'Physics',
    marksObtained: 45,
    totalMarks: 50,
    grade: 'A',
    percentage: 90
  },
  {
    id: '2',
    studentName: 'Sarah Johnson',
    examTitle: 'Physics Unit Test',
    subject: 'Physics',
    marksObtained: 42,
    totalMarks: 50,
    grade: 'A',
    percentage: 84
  },
  {
    id: '3',
    studentName: 'Michael Chen',
    examTitle: 'English Literature Essay',
    subject: 'English',
    marksObtained: 68,
    totalMarks: 75,
    grade: 'A',
    percentage: 91
  }
];

export function ExamManagement({ user }: ExamManagementProps) {
  const [selectedClass, setSelectedClass] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('A');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B+':
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C+':
      case 'C':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const renderExamSchedule = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Exam Schedule</h3>
            <p className="text-muted-foreground">Manage examination schedules and details</p>
          </div>
          {(user.role === 'admin' || user.role === 'teacher') && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Exam
            </Button>
          )}
        </div>

        <div className="flex space-x-2 mb-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                    <CardDescription>{exam.subject}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(exam.status)}>
                    {exam.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {exam.date} at {exam.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  Duration: {exam.duration}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Target className="w-4 h-4 mr-2" />
                  Total Marks: {exam.totalMarks}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  {exam.class} - Section {exam.section}
                </div>
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

  const renderResults = () => {
    const classAverage = 88.3;
    const totalStudents = 25;
    const publishedResults = mockResults.length;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Exam Results</h3>
            <p className="text-muted-foreground">View and manage examination results</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{classAverage}%</p>
                  <p className="text-sm text-muted-foreground">Class Average</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{publishedResults}/{totalStudents}</p>
                  <p className="text-sm text-muted-foreground">Results Published</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">+5.2%</p>
                  <p className="text-sm text-muted-foreground">Improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>Latest examination results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium">{result.studentName}</p>
                        <p className="text-sm text-muted-foreground">{result.examTitle}</p>
                      </div>
                      <Badge variant="outline">{result.subject}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{result.marksObtained}/{result.totalMarks}</p>
                      <p className="text-sm text-muted-foreground">{result.percentage}%</p>
                    </div>
                    <Badge className={getGradeColor(result.grade)}>
                      {result.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStudentResults = () => {
    const studentExams = [
      { subject: 'Mathematics', marks: 88, total: 100, grade: 'A', date: '2024-03-15' },
      { subject: 'Physics', marks: 45, total: 50, grade: 'A', date: '2024-03-22' },
      { subject: 'English', marks: 68, total: 75, grade: 'A', date: '2024-03-20' },
      { subject: 'Chemistry', marks: 82, total: 100, grade: 'A', date: '2024-03-18' },
    ];

    const overallPercentage = 85.2;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Academic Performance</CardTitle>
            <CardDescription>Your examination results and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Performance</span>
                <span className="text-sm font-medium">{overallPercentage}%</span>
              </div>
              <Progress value={overallPercentage} className="mb-2" />
              <p className="text-sm text-muted-foreground">Excellent performance! Keep up the good work.</p>
            </div>

            <div className="space-y-4">
              {studentExams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{exam.subject}</p>
                    <p className="text-sm text-muted-foreground">Exam Date: {exam.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{exam.marks}/{exam.total}</span>
                      <Badge className={getGradeColor(exam.grade)}>{exam.grade}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((exam.marks / exam.total) * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Your scheduled examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockExams.filter(exam => exam.status === 'scheduled').map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{exam.title}</p>
                    <p className="text-sm text-muted-foreground">{exam.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{exam.date}</p>
                    <p className="text-sm text-muted-foreground">{exam.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Examination Management</h2>
        <p className="text-muted-foreground">Manage exams, schedules, and results</p>
      </div>

      {user.role === 'student' || user.role === 'parent' ? (
        renderStudentResults()
      ) : (
        <Tabs defaultValue="schedule">
          <TabsList>
            <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule">
            {renderExamSchedule()}
          </TabsContent>
          
          <TabsContent value="results">
            {renderResults()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}