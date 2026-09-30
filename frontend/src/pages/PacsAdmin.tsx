import React from 'react';
import { Users, Tractor, Droplet, FileText, IndianRupee, Bell, ArrowUpRight, TrendingUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';

export default function PacsAdmin() {
  const stats = [
    { label: 'Active Members', value: '1,245', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'KCC Loans Disbursed', value: ',8.4 Cr', icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Fertilizer Stock (Bags)', value: '450', icon: Droplet, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Applications', value: '12', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 min-h-screen bg-slate-50">
      <SEOHead {...SEO_PAGES.home} title="PACS Admin Console | CoopSathi AI" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            PACS Secretary Portal
          </div>
          <h1 className="text-2xl font-bold text-ink-900">Shri Ram Krishi PACS, Pune</h1>
          <p className="text-sm text-ink-500">Multipurpose Rural Service Center Dashboard</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-50">
            <Bell className="w-4 h-4" />
            Notifications (3)
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0A2540] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-[#134A7B] transition">
            <ArrowUpRight className="w-4 h-4" />
            Process New Loan
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Activity & Services */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Recent Member Applications</h2>
              <button className="text-sm text-blue-600 font-semibold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-3 font-medium">Member Name</th>
                    <th className="pb-3 font-medium">Service Type</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Ramesh Patil', service: 'KCC Loan Renewal', date: 'Today, 10:30 AM', status: 'Pending', statusColor: 'bg-amber-100 text-amber-700' },
                    { name: 'Sunita Deshmukh', service: 'Fertilizer Subsidy', date: 'Yesterday', status: 'Approved', statusColor: 'bg-emerald-100 text-emerald-700' },
                    { name: 'Vijay Kumar', service: 'Tractor Rental (Custom Hiring)', date: 'Sep 28, 2026', status: 'Active', statusColor: 'bg-blue-100 text-blue-700' },
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-4 font-medium text-slate-900">{row.name}</td>
                      <td className="py-4 text-slate-600">{row.service}</td>
                      <td className="py-4 text-slate-500 text-xs">{row.date}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.statusColor}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Inventory & Services Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-100 rounded-lg bg-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg"><Droplet className="w-5 h-5 text-emerald-700" /></div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Nano Urea Stock</h4>
                    <p className="text-xs text-slate-500">Sufficient for Rabi season</p>
                  </div>
                </div>
                <span className="text-emerald-600 font-bold">120 L</span>
              </div>
              <div className="p-4 border border-slate-100 rounded-lg bg-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg"><Tractor className="w-5 h-5 text-amber-700" /></div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Harvester Availability</h4>
                    <p className="text-xs text-slate-500">Currently deployed</p>
                  </div>
                </div>
                <span className="text-amber-600 font-bold">0 / 2</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI Assistant & Reminders */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#134A7B] rounded-xl shadow-md p-6 text-white">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              CoopSathi AI Agent
            </h2>
            <p className="text-sm text-slate-300 mb-4">Your AI assistant is ready to help generate ledger reports, check scheme eligibility, or draft notices.</p>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                "Identify members eligible for PMFBY renewal"
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                "Draft AGM meeting notice in Marathi"
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Compliance Tasks</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-rose-500"></div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Upload Monthly Audit</p>
                  <p className="text-xs text-slate-500">Due in 2 days</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-amber-500"></div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Verify 12 KCC Renewals</p>
                  <p className="text-xs text-slate-500">Due in 5 days</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

const Sparkles = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
  </svg>
);
