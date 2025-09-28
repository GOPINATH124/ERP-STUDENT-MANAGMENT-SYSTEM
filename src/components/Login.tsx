import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { User, UserRole } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
}

const demoUsers = {
  admin: {
    id: 'admin1',
    name: 'Dr. Sarah Johnson',
    email: 'admin@university.edu',
    role: 'admin' as UserRole,
  },
  teacher: {
    id: 'teacher1',
    name: 'Prof. Michael Chen',
    email: 'mchen@university.edu',
    role: 'teacher' as UserRole,
  },
  student: {
    id: 'student1',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@student.edu',
    role: 'student' as UserRole,
  },
  parent: {
    id: 'parent1',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@gmail.com',
    role: 'parent' as UserRole,
  },
};

export function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = demoUsers[selectedRole];
      onLogin(user);
      toast.success(`Welcome ${user.name}!`);
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: UserRole) => {
    const user = demoUsers[role];
    onLogin(user);
    toast.success(`Logged in as ${user.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">ERP Student Management</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or try demo accounts</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin('admin')}>
              Admin Demo
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin('teacher')}>
              Teacher Demo
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin('student')}>
              Student Demo
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin('parent')}>
              Parent Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}