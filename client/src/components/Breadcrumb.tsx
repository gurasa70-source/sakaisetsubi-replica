import { useLocation } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const [location] = useLocation();

  // ページパスからパンくずリストを生成
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'ホーム', href: '/' }
    ];

    // ページ別のパンくずリスト
    if (location === '/design') {
      breadcrumbs.push({ label: '設計・申請', href: '/design' });
    } else if (location === '/design-projects') {
      breadcrumbs.push({ label: '設計・申請', href: '/design' });
      breadcrumbs.push({ label: '設計・申請実績', href: '/design-projects' });
    } else if (location === '/works') {
      breadcrumbs.push({ label: '施工実績', href: '/works' });
    } else if (location.startsWith('/works/')) {
      breadcrumbs.push({ label: '施工実績', href: '/works' });
      breadcrumbs.push({ label: '詳細', href: location });
    } else if (location === '/admin/works') {
      breadcrumbs.push({ label: '管理画面', href: '/admin' });
      breadcrumbs.push({ label: '施工実績管理', href: '/admin/works' });
    } else if (location === '/admin/design-projects') {
      breadcrumbs.push({ label: '管理画面', href: '/admin' });
      breadcrumbs.push({ label: '設計・申請実績管理', href: '/admin/design-projects' });
    } else if (location === '/admin/blog') {
      breadcrumbs.push({ label: '管理画面', href: '/admin' });
      breadcrumbs.push({ label: 'ブログ管理', href: '/admin/blog' });
    } else if (location === '/admin') {
      breadcrumbs.push({ label: '管理画面', href: '/admin' });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // ホームページではパンくずを表示しない
  if (location === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-gray-100 border-b-2 border-gray-300 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm overflow-x-auto whitespace-nowrap pb-2">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2 flex-shrink-0">
              {index === 0 ? (
                <a
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                >
                  <Home size={16} />
                  <span>{item.label}</span>
                </a>
              ) : (
                <>
                  <ChevronRight size={16} className="text-gray-400" />
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  ) : (
                    <a
                      href={item.href}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {item.label}
                    </a>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
