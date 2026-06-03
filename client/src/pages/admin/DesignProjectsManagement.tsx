import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/_core/hooks/useAuth';

export default function DesignProjectsManagement() {
  const { user, loading } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    building: string;
    businessContent: string;
    scope: string;
    description: string;
    imageUrl: string;
    status: 'draft' | 'published';
  }>({
    title: '',
    building: '',
    businessContent: '',
    scope: '',
    description: '',
    imageUrl: '',
    status: 'draft',
  });

  const { data: projects = [] } = trpc.designProjects.getAll.useQuery(undefined, {
    enabled: user?.role === 'admin',
  });

  const createMutation = trpc.designProjects.create.useMutation();
  const updateMutation = trpc.designProjects.update.useMutation();
  const deleteMutation = trpc.designProjects.delete.useMutation();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'imageUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルタイプの検証
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];
    if (!allowedTypes.includes(file.type)) {
      alert('対応形式: JPG、PNG、GIF、WebP、SVG');
      return;
    }

    setUploading(true);
    try {
      // FormDataを使用してファイルをアップロード
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'アップロードに失敗しました');
      }

      const data = await response.json();
      setFormData({ ...formData, [fieldName]: data.url });
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'ファイルのアップロードに失敗しました';
      alert(`アップロードエラー: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          ...formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }

      setFormData({
        title: '',
        building: '',
        businessContent: '',
        scope: '',
        description: '',
        imageUrl: '',
        status: 'draft',
      });
      setEditingId(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to save design project:', error);
    }
  };

  const handleEdit = (project: any) => {
    setFormData({
      title: project.title,
      building: project.building,
      businessContent: project.businessContent,
      scope: project.scope,
      description: project.description,
      imageUrl: project.imageUrl || '',
      status: project.status,
    });
    setEditingId(project.id);
    setIsCreating(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('この設計・申請実績を削除してもよろしいですか？')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete design project:', error);
      }
    }
  };

  if (loading) {
    return <div className="p-8">読み込み中...</div>;
  }

  if (user?.role !== 'admin') {
    return <div className="p-8">管理者のみアクセス可能です</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">設計・申請実績管理</h1>

        {!isCreating ? (
          <Button onClick={() => setIsCreating(true)} className="mb-8">
            新規追加
          </Button>
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? '設計・申請実績を編集' : '新規設計・申請実績を追加'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">タイトル</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">建物</label>
                  <Input
                    value={formData.building}
                    onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                    placeholder="例: 新築戸建"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">業務内容</label>
                  <Textarea
                    value={formData.businessContent}
                    onChange={(e) => setFormData({ ...formData, businessContent: e.target.value })}
                    placeholder="例: 給排水設備設計・水道申請"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">対応範囲</label>
                  <Textarea
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    placeholder="例: 図面作成～申請提出"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">説明文</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="例: 静岡市内の新築戸建住宅にて、給排水設備および水道申請業務を担当しました。施工部門と連携設計、スムーズな現場進行を実現しています。"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">画像</label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'imageUrl')}
                      disabled={uploading}
                    />
                    {uploading && <span>アップロード中...</span>}
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ステータス</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: (e.target.value === 'published' ? 'published' : 'draft') })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">保存</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingId(null);
                      setFormData({
                        title: '',
                        building: '',
                        businessContent: '',
                        scope: '',
                        description: '',
                        imageUrl: '',
                        status: 'draft',
                      });
                    }}
                  >
                    キャンセル
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">一覧</h2>
          {projects.length === 0 ? (
            <p className="text-gray-500">設計・申請実績がまだありません</p>
          ) : (
            projects.map((project: any) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <p className="text-sm text-gray-600">建物: {project.building}</p>
                      <p className="text-sm text-gray-600">業務内容: {project.businessContent}</p>
                      <p className="text-sm text-gray-600">対応範囲: {project.scope}</p>
                      <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                      {project.imageUrl && (
                        <img src={project.imageUrl} alt={project.title} className="w-32 h-32 object-cover rounded mt-2" />
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        ステータス: {project.status === 'published' ? '公開' : '下書き'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                      >
                        編集
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(project.id)}
                      >
                        削除
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
