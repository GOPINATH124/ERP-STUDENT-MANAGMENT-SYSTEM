import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Download,
  Calendar,
  DollarSign,
  BookOpen,
  Bus,
  Building,
  PieChart,
  FileText,
  GraduationCap,
  ClipboardCheck,
  Target,
  MapPin,
  Home,
  Bell,
  AlertTriangle,
  Wallet,
  UserCheck,
  Settings
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart, Area } from 'recharts';
import type { User } from '../../App';

interface ReportsProps {
  user: User;
}

const attendanceData = [
  { month: 'Jan', percentage: 88.5 },
  { month: 'Feb', percentage: 92.1 },
  { month: 'Mar', percentage: 89.7 },
  { month: 'Apr', percentage: 91.3 },
  { month: 'May', percentage: 87.9 },
  { month: 'Jun', percentage: 90.2 }
];

const academicPerformanceData = [
  { subject: 'Math', average: 85.2, class: 'Grade 10' },
  { subject: 'Physics', average: 78.9, class: 'Grade 10' },
  { subject: 'Chemistry', average: 82.1, class: 'Grade 10' },
  { subject: 'English', average: 88.7, class: 'Grade 10' },
  { subject: 'Biology', average: 80.5, class: 'Grade 10' }
];

const feeCollectionData = [
  { month: 'Jan', collected: 450000, target: 500000 },
  { month: 'Feb', collected: 480000, target: 500000 },
  { month: 'Mar', collected: 420000, target: 500000 },
  { month: 'Apr', collected: 490000, target: 500000 },
  { month: 'May', collected: 460000, target: 500000 },
  { month: 'Jun', collected: 510000, target: 500000 }
];

const transportUtilizationData = [
  { route: 'Route 1', capacity: 50, utilized: 45 },
  { route: 'Route 2', capacity: 45, utilized: 38 },
  { route: 'Route 3', capacity: 40, utilized: 35 },
  { route: 'Route 4', capacity: 55, utilized: 52 },
  { route: 'Route 5', capacity: 48, utilized: 41 }
];

const hostelOccupancyData = [
  { name: 'Block A', value: 85, color: '#3B82F6' },
  { name: 'Block B', value: 92, color: '#10B981' },
  { name: 'Block C', value: 78, color: '#F59E0B' },
  { name: 'Block D', value: 88, color: '#EF4444' }
];

const classWisePerformanceData = [
  { class: 'Grade 9', students: 120, average: 82.5, attendance: 89.2 },
  { class: 'Grade 10', students: 135, average: 85.1, attendance: 91.7 },
  { class: 'Grade 11', students: 128, average: 83.9, attendance: 88.5 },
  { class: 'Grade 12', students: 142, average: 87.3, attendance: 90.8 }
];

// Additional data for admin-specific reports
const enrollmentTrendsData = [
  { month: 'Jan', new: 25, total: 512 },
  { month: 'Feb', new: 18, total: 530 },
  { month: 'Mar', new: 32, total: 562 },
  { month: 'Apr', new: 28, total: 590 },
  { month: 'May', new: 15, total: 605 },
  { month: 'Jun', new: 22, total: 627 }
];

const staffUtilizationData = [
  { department: 'Science', teachers: 12, workload: 85 },
  { department: 'Mathematics', teachers: 8, workload: 92 },
  { department: 'English', teachers: 6, workload: 78 },
  { department: 'Social Studies', teachers: 7, workload: 88 },
  { department: 'Arts', teachers: 4, workload: 65 }
];

// Teacher-specific data
const examResultsData = [
  { exam: 'Unit Test 1', average: 78.5, passRate: 89 },
  { exam: 'Mid-term', average: 82.1, passRate: 92 },
  { exam: 'Unit Test 2', average: 85.3, passRate: 94 },
  { exam: 'Pre-final', average: 79.8, passRate: 87 },
  { exam: 'Final', average: 84.2, passRate: 91 }
];

const studentProgressData = [
  { month: 'Jan', improvements: 67, challenges: 23 },
  { month: 'Feb', improvements: 74, challenges: 18 },
  { month: 'Mar', improvements: 82, challenges: 15 },
  { month: 'Apr', improvements: 78, challenges: 20 },
  { month: 'May', improvements: 85, challenges: 12 },
  { month: 'Jun', improvements: 89, challenges: 9 }
];

const assignmentCompletionData = [
  { subject: 'Mathematics', completed: 89, pending: 11, overdue: 5 },
  { subject: 'Physics', completed: 85, pending: 12, overdue: 8 },
  { subject: 'Chemistry', completed: 92, pending: 6, overdue: 3 },
  { subject: 'English', completed: 94, pending: 4, overdue: 2 },
  { subject: 'Biology', completed: 87, pending: 10, overdue: 6 }
];

export function Reports({ user }: ReportsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedClass, setSelectedClass] = useState('all');

  // Determine which reports to show based on user role
  const isAdmin = user.role === 'admin';
  const isTeacher = user.role === 'teacher';

  const renderAcademicReports = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Academic Performance Reports</h3>
            <p className="text-muted-foreground">Student performance analytics and insights</p>
          </div>
          <div className="flex space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">525</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">84.7%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">90.1%</p>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
            <CardDescription>Average scores across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={academicPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="average" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Class-wise Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Class-wise Performance Summary</CardTitle>
            <CardDescription>Performance metrics by grade level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classWisePerformanceData.map((classData, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{classData.class}</p>
                      <p className="text-sm text-muted-foreground">{classData.students} students</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium">Academic: {classData.average}%</p>
                        <Progress value={classData.average} className="w-24 h-2" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Attendance: {classData.attendance}%</p>
                        <Progress value={classData.attendance} className="w-24 h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAttendanceReports = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Attendance Reports</h3>
            <p className="text-muted-foreground">Student attendance trends and analysis</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">90.1%</div>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">Grade 10-A</div>
                <p className="text-sm text-muted-foreground">Best Class (94.2%)</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">23</div>
                <p className="text-sm text-muted-foreground">Students Below 80%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance Trend</CardTitle>
            <CardDescription>School-wide attendance percentage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="percentage" stroke="#10B981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderFinancialReports = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Financial Reports</h3>
            <p className="text-muted-foreground">Fee collection and financial analytics</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">₹28.1L</p>
                  <p className="text-sm text-muted-foreground">Total Collected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">94.3%</p>
                  <p className="text-sm text-muted-foreground">Collection Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">₹1.7L</p>
                  <p className="text-sm text-muted-foreground">Pending Fees</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-muted-foreground">Overdue Accounts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fee Collection Trend</CardTitle>
            <CardDescription>Monthly fee collection vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feeCollectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                <Bar dataKey="target" fill="#E5E7EB" name="Target" />
                <Bar dataKey="collected" fill="#10B981" name="Collected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderOperationalReports = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Operational Reports</h3>
            <p className="text-muted-foreground">Transport and hostel utilization metrics</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transport Utilization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bus className="w-5 h-5 mr-2" />
                Transport Utilization
              </CardTitle>
              <CardDescription>Bus route capacity utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transportUtilizationData.map((route, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{route.route}</span>
                      <span className="text-sm text-muted-foreground">
                        {route.utilized}/{route.capacity} ({Math.round((route.utilized / route.capacity) * 100)}%)
                      </span>
                    </div>
                    <Progress value={(route.utilized / route.capacity) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hostel Occupancy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Hostel Occupancy
              </CardTitle>
              <CardDescription>Block-wise occupancy rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Tooltip />
                  <RechartsPieChart data={hostelOccupancyData}>
                    {hostelOccupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {hostelOccupancyData.map((block, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: block.color }}
                      ></div>
                      <span className="text-sm">{block.name}</span>
                    </div>
                    <span className="text-sm font-medium">{block.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization Summary</CardTitle>
            <CardDescription>Overall utilization of school resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">85.6%</div>
                <p className="text-sm text-muted-foreground">Transport Utilization</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">85.8%</div>
                <p className="text-sm text-muted-foreground">Hostel Occupancy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">92.3%</div>
                <p className="text-sm text-muted-foreground">Classroom Utilization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Admin-specific report renderers
  const renderStudentEnrollmentReports = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Student Enrollment Analytics</h3>
            <p className="text-muted-foreground">Student admission and enrollment trends</p>
          </div>
          <div className="flex space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Enrollment Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">627</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">+22</p>
                  <p className="text-sm text-muted-foreground">New This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">96.2%</p>
                  <p className="text-sm text-muted-foreground">Retention Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-muted-foreground">Grades</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollment Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Growth Trends</CardTitle>
            <CardDescription>Monthly student enrollment and new admissions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={enrollmentTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="new" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderInstitutionalReports = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Institutional Analytics</h3>
            <p className="text-muted-foreground">Staff utilization and institutional metrics</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Staff Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">37</p>
                  <p className="text-sm text-muted-foreground">Total Teachers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">82%</p>
                  <p className="text-sm text-muted-foreground">Avg Workload</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Utilization Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Staff Utilization</CardTitle>
            <CardDescription>Teacher workload distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={staffUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="workload" fill="#3B82F6" />
                <Bar dataKey="teachers" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Teacher-specific report renderers
  const renderExamResultsReports = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Examination Results Analysis</h3>
            <p className="text-muted-foreground">Exam performance and result trends</p>
          </div>
          <div className="flex space-x-2">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="grade9">Grade 9</SelectItem>
                <SelectItem value="grade10">Grade 10</SelectItem>
                <SelectItem value="grade11">Grade 11</SelectItem>
                <SelectItem value="grade12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Exam Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">84.2%</p>
                  <p className="text-sm text-muted-foreground">Overall Average</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">91%</p>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">A+ Grades</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-muted-foreground">Need Support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Results Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Exam Performance Trends</CardTitle>
            <CardDescription>Average scores and pass rates across examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={examResultsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="exam" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="average" stroke="#3B82F6" strokeWidth={3} />
                <Line type="monotone" dataKey="passRate" stroke="#10B981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStudentProgressReports = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Student Progress Tracking</h3>
            <p className="text-muted-foreground">Learning progress and improvement analytics</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">89</div>
                <p className="text-sm text-muted-foreground">Students Improving</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">42</div>
                <p className="text-sm text-muted-foreground">Stable Performance</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">9</div>
                <p className="text-sm text-muted-foreground">Need Attention</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Student Progress</CardTitle>
            <CardDescription>Students showing improvement vs those facing challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={studentProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="improvements" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="challenges" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Assignment Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment Completion Status</CardTitle>
            <CardDescription>Subject-wise assignment completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignmentCompletionData.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject.subject}</span>
                    <div className="flex space-x-4 text-sm">
                      <span className="text-green-600">✓ {subject.completed}%</span>
                      <span className="text-yellow-600">⏳ {subject.pending}%</span>
                      <span className="text-red-600">⚠ {subject.overdue}%</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-2 bg-green-500 rounded-l" style={{ width: `${subject.completed}%` }}></div>
                    <div className="h-2 bg-yellow-500" style={{ width: `${subject.pending}%` }}></div>
                    <div className="h-2 bg-red-500 rounded-r" style={{ width: `${subject.overdue}%` }}></div>
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
        <h2 className="text-3xl font-bold">Reports & Analytics</h2>
        <p className="text-muted-foreground">
          {isAdmin ? 'Institutional management insights and operational analytics' : 
           isTeacher ? 'Academic performance and student progress analytics' :
           'Comprehensive insights and data analysis'}
        </p>
      </div>

      {isAdmin ? (
        // Admin Reports - Operational Focus
        <Tabs defaultValue="enrollment">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="operational">Operational</TabsTrigger>
            <TabsTrigger value="institutional">Institutional</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrollment">
            {renderStudentEnrollmentReports()}
          </TabsContent>
          
          <TabsContent value="financial">
            {renderFinancialReports()}
          </TabsContent>
          
          <TabsContent value="operational">
            {renderOperationalReports()}
          </TabsContent>
          
          <TabsContent value="institutional">
            {renderInstitutionalReports()}
          </TabsContent>
        </Tabs>
      ) : isTeacher ? (
        // Teacher Reports - Academic Focus
        <Tabs defaultValue="academic">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="exams">Exam Results</TabsTrigger>
            <TabsTrigger value="progress">Student Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="academic">
            {renderAcademicReports()}
          </TabsContent>
          
          <TabsContent value="attendance">
            {renderAttendanceReports()}
          </TabsContent>
          
          <TabsContent value="exams">
            {renderExamResultsReports()}
          </TabsContent>
          
          <TabsContent value="progress">
            {renderStudentProgressReports()}
          </TabsContent>
        </Tabs>
      ) : (
        // Default Reports (for students/parents)
        <Tabs defaultValue="academic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="academic">
            {renderAcademicReports()}
          </TabsContent>
          
          <TabsContent value="attendance">
            {renderAttendanceReports()}
          </TabsContent>
          
          <TabsContent value="progress">
            {renderStudentProgressReports()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}