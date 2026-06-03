import { useState, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import WaterTapLoader from '@/components/WaterTapLoader';
import ShareButtons from '@/components/ShareButtons';

const ITEMS_PER_PAGE = 6;

export default function Works() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: '漏水修理', name: '漏水修理', icon: '💧' },
    { id: '水回りリフォーム', name: '水回りリフォーム', icon: '🛁' },
    { id: '機器交換工事', name: '機器交換工事', icon: '🔧' },
    { id: '新築給排水工事', name: '新築給排水工事', icon: '🏗️' },
    { id: '下水道切替工事', name: '下水道切替工事', icon: '🔄' },
    { id: '分水工事', name: '分水工事', icon: '💧' },
  ];

  // データベースから公開済みの施工実績を取得
  const { data: works = [] } = trpc.works.getPublished.useQuery();

  // 施工年を抽出してソート
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(works.map(work => work.date?.split('年')[0]).filter(Boolean)))
      .sort((a, b) => (b as string).localeCompare(a as string));
    return uniqueYears as string[];
  }, [works]);

  // メモ化してパフォーマンス向上
  const filteredWorks = useMemo(() => {
    return works.filter(work => {
      const categoryMatch = !selectedCategory || work.category === selectedCategory;
      const yearMatch = !selectedYear || work.date?.startsWith(selectedYear);
      return categoryMatch && yearMatch;
    });
  }, [works, selectedCategory, selectedYear]);

  // ページネーション計算
  const totalPages = Math.ceil(filteredWorks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedWorks = filteredWorks.slice(startIndex, endIndex);

  // フィルター変更時にページをリセット
  const handleCategoryChange = (category: string | null) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setCurrentPage(1);
      setIsLoading(false);
    }, 600);
  };

  const handleYearChange = (year: string | null) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedYear(year);
      setCurrentPage(1);
      setIsLoading(false);
    }, 600);
  };

  const handleResetFilters = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCategory(null);
      setSelectedYear(null);
      setCurrentPage(1);
      setIsLoading(false);
    }, 600);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // ページ番号配列を生成（最大5ページまで表示）
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー - TOPページと統一 */}
      <header className="pt-24 pb-16 relative overflow-hidden bg-gray-900">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "#0052CC" }}></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "#5B5FDE" }}></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold">
              施工実績
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            堺設備の<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #00A8E8, #5B5FDE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              施工実績
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            静岡市で50年以上、地域の暮らしを支えてきた堺設備の実績をご紹介します。
            新築から改修まで、幅広い工事に対応しています。
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container max-w-6xl mx-auto px-4 py-16">
        {/* フィルターセクション - モダンなデザイン */}
        <section className="mb-20">
          {/* カテゴリーフィルター */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">カテゴリーから探す</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === null
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={selectedCategory === null ? { backgroundColor: "#0052CC" } : {}}
                disabled={isLoading}
              >
                すべて
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'text-white shadow-lg scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={selectedCategory === category.id ? { backgroundColor: "#0052CC" } : {}}
                  disabled={isLoading}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* 施工年フィルター */}
          {years.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8 text-slate-900">施工年から探す</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleYearChange(null)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedYear === null
                      ? 'text-white shadow-lg scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={selectedYear === null ? { backgroundColor: "#5B5FDE" } : {}}
                  disabled={isLoading}
                >
                  すべて
                </button>
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedYear === year
                        ? 'text-white shadow-lg scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    style={selectedYear === year ? { backgroundColor: "#5B5FDE" } : {}}
                    disabled={isLoading}
                  >
                    {year}年
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ローディング中のオーバーレイ */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <WaterTapLoader />
            </div>
          </div>
        )}

        {/* 施工実績グリッド - 高性能レイアウト */}
        <section className={`mb-20 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              {selectedCategory || selectedYear
                ? `検索結果 (${filteredWorks.length}件)`
                : `すべての施工実績 (${filteredWorks.length}件)`}
            </h2>
            {(selectedCategory || selectedYear) && (
              <button
                onClick={handleResetFilters}
                className="text-sm font-semibold px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                disabled={isLoading}
              >
                フィルターをリセット
              </button>
            )}
          </div>

          {filteredWorks.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {paginatedWorks.map((work, index) => (
                  <a
                    key={work.id}
                    href={`/works/${work.id}`}
                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* 画像コンテナ */}
                    <div className="relative h-56 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                      {work.imageUrl ? (
                        <>
                          <img
                            src={work.imageUrl}
                            alt={work.title}
                            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                          {/* オーバーレイエフェクト */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-500">
                          <span className="text-6xl">📸</span>
                        </div>
                      )}
                      {/* カテゴリーバッジ - ホバーで浮き上がる */}
                      <div className="absolute top-4 right-4 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                        <span className="inline-block px-3 py-1 text-white text-xs font-bold rounded-full shadow-lg group-hover:shadow-xl" style={{ backgroundColor: "#0052CC" }}>
                          {work.category}
                        </span>
                      </div>
                    </div>

                    {/* コンテンツ */}
                    <div className="p-6">
                      <p className="text-sm text-slate-500 font-semibold mb-3 flex items-center gap-2">
                        <span>📅</span>
                        {work.date}
                      </p>
                      <h3 className="text-lg font-bold mb-3 text-slate-900 line-clamp-2 group-hover:text-blue-600 transition">
                        {work.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                        {work.workContent}
                      </p>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all" style={{ color: "#0052CC" }}>
                          詳細を見る
                          <ChevronRight size={18} />
                        </div>
                        <ShareButtons 
                          title={work.title}
                          url={`${typeof window !== 'undefined' ? window.location.origin : ''}/works/${work.id}`}
                          description={work.workContent}
                        />
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mb-8">
                  {/* 前へボタン */}
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1 || isLoading}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      currentPage === 1 || isLoading
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* ページ番号 */}
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={isLoading}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === page
                          ? 'text-white shadow-lg'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      style={currentPage === page ? { backgroundColor: "#0052CC" } : {}}
                    >
                      {page}
                    </button>
                  ))}

                  {/* 次へボタン */}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || isLoading}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      currentPage === totalPages || isLoading
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

              {/* ページ情報 */}
              <div className="text-center text-slate-600 text-sm">
                {startIndex + 1}～{Math.min(endIndex, filteredWorks.length)}件を表示 / 全{filteredWorks.length}件
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl text-slate-500 mb-4">該当する施工実績がありません</p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300 text-white"
                style={{ backgroundColor: "#0052CC" }}
                disabled={isLoading}
              >
                フィルターをリセット
              </button>
            </div>
          )}
        </section>

        {/* ご不明な点セクション */}
        <section className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">ご不明な点やご質問がございましたら</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            堺設備の専門スタッフがお客様のご要望にお応えします。
            お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:054-348-2286"
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: "#0052CC" }}
            >
              📞 電話する
            </a>
            <a
              href="/#contact"
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: "#FF4444" }}
            >
              📧 お問い合わせ
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
