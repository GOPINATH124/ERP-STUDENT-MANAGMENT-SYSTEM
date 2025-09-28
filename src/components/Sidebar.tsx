import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BookOpen, 
  FileText, 
  CreditCard, 
  Bus, 
  Building, 
  MessageSquare, 
  BarChart3, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import type { User } from '../App';
import type { ActiveModule } from './Dashboard';

interface SidebarProps {
  user: User;
  activeModule: ActiveModule;
  onModuleChange: (module: ActiveModule) => void;
  onLogout: () => void;
}

interface MenuItem {
  id: ActiveModule;
  label: string;
  icon: React.ReactNode;
  roles: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
    roles: ['admin', 'teacher', 'student', 'parent']
  },
  {
    id: 'students',
    label: 'Students',
    icon: <Users className="w-4 h-4" />,
    roles: ['admin', 'teacher']
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: <Calendar className="w-4 h-4" />,
    roles: ['teacher', 'student', 'parent']
  },
  {
    id: 'academics',
    label: 'Academics',
    icon: <BookOpen className="w-4 h-4" />,
    roles: ['teacher', 'student', 'parent']
  },
  {
    id: 'exams',
    label: 'Examinations',
    icon: <FileText className="w-4 h-4" />,
    roles: ['teacher', 'student', 'parent']
  },
  {
    id: 'fees',
    label: 'Fee Management',
    icon: <CreditCard className="w-4 h-4" />,
    roles: ['admin', 'student', 'parent']
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: <Bus className="w-4 h-4" />,
    roles: ['admin', 'student', 'parent']
  },
  {
    id: 'hostel',
    label: 'Hostel',
    icon: <Building className="w-4 h-4" />,
    roles: ['admin', 'student', 'parent']
  },
  {
    id: 'notices',
    label: 'Notice Board',
    icon: <MessageSquare className="w-4 h-4" />,
    roles: ['admin', 'teacher', 'student', 'parent']
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <BarChart3 className="w-4 h-4" />,
    roles: ['admin', 'teacher']
  }
];

export function Sidebar({ user, activeModule, onModuleChange, onLogout }: SidebarProps) {
  const availableMenuItems = menuItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">ERP System</h1>
            <p className="text-sm text-gray-500">Student Management</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* User Info */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {availableMenuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeModule === item.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onModuleChange(item.id)}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Button>
        ))}
      </nav>

      <Separator />

      {/* Logout */}
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}