import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Users, 
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
  Download,
  Eye
} from 'lucide-react';
import type { User } from '../../App';

interface FeeManagementProps {
  user: User;
}

interface FeeRecord {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  feeType: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
}

interface FeeStructure {
  id: string;
  class: string;
  tuitionFee: number;
  libraryFee: number;
  labFee: number;
  sportsFee: number;
  examFee: number;
  total: number;
}

const mockFeeRecords: FeeRecord[] = [
  {
    id: '1',
    studentName: 'Alex Rodriguez',
    studentId: 'STU001',
    class: 'Grade 10',
    feeType: 'Tuition Fee',
    amount: 15000,
    dueDate: '2024-03-30',
    status: 'pending'
  },
  {
    id: '2',
    studentName: 'Sarah Johnson',
    studentId: 'STU002',
    class: 'Grade 11',
    feeType: 'Tuition Fee',
    amount: 16000,
    dueDate: '2024-03-25',
    paidDate: '2024-03-20',
    status: 'paid',
    paymentMethod: 'Online Banking'
  },
  {
    id: '3',
    studentName: 'Michael Chen',
    studentId: 'STU003',
    class: 'Grade 9',
    feeType: 'Lab Fee',
    amount: 2000,
    dueDate: '2024-03-15',
    status: 'overdue'
  }
];

const mockFeeStructure: FeeStructure[] = [
  {
    id: '1',
    class: 'Grade 9',
    tuitionFee: 14000,
    libraryFee: 500,
    labFee: 2000,
    sportsFee: 1000,
    examFee: 1500,
    total: 19000
  },
  {
    id: '2',
    class: 'Grade 10',
    tuitionFee: 15000,
    libraryFee: 500,
    labFee: 2500,
    sportsFee: 1000,
    examFee: 1500,
    total: 20500
  },
  {
    id: '3',
    class: 'Grade 11',
    tuitionFee: 16000,
    libraryFee: 600,
    labFee: 3000,
    sportsFee: 1200,
    examFee: 1700,
    total: 22500
  },
  {
    id: '4',
    class: 'Grade 12',
    tuitionFee: 17000,
    libraryFee: 600,
    labFee: 3500,
    sportsFee: 1200,
    examFee: 2000,
    total: 24300
  }
];

export function FeeManagement({ user }: FeeManagementProps) {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<FeeRecord | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const filteredRecords = mockFeeRecords.filter(record => {
    const matchesClass = selectedClass === 'all' || record.class === selectedClass;
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    return matchesClass && matchesStatus;
  });

  const getFeeStats = () => {
    const totalAmount = mockFeeRecords.reduce((sum, record) => sum + record.amount, 0);
    const paidAmount = mockFeeRecords
      .filter(record => record.status === 'paid')
      .reduce((sum, record) => sum + record.amount, 0);
    const pendingAmount = mockFeeRecords
      .filter(record => record.status === 'pending')
      .reduce((sum, record) => sum + record.amount, 0);
    const overdueAmount = mockFeeRecords
      .filter(record => record.status === 'overdue')
      .reduce((sum, record) => sum + record.amount, 0);
    
    return { totalAmount, paidAmount, pendingAmount, overdueAmount };
  };

  const renderAdminFeeManagement = () => {
    const stats = getFeeStats();
    const collectionRate = Math.round((stats.paidAmount / stats.totalAmount) * 100);

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">₹{stats.totalAmount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Fees</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">₹{stats.paidAmount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Collected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">₹{stats.pendingAmount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">₹{stats.overdueAmount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collection Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Collection Progress</CardTitle>
            <CardDescription>Current month collection status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Collection Rate</span>
                <span>{collectionRate}%</span>
              </div>
              <Progress value={collectionRate} />
              <p className="text-sm text-muted-foreground">
                ₹{stats.paidAmount.toLocaleString()} collected out of ₹{stats.totalAmount.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex space-x-4">
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
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Fee Records */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Records</CardTitle>
            <CardDescription>Student payment history and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-medium">{record.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.studentId} • {record.class} • {record.feeType}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">₹{record.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {record.dueDate}
                      </p>
                    </div>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStudentFeeView = () => {
    const studentFees = {
      pending: 15000,
      total: 20500,
      paid: 5500,
      dueDate: '2024-03-30'
    };

    const paymentHistory = [
      { date: '2024-02-15', amount: 5500, type: 'Partial Payment', method: 'Online Banking', receipt: 'RCP001' },
      { date: '2024-01-15', amount: 20500, type: 'Annual Fee', method: 'Cheque', receipt: 'RCP002' },
    ];

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Fee Summary</CardTitle>
            <CardDescription>Your current fee status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">₹{studentFees.pending.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Amount Due</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">₹{studentFees.paid.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Amount Paid</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">₹{studentFees.total.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total Fee</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <div>
                  <p className="font-medium text-yellow-800">Payment Due</p>
                  <p className="text-sm text-yellow-700">
                    Fee payment of ₹{studentFees.pending.toLocaleString()} is due by {studentFees.dueDate}
                  </p>
                </div>
              </div>
            </div>
            
            <Button className="w-full">
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee Structure - Grade 10</CardTitle>
            <CardDescription>Breakdown of annual fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockFeeStructure.find(fs => fs.class === 'Grade 10') && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Tuition Fee</span>
                    <span>₹15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Library Fee</span>
                    <span>₹500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Laboratory Fee</span>
                    <span>₹2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sports Fee</span>
                    <span>₹1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Examination Fee</span>
                    <span>₹1,500</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Annual Fee</span>
                      <span>₹20,500</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{payment.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.date} • {payment.method}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">₹{payment.amount.toLocaleString()}</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderFeeStructure = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Fee Structure</h3>
            <p className="text-muted-foreground">Annual fee breakdown by class</p>
          </div>
          {user.role === 'admin' && (
            <Button>
              Edit Structure
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockFeeStructure.map((structure) => (
            <Card key={structure.id}>
              <CardHeader>
                <CardTitle>{structure.class}</CardTitle>
                <CardDescription>Annual fee structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tuition Fee</span>
                    <span>₹{structure.tuitionFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Library Fee</span>
                    <span>₹{structure.libraryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Laboratory Fee</span>
                    <span>₹{structure.labFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sports Fee</span>
                    <span>₹{structure.sportsFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Examination Fee</span>
                    <span>₹{structure.examFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{structure.total.toLocaleString()}</span>
                    </div>
                  </div>
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
        <h2 className="text-3xl font-bold">Fee Management</h2>
        <p className="text-muted-foreground">Manage student fees and payments</p>
      </div>

      {user.role === 'student' || user.role === 'parent' ? (
        renderStudentFeeView()
      ) : (
        <Tabs defaultValue="records">
          <TabsList>
            <TabsTrigger value="records">Fee Records</TabsTrigger>
            <TabsTrigger value="structure">Fee Structure</TabsTrigger>
          </TabsList>
          
          <TabsContent value="records">
            {renderAdminFeeManagement()}
          </TabsContent>
          
          <TabsContent value="structure">
            {renderFeeStructure()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}