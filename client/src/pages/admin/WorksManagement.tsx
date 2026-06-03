import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/_core/hooks/useAuth';

export default function WorksManagement() {
  const { user, loading } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    workContent: '',
    requestContent: '',
    cause: '',
    method: '',
    comment: '',
    imageUrl: '',
    beforeImageUrl: '',
    afterImageUrl: '',
    status: 'draft' as const,
  });

  const { data: works = [] } = trpc.works.getAll.useQuery(undefined, {
    enabled: user?.role === 'admin',
  });

  const createMutation = trpc.works.create.useMutation();
  const updateMutation = trpc.works.update.useMutation();
  const deleteMutation = trpc.works.delete.useMutation();

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
        category: '',
        date: '',
        workContent: '',
        requestContent: '',
        cause: '',
        method: '',
        comment: '',
        imageUrl: '',
        beforeImageUrl: '',
        afterImageUrl: '',
        status: 'draft',
      });
      setEditingId(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to save work:', error);
    }
  };

  const handleEdit = (work: any) => {
    setFormData({
      title: work.title,
      category: work.category,
      date: work.date,
      workContent: work.workContent,
      requestContent: work.requestContent,
      cause: work.cause,
      method: work.method,
      comment: work.comment,
      imageUrl: work.imageUrl || '',
      beforeImageUrl: work.beforeImageUrl || '',
      afterImageUrl: work.afterImageUrl || '',
      status: work.status,
    });
    setEditingId(work.id);
    setIsCreating(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('この施工実績を削除してもよろしいですか？')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete work:', error);
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
        <h1 className="text-3xl font-bold mb-8">施工実績管理</h1>

        {!isCreating ? (
          <Button onClick={() => setIsCreating(true)} className="mb-8">
            新規追加
          </Button>
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? '施工実績を編集' : '新規施工実績を追加'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">工事名</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">カテゴリー</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="漏水修理">漏水修理</option>
                    <option value="水回りリフォーム">水回りリフォーム</option>
                    <option value="機器交換工事">機器交換工事</option>
                    <option value="新築給排水工事">新築給排水工事</option>
                    <option value="下水道切替工事">下水道切替工事</option>
                    <option value="分水工事">分水工事</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">工事日</label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="例: 2024年12月"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">工事内容</label>
                  <Textarea
                    value={formData.workContent}
                    onChange={(e) => setFormData({ ...formData, workContent: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ご依頼内容</label>
                  <Textarea
                    value={formData.requestContent}
                    onChange={(e) => setFormData({ ...formData, requestContent: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">原因</label>
                  <Textarea
                    value={formData.cause}
                    onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">施工方法</label>
                  <Textarea
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">担当者コメント</label>
                  <Textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">メイン画像URL</label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/manus-storage/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ビフォー画像URL</label>
                  <Input
                    value={formData.beforeImageUrl}
                    onChange={(e) => setFormData({ ...formData, beforeImageUrl: e.target.value })}
                    placeholder="/manus-storage/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">アフター画像URL</label>
                  <Input
                    value={formData.afterImageUrl}
                    onChange={(e) => setFormData({ ...formData, afterImageUrl: e.target.value })}
                    placeholder="/manus-storage/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ステータス</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingId ? '更新' : '追加'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingId(null);
                      setFormData({
                        title: '',
                        category: '',
                        date: '',
                        workContent: '',
                        requestContent: '',
                        cause: '',
                        method: '',
                        comment: '',
                        imageUrl: '',
                        beforeImageUrl: '',
                        afterImageUrl: '',
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
          <h2 className="text-2xl font-bold">施工実績一覧</h2>
          {works.map((work: any) => (
            <Card key={work.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{work.title}</h3>
                    <p className="text-sm text-gray-600">{work.category} - {work.date}</p>
                    <p className="text-sm mt-2">
                      ステータス:{' '}
                      <span className={work.status === 'published' ? 'text-green-600' : 'text-yellow-600'}>
                        {work.status === 'published' ? '公開' : '下書き'}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(work)}
                    >
                      編集
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(work.id)}
                      disabled={deleteMutation.isPending}
                    >
                      削除
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
