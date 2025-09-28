import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardOverview } from './modules/DashboardOverview';
import { StudentManagement } from './modules/StudentManagement';
import { AttendanceManagement } from './modules/AttendanceManagement';
import { AcademicManagement } from './modules/AcademicManagement';
import { ExamManagement } from './modules/ExamManagement';
import { FeeManagement } from './modules/FeeManagement';
import { TransportManagement } from './modules/TransportManagement';
import { HostelManagement } from './modules/HostelManagement';
import { NoticeBoard } from './modules/NoticeBoard';
import { Reports } from './modules/Reports';
import type { User } from '../App';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export type ActiveModule = 
  | 'dashboard'
  | 'students'
  | 'attendance'
  | 'academics'
  | 'exams'
  | 'fees'
  | 'transport'
  | 'hostel'
  | 'notices'
  | 'reports';

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');

  const renderModule = () => {
    // Restrict admin access to attendance, academics, and exams modules
    if (user.role === 'admin' && ['attendance', 'academics', 'exams'].includes(activeModule)) {
      return <DashboardOverview user={user} />;
    }

    switch (activeModule) {
      case 'dashboard':
        return <DashboardOverview user={user} />;
      case 'students':
        return <StudentManagement user={user} />;
      case 'attendance':
        return <AttendanceManagement user={user} />;
      case 'academics':
        return <AcademicManagement user={user} />;
      case 'exams':
        return <ExamManagement user={user} />;
      case 'fees':
        return <FeeManagement user={user} />;
      case 'transport':
        return <TransportManagement user={user} />;
      case 'hostel':
        return <HostelManagement user={user} />;
      case 'notices':
        return <NoticeBoard user={user} />;
      case 'reports':
        return <Reports user={user} />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar 
        user={user} 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderModule()}
        </div>
      </main>
    </div>
  );
}