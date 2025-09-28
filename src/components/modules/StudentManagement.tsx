import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  BookOpen
} from 'lucide-react';
import type { User } from '../../App';

interface StudentManagementProps {
  user: User;
}

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  section: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  status: 'active' | 'inactive' | 'graduated';
  admissionDate: string;
  bloodGroup: string;
  guardianName: string;
  emergencyContact: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    studentId: 'STU001',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@student.edu',
    phone: '+1 (555) 123-4567',
    class: 'Grade 10',
    section: 'A',
    dateOfBirth: '2008-05-15',
    address: '123 Main St, City, State 12345',
    parentName: 'Maria Rodriguez',
    parentPhone: '+1 (555) 123-4568',
    status: 'active',
    admissionDate: '2022-08-15',
    bloodGroup: 'O+',
    guardianName: 'Maria Rodriguez',
    emergencyContact: '+1 (555) 123-4568'
  },
  {
    id: '2',
    studentId: 'STU002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@student.edu',
    phone: '+1 (555) 234-5678',
    class: 'Grade 11',
    section: 'B',
    dateOfBirth: '2007-09-22',
    address: '456 Oak Ave, City, State 12345',
    parentName: 'Robert Johnson',
    parentPhone: '+1 (555) 234-5679',
    status: 'active',
    admissionDate: '2021-08-15',
    bloodGroup: 'A+',
    guardianName: 'Robert Johnson',
    emergencyContact: '+1 (555) 234-5679'
  },
  {
    id: '3',
    studentId: 'STU003',
    name: 'Michael Chen',
    email: 'michael.chen@student.edu',
    phone: '+1 (555) 345-6789',
    class: 'Grade 9',
    section: 'A',
    dateOfBirth: '2009-01-10',
    address: '789 Pine St, City, State 12345',
    parentName: 'Jennifer Chen',
    parentPhone: '+1 (555) 345-6790',
    status: 'active',
    admissionDate: '2023-08-15',
    bloodGroup: 'B+',
    guardianName: 'Jennifer Chen',
    emergencyContact: '+1 (555) 345-6790'
  },
  {
    id: '4',
    studentId: 'STU004',
    name: 'Emily Davis',
    email: 'emily.davis@student.edu',
    phone: '+1 (555) 456-7890',
    class: 'Grade 12',
    section: 'A',
    dateOfBirth: '2006-11-03',
    address: '321 Elm St, City, State 12345',
    parentName: 'David Davis',
    parentPhone: '+1 (555) 456-7891',
    status: 'active',
    admissionDate: '2020-08-15',
    bloodGroup: 'AB+',
    guardianName: 'David Davis',
    emergencyContact: '+1 (555) 456-7891'
  }
];

export function StudentManagement({ user }: StudentManagementProps) {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'graduated':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">Student Management</h2>
          <p className="text-muted-foreground">Manage student profiles, admissions, and records</p>
        </div>
        {user.role === 'admin' && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
                <SelectItem value="Grade 11">Grade 11</SelectItem>
                <SelectItem value="Grade 12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <CardDescription>{student.studentId}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(student.status)}>
                  {student.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4 mr-2" />
                {student.class} - Section {student.section}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                {student.email}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                {student.phone}
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewStudent(student)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                {user.role === 'admin' && (
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>Complete student information and records</DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Student ID</Label>
                    <Input value={selectedStudent.studentId} readOnly />
                  </div>
                  <div>
                    <Label>Full Name</Label>
                    <Input value={selectedStudent.name} readOnly />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input value={selectedStudent.dateOfBirth} readOnly />
                  </div>
                  <div>
                    <Label>Blood Group</Label>
                    <Input value={selectedStudent.bloodGroup} readOnly />
                  </div>
                  <div>
                    <Label>Admission Date</Label>
                    <Input value={selectedStudent.admissionDate} readOnly />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedStudent.status)}>
                      {selectedStudent.status}
                    </Badge>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="academic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Class</Label>
                    <Input value={selectedStudent.class} readOnly />
                  </div>
                  <div>
                    <Label>Section</Label>
                    <Input value={selectedStudent.section} readOnly />
                  </div>
                </div>
                <div>
                  <Label>Academic Performance</Label>
                  <div className="mt-2 p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Academic records and performance metrics would be displayed here.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input value={selectedStudent.email} readOnly />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={selectedStudent.phone} readOnly />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Textarea value={selectedStudent.address} readOnly />
                  </div>
                  <div>
                    <Label>Parent/Guardian Name</Label>
                    <Input value={selectedStudent.guardianName} readOnly />
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <Input value={selectedStudent.emergencyContact} readOnly />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="medical" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Blood Group</Label>
                    <Input value={selectedStudent.bloodGroup} readOnly />
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <Input value={selectedStudent.emergencyContact} readOnly />
                  </div>
                </div>
                <div>
                  <Label>Medical History</Label>
                  <div className="mt-2 p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Medical records and health information would be stored here.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>Enter student information for admission</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Enter phone number" />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" />
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
                  <SelectItem value="grade12">Grade 12</SelectItem>
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
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Add Student
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}