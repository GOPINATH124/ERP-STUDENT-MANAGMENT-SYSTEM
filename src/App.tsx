import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { GraduationCap, Loader2 } from 'lucide-react';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * User roles in the ERP system with specific access permissions
 * - admin: Institutional management (students, fees, transport, hostel, notices, reports)
 * - teacher: Academic operations (attendance, academics, examinations, students, notices, reports)
 * - student: View-only access to personal academic data
 * - parent: View-only access to child's academic data
 */
export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

/**
 * User entity representing authenticated users in the system
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** Full name of the user */
  name: string;
  /** Email address (used for login) */
  email: string;
  /** Role determining system permissions */
  role: UserRole;
  /** Optional avatar URL */
  avatar?: string;
  /** Additional metadata */
  metadata?: {
    /** Department/Grade for teachers/students */
    department?: string;
    /** Class section for students */
    section?: string;
    /** Employee/Student ID */
    employeeId?: string;
    /** Contact information */
    phone?: string;
  };
}

/**
 * Application state interface for type safety
 */
interface AppState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Local storage key for user session */
const USER_SESSION_KEY = 'erp_user_session';

/** Session timeout in milliseconds (24 hours) */
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Validates if a stored user session is still valid
 */
const isValidSession = (sessionData: any): boolean => {
  if (!sessionData || typeof sessionData !== 'object') return false;
  
  const { user, timestamp } = sessionData;
  const now = Date.now();
  
  // Check if session has expired
  if (!timestamp || (now - timestamp) > SESSION_TIMEOUT) return false;
  
  // Validate user object structure
  if (!user || !user.id || !user.name || !user.email || !user.role) return false;
  
  // Validate role
  const validRoles: UserRole[] = ['admin', 'teacher', 'student', 'parent'];
  if (!validRoles.includes(user.role)) return false;
  
  return true;
};

/**
 * Safely retrieves and validates user session from localStorage
 */
const getStoredSession = (): User | null => {
  try {
    const storedData = localStorage.getItem(USER_SESSION_KEY);
    if (!storedData) return null;
    
    const sessionData = JSON.parse(storedData);
    if (!isValidSession(sessionData)) {
      // Clean up invalid session
      localStorage.removeItem(USER_SESSION_KEY);
      return null;
    }
    
    return sessionData.user;
  } catch (error) {
    console.error('Error retrieving user session:', error);
    localStorage.removeItem(USER_SESSION_KEY);
    return null;
  }
};

/**
 * Safely stores user session with timestamp
 */
const storeSession = (user: User): void => {
  try {
    const sessionData = {
      user,
      timestamp: Date.now()
    };
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Error storing user session:', error);
    toast.error('Failed to save session. Please try again.');
  }
};

/**
 * Clears user session from localStorage
 */
const clearSession = (): void => {
  try {
    localStorage.removeItem(USER_SESSION_KEY);
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
};

// =============================================================================
// LOADING COMPONENT
// =============================================================================

/**
 * Professional loading screen with system branding
 */
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen w-full bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
    <div className="text-center space-y-6">
      {/* Logo and branding */}
      <div className="flex items-center justify-center space-x-3 mb-8">
        <div className="p-3 bg-primary rounded-lg">
          <GraduationCap className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-semibold text-foreground">EduManage</h1>
          <p className="text-sm text-muted-foreground">Student Management System</p>
        </div>
      </div>
      
      {/* Loading spinner */}
      <div className="flex items-center justify-center space-x-3">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Loading your dashboard...</span>
      </div>
      
      {/* Progress indicator */}
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

// =============================================================================
// ERROR BOUNDARY
// =============================================================================

/**
 * Error boundary component for catching and handling React errors
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
    toast.error('An unexpected error occurred. Please refresh the page.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
          <div className="text-center space-y-4 p-8">
            <div className="p-4 bg-destructive/10 rounded-lg inline-block">
              <GraduationCap className="h-12 w-12 text-destructive mx-auto" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground max-w-md">
              We encountered an unexpected error. Please refresh the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// =============================================================================
// MAIN APPLICATION COMPONENT
// =============================================================================

/**
 * Main application component handling authentication and routing
 * Implements role-based access control for the ERP system
 */
export default function App(): JSX.Element {
  // Application state
  const [state, setState] = useState<AppState>({
    user: null,
    loading: true,
    error: null
  });

  // Memoized user data for performance
  const currentUser = useMemo(() => state.user, [state.user]);

  /**
   * Initialize application and check for existing session
   */
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // Simulate app initialization delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check for existing valid session
        const storedUser = getStoredSession();
        
        setState(prev => ({
          ...prev,
          user: storedUser,
          loading: false
        }));

        // Show welcome message for returning users
        if (storedUser) {
          toast.success(`Welcome back, ${storedUser.name}!`);
        }
      } catch (error) {
        console.error('App initialization error:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to initialize application'
        }));
        toast.error('Failed to load application. Please refresh the page.');
      }
    };

    initializeApp();
  }, []);

  /**
   * Handle user login with validation and session management
   */
  const handleLogin = useCallback((userData: User) => {
    try {
      // Validate user data
      if (!userData || !userData.id || !userData.email || !userData.role) {
        throw new Error('Invalid user data received');
      }

      // Store session
      storeSession(userData);
      
      // Update state
      setState(prev => ({
        ...prev,
        user: userData,
        error: null
      }));

      // Show success message
      toast.success(`Welcome, ${userData.name}! You're now logged in.`);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  }, []);

  /**
   * Handle user logout with cleanup
   */
  const handleLogout = useCallback(() => {
    try {
      // Clear session
      clearSession();
      
      // Update state
      setState(prev => ({
        ...prev,
        user: null,
        error: null
      }));

      // Show confirmation message
      toast.success('You have been logged out successfully.');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout. Please refresh the page.');
    }
  }, []);

  // Show loading screen during initialization
  if (state.loading) {
    return (
      <ErrorBoundary>
        <LoadingScreen />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))'
            }
          }}
        />
      </ErrorBoundary>
    );
  }

  // Show login screen for unauthenticated users
  if (!currentUser) {
    return (
      <ErrorBoundary>
        <Login onLogin={handleLogin} />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))'
            }
          }}
        />
      </ErrorBoundary>
    );
  }

  // Show main dashboard for authenticated users
  return (
    <ErrorBoundary>
      <Dashboard user={currentUser} onLogout={handleLogout} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))'
          }
        }}
      />
    </ErrorBoundary>
  );
}