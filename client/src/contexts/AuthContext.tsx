import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (adminId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {}, // Dummy login function for initial context
  logout: () => {}, // Dummy logout function for initial context
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (adminId: string) => {
    // For admin login, create a mock user object
    // In a real application, you might fetch more user details or store a token
    const adminUser: User = {
      id: adminId,
      email: `${adminId}@admin.com`, // Mock email
      app_metadata: {
        provider: 'email',
        providers: ['email'],
      },
      user_metadata: {
        adminId: adminId,
        role: 'admin',
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      phone: '',
      email_confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: 'admin',
      updated_at: new Date().toISOString(),
    };
    setUser(adminUser);
  };

  const logout = async () => { // Made async to await supabase.auth.signOut()
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
