import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Building, 
  Bed, 
  Users, 
  Plus,
  Edit,
  Phone,
  User,
  MapPin,
  Utensils,
  AlertCircle
} from 'lucide-react';
import type { User } from '../../App';

interface HostelManagementProps {
  user: User;
}

interface Room {
  id: string;
  roomNumber: string;
  building: string;
  floor: number;
  capacity: number;
  occupancy: number;
  type: 'single' | 'double' | 'triple' | 'quad';
  status: 'available' | 'occupied' | 'maintenance';
  amenities: string[];
}

interface Student {
  id: string;
  name: string;
  studentId: string;
  class: string;
  roomNumber: string;
  building: string;
  checkInDate: string;
  guardianPhone: string;
  feeStatus: 'paid' | 'pending';
}

interface MessSchedule {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

const mockRooms: Room[] = [
  {
    id: '1',
    roomNumber: 'A101',
    building: 'Block A',
    floor: 1,
    capacity: 2,
    occupancy: 2,
    type: 'double',
    status: 'occupied',
    amenities: ['Wi-Fi', 'AC', 'Study Table', 'Wardrobe']
  },
  {
    id: '2',
    roomNumber: 'A102',
    building: 'Block A',
    floor: 1,
    capacity: 2,
    occupancy: 1,
    type: 'double',
    status: 'available',
    amenities: ['Wi-Fi', 'Fan', 'Study Table', 'Wardrobe']
  },
  {
    id: '3',
    roomNumber: 'B201',
    building: 'Block B',
    floor: 2,
    capacity: 1,
    occupancy: 1,
    type: 'single',
    status: 'occupied',
    amenities: ['Wi-Fi', 'AC', 'Study Table', 'Wardrobe', 'Balcony']
  }
];

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    studentId: 'STU001',
    class: 'Grade 10',
    roomNumber: 'A101',
    building: 'Block A',
    checkInDate: '2024-01-15',
    guardianPhone: '+1 (555) 123-4567',
    feeStatus: 'paid'
  },
  {
    id: '2',
    name: 'Michael Chen',
    studentId: 'STU003',
    class: 'Grade 9',
    roomNumber: 'B201',
    building: 'Block B',
    checkInDate: '2024-01-20',
    guardianPhone: '+1 (555) 345-6789',
    feeStatus: 'pending'
  }
];

const mockMessSchedule: MessSchedule[] = [
  {
    day: 'Monday',
    breakfast: 'Bread, Butter, Milk, Fruits',
    lunch: 'Rice, Dal, Vegetables, Roti',
    dinner: 'Rice, Chicken Curry, Vegetables'
  },
  {
    day: 'Tuesday',
    breakfast: 'Oats, Milk, Fruits',
    lunch: 'Rice, Sambar, Vegetables, Roti',
    dinner: 'Rice, Fish Curry, Vegetables'
  },
  {
    day: 'Wednesday',
    breakfast: 'Poha, Tea, Fruits',
    lunch: 'Rice, Dal, Mixed Veg, Roti',
    dinner: 'Rice, Egg Curry, Vegetables'
  }
];

export function HostelManagement({ user }: HostelManagementProps) {
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
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

  const filteredRooms = mockRooms.filter(room => {
    const matchesBuilding = selectedBuilding === 'all' || room.building === selectedBuilding;
    const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus;
    return matchesBuilding && matchesStatus;
  });

  const renderRoomManagement = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Room Management</h3>
            <p className="text-muted-foreground">Manage hostel rooms and allocations</p>
          </div>
          {user.role === 'admin' && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Room
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex space-x-4">
              <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Building" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buildings</SelectItem>
                  <SelectItem value="Block A">Block A</SelectItem>
                  <SelectItem value="Block B">Block B</SelectItem>
                  <SelectItem value="Block C">Block C</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Room Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <Bed className="w-5 h-5 mr-2" />
                      Room {room.roomNumber}
                    </CardTitle>
                    <CardDescription>{room.building} • Floor {room.floor}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(room.status)}>
                    {room.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  {room.occupancy}/{room.capacity} occupants
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building className="w-4 h-4 mr-2" />
                  {room.type} room
                </div>
                
                <div className="pt-2">
                  <p className="text-xs font-medium mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
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
            <h3 className="text-xl font-semibold">Student Allocation</h3>
            <p className="text-muted-foreground">Manage hostel student assignments</p>
          </div>
          {user.role === 'admin' && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Allocate Room
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hostel Students</CardTitle>
            <CardDescription>Students currently residing in the hostel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.studentId} • {student.class}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{student.roomNumber}</p>
                      <p className="text-sm text-muted-foreground">{student.building}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Check-in: {student.checkInDate}</p>
                      <p className="text-sm text-muted-foreground">{student.guardianPhone}</p>
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

  const renderMessSchedule = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Mess Schedule</h3>
            <p className="text-muted-foreground">Weekly meal schedule for hostel students</p>
          </div>
          {user.role === 'admin' && (
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Schedule
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {mockMessSchedule.map((schedule, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils className="w-5 h-5 mr-2" />
                  {schedule.day}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Breakfast</h4>
                    <p className="text-sm text-muted-foreground">{schedule.breakfast}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Lunch</h4>
                    <p className="text-sm text-muted-foreground">{schedule.lunch}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Dinner</h4>
                    <p className="text-sm text-muted-foreground">{schedule.dinner}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderStudentView = () => {
    const studentInfo = mockStudents[0]; // Alex Rodriguez's hostel info
    const room = mockRooms.find(r => r.roomNumber === studentInfo.roomNumber);

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Hostel Details</CardTitle>
            <CardDescription>Your room and hostel information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Room Number</p>
                  <p className="text-lg font-semibold">{studentInfo.roomNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Building</p>
                  <p className="text-lg font-semibold">{studentInfo.building}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Check-in Date</p>
                  <p className="text-lg font-semibold">{studentInfo.checkInDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Guardian Contact</p>
                  <p className="text-lg font-semibold">{studentInfo.guardianPhone}</p>
                </div>
              </div>
              
              {room && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Room Type</p>
                    <p className="text-lg font-semibold capitalize">{room.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Floor</p>
                    <p className="text-lg font-semibold">Floor {room.floor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Roommates</p>
                    <p className="text-lg font-semibold">{room.occupancy - 1} other student(s)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Room Status</p>
                    <Badge className={getStatusColor(room.status)} variant="secondary">
                      {room.status}
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            {room && (
              <div className="mt-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Room Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hostel Fee Status</CardTitle>
            <CardDescription>Your hostel payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Monthly Hostel Fee</p>
                <p className="text-sm text-muted-foreground">Room {studentInfo.roomNumber} • {studentInfo.building}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">₹8,500</span>
                <Badge className={getFeeStatusColor(studentInfo.feeStatus)}>
                  {studentInfo.feeStatus}
                </Badge>
              </div>
            </div>
            {studentInfo.feeStatus === 'pending' && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                  <p className="text-sm text-yellow-800">
                    Your hostel fee payment is pending. Please clear the dues by month end.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Week's Mess Schedule</CardTitle>
            <CardDescription>Meal timings and menu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockMessSchedule.slice(0, 3).map((schedule, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">{schedule.day}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><span className="font-medium">Breakfast:</span> {schedule.breakfast}</p>
                    <p><span className="font-medium">Lunch:</span> {schedule.lunch}</p>
                    <p><span className="font-medium">Dinner:</span> {schedule.dinner}</p>
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
        <h2 className="text-3xl font-bold">Hostel Management</h2>
        <p className="text-muted-foreground">Manage hostel accommodations and facilities</p>
      </div>

      {user.role === 'student' || user.role === 'parent' ? (
        renderStudentView()
      ) : (
        <Tabs defaultValue="rooms">
          <TabsList>
            <TabsTrigger value="rooms">Room Management</TabsTrigger>
            <TabsTrigger value="students">Student Allocation</TabsTrigger>
            <TabsTrigger value="mess">Mess Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rooms">
            {renderRoomManagement()}
          </TabsContent>
          
          <TabsContent value="students">
            {renderStudentAllocation()}
          </TabsContent>
          
          <TabsContent value="mess">
            {renderMessSchedule()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}