import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bus, 
  MapPin, 
  Clock, 
  Users, 
  Plus,
  Edit,
  Phone,
  User
} from 'lucide-react';
import type { User } from '../../App';

interface TransportManagementProps {
  user: User;
}

interface BusRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  capacity: number;
  occupancy: number;
  stops: string[];
  morningTime: string;
  eveningTime: string;
  status: 'active' | 'maintenance' | 'inactive';
}

interface StudentTransport {
  id: string;
  studentName: string;
  class: string;
  routeNumber: string;
  stopName: string;
  pickupTime: string;
  dropTime: string;
  feeStatus: 'paid' | 'pending';
}

const mockBusRoutes: BusRoute[] = [
  {
    id: '1',
    routeNumber: 'R001',
    routeName: 'North Route',
    driverName: 'John Smith',
    driverPhone: '+1 (555) 123-4567',
    vehicleNumber: 'SCH-001',
    capacity: 50,
    occupancy: 45,
    stops: ['Central Park', 'Main Street', 'Oak Avenue', 'School'],
    morningTime: '07:30 AM',
    eveningTime: '03:30 PM',
    status: 'active'
  },
  {
    id: '2',
    routeNumber: 'R002',
    routeName: 'South Route',
    driverName: 'Mike Johnson',
    driverPhone: '+1 (555) 234-5678',
    vehicleNumber: 'SCH-002',
    capacity: 45,
    occupancy: 38,
    stops: ['Downtown', 'Mall Street', 'Pine Road', 'School'],
    morningTime: '07:45 AM',
    eveningTime: '03:45 PM',
    status: 'active'
  },
  {
    id: '3',
    routeNumber: 'R003',
    routeName: 'East Route',
    driverName: 'Robert Davis',
    driverPhone: '+1 (555) 345-6789',
    vehicleNumber: 'SCH-003',
    capacity: 40,
    occupancy: 35,
    stops: ['East Plaza', 'Garden Street', 'River Road', 'School'],
    morningTime: '08:00 AM',
    eveningTime: '04:00 PM',
    status: 'maintenance'
  }
];

const mockStudentTransport: StudentTransport[] = [
  {
    id: '1',
    studentName: 'Alex Rodriguez',
    class: 'Grade 10',
    routeNumber: 'R001',
    stopName: 'Central Park',
    pickupTime: '07:30 AM',
    dropTime: '03:30 PM',
    feeStatus: 'paid'
  },
  {
    id: '2',
    studentName: 'Sarah Johnson',
    class: 'Grade 11',
    routeNumber: 'R002',
    stopName: 'Downtown',
    pickupTime: '07:45 AM',
    dropTime: '03:45 PM',
    feeStatus: 'pending'
  }
];

export function TransportManagement({ user }: TransportManagementProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderBusRoutes = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Bus Routes</h3>
            <p className="text-muted-foreground">Manage transportation routes and schedules</p>
          </div>
          {user.role === 'admin' && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Route
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBusRoutes.map((route) => (
            <Card key={route.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <Bus className="w-5 h-5 mr-2" />
                      {route.routeName}
                    </CardTitle>
                    <CardDescription>{route.routeNumber} • {route.vehicleNumber}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(route.status)}>
                    {route.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="w-4 h-4 mr-2" />
                  {route.driverName}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  {route.driverPhone}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  {route.occupancy}/{route.capacity} students
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  {route.morningTime} - {route.eveningTime}
                </div>
                
                <div className="pt-2">
                  <p className="text-xs font-medium mb-2">Stops:</p>
                  <div className="flex flex-wrap gap-1">
                    {route.stops.map((stop, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {stop}
                      </Badge>
                    ))}
                  </div>
                </div>

                {user.role === 'admin' && (
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

  const renderStudentAllocation = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Student Transport Allocation</h3>
            <p className="text-muted-foreground">Manage student bus assignments</p>
          </div>
          {user.role === 'admin' && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Assign Transport
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transport Assignments</CardTitle>
            <CardDescription>Students assigned to transport routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudentTransport.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {student.studentName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.studentName}</p>
                      <p className="text-sm text-muted-foreground">{student.class}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{student.routeNumber}</p>
                      <p className="text-sm text-muted-foreground">{student.stopName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{student.pickupTime}</p>
                      <p className="text-sm text-muted-foreground">{student.dropTime}</p>
                    </div>
                    <Badge className={getFeeStatusColor(student.feeStatus)}>
                      {student.feeStatus}
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

  const renderStudentView = () => {
    const studentTransport = mockStudentTransport[0]; // Alex Rodriguez's transport info
    const route = mockBusRoutes.find(r => r.routeNumber === studentTransport.routeNumber);

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Transport Details</CardTitle>
            <CardDescription>Your bus route and schedule information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Route Number</p>
                  <p className="text-lg font-semibold">{studentTransport.routeNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pick-up Stop</p>
                  <p className="text-lg font-semibold">{studentTransport.stopName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pick-up Time</p>
                  <p className="text-lg font-semibold">{studentTransport.pickupTime}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Drop Time</p>
                  <p className="text-lg font-semibold">{studentTransport.dropTime}</p>
                </div>
              </div>
              
              {route && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Bus Number</p>
                    <p className="text-lg font-semibold">{route.vehicleNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Driver Name</p>
                    <p className="text-lg font-semibold">{route.driverName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Driver Contact</p>
                    <p className="text-lg font-semibold">{route.driverPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Route</p>
                    <p className="text-lg font-semibold">{route.routeName}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {route && (
          <Card>
            <CardHeader>
              <CardTitle>Route Stops</CardTitle>
              <CardDescription>All stops on your bus route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {route.stops.map((stop, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center p-3 rounded-lg ${
                      stop === studentTransport.stopName 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <MapPin className={`w-4 h-4 mr-2 ${
                      stop === studentTransport.stopName ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    <span className={`font-medium ${
                      stop === studentTransport.stopName ? 'text-blue-900' : 'text-gray-700'
                    }`}>
                      {stop}
                    </span>
                    {stop === studentTransport.stopName && (
                      <Badge className="ml-auto" variant="secondary">Your Stop</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Transport Fee Status</CardTitle>
            <CardDescription>Your transport payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Monthly Transport Fee</p>
                <p className="text-sm text-muted-foreground">Route {studentTransport.routeNumber}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">₹2,500</span>
                <Badge className={getFeeStatusColor(studentTransport.feeStatus)}>
                  {studentTransport.feeStatus}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Transport Management</h2>
        <p className="text-muted-foreground">Manage school transportation and bus routes</p>
      </div>

      {user.role === 'student' || user.role === 'parent' ? (
        renderStudentView()
      ) : (
        <Tabs defaultValue="routes">
          <TabsList>
            <TabsTrigger value="routes">Bus Routes</TabsTrigger>
            <TabsTrigger value="students">Student Allocation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="routes">
            {renderBusRoutes()}
          </TabsContent>
          
          <TabsContent value="students">
            {renderStudentAllocation()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}