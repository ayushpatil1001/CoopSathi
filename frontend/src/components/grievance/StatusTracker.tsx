import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, Building2, User, Phone, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { GrievanceRecord } from '../../types';
import { storageService } from '../../services/storageService';

interface StatusTrackerProps {
  initialRef?: string;
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({ initialRef }) => {
  const [refInput, setRefInput] = useState(initialRef || '');
  const [searchedRecord, setSearchedRecord] = useState<GrievanceRecord | null>(() => {
    return initialRef ? storageService.findGrievance(initialRef) || null : null;
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    const query = refInput.trim();
    if (!query) {
      setErrorMsg('Please enter a valid Reference Number.');
      return;
    }

    const found = storageService.findGrievance(query);
    if (found) {
      setSearchedRecord(found);
    } else {
      setErrorMsg(`No record found for "${query}". Try sample: COOP-2026-MH-84920 or PMFBY-2026-UP-41029`);
      setSearchedRecord(null);
    }
  };

  const handleQuickSample = (sampleRef: string) => {
    setRefInput(sampleRef);
    const found = storageService.findGrievance(sampleRef);
    if (found) {
      setSearchedRecord(found);
      setErrorMsg('');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-gov space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-black text-[#0A2540] flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <span>Track Your Grievance Status (तक्रार स्थिती ट्रॅक करा)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Enter your unique reference number generated upon complaint filing to view real-time stage progression and officer remarks.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={refInput}
            onChange={(e) => setRefInput(e.target.value)}
            placeholder="Enter Reference Number (e.g. COOP-2026-MH-84920)..."
            className="w-full bg-slate-100 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-blue-800 focus:bg-white transition"
          />
        </div>
        <button
          type="submit"
          className="bg-gov-blue-900 hover:bg-gov-blue-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition"
        >
          Track Status
        </button>
      </form>

      {/* Quick Demo Preloads */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-bold text-[11px]">Demo Reference IDs:</span>
        {['COOP-2026-MH-84920', 'PMFBY-2026-UP-41029', 'PACS-2026-MP-19382'].map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => handleQuickSample(sample)}
            className="bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-mono text-[11px] px-2.5 py-1 rounded-md border border-slate-200 transition"
          >
            {sample}
          </button>
        ))}
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Searched Record Display */}
      {searchedRecord && (
        <div className="space-y-6 pt-4 border-t border-slate-200 animate-fadeIn">
          {/* Header Card with Status Badge */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-gov-blue-900 bg-gov-blue-50 border border-gov-blue-200 px-2.5 py-0.5 rounded">
                  {searchedRecord.referenceNumber}
                </span>
                <span className="text-xs font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                  {searchedRecord.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0A2540] mt-2">
                {searchedRecord.subject}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Applicant: <strong>{searchedRecord.applicantName}</strong> • {searchedRecord.district}, {searchedRecord.state}
              </p>
            </div>

            {/* Status Pill */}
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Current State</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black mt-1 ${
                searchedRecord.status === 'Resolved'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : searchedRecord.status === 'Assigned to Authority'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                ● {searchedRecord.status}
              </span>
            </div>
          </div>

          {/* Assigned Authority */}
          <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-950">
              <Building2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Assigned Authority: </strong> {searchedRecord.assignedAuthority}
              </span>
            </div>
            <span className="text-[10px] text-amber-800 font-bold bg-white px-2 py-0.5 rounded border border-amber-200">
              Official Escalation
            </span>
          </div>

          {/* 4-Stage Animated Visual Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Grievance Lifecycle Progression
            </h4>
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {searchedRecord.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-xs ${
                    step.completed ? 'bg-emerald-600 ring-4 ring-emerald-100' : 'bg-slate-300'
                  }`}>
                    {step.completed ? '✓' : idx + 1}
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">
                        Stage {idx + 1}: {step.stage}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.remarks}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supporting Documents & Download Receipt */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-500">
              Supporting documents verified: {searchedRecord.supportingDocs.join(', ')}
            </div>
            <button
              onClick={() => alert(`Official Acknowledgment Receipt for ${searchedRecord.referenceNumber} downloaded.`)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-300 flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-gov-blue-800" />
              <span>Download Signed Receipt (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
