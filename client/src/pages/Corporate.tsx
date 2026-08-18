import { Link } from 'wouter';
import { Building2, FileText, ShieldCheck, CheckCircle2, Phone, Mail, Award, Landmark, ArrowRight } from 'lucide-react';

export default function Corporate() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Hero Section - Hardcore & Professional Dark Theme */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white py-24 px-4 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-600/40 text-blue-400 text-xs font-semibold tracking-wider px-3.5 py-1.5 rounded uppercase mb-6 shadow-inner">
            <Landmark size={14} />
            B2B / 官公庁・法人様向けサービス
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white">
            公共工事の申請設計から<br className="hidden md:inline" />
            ビル・学校等の給排水設備工事まで
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            株式会社堺設備は、静岡市を中心に学校等の公共施設や商業施設・マンション等の給排水設備工事、水道申請・設計業務に対応いたします。確かな技術と法令遵守（コンプライアンス）を徹底し、法人のお客様のインフラ維持を支えます。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-20 space-y-24">
        
        {/* Core Strengths */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              法人・公共工事における特長
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/80 p-8 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <FileText size={22} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white tracking-wide">学校等の公共工事・申請設計</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-light">
                学校施設や自治体関連建築物における給排水設備の設計図書作成および、関係行政機関への許認可申請業務を確実におこないます。
              </p>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Building2 size={22} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white tracking-wide">ビル・商業施設・マンション</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-light">
                中大規模ビル、アパート、店舗等の給排水管引き込み、貯水槽周りの修繕、大規模改修に伴う設備配管工事をワンストップで施工します。
              </p>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Award size={22} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white tracking-wide">有資格者による厳格な施工</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-light">
                給水装置工事主任技術者等の専門資格を有するプロフェッショナルが在籍し、安全基準と品質管理を徹底して工事を実施します。
              </p>
            </div>
          </div>
        </section>

        {/* Scope of Services Table / Grid */}
        <section className="bg-slate-900/60 p-8 md:p-12 rounded-2xl border border-slate-800">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">対応可能な法人・官公庁向け業務範囲</h2>
            <p className="text-slate-400 text-sm">設計から施工、メンテナンスまで一貫して対応いたします。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
              <div className="text-blue-500 mt-1 flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1.5 text-sm tracking-wide">公共施設・学校の給排水設備設計</h4>
                <p className="text-slate-400 text-xs leading-relaxed">学校や官公庁施設の水道設備、配管図面の作成および自治体への申請手続き。</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
              <div className="text-blue-500 mt-1 flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1.5 text-sm tracking-wide">テナント・商業施設の配管工事</h4>
                <p className="text-slate-400 text-xs leading-relaxed">飲食店や事務所等の新規出店・改装に伴う給水・排水管の引き込みおよび接続工事。</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
              <div className="text-blue-500 mt-1 flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1.5 text-sm tracking-wide">マンション・ビル定期メンテナンス</h4>
                <p className="text-slate-400 text-xs leading-relaxed">共用部の水漏れ修理、排水管の高圧洗浄、貯水槽まわりの点検・修理対応。</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
              <div className="text-blue-500 mt-1 flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1.5 text-sm tracking-wide">漏水調査・緊急トラブル修繕</h4>
                <p className="text-slate-400 text-xs leading-relaxed">ビルや敷地内での原因不明の水道メーター回転（漏水）の調査・迅速な修繕工事。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              お取引の流れ
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 relative">
              <div className="text-xs font-mono text-blue-400 mb-2">STEP 01</div>
              <h4 className="font-bold text-white mb-2 text-base">お問い合わせ・ご相談</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">図面データ、仕様書、または現地状況をお電話・Webフォームよりお知らせください。</p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 relative">
              <div className="text-xs font-mono text-blue-400 mb-2">STEP 02</div>
              <h4 className="font-bold text-white mb-2 text-base">現地調査・お見積り</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">専門スタッフによる現地確認および図面精査の上、適正なお見積書をご提示します。</p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 relative">
              <div className="text-xs font-mono text-blue-400 mb-2">STEP 03</div>
              <h4 className="font-bold text-white mb-2 text-base">ご契約・施工実施</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">工程管理・安全管理を徹底し、熟練の技術者が確実な施工を遂行します。</p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 relative">
              <div className="text-xs font-mono text-blue-400 mb-2">STEP 04</div>
              <h4 className="font-bold text-white mb-2 text-base">検査・お引き渡し</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">官公庁検査の立ち会いや完了確認を経て、安心のアフターフォローとともに引き渡し。</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border border-blue-900/50 p-10 md:p-14 rounded-2xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">法人様・官公庁様からのご相談・お見積り</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed font-light">
            公共工事の申請設計、ビル・学校等の給排水設備工事に関するお見積りやご質問は、下記よりお気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a
              href="tel:0543482286"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm shadow-lg shadow-blue-950/50"
            >
              <Phone size={18} />
              <span>054-348-2286へ電話する</span>
            </a>
            <Link
              href="/#contact"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm border border-slate-700"
            >
              <Mail size={18} />
              <span>Webからお問い合わせ</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
