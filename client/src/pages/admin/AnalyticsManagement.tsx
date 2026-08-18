import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function AnalyticsManagement() {
  const [deviceFilter, setDeviceFilter] = useState("ALL");
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 90);
    return date.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));
  const { data: events = [], isLoading } = trpc.analytics.getAll.useQuery();

  const filteredEvents = useMemo(() => events.filter((event: any) => {
    if (deviceFilter !== "ALL" && event.device !== deviceFilter) return false;
    const eventDate = new Date(event.createdAt).toISOString().split("T")[0];
    return (!startDate || eventDate >= startDate) && (!endDate || eventDate <= endDate);
  }), [events, deviceFilter, startDate, endDate]);

  const metrics = useMemo(() => {
    const pageViews = filteredEvents.filter((event: any) => event.eventType === "page_view");
    const exits = filteredEvents.filter((event: any) => event.eventType === "page_exit");
    const conversions = filteredEvents.filter((event: any) => !["page_view", "page_exit"].includes(event.eventType));
    const sessions = new Set(pageViews.map((event: any) => event.sessionId)).size;
    const pv = pageViews.length;
    const bouncedSessions = new Set(exits.filter((event: any) => event.isBounce === 1).map((event: any) => event.sessionId)).size;
    const totalDuration = exits.reduce((total: number, event: any) => total + (event.durationSeconds || 0), 0);
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainder = seconds % 60;
      return `00:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
    };

    const referrerMap: Record<string, { pv: number; duration: number }> = {};
    pageViews.forEach((event: any) => {
      const referrer = event.referrer?.trim() || "Direct";
      if (!referrerMap[referrer]) referrerMap[referrer] = { pv: 0, duration: 0 };
      referrerMap[referrer].pv += 1;
    });
    exits.forEach((event: any) => {
      const referrer = event.referrer?.trim() || "Direct";
      if (!referrerMap[referrer]) referrerMap[referrer] = { pv: 0, duration: 0 };
      referrerMap[referrer].duration += event.durationSeconds || 0;
    });

    const queryMap: Record<string, number> = {};
    pageViews.forEach((event: any) => {
      if (event.searchQuery?.trim()) queryMap[event.searchQuery.trim()] = (queryMap[event.searchQuery.trim()] || 0) + 1;
    });

    const conversionMap: Record<string, number> = {};
    conversions.forEach((event: any) => {
      const label = event.eventLabel || event.eventType;
      conversionMap[label] = (conversionMap[label] || 0) + 1;
    });

    return {
      sessions,
      users: sessions,
      pv,
      conversionCount: conversions.length,
      conversionRate: sessions ? ((conversions.length / sessions) * 100).toFixed(2) : "0.00",
      bounceRate: sessions ? ((bouncedSessions / sessions) * 100).toFixed(2) : "0.00",
      averageDuration: formatTime(sessions ? Math.round(totalDuration / sessions) : 0),
      pvPerSession: sessions ? (pv / sessions).toFixed(3) : "0.000",
      referrers: Object.entries(referrerMap).map(([url, data]) => ({
        url,
        pv: data.pv,
        visits: data.pv,
        averageDuration: formatTime(data.pv ? Math.round(data.duration / data.pv) : 0),
      })).sort((a, b) => b.pv - a.pv),
      queries: Object.entries(queryMap).map(([query, count]) => ({ query, count })).sort((a, b) => b.count - a.count),
      conversions: Object.entries(conversionMap).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count),
    };
  }, [filteredEvents]);

  const metricCards = [
    ["コンバージョン数", metrics.conversionCount],
    ["コンバージョン率", `${metrics.conversionRate}%`],
    ["セッション", metrics.sessions],
    ["ユーザー数", metrics.users],
    ["PV", metrics.pv],
    ["直帰率", `${metrics.bounceRate}%`],
    ["平均滞在時間", metrics.averageDuration],
    ["PV / セッション", metrics.pvPerSession],
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <Link href="/kanri-kojikiroku" className="text-blue-600 hover:underline">施工実績管理</Link><span className="text-gray-300">|</span>
            <Link href="/kanri-oshirase" className="text-blue-600 hover:underline">お知らせ管理</Link><span className="text-gray-300">|</span>
            <span className="text-gray-900">アクセス解析</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">アクセス解析ダッシュボード</h1>
          <p className="mt-2 text-sm text-gray-600">閲覧状況に加え、電話・お問い合わせ・求人応募への導線別成果を集計します。</p>
        </header>

        <Card className="mb-8">
          <CardContent className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
            <div><label className="mb-1 block text-sm font-medium text-gray-700">デバイス</label><select value={deviceFilter} onChange={(event) => setDeviceFilter(event.target.value)} className="w-full rounded-md border border-gray-300 p-2 text-sm"><option value="ALL">ALL（すべて）</option><option value="Desktop">Desktop</option><option value="Mobile">Mobile</option><option value="Tablet">Tablet</option></select></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">開始日</label><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="w-full rounded-md border border-gray-300 p-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">終了日</label><input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="w-full rounded-md border border-gray-300 p-2 text-sm" /></div>
          </CardContent>
        </Card>

        <section className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {metricCards.map(([label, value]) => <Card key={String(label)}><CardContent className="p-4 text-center"><p className="text-xs text-gray-500">{label}</p><p className="mt-1 text-xl font-bold text-blue-600">{value}</p></CardContent></Card>)}
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-lg font-bold">コンバージョン導線</CardTitle></CardHeader>
            <CardContent>{isLoading ? <p>読み込み中...</p> : metrics.conversions.length === 0 ? <p className="text-sm text-gray-500">電話・お問い合わせ・求人応募などの成果データはまだありません。</p> : <DataTable headings={["導線", "成果数"]} rows={metrics.conversions.map((item) => [item.label, item.count])} />}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg font-bold">流入元別URL</CardTitle></CardHeader>
            <CardContent>{isLoading ? <p>読み込み中...</p> : metrics.referrers.length === 0 ? <p className="text-sm text-gray-500">データがありません。</p> : <DataTable headings={["流入元URL", "訪問数", "平均滞在時間", "PV数"]} rows={metrics.referrers.map((item) => [item.url, item.visits, item.averageDuration, item.pv])} />}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg font-bold">検索クエリ</CardTitle></CardHeader>
            <CardContent>{isLoading ? <p>読み込み中...</p> : metrics.queries.length === 0 ? <p className="text-sm text-gray-500">検索クエリからの流入データはまだありません。</p> : <DataTable headings={["検索クエリ", "検出回数"]} rows={metrics.queries.map((item) => [item.query, item.count])} />}</CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

function DataTable({ headings, rows }: { headings: string[]; rows: Array<Array<string | number>> }) {
  return <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b bg-gray-50 text-xs uppercase text-gray-700"><tr>{headings.map((heading) => <th key={heading} className="p-2">{heading}</th>)}</tr></thead><tbody className="divide-y">{rows.map((row, rowIndex) => <tr key={rowIndex} className="hover:bg-gray-50">{row.map((cell, cellIndex) => <td key={cellIndex} className={`p-2 text-gray-700 ${cellIndex === 0 ? "max-w-xs break-all font-medium text-gray-900" : ""}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
