import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardOverview } from './admin/DashboardOverview';
import { StudentManagement } from './admin/StudentManagement';
import { TeacherManagement } from './admin/TeacherManagement';
import { CourseManagement } from './admin/CourseManagement';
import { AttendanceManagement } from './admin/AttendanceManagement';
import { ExamManagement } from './admin/ExamManagement';
import { FeeManagement } from './admin/FeeManagement';
import { TransportManagement } from './admin/TransportManagement';
import { HostelManagement } from './admin/HostelManagement';
import { NoticeManagement } from './admin/NoticeManagement';
import { ReportsManagement } from './admin/ReportsManagement';
import { ProfileManagement } from './common/ProfileManagement';
import { User } from '../App';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'profile':
        return <ProfileManagement user={user} />;
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'exams':
        return <ExamManagement />;
      case 'fees':
        return <FeeManagement />;
      case 'transport':
        return <TransportManagement />;
      case 'hostel':
        return <HostelManagement />;
      case 'notices':
        return <NoticeManagement />;
      case 'reports':
        return <ReportsManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={onLogout} 
      />
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}