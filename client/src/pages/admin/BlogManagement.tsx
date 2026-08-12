import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialForm = {
  title: "",
  slug: "",
  category: "お知らせ",
  excerpt: "",
  content: "",
  imageUrl: "",
  status: "draft" as "draft" | "published",
};

export default function BlogManagement() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(initialForm);

  const utils = trpc.useUtils();
  const { data: posts = [], isLoading } = trpc.blog.getAll.useQuery(undefined, {
    enabled: true,
  });
  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => utils.blog.getAll.invalidate(),
  });
  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => utils.blog.getAll.invalidate(),
  });
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => utils.blog.getAll.invalidate(),
  });

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setIsCreating(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const publishedAt = formData.status === "published" ? new Date() : undefined;
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ ...formData, id: editingId, publishedAt });
      } else {
        await createMutation.mutateAsync({ ...formData, publishedAt });
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save blog post", error);
      window.alert("お知らせの保存に失敗しました。入力内容を確認してください。");
    }
  };

  const handleEdit = (post: (typeof posts)[number]) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt || "",
      content: post.content,
      imageUrl: post.imageUrl || "",
      status: post.status,
    });
    setEditingId(post.id);
    setIsCreating(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("このお知らせを削除してもよろしいですか？")) return;
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete blog post", error);
      window.alert("お知らせの削除に失敗しました。");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600">株式会社 堺設備</p>
            <h1 className="text-3xl font-bold text-gray-900">お知らせ管理</h1>
          </div>
          {!isCreating && <Button onClick={() => setIsCreating(true)}>新規追加</Button>}
        </div>

        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "お知らせを編集" : "新しいお知らせを追加"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1 block text-sm font-medium">タイトル</label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">スラッグ（URL）</label>
                    <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="例: summer-holiday" required />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">カテゴリー</label>
                    <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">概要（トップ表示用）</label>
                  <Textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={2} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">本文</label>
                  <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={10} required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">画像URL（任意）</label>
                  <Input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://..." />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">公開状態</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })} className="w-full rounded-md border border-gray-300 px-3 py-2">
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>保存する</Button>
                  <Button type="button" variant="outline" onClick={resetForm}>キャンセル</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle>登録済みのお知らせ</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? <p>読み込み中...</p> : posts.length === 0 ? <p className="text-gray-600">お知らせはまだありません。</p> : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span>{post.category}</span>
                        <span className={post.status === "published" ? "font-semibold text-green-600" : "font-semibold text-gray-500"}>{post.status === "published" ? "公開中" : "下書き"}</span>
                      </div>
                      <h2 className="truncate font-semibold text-gray-900">{post.title}</h2>
                      <p className="text-sm text-gray-500">/blog/{post.slug}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Button variant="outline" onClick={() => handleEdit(post)}>編集</Button>
                      <Button variant="destructive" onClick={() => handleDelete(post.id)}>削除</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

