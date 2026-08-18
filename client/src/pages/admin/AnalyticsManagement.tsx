import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function AnalyticsManagement() {
  const [deviceFilter, setDeviceFilter] = useState("ALL");
  const [startDate, setStartDate] = useState("2026-05-18");
  const [endDate, setEndDate] = useState("2026-08-18");

  const { data: events = [], isLoading } = trpc.analytics.getAll.useQuery();

  const filteredEvents = useMemo(() => {
    return events.filter((ev: any) => {
      if (deviceFilter !== "ALL" && ev.device !== deviceFilter) return false;
      const evDate = new Date(ev.createdAt).toISOString().split("T")[0];
      if (startDate && evDate < startDate) return false;
      if (endDate && evDate > endDate) return false;
      return true;
    });
  }, [events, deviceFilter, startDate, endDate]);

  const metrics = useMemo(() => {
    const sessions = new Set(filteredEvents.map((e: any) => e.sessionId)).size;
    const users = sessions; // approximate unique visitors by session
    const pv = filteredEvents.length;
    const bounces = filteredEvents.filter((e: any) => e.isBounce === 1).length;
    const bounceRate = pv > 0 ? ((bounces / pv) * 100).toFixed(2) : "0.00";
    
    const totalDuration = filteredEvents.reduce((acc: number, e: any) => acc + (e.durationSeconds || 0),-0);
    const avgDurationSec = pv > 0 ? Math.round(totalDuration / pv) : 0;
    const formatTime = (sec: number) => {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `00:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
    };

    const pvPerSession = sessions > 0 ? (pv / sessions).toFixed(3) : "0";

    // Referrer aggregation
    const referrerMap: Record<string, { visits: number; duration: number; pv: number }> = {};
    filteredEvents.forEach((e: any) => {
      let ref = e.referrer ? e.referrer.trim() : "Direct";
      if (!ref) ref = "Direct";
      if (!referrerMap[ref]) referrerMap[ref] = { visits: 0, duration: 0, pv: 0 };
      referrerMap[ref].pv += 1;
      referrerMap[ref].duration += (e.durationSeconds || 0);
    });

    const referrersList = Object.entries(referrerMap).map(([url, data]) => ({
      url,
      visits: data.pv,
      avgDuration: formatTime(data.pv > 0 ? Math.round(data.duration / data.pv) : 0),
      pv: data.pv,
    })).sort((a, b) => b.pv - a.pv);

    // Search query aggregation
    const queryMap: Record<string, { count: number }> = {};
    filteredEvents.forEach((e: any) => {
      if (e.searchQuery) {
        const q = e.searchQuery.trim();
        if (!queryMap[q]) queryMap[q] = { count: 0 };
        queryMap[q].count += 1;
      }
    });

    const queriesList = Object.entries(queryMap).map(([query, data]) => ({
      query,
      count: data.count,
    })).sort((a, b) => b.count - a.count);

    return {
      sessions,
      users,
      pv,
      bounceRate,
      avgDuration: formatTime(avgDurationSec),
      pvPerSession,
      referrersList,
      queriesList,
    };
  }, [filteredEvents]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/kanri-kojikiroku" className="text-sm font-semibold text-blue-600 hover:underline">施工実績管理</Link>
              <span className="text-gray-300">|</span>
              <Link href="/kanri-oshirase" className="text-sm font-semibold text-blue-600 hover:underline">お知らせ管理</Link>
              <span className="text-gray-300">|</span>
              <span className="text-sm font-bold text-gray-900">アクセス解析</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">アクセス解析ダッシュボード</h1>
            <p className="text-sm text-gray-600">サイト訪問者の閲覧状況、滞在時間、流入元、検索クエリをリアルタイム集計します。</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">デバイス</label>
                <select value={deviceFilter} onChange={(e) => setDeviceFilter(e.target.value)} className="w-full rounded-md border border-gray-300 p-2 text-sm">
                  <option value="ALL">ALL (すべて)</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Tablet">Tablet</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">開始日</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-md border border-gray-300 p-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">終了日</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-md border border-gray-300 p-2 text-sm" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 mb-8">
          <Card><CardContent className="p-4 text-center"><p className="text-xs text-gray-500">セッション</p><p className="text-2xl font-bold text-blue-600">{metrics.sessions}</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-xs text-gray-500">ユーザー数</p><p className="text-2xl font-bold text-blue-600">{metrics.users}</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-xs text-gray-500">PV (ページビュー)</p><p className="text-2xl font-bold text-blue-600">{metrics.pv}</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-xs text-gray-500">直帰率</p><p className="text-2xl font-bold text-blue-600">{metrics.bounceRate}%</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-xs text-gray-500">平均滞在時間</p><p className="text-xl font-bold text-blue-600">{metrics.avgDuration}</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-xs text-gray-500">PV / セッション</p><p className="text-2xl font-bold text-blue-600">{metrics.pvPerSession}</p></CardContent></Card>
        </div>

        {/* Referrers Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle className="text-lg font-bold">流入元別URL</CardTitle></CardHeader>
            <CardContent>
              {isLoading ? <p>読み込み中...</p> : metrics.referrersList.length === 0 ? <p className="text-sm text-gray-500">データがありません</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b bg-gray-50 text-xs uppercase text-gray-700">
                      <tr>
                        <th className="p-2">流入元URL</th>
                        <th className="p-2">訪問数</th>
                        <th className="p-2">平均滞在時間</th>
                        <th className="p-2">PV数</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {metrics.referrersList.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="p-2 font-medium text-gray-900 break-all max-w-xs">{item.url}</td>
                          <td className="p-2 text-gray-600">{item.visits}</td>
                          <td className="p-2 text-gray-600">{item.avgDuration}</td>
                          <td className="p-2 text-gray-600">{item.pv}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Search Queries Table */}
          <Card>
            <CardHeader><CardTitle className="text-lg font-bold">検索クエリ</CardTitle></CardHeader>
            <CardContent>
              {isLoading ? <p>読み込み中...</p> : metrics.queriesList.length === 0 ? <p className="text-sm text-gray-500">検索クエリからの流入データはまだありません</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b bg-gray-50 text-xs uppercase text-gray-700">
                      <tr>
                        <th className="p-2">検索クエリ</th>
                        <th className="p-2">検出回数</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {metrics.queriesList.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="p-2 font-medium text-gray-900">{item.query}</td>
                          <td className="p-2 text-gray-600">{item.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
