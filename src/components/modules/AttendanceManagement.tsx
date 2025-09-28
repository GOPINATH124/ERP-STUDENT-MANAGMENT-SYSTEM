import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { 
  Calendar as CalendarIcon, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  Filter
} from 'lucide-react';
import type { User } from '../../App';

interface AttendanceManagementProps {
  user: User;
}

interface AttendanceRecord {
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subject?: string;
}

interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
}

const mockStudents: Student[] = [
  { id: '1', name: 'Alex Rodriguez', class: 'Grade 10', section: 'A', rollNumber: '001' },
  { id: '2', name: 'Sarah Johnson', class: 'Grade 10', section: 'A', rollNumber: '002' },
  { id: '3', name: 'Michael Chen', class: 'Grade 10', section: 'A', rollNumber: '003' },
  { id: '4', name: 'Emily Davis', class: 'Grade 10', section: 'A', rollNumber: '004' },
  { id: '5', name: 'James Wilson', class: 'Grade 10', section: 'A', rollNumber: '005' },
  { id: '6', name: 'Lisa Anderson', class: 'Grade 10', section: 'A', rollNumber: '006' },
];

const mockAttendanceRecords: AttendanceRecord[] = [
  { studentId: '1', studentName: 'Alex Rodriguez', class: 'Grade 10', section: 'A', date: '2024-03-15', status: 'present' },
  { studentId: '2', studentName: 'Sarah Johnson', class: 'Grade 10', section: 'A', date: '2024-03-15', status: 'present' },
  { studentId: '3', studentName: 'Michael Chen', class: 'Grade 10', section: 'A', date: '2024-03-15', status: 'absent' },
  { studentId: '4', studentName: 'Emily Davis', class: 'Grade 10', section: 'A', date: '2024-03-15', status: 'late' },
  { studentId: '5', studentName: 'James Wilson', class: 'Grade 10', section: 'A', date: '2024-03-15', status: 'present' },
  { studentId: '6', studentName: 'Lisa Anderson', class: 'Grade 10', section: 'A', date: '2024-03-15', status: 'present' },
];

export function AttendanceManagement({ user }: AttendanceManagementProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [attendanceData, setAttendanceData] = useState<{ [key: string]: 'present' | 'absent' | 'late' }>({});
  const [activeTab, setActiveTab] = useState('mark');

  const getAttendanceStats = () => {
    const total = mockStudents.length;
    const present = Object.values(attendanceData).filter(status => status === 'present').length;
    const absent = Object.values(attendanceData).filter(status => status === 'absent').length;
    const late = Object.values(attendanceData).filter(status => status === 'late').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { total, present, absent, late, percentage };
  };

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getStatusColor = (status: 'present' | 'absent' | 'late') => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: 'present' | 'absent' | 'late') => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'late':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const renderMarkAttendance = () => {
    const stats = getAttendanceStats();
    
    return (
      <div className="space-y-6">
        {/* Controls */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                  <SelectItem value="Grade 12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4" />
                <span>{selectedDate.toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.present}</p>
                  <p className="text-sm text-muted-foreground">Present</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.absent}</p>
                  <p className="text-sm text-muted-foreground">Absent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.percentage}%</p>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>Mark Attendance - {selectedClass} Section {selectedSection}</CardTitle>
            <CardDescription>Select attendance status for each student</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-blue-800">{student.rollNumber}</span>
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant={attendanceData[student.id] === 'present' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAttendanceChange(student.id, 'present')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Present
                    </Button>
                    <Button
                      variant={attendanceData[student.id] === 'late' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAttendanceChange(student.id, 'late')}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Late
                    </Button>
                    <Button
                      variant={attendanceData[student.id] === 'absent' ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Absent
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-6">
              <Button className="w-32">
                Save Attendance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAttendanceReports = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Attendance</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">87.5%</div>
              <Progress value={87.5} className="mb-2" />
              <p className="text-sm text-muted-foreground">Above average performance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Best Performing Class</CardTitle>
              <CardDescription>Highest attendance rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">Grade 11-A</div>
              <div className="text-xl text-green-600 mb-2">94.2%</div>
              <p className="text-sm text-muted-foreground">Excellent attendance record</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Students Need Attention</CardTitle>
              <CardDescription>Below 80% attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 text-red-600">12</div>
              <p className="text-sm text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance Records</CardTitle>
            <CardDescription>Last 7 days attendance summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAttendanceRecords.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-medium">{record.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.class} - Section {record.section}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{record.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStudentView = () => {
    const studentAttendance = 92.5;
    const monthlyStats = {
      present: 18,
      absent: 1,
      late: 1,
      total: 20
    };

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Attendance Summary</CardTitle>
            <CardDescription>Your attendance record for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{monthlyStats.present}</div>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{monthlyStats.absent}</div>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{monthlyStats.late}</div>
                <p className="text-sm text-muted-foreground">Late</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{monthlyStats.total}</div>
                <p className="text-sm text-muted-foreground">Total Days</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Attendance</span>
                <span className="text-sm font-medium">{studentAttendance}%</span>
              </div>
              <Progress value={studentAttendance} />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Excellent attendance record! Keep up the good work.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
            <CardDescription>View your attendance history</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Attendance Management</h2>
        <p className="text-muted-foreground">Track and manage student attendance</p>
      </div>

      {user.role === 'admin' || user.role === 'teacher' ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mark">
            {renderMarkAttendance()}
          </TabsContent>
          
          <TabsContent value="reports">
            {renderAttendanceReports()}
          </TabsContent>
        </Tabs>
      ) : (
        renderStudentView()
      )}
    </div>
  );
}