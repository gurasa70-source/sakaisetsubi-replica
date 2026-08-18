import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Blog() {
  const [category, setCategory] = useState("すべて");
  const { data: posts = [], isLoading } = trpc.blog.getPublished.useQuery();
  const categories = useMemo(() => ["すべて", ...Array.from(new Set(posts.map((post) => post.category)))], [posts]);
  const filteredPosts = category === "すべて" ? posts : posts.filter((post) => post.category === category);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 pb-14 pt-32 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-blue-200">NEWS & COLUMN</p>
          <h1 className="text-4xl font-bold md:text-5xl">お知らせ・コラム</h1>
          <p className="mt-4 max-w-2xl text-blue-100">株式会社堺設備からのお知らせや、水道設備に関する役立つ情報を掲載しています。</p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${category === item ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600"}`}>
              {item}
            </button>
          ))}
        </div>

        {isLoading ? <p className="text-gray-600">読み込み中...</p> : filteredPosts.length === 0 ? <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-600">公開中のお知らせはありません。</div> : (
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {filteredPosts.map((post) => (
              <article key={post.id} className="py-6">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    {post.imageUrl && <img src={post.imageUrl} alt="" className="h-24 w-full rounded-md object-cover sm:w-40" loading="lazy" />}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("ja-JP") : "日付未定"}</time>
                        <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">{post.category}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">{post.title}</h2>
                      {post.excerpt && <p className="mt-2 line-clamp-2 text-gray-600">{post.excerpt}</p>}
                    </div>
                    <ChevronRight aria-hidden="true" className="h-6 w-6 shrink-0 text-blue-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
