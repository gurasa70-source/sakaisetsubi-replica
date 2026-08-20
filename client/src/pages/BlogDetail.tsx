import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";

export default function BlogDetail() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery(slug, { enabled: Boolean(match && slug) });
  const incrementMutation = trpc.blog.incrementViews.useMutation();

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | 株式会社 堺設備`;
      incrementMutation.mutate(post.id);
    }
    return () => {
      document.title = "株式会社 堺設備 | 静岡で暮らしを支える。";
    };
  }, [post?.id]);

  if (!match) return null;
  if (isLoading) return <div className="min-h-screen bg-white px-4 pb-20 pt-32 text-center text-gray-600">読み込み中...</div>;
  if (!post || post.status !== "published") {
    return (
      <div className="min-h-screen bg-white px-4 pb-20 pt-32 text-center">
        <h1 className="text-3xl font-bold text-gray-900">お知らせが見つかりません</h1>
        <p className="mt-4 text-gray-600">指定されたお知らせは公開されていないか、削除された可能性があります。</p>
        <Link href="/blog" className="mt-8 inline-flex font-semibold text-blue-600 hover:text-blue-800">お知らせ一覧へ戻る</Link>
      </div>
    );
  }

  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : null;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 pb-14 pt-32 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-blue-100">
            {publishedDate && <time dateTime={publishedDate.toISOString()}>{publishedDate.toLocaleDateString("ja-JP")}</time>}
            <span className="rounded bg-white/15 px-3 py-1">{post.category}</span>
          </div>
          <h1 className="text-3xl font-bold leading-[1.2] text-balance sm:text-4xl md:text-5xl">{post.title}</h1>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12">
        {post.imageUrl && <img src={post.imageUrl} alt="" className="mb-10 max-h-[28rem] w-full rounded-lg object-cover" />}
        {post.excerpt && <p className="mb-8 rounded-lg bg-blue-50 p-6 text-lg leading-relaxed text-gray-700">{post.excerpt}</p>}
        <article className="whitespace-pre-wrap break-words text-base leading-loose text-gray-800">{post.content}</article>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link href="/blog" className="font-semibold text-blue-600 hover:text-blue-800">← お知らせ一覧へ戻る</Link>
        </div>
      </main>
    </div>
  );
}
