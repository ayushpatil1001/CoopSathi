import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldCheck, CheckCircle2, Globe, ExternalLink, Activity, Info, X } from 'lucide-react';
import { apiService, RealTimeGovSummary } from '../../services/apiService';

interface RealTimeGovSyncBarProps {
  onSyncComplete?: () => void;
}

export const RealTimeGovSyncBar: React.FC<RealTimeGovSyncBarProps> = ({ onSyncComplete }) => {
  const [summary, setSummary] = useState<RealTimeGovSummary | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchSummary = async () => {
    const data = await apiService.getRealTimeSummary();
    if (data) {
      setSummary(data);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    const result = await apiService.syncRealTimeGovData();
    if (result) {
      await fetchSummary();
      setToastMessage('Real-time government data successfully refreshed!');
      setTimeout(() => setToastMessage(null), 3500);
      onSyncComplete?.();
    }
    setIsSyncing(false);
  };

  return (
    <>
      {/* Top Sync Ribbon */}
      <div className="bg-[#051829] text-white border-b border-gov-blue-800 text-[11px] py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Live Indicator & Sources */}
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>

            <span className="font-bold text-emerald-300 flex items-center gap-1">
              <span>Live Government Data Connected:</span>
            </span>

            <span className="text-slate-300 hidden md:inline">
              Ministry of Cooperation • PMFBY • CRCS • NABARD • NCCT
            </span>

            {summary && (
              <span className="text-slate-400 font-mono text-[10px] hidden sm:inline">
                (Last sync: {new Date(summary.lastSynced).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })})
              </span>
            )}
          </div>

          {/* Right: Portal Modal Trigger & Manual Sync Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPortalModal(true)}
              className="text-amber-300 hover:text-white flex items-center gap-1 font-semibold underline underline-offset-2 transition"
            >
              <Info className="w-3 h-3" />
              <span>View Data Portals</span>
            </button>

            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="bg-gov-blue-800 hover:bg-gov-blue-700 text-white px-2.5 py-0.5 rounded-md font-bold flex items-center gap-1 border border-gov-blue-700 transition disabled:opacity-50"
              title="Click to sync live data from official Government of India endpoints"
            >
              <RefreshCw className={`w-3 h-3 text-amber-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Gov Data'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 right-6 z-50 bg-emerald-900 text-white border-2 border-emerald-400 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Official Portals Modal */}
      {showPortalModal && summary && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp text-slate-800">
            <div className="bg-[#0A2540] text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Official Government Real-Time Feeds
                  </h3>
                  <p className="text-[11px] text-amber-300 font-medium">
                    Verified Digital Public Infrastructure
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPortalModal(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs max-h-[70vh] overflow-y-auto">
              <p className="text-slate-600 leading-relaxed">
                CoopSathi AI synchronizes with authentic regulatory registries, gazettes, and mission dashboards published by the Government of India:
              </p>

              <div className="space-y-2">
                {summary.officialPortalsConnected.map((portal, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{portal}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>

              {/* Real-Time Live Metrics Matrix */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-700 uppercase tracking-wider block text-[10px]">
                  Real-Time Verified Figures (2025–2026 Parliamentary Reports)
                </span>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-amber-50 p-2 rounded-lg border border-amber-200">
                    <span className="font-black text-amber-900 block">{summary.metrics.pacsOutlayBudget}</span>
                    <span className="text-[10px] text-amber-800">PACS Modernization Outlay</span>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <span className="font-black text-emerald-900 block">{summary.metrics.pacsOnboardedToERP}</span>
                    <span className="text-[10px] text-emerald-800">Onboarded to Cloud ERP</span>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                    <span className="font-black text-blue-900 block">{summary.metrics.digitalTransactionsRecorded}</span>
                    <span className="text-[10px] text-blue-800">Digital e-PACS Txns</span>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-lg border border-purple-200">
                    <span className="font-black text-purple-900 block">{summary.metrics.pmfbyAnnualBudget}</span>
                    <span className="text-[10px] text-purple-800">PMFBY FY26 Budget</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowPortalModal(false)}
                className="bg-gov-blue-900 text-white font-bold py-2 px-5 rounded-xl text-xs hover:bg-gov-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
