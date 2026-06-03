import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DesignProjects() {
  const { data: projects = [], isLoading } = trpc.designProjects.getPublished.useQuery();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 rounded mb-8 w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#0052CC' }}>
          設計・申請実績
        </h1>
        <p className="text-gray-600 mb-12">
          設計部門で対応した給排水設備設計・水道申請業務の実績をご紹介します。
        </p>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">設計・申請実績がまだ公開されていません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project: any) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.imageUrl && (
                    <div className="w-full h-48 overflow-hidden rounded-lg">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-700">建物</h3>
                      <p className="text-gray-600">{project.building}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-gray-700">業務内容</h3>
                      <p className="text-gray-600 whitespace-pre-wrap">{project.businessContent}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-gray-700">対応範囲</h3>
                      <p className="text-gray-600 whitespace-pre-wrap">{project.scope}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-gray-700">詳細</h3>
                      <p className="text-gray-600 whitespace-pre-wrap">{project.description}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
