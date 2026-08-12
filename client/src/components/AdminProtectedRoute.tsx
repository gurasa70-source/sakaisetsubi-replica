import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600">管理者認証を確認しています...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return <>{children}</>;
}
