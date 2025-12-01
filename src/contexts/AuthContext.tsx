import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  educationLevel: 'medio' | 'superior';
  studyPreferences?: {
    morningStudy: boolean;
    afternoonStudy: boolean;
    eveningStudy: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, educationLevel: 'medio' | 'superior') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('agenda-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = (name: string, email: string, password: string, educationLevel: 'medio' | 'superior') => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      educationLevel,
      studyPreferences: {
        morningStudy: true,
        afternoonStudy: true,
        eveningStudy: false,
      },
    };

    localStorage.setItem('agenda-user', JSON.stringify(newUser));
    localStorage.setItem('agenda-credentials', JSON.stringify({ email, password }));
    setUser(newUser);
    return true;
  };

  const login = (email: string, password: string) => {
    const credentials = localStorage.getItem('agenda-credentials');
    if (credentials) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(credentials);
      if (email === storedEmail && password === storedPassword) {
        const storedUser = localStorage.getItem('agenda-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          return true;
        }
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agenda-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
