import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  Bus, 
  BookOpen, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Building,
  Calendar
} from 'lucide-react';
import type { User } from '../../App';

interface DashboardOverviewProps {
  user: User;
}

const mockData = {
  admin: {
    totalStudents: 1247,
    totalTeachers: 87,
    totalBuses: 8,
    pendingFees: 156000,
    hostelOccupancy: 89.5,
    recentActivities: [
      { id: 1, action: 'New student admission', student: 'John Doe', time: '2 hours ago' },
      { id: 2, action: 'Fee payment received', student: 'Sarah Wilson', time: '4 hours ago' },
      { id: 3, action: 'Hostel room allocated', student: 'Michael Chen', time: '1 day ago' },
      { id: 4, action: 'Bus route updated', route: 'Route B-12', time: '2 days ago' },
    ]
  },
  teacher: {
    myClasses: 6,
    totalStudents: 180,
    todayClasses: 4,
    pendingGrading: 23,
    upcomingExams: [
      { subject: 'Mathematics', class: 'Grade 10-A', date: '2024-03-25' },
      { subject: 'Physics', class: 'Grade 11-B', date: '2024-03-28' },
    ]
  },
  student: {
    attendancePercentage: 92.5,
    upcomingExams: 3,
    pendingAssignments: 2,
    currentGrade: 'A',
    schedule: [
      { time: '09:00', subject: 'Mathematics', room: 'Room 201' },
      { time: '10:30', subject: 'Physics', room: 'Lab 1' },
      { time: '12:00', subject: 'English', room: 'Room 105' },
    ]
  },
  parent: {
    childName: 'Alex Rodriguez',
    attendancePercentage: 92.5,
    currentGrade: 'A',
    pendingFees: 5000,
    recentResults: [
      { subject: 'Mathematics', score: 95, grade: 'A+' },
      { subject: 'Physics', score: 88, grade: 'A' },
      { subject: 'English', score: 91, grade: 'A' },
    ]
  }
};

export function DashboardOverview({ user }: DashboardOverviewProps) {
  const renderAdminDashboard = () => {
    const data = mockData.admin;
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[1]}!</h2>
          <p className="text-muted-foreground">Here's what's happening at your institution today.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalTeachers}</div>
              <p className="text-xs text-muted-foreground">
                +2 new hires this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transport Fleet</CardTitle>
              <Bus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalBuses}</div>
              <p className="text-xs text-muted-foreground">
                Active buses
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hostel Occupancy</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.hostelOccupancy}%</div>
              <Progress value={data.hostelOccupancy} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{data.pendingFees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3 inline mr-1 text-orange-500" />
                Action required
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Administrative Activities</CardTitle>
            <CardDescription>Latest management operations and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.student || activity.class || activity.route} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTeacherDashboard = () => {
    const data = mockData.teacher;
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Good morning, {user.name.split(' ')[1]}!</h2>
          <p className="text-muted-foreground">Ready to inspire young minds today?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.myClasses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalStudents}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.todayClasses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.pendingGrading}</div>
              <p className="text-xs text-muted-foreground">Assignments to grade</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Exams you need to prepare for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.upcomingExams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{exam.subject}</p>
                    <p className="text-sm text-muted-foreground">{exam.class}</p>
                  </div>
                  <Badge variant="outline">{exam.date}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStudentDashboard = () => {
    const data = mockData.student;
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Hello {user.name.split(' ')[0]}!</h2>
          <p className="text-muted-foreground">Let's make today productive!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.attendancePercentage}%</div>
              <Progress value={data.attendancePercentage} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Grade</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.currentGrade}</div>
              <p className="text-xs text-muted-foreground">Excellent performance!</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.upcomingExams}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.pendingAssignments}</div>
              <p className="text-xs text-muted-foreground">Assignments due</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.schedule.map((class_item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{class_item.subject}</p>
                    <p className="text-sm text-muted-foreground">{class_item.room}</p>
                  </div>
                  <Badge variant="outline">{class_item.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderParentDashboard = () => {
    const data = mockData.parent;
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Welcome {user.name.split(' ')[0]}!</h2>
          <p className="text-muted-foreground">Here's how {data.childName} is doing</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.attendancePercentage}%</div>
              <Progress value={data.attendancePercentage} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Grade</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.currentGrade}</div>
              <p className="text-xs text-muted-foreground">
                <CheckCircle className="h-3 w-3 inline mr-1 text-green-500" />
                Doing great!
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{data.pendingFees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Due by March 30</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Excellent</div>
              <p className="text-xs text-muted-foreground">Top 10% of class</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>{data.childName}'s latest exam scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{result.subject}</p>
                    <p className="text-sm text-muted-foreground">Score: {result.score}/100</p>
                  </div>
                  <Badge variant={result.grade.includes('+') ? 'default' : 'secondary'}>
                    {result.grade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  switch (user.role) {
    case 'admin':
      return renderAdminDashboard();
    case 'teacher':
      return renderTeacherDashboard();
    case 'student':
      return renderStudentDashboard();
    case 'parent':
      return renderParentDashboard();
    default:
      return renderAdminDashboard();
  }
}