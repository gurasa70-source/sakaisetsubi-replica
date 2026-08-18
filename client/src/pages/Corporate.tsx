import { Link } from 'wouter';
import { FileText, CheckCircle2, Phone, Mail, Award, Landmark, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function Corporate() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white py-24 px-4 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-600/40 text-blue-400 text-xs font-semibold tracking-wider px-3.5 py-1.5 rounded uppercase mb-6 shadow-inner">
            <Landmark size={14} />
            設計・申請専門サービス
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white">
            公共工事・学校等の給排水設備<br className="hidden md:inline" />
            設計図書作成および水道申請業務
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            株式会社堺設備は、静岡市を中心に学校施設や官公庁舎等の給排水衛生設備における設計業務および自治体への各種水道申請手続きを専門的に手掛けております。豊富な経験と正確な法規適合により、確実な設計図書をご提供します。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-20 space-y-24">
        
        {/* Visual / Image Section */}
        <section className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[300px] lg:min-h-[400px]">
              <img
                src="/manus-storage/cad_designer_back_05e6d8cf.png"
                alt="配管・給排水設備の設計図書作成風景"
                className="absolute inset-0 w-full h-full object-cover filter brightness-90"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono tracking-wider uppercase">
                <Layers size={16} />
                Expertise & Precision
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                厳格な基準が求められる公共建築の設計・申請
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                学校や公共施設では、衛生管理基準や自治体の詳細な施工指針に基づいた高度な給排水設備の設計図書が不可欠です。当社では給水装置工事主任技術者等の有資格者が、CADを用いた詳細な図面作成から複雑な水道申請手続きまでを一貫して遂行します。
              </p>
            </div>
          </div>
        </section>

        {/* Core Strengths */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              設計・申請業務の特長
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/80 p-8 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <FileText size={22} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white tracking-wide">学校等の公共工事の申請設計</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-light">
                学校や官公庁施設の新築・改修に伴う給排水衛生設備の設計図書作成、および自治体への各種許認可申請を正確に行います。
              </p>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <BookOpen size={22} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white tracking-wide">複雑な水道申請・図面作成</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-light">
                給水管の引き込みや配管経路の法規適合チェック、行政協議に必要な書類一式の作成など、専門的な申請業務を代行します。
              </p>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Award size={22} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white tracking-wide">有資格者による確実な対応</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-light">
                豊富な実務経験と国家資格を持つ技術者が在籍。安全基準と自治体ごとのローカルルールを熟知した設計を提供します。
              </p>
            </div>
          </div>
        </section>

        {/* Scope of Services Table / Grid */}
        <section className="bg-slate-900/60 p-8 md:p-12 rounded-2xl border border-slate-800">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">対応可能な設計・申請業務範囲</h2>
            <p className="text-slate-400 text-sm">官公庁・学校施設から大規模建築物まで対応いたします。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
              <div className="text-blue-500 mt-1 flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1.5 text-sm tracking-wide">学校・公共施設の給排水設備設計</h4>
                <p className="text-slate-400 text-xs leading-relaxed">校舎や公共建築における給水・排水・通気設備の図面作成および詳細設計。</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
              <div className="text-blue-500 mt-1 flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1.5 text-sm tracking-wide">自治体への水道申請・許認可手続き</h4>
                <p className="text-slate-400 text-xs leading-relaxed">水道局等の関係行政機関への給水装置工事申込書および設計審査書類の提出・協議。</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
              <div className="text-blue-500 mt-1 flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1.5 text-sm tracking-wide">ビル・商業施設の配管経路設計</h4>
                <p className="text-slate-400 text-xs leading-relaxed">中大規模建築物における効率的かつ安全な給排水ルートの設計と図面化。</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
              <div className="text-blue-500 mt-1 flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1.5 text-sm tracking-wide">設計図書に基づく施工監理サポート</h4>
                <p className="text-slate-400 text-xs leading-relaxed">作成した設計意図が現場に正確に反映されるための技術的サポートおよび整合性確認。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              設計・申請の流れ
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 relative">
              <div className="text-xs font-mono text-blue-400 mb-2">STEP 01</div>
              <h4 className="font-bold text-white mb-2 text-base">ヒアリング・資料確認</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">建築図面や敷地条件、ご要望の仕様を詳細に確認いたします。</p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 relative">
              <div className="text-xs font-mono text-blue-400 mb-2">STEP 02</div>
              <h4 className="font-bold text-white mb-2 text-base">設計図書の作成</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">法規に適合した給排水衛生設備の図面および仕様書を作成します。</p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 relative">
              <div className="text-xs font-mono text-blue-400 mb-2">STEP 03</div>
              <h4 className="font-bold text-white mb-2 text-base">行政協議・申請手続き</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">自治体や水道局との折衝および各種申請書類の提出を代行します。</p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 relative">
              <div className="text-xs font-mono text-blue-400 mb-2">STEP 04</div>
              <h4 className="font-bold text-white mb-2 text-base">完了・図書お引き渡し</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">認可完了後の申請書類および確定図書一式をお納めします。</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border border-blue-900/50 p-10 md:p-14 rounded-2xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">設計・申請に関するご相談・お見積り</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed font-light">
            学校等の公共工事における給排水設備設計や、複雑な水道申請手続きについてお気軽にご相談ください。<br />
            設計部直通 FAX：054-348-2288 ／ メール：sakai-sekkei@ace.ocn.ne.jp
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a
              href="tel:0543482286"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm shadow-lg shadow-blue-950/50"
            >
              <Phone size={18} />
              <span>054-348-2286へ電話する</span>
            </a>
            <a
              href="mailto:sakai-sekkei@ace.ocn.ne.jp"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm border border-slate-700"
            >
              <Mail size={18} />
              <span>sakai-sekkei@ace.ocn.ne.jpへメール</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
