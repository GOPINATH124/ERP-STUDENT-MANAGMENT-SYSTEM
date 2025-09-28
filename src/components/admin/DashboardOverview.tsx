import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Bus, 
  Home, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const stats = [
  {
    title: 'Total Students',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Active Teachers',
    value: '156',
    change: '+3%',
    trend: 'up',
    icon: BookOpen,
    color: 'bg-green-500'
  },
  {
    title: 'Monthly Revenue',
    value: '$45,892',
    change: '+8%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-purple-500'
  },
  {
    title: 'Bus Routes',
    value: '24',
    change: '0%',
    trend: 'neutral',
    icon: Bus,
    color: 'bg-orange-500'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'success',
    message: 'New student Emma Johnson enrolled in Grade 10',
    time: '2 hours ago',
    icon: CheckCircle
  },
  {
    id: 2,
    type: 'warning',
    message: 'Fee payment pending for 45 students',
    time: '4 hours ago',
    icon: AlertCircle
  },
  {
    id: 3,
    type: 'info',
    message: 'Mathematics exam scheduled for next week',
    time: '6 hours ago',
    icon: Clock
  },
  {
    id: 4,
    type: 'success',
    message: 'Bus route optimization completed',
    time: '1 day ago',
    icon: CheckCircle
  }
];

const classAttendance = [
  { grade: 'Grade 9', attendance: 92, total: 240 },
  { grade: 'Grade 10', attendance: 88, total: 250 },
  { grade: 'Grade 11', attendance: 95, total: 220 },
  { grade: 'Grade 12', attendance: 90, total: 180 }
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your institution.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your institution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                const iconColor = activity.type === 'success' ? 'text-green-500' : 
                                activity.type === 'warning' ? 'text-yellow-500' : 'text-blue-500';
                
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${iconColor}`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>Class-wise attendance statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classAttendance.map((cls) => (
                <div key={cls.grade} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{cls.grade}</span>
                    <span>{cls.attendance}%</span>
                  </div>
                  <Progress value={cls.attendance} className="h-2" />
                  <p className="text-xs text-gray-500">
                    {Math.round(cls.total * cls.attendance / 100)} out of {cls.total} students present
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <Users className="w-8 h-8 text-blue-500 mb-2" />
              <span className="text-sm text-center">Add New Student</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <BookOpen className="w-8 h-8 text-green-500 mb-2" />
              <span className="text-sm text-center">Create Course</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <DollarSign className="w-8 h-8 text-purple-500 mb-2" />
              <span className="text-sm text-center">Generate Invoice</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <Home className="w-8 h-8 text-orange-500 mb-2" />
              <span className="text-sm text-center">Assign Room</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}