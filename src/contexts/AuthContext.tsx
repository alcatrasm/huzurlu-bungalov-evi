
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from '@/models/UserRole';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{error: any}>;
  signIn: (email: string, password: string) => Promise<{error: any}>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  checkAdminStatus: (userId: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const checkAdminStatus = async (userId: string) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    
    try {
      console.log("Checking admin status for user ID:", userId);
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
        
      if (error) {
        console.error('Error fetching user role:', error);
        setIsAdmin(false);
        return;
      }
      
      const hasAdminRole = !!data;
      console.log("Admin check result:", hasAdminRole ? "Is admin" : "Not admin");
      setIsAdmin(hasAdminRole);
      
      return;
    } catch (error) {
      console.error('Exception checking admin status:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const setupAuth = async () => {
      setLoading(true);
      
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          console.log("Auth state changed:", event, newSession?.user?.id);
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          // Check if user is admin - but don't set loading here
          if (newSession?.user) {
            setTimeout(() => {
              // Use setTimeout to prevent Supabase auth deadlock
              checkAdminStatus(newSession.user.id);
            }, 0);
          } else {
            setIsAdmin(false);
          }
        }
      );

      // THEN check for existing session
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      console.log("Initial session check:", initialSession?.user?.id);
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      // Check if user is admin
      if (initialSession?.user) {
        await checkAdminStatus(initialSession.user.id);
      }
      
      setLoading(false);
      
      return () => subscription.unsubscribe();
    };
    
    setupAuth();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast({
        title: "Kayıt başarılı",
        description: "Hesabınız oluşturuldu. Lütfen e-postanızı kontrol edin.",
      });
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Kayıt başarısız",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Giriş başarılı",
        description: "Hoş geldiniz!",
      });
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Giriş başarısız",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    });
  };

  const signInWithFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Çıkış yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      loading,
      signUp,
      signIn,
      signInWithGoogle,
      signInWithFacebook,
      signOut,
      isAdmin,
      checkAdminStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
