import React, { useState } from 'react';
import { 
  Users, MessageSquare, Globe, ShieldCheck, AlertTriangle, 
  TrendingUp, BarChart3, Database, Upload, CheckCircle2, 
  FileText, Clock, ChevronRight, Filter, Settings, ShieldAlert, Sparkles, RefreshCw
} from 'lucide-react';
import { MOCK_KNOWLEDGE_DOCUMENTS } from '../../data/mockKnowledgeBase';
import { KnowledgeDocument } from '../../types';
import { storageService } from '../../services/storageService';

export const AdminDashboard: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'dashboard' | 'analytics' | 'knowledge' | 'grievances' | 'settings'
  >('dashboard');

  const [documents, setDocuments] = useState<KnowledgeDocument[]>(MOCK_KNOWLEDGE_DOCUMENTS);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Cooperative Law');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const grievances = storageService.getGrievances();

  // Metrics specified in requirement
  const metrics = [
    { label: 'Total Users', value: '100,000+', change: '+14% this month', icon: Users, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { label: 'Monthly Conversations', value: '245,000', change: '+22% growth', icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { label: 'Regional Language Queries', value: '72%', change: 'Hindi & Marathi lead', icon: Globe, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { label: 'AI Resolution Rate', value: '85%', change: 'No escalation needed', icon: ShieldCheck, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { label: 'Escalations to Authority', value: '12%', change: 'Pending Ombudsman', icon: AlertTriangle, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  ];

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    setIsSimulatingUpload(true);
    setTimeout(() => {
      const newDoc: KnowledgeDocument = {
        id: 'DOC-CUSTOM-' + Math.floor(100 + Math.random() * 900),
        title: uploadTitle,
        category: uploadCategory,
        fileType: 'PDF',
        version: 'v1.0 Gazette',
        lastUpdated: new Date().toISOString().split('T')[0],
        isVerified: true,
        ragStatus: 'Live',
        totalChunks: 84,
        authority: 'Ministry of Cooperation, GoI',
      };
      setDocuments([newDoc, ...documents]);
      setUploadTitle('');
      setIsSimulatingUpload(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1200);
  };

  const toggleVerification = (id: string) => {
    setDocuments(docs =>
      docs.map(d => d.id === id ? { ...d, isVerified: !d.isVerified } : d)
    );
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-wider text-gov-blue-800">
                Official NCCT & Ministry Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight mt-1">
              CoopSathi AI – Central Administration & Governance
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>RAG Engine Online (v2.4)</span>
            </span>
          </div>
        </div>

        {/* Admin Navigation Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-8 border-b border-slate-200 text-xs font-bold">
          {[
            { id: 'dashboard', label: 'Dashboard Overview', icon: BarChart3 },
            { id: 'analytics', label: 'Chat & Language Analytics', icon: TrendingUp },
            { id: 'knowledge', label: 'Knowledge Base & RAG Indexer', icon: Database },
            { id: 'grievances', label: 'Grievance Redressal Queue', icon: MessageSquare },
            { id: 'settings', label: 'System Configuration', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
                  isActive
                    ? 'bg-gov-blue-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeAdminTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Real-Time Government Feeds & Telemetry Banner */}
            <div className="bg-gradient-to-r from-[#06182B] via-[#0A2540] to-[#0D3459] text-white rounded-3xl p-6 border border-white/20 shadow-gov-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Official Inter-Ministerial Real-Time Data Pipeline
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Live Government Portals Connected & Grounded
                </h2>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Direct data ingestion from <b>cooperation.gov.in</b>, <b>crcs.gov.in</b>, <b>pmfby.gov.in</b>, and <b>nabard.org</b>. Statutory gazette regulations and PMFBY actuarial rates update automatically without manual intervention.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-300">
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">79,630 PACS Mission</span>
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">₹2,925.39 Cr Outlay</span>
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">63,686 ERP Onboarded</span>
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">₹12,200 Cr PMFBY</span>
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">4% KCC Subvention</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 shrink-0">
                <button
                  onClick={async () => {
                    await fetch('/api/realtime/sync', { method: 'POST' });
                    alert('Real-time government data successfully re-synchronized with central servers!');
                  }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-white" />
                  <span>Re-Sync Government Feeds</span>
                </button>
                <span className="text-[10px] text-slate-400">Zero latency verified</span>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {metrics.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-gov flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-slate-500 font-semibold">{m.label}</span>
                      <div className={`p-2 rounded-xl border ${m.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <span className="text-2xl font-black text-[#0A2540]">{m.value}</span>
                      <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                        {m.change}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Daily User Activity Chart (SVG Dynamic Graphic) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-gov space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#0A2540]">
                      Daily User Activity & Conversation Trends
                    </h3>
                    <p className="text-[11px] text-slate-400">Past 14 Days Query Volume (in thousands)</p>
                  </div>
                  <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-lg font-bold text-slate-700">
                    Sept 2026 Peak
                  </span>
                </div>

                {/* SVG Visual Bar Chart */}
                <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2">
                  {[
                    { day: 'D1', val: 55 },
                    { day: 'D2', val: 62 },
                    { day: 'D3', val: 78 },
                    { day: 'D4', val: 72 },
                    { day: 'D5', val: 89 },
                    { day: 'D6', val: 94 },
                    { day: 'D7', val: 84 },
                    { day: 'D8', val: 98 },
                    { day: 'D9', val: 112 },
                    { day: 'D10', val: 125 },
                    { day: 'D11', val: 130 },
                    { day: 'D12', val: 142 },
                    { day: 'D13', val: 138 },
                    { day: 'D14', val: 155 },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                      <div className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition">
                        {item.val}k
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-gov-blue-900 to-gov-blue-600 rounded-t-md hover:to-amber-500 transition-all cursor-pointer"
                        style={{ height: `${(item.val / 160) * 100}%` }}
                      ></div>
                      <span className="text-[10px] text-slate-500 font-semibold">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regional Language Breakdown Donut */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-gov space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-[#0A2540]">
                    Regional Language Distribution
                  </h3>
                  <p className="text-[11px] text-slate-400">72% Non-English Inquiries</p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { lang: 'हिन्दी (Hindi)', share: 38, color: 'bg-amber-500' },
                    { lang: 'मराठी (Marathi)', share: 24, color: 'bg-emerald-600' },
                    { lang: 'English', share: 28, color: 'bg-gov-blue-900' },
                    { lang: 'தமிழ் (Tamil)', share: 5, color: 'bg-sky-500' },
                    { lang: 'తెలుగు / বাংলা (Other)', share: 5, color: 'bg-purple-500' },
                  ].map((l, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{l.lang}</span>
                        <span className="font-bold text-slate-900">{l.share}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`${l.color} h-full rounded-full`} style={{ width: `${l.share}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Most Asked Topics & Scheme Interest Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Most Asked Topics */}
              <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-gov space-y-4">
                <h3 className="text-sm font-bold text-[#0A2540]">
                  Most Frequently Queried Topics
                </h3>
                <div className="space-y-3">
                  {[
                    { topic: 'PMFBY 72-Hour Claim Filing & Flood Damage', count: '48,290 queries', pct: 88 },
                    { topic: 'Active Membership & Voting Rights (MSCS Act 2023)', count: '39,120 queries', pct: 72 },
                    { topic: 'PACS Fertilizer Availability & Nano Urea Allotment', count: '31,450 queries', pct: 58 },
                    { topic: 'Kisan Credit Card (KCC) 4% Prompt Repayment', count: '28,100 queries', pct: 52 },
                    { topic: 'Grievance Filing against Society Management', count: '19,400 queries', pct: 36 },
                  ].map((t, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{t.topic}</span>
                        <span className="text-slate-500 font-semibold">{t.count}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gov-blue-800 h-full rounded-full" style={{ width: `${t.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RAG Processing Pipeline Status as requested in specs */}
              <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-gov space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-[#0A2540]">
                    RAG Knowledge Ingestion Pipeline
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Operational
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  Visual representation of the automated pipeline when new Ministry circulars or by-laws are uploaded:
                </p>

                {/* 5-step RAG Pipeline Graphic */}
                <div className="space-y-3 pt-2 text-xs">
                  {[
                    { stage: '1. Document Uploaded', desc: 'Gazette PDF / Model By-law ingested via Admin console', status: 'Complete', color: 'border-blue-500 bg-blue-50 text-blue-900' },
                    { stage: '2. Text Extracted', desc: 'OCR & multilingual table parsing for Devanagari/Tamil scripts', status: 'Complete', color: 'border-amber-500 bg-amber-50 text-amber-900' },
                    { stage: '3. Vector Indexed', desc: 'Chunked and converted to 1536-dim semantic embeddings', status: 'Complete', color: 'border-purple-500 bg-purple-50 text-purple-900' },
                    { stage: '4. Legal Verification', desc: 'Tagged with Gazette notification ID and issuing Ministry', status: 'Complete', color: 'border-emerald-500 bg-emerald-50 text-emerald-900' },
                    { stage: '5. Available to AI', desc: 'Retrieved instantly with citation badges in citizen chats', status: 'Live Serving', color: 'border-gov-blue-800 bg-gov-blue-50 text-gov-blue-950' },
                  ].map((p, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border-l-4 shadow-2xs flex items-center justify-between ${p.color}`}>
                      <div>
                        <span className="font-bold block">{p.stage}</span>
                        <span className="text-[11px] opacity-80">{p.desc}</span>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white border border-slate-200 shadow-2xs">
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KNOWLEDGE BASE & RAG MANAGEMENT */}
        {activeAdminTab === 'knowledge' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Upload New Document Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-gov space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
                  <Upload className="w-5 h-5 text-amber-500" />
                  <span>Upload Statutory Document / Cooperative By-Law</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload newly published Gazette notifications, NCCT training curricula, or PMFBY circulars to be instantly indexed by CoopSathi AI.
                </p>
              </div>

              {uploadSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-bold flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Document parsed, chunked, and deployed to vector knowledge base!</span>
                </div>
              )}

              <form onSubmit={handleUploadDocument} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-6 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Document Title & Gazette Number:</label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Multi-State Co-op Societies Rules 2026 GSR 104(E)..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                    required
                  />
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category:</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                  >
                    <option value="Cooperative Law">Cooperative Law</option>
                    <option value="PACS Governance">PACS Governance</option>
                    <option value="Crop Insurance">Crop Insurance</option>
                    <option value="Training Modules">Training Modules</option>
                    <option value="Credit & Schemes">Credit & Schemes</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    disabled={isSimulatingUpload}
                    className="w-full bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition disabled:opacity-50"
                  >
                    {isSimulatingUpload ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Indexing Chunks...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload & Index Document</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Document Version & Verification Table */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-gov space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-[#0A2540]">
                  Active Statutory Knowledge Documents ({documents.length})
                </h3>
                <span className="text-xs text-slate-400">Synced with Central RAG Repository</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Document Title</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Version</th>
                      <th className="py-2.5 px-3">Chunks</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{doc.title}</div>
                          <div className="text-[10px] text-slate-400">{doc.authority}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-medium">{doc.category}</td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{doc.version}</td>
                        <td className="py-3 px-3 font-bold text-slate-700">{doc.totalChunks} chunks</td>
                        <td className="py-3 px-3">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                            ● {doc.ragStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => toggleVerification(doc.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                              doc.isVerified
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-500 border border-slate-300'
                            }`}
                          >
                            <ShieldCheck className={`w-3.5 h-3.5 ${doc.isVerified ? 'text-emerald-600' : 'text-slate-400'}`} />
                            <span>{doc.isVerified ? 'Verified' : 'Unverified'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GRIEVANCE QUEUE */}
        {activeAdminTab === 'grievances' && (
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-gov space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0A2540]">
                  Grievance & Escalation Triage Console
                </h3>
                <p className="text-xs text-slate-500">Live complaints submitted through portal and WhatsApp bot.</p>
              </div>
              <span className="text-xs font-bold bg-rose-50 text-rose-800 px-2.5 py-1 rounded-lg border border-rose-200">
                {grievances.length} Registered Cases
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {grievances.map((g) => (
                <div key={g.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-gov-blue-900 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                      {g.referenceNumber}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      g.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      ● {g.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{g.subject}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{g.description}</p>
                  
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Applicant: {g.applicantName} ({g.district}, {g.state})</span>
                    <span>Assigned: {g.assignedAuthority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CHAT & LANGUAGE ANALYTICS */}
        {activeAdminTab === 'analytics' && (
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-gov text-center space-y-4 animate-fadeIn">
            <TrendingUp className="w-10 h-10 text-gov-blue-800 mx-auto" />
            <h3 className="text-lg font-bold text-[#0A2540]">
              Regional Language & Rural Dialect Heatmap
            </h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Live sentiment, intent accuracy, and voice dialect comprehension analytics across 28 states and Union Territories.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-4 text-xs font-bold">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xl font-black text-gov-blue-900">96.8%</div>
                <div className="text-slate-500 text-[10px] mt-1">Intent Recognition</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xl font-black text-emerald-700">1.2s</div>
                <div className="text-slate-500 text-[10px] mt-1">Avg RAG Latency</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xl font-black text-amber-700">99.4%</div>
                <div className="text-slate-500 text-[10px] mt-1">Zero Hallucination Score</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM CONFIGURATION */}
        {activeAdminTab === 'settings' && (
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-gov space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-[#0A2540]">
              System & Security Configuration
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold block text-slate-900">Enforce Strict Statutory Grounding</span>
                  <span className="text-slate-500">Refuse generation if RAG similarity score is below 0.82</span>
                </div>
                <span className="text-xs font-bold text-emerald-700">Enabled</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold block text-slate-900">Automated Grievance Escalation</span>
                  <span className="text-slate-500">Auto-notify District Registrar if grievance is unreviewed for 7 days</span>
                </div>
                <span className="text-xs font-bold text-emerald-700">Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
