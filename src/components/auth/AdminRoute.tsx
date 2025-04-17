
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, isAdmin, checkAdminStatus } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  
  // Debug admin status
  console.log("AdminRoute - User:", user?.id, "isAdmin:", isAdmin, "loading:", loading);
  
  // Force re-check admin status when this component mounts
  useEffect(() => {
    if (user) {
      checkAdminStatus(user.id);
    }
  }, [user, checkAdminStatus]);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-500"></div>
    </div>;
  }
  
  if (!user) {
    console.log("AdminRoute - No user, redirecting to login");
    toast({
      title: "Erişim reddedildi",
      description: "Yönetim paneline erişmek için giriş yapmalısınız.",
      variant: "destructive"
    });
    return <Navigate to="/giris" replace state={{ from: location }} />;
  }
  
  if (!isAdmin) {
    console.log("AdminRoute - User is not admin, redirecting to home");
    toast({
      title: "Yetkisiz erişim",
      description: "Bu alana erişim yetkiniz bulunmuyor.",
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }
  
  console.log("AdminRoute - Access granted");
  return <>{children}</>;
};

export default AdminRoute;
