import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return <>{children}</>;
}
