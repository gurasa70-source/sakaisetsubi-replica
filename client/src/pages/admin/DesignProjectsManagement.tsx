import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/_core/hooks/useAuth';
import { Pencil, Trash2, Plus } from 'lucide-react';

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
    status: 'published',
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
        status: 'published',
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({
      title: '',
      building: '',
      businessContent: '',
      scope: '',
      description: '',
      imageUrl: '',
      status: 'published',
    });
  };

  if (loading) {
    return <div className="p-8">読み込み中...</div>;
  }

  if (user?.role !== 'admin') {
    return <div className="p-8">管理者のみアクセス可能です</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">設計・申請実績管理</h1>
          <p className="text-gray-600">設計・申請業務の実績を管理します</p>
        </div>

        {!isCreating ? (
          <Button onClick={() => setIsCreating(true)} className="mb-8 gap-2">
            <Plus size={20} />
            新規追加
          </Button>
        ) : (
          <Card className="mb-8 border-2 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-xl">
                {editingId ? '設計・申請実績を編集' : '新規設計・申請実績を追加'}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* タイトル */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    タイトル <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="例: 静岡市 新築戸建 給排水設備設計・申請"
                    required
                    className="text-base"
                  />
                </div>

                {/* 建物 */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    建物 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.building}
                    onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                    placeholder="例: 新築戸建、マンション、店舗など"
                    required
                    className="text-base"
                  />
                </div>

                {/* 業務内容 */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    業務内容 <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.businessContent}
                    onChange={(e) => setFormData({ ...formData, businessContent: e.target.value })}
                    placeholder="例: 給排水設備設計・水道申請"
                    required
                    className="text-base min-h-20"
                  />
                </div>

                {/* 対応範囲 */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    対応範囲 <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    placeholder="例: 図面作成～申請提出"
                    required
                    className="text-base min-h-20"
                  />
                </div>

                {/* 説明文 */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    説明文 <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="例: 静岡市内の新築戸建住宅にて、給排水設備および水道申請業務を担当しました。施工部門と連携設計、スムーズな現場進行を実現しています。"
                    required
                    className="text-base min-h-32"
                  />
                </div>

                {/* 画像 */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    画像 <span className="text-gray-500 text-xs">(JPG、PNG、GIF、WebP、SVG)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'imageUrl')}
                      disabled={uploading}
                      className="text-base"
                    />
                    {uploading && (
                      <p className="text-sm text-blue-600 mt-2">アップロード中...</p>
                    )}
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">プレビュー:</p>
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                {/* ステータス */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    ステータス <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: (e.target.value === 'published' ? 'published' : 'draft') as
                          | 'published'
                          | 'draft',
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="published">公開</option>
                    <option value="draft">下書き</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    「公開」を選択すると、設計・申請実績ページに表示されます
                  </p>
                </div>

                {/* ボタン */}
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingId ? '更新' : '追加'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                    キャンセル
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* 実績一覧 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">実績一覧</h2>
          {projects.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center py-8">
                  設計・申請実績がまだありません。「新規追加」ボタンから追加してください。
                </p>
              </CardContent>
            </Card>
          ) : (
            projects.map((project: any) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* 画像 */}
                    {project.imageUrl && (
                      <div className="md:col-span-1">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* 詳細情報 */}
                    <div className={project.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}>
                      <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-semibold text-gray-700">建物:</span>{' '}
                          <span className="text-gray-600">{project.building}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">業務内容:</span>{' '}
                          <span className="text-gray-600">{project.businessContent}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">対応範囲:</span>{' '}
                          <span className="text-gray-600">{project.scope}</span>
                        </p>
                        <p className="text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              project.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {project.status === 'published' ? '公開' : '下書き'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* アクション */}
                    <div className="md:col-span-1 flex flex-col gap-2 justify-start">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                        className="gap-2 w-full"
                      >
                        <Pencil size={16} />
                        編集
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(project.id)}
                        className="gap-2 w-full"
                      >
                        <Trash2 size={16} />
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
