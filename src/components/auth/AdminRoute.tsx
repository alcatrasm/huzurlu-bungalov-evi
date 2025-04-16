
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  
  // Debug admin status
  console.log("AdminRoute - User:", user?.id, "isAdmin:", isAdmin, "loading:", loading);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-500"></div>
    </div>;
  }
  
  if (!user) {
    console.log("AdminRoute - No user, redirecting to login");
    return <Navigate to="/giris" replace />;
  }
  
  if (!isAdmin) {
    console.log("AdminRoute - User is not admin, redirecting to home");
    return <Navigate to="/" replace />;
  }
  
  console.log("AdminRoute - Access granted");
  return <>{children}</>;
};

export default AdminRoute;
