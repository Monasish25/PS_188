import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  FileCheck,
  Download,
  Eye,
  EyeOff,
  Lock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { AuditLogEntry, RiskLevel, VerificationResult } from '../types';

interface AuditRegistryProps {
  logs: AuditLogEntry[];
  onSelectLog: (logId: string) => void;
  redactPii: boolean;
  onToggleRedactPii: () => void;
}

export const AuditRegistry: React.FC<AuditRegistryProps> = ({
  logs,
  onSelectLog,
  redactPii,
  onToggleRedactPii,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'ALL' | RiskLevel>('ALL');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.documentType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk =
      selectedRiskFilter === 'ALL' || log.riskLevel === selectedRiskFilter;
    return matchesSearch && matchesRisk;
  });

  const totalCount = logs.length;
  const highRiskCount = logs.filter((l) => l.riskLevel === 'HIGH').length;
  const passCount = logs.filter((l) => l.verdict === 'PASS').length;
  const passRate = totalCount > 0 ? Math.round((passCount / totalCount) * 100) : 100;

  const handleExportCsv = () => {
    const headers = ['Inspection_ID', 'Timestamp', 'Document_Type', 'Applicant', 'Risk_Level', 'Verdict', 'Tampering_Detected', 'SHA256_Hash'];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      l.documentType,
      redactPii ? 'REDACTED_PII' : l.applicantName,
      l.riskLevel,
      l.verdict,
      l.tamperingDetected ? 'YES' : 'NO',
      l.sha256Hash,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TrustID_Audit_Trail_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Stats Overview */}
      <div className="bg-white border border-orange-200/90 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#E45D24]" />
              <span className="text-3xs font-mono font-bold uppercase tracking-wider text-[#E45D24] bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                Compliance Registry
              </span>
              <span className="text-3xs text-slate-500 font-mono">
                Immutable Chain of Custody
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 tracking-tight">
              Verification Audit Trail &amp; Document Screening Log
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Every document screened is cryptographically fingerprinted with SHA-256 and recorded with timestamp, risk score, and tamper findings.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* PII Redaction toggle */}
            <button
              type="button"
              onClick={onToggleRedactPii}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1.5 border cursor-pointer ${
                redactPii
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              {redactPii ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{redactPii ? 'PII Masking Active' : 'Mask Sensitive PII'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-lg bg-[#172554] hover:bg-[#1e3a8a] text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="bg-[#FFFDF9] p-4 rounded-xl border border-orange-200/80 space-y-1">
            <span className="text-3xs uppercase font-mono text-slate-500">Total Ingested</span>
            <div className="text-2xl font-mono font-bold text-slate-900">{totalCount}</div>
            <span className="text-3xs text-slate-500">Document Records</span>
          </div>

          <div className="bg-[#FFFDF9] p-4 rounded-xl border border-orange-200/80 space-y-1">
            <span className="text-3xs uppercase font-mono text-slate-500">Pass Rate</span>
            <div className="text-2xl font-mono font-bold text-emerald-600">{passRate}%</div>
            <span className="text-3xs text-emerald-600 font-medium">Clearance Threshold</span>
          </div>

          <div className="bg-[#FFFDF9] p-4 rounded-xl border border-orange-200/80 space-y-1">
            <span className="text-3xs uppercase font-mono text-slate-500">Fraud Intercepted</span>
            <div className="text-2xl font-mono font-bold text-red-600">{highRiskCount}</div>
            <span className="text-3xs text-red-600 font-medium">Tampered &amp; Spliced</span>
          </div>

          <div className="bg-[#FFFDF9] p-4 rounded-xl border border-orange-200/80 space-y-1">
            <span className="text-3xs uppercase font-mono text-slate-500">Security Standard</span>
            <div className="text-sm font-mono font-bold text-[#E45D24] pt-1">NIST SP 800-63A</div>
            <span className="text-3xs text-slate-500">IAL2 Compliant</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-orange-200/90 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by ID, Name, or Type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 font-mono focus:border-[#E45D24] focus:ring-1 focus:ring-orange-300 outline-hidden"
          />
        </div>

        {/* Risk Level Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <span className="text-3xs font-mono text-slate-500 font-semibold uppercase mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#E45D24]" />
            Risk:
          </span>
          {(['ALL', 'LOW', 'MEDIUM', 'HIGH'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelectedRiskFilter(r)}
              className={`px-2.5 py-1 rounded-md text-3xs font-mono font-semibold transition cursor-pointer ${
                selectedRiskFilter === r
                  ? 'bg-[#E45D24] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-[#E45D24]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-orange-200/90 rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-orange-50/70 border-b border-orange-200 text-3xs uppercase tracking-wider text-slate-700 font-sans">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Inspection Reference</th>
                <th className="py-3 px-4">Document Type</th>
                <th className="py-3 px-4">Applicant Subject</th>
                <th className="py-3 px-4">Risk Rating</th>
                <th className="py-3 px-4">Verdict</th>
                <th className="py-3 px-4">Tamper Alert</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No matching audit records found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const isHigh = log.riskLevel === 'HIGH';
                  const isMed = log.riskLevel === 'MEDIUM';

                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-orange-50/30 transition-colors group"
                    >
                      <td className="py-3 px-4 text-slate-500 text-2xs whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>

                      <td className="py-3 px-4 font-bold text-[#E45D24]">
                        {log.id}
                      </td>

                      <td className="py-3 px-4 text-slate-800">
                        {log.documentType}
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-900">
                        {redactPii ? '•••••••• ••••' : log.applicantName}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`text-3xs font-bold px-2 py-0.5 rounded-full border ${
                            isHigh
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : isMed
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {log.riskLevel} RISK
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            log.verdict === 'PASS'
                              ? 'text-emerald-700'
                              : log.verdict === 'REJECT'
                              ? 'text-red-700'
                              : 'text-amber-700'
                          }`}
                        >
                          {log.verdict}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        {log.tamperingDetected ? (
                          <span className="text-red-600 text-3xs font-bold flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            <span>Alteration</span>
                          </span>
                        ) : (
                          <span className="text-emerald-700 text-3xs flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Intact</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onSelectLog(log.id)}
                          className="px-2.5 py-1 rounded bg-orange-100 hover:bg-[#E45D24] text-[#E45D24] hover:text-white text-3xs font-bold transition cursor-pointer"
                        >
                          Inspect Record
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
