'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ApprovalRule } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  ShieldCheck, 
  Plus, 
  Search, 
  ToggleLeft, 
  ToggleRight, 
  CheckCircle2, 
  BookOpen, 
  X,
  Code2,
  AlertCircle
} from 'lucide-react';

export default function AdminRulesPage() {
  const { approvalRules, toggleApprovalRuleStatus, addApprovalRule } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRule, setNewRule] = useState<Partial<ApprovalRule>>({
    ruleCode: 'MSEDCL-005',
    name: 'Dedicated Substation Solar Net-Metering Rule',
    category: 'Power & Utilities',
    conditionsSummary: 'Connected Load > 100 kW AND Solar Rooftop = true',
    authority: 'Maharashtra State Electricity Distribution Co. Ltd.',
    source: 'MERC Grid Interactive Solar PV Regulations 2019',
    legalReference: 'Regulation 4.2 - Net Metering Cap',
    status: 'Active',
  });

  const [notification, setNotification] = useState('');

  const handleToggle = (id: string) => {
    toggleApprovalRuleStatus(id);
    setNotification('Rule status updated.');
    setTimeout(() => setNotification(''), 2500);
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ApprovalRule = {
      id: `rule-${Date.now()}`,
      ruleCode: newRule.ruleCode || 'CUSTOM-001',
      name: newRule.name || 'Custom Rule',
      category: (newRule.category as any) || 'Sector Specific',
      conditionsSummary: newRule.conditionsSummary || 'True',
      authority: newRule.authority || 'Competent Authority',
      source: newRule.source || 'State Single Window Act',
      legalReference: newRule.legalReference || 'Section 1',
      status: 'Active',
    };
    addApprovalRule(created);
    setShowAddModal(false);
    setNotification('New approval rule added to deterministic engine.');
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredRules = approvalRules.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.ruleCode.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.authority.toLowerCase().includes(q) ||
      r.conditionsSummary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Deterministic Approval Rules Engine</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              STRUCTURED LOGIC MATRIX
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Auditable business logic rules that map enterprise parameters directly to statutory clearance obligations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded text-xs font-semibold bg-[#1F4E79] hover:bg-[#17324D] text-white flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Statutory Rule</span>
        </button>
      </div>

      {/* Trust & Architecture Notice */}
      <div className="p-3 bg-[#edf4fa] border border-[#c8dced] rounded text-xs text-[#1F4E79] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#1F4E79] shrink-0" />
        <span>
          <strong>Zero LLM Hallucination Guarantee:</strong> Clearances on UdyamSetu AI are strictly derived from these verified deterministic rules, never invented by a generative model.
        </span>
      </div>

      {notification && (
        <div className="p-3 bg-[#e8f5ef] border border-[#c2e5d5] rounded text-xs text-[#16855b] font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Rules Table */}
      <div className="bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#D9E1E8] flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
            Active Rule Directory ({filteredRules.length})
          </h2>

          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by Code, Name, or Condition..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] border-b border-[#D9E1E8] text-[#344054] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Rule Code & Name</th>
                <th className="py-3 px-4">Evaluation Condition Logic</th>
                <th className="py-3 px-4">Authority & Legal Reference</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Toggle Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E1E8] text-[#17202A]">
              {filteredRules.map(rule => (
                <tr key={rule.id} className="hover:bg-[#F5F7FA]">
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#17324D]">{rule.name}</span>
                      <span className="text-[10px] font-mono text-[#667085]">{rule.ruleCode}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-[11px] bg-[#edf4fa] text-[#1F4E79] px-2 py-1 rounded border border-[#c8dced] font-mono block max-w-sm truncate">
                      {rule.conditionsSummary}
                    </code>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#17202A]">{rule.authority}</span>
                      <span className="text-[10px] text-[#667085]">{rule.legalReference}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#475467] font-medium">{rule.category}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={rule.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleToggle(rule.id)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        rule.status === 'Active'
                          ? 'bg-[#e8f5ef] text-[#16855b] border border-[#c2e5d5]'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {rule.status === 'Active' ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD RULE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-[#D9E1E8] rounded shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
              <h3 className="text-base font-bold text-[#17324D]">Add Deterministic Approval Rule</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#344054] mb-1">Rule Code</label>
                  <input
                    type="text"
                    required
                    value={newRule.ruleCode}
                    onChange={e => setNewRule({ ...newRule, ruleCode: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#344054] mb-1">Category</label>
                  <select
                    value={newRule.category}
                    onChange={e => setNewRule({ ...newRule, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                  >
                    <option value="Environmental">Environmental</option>
                    <option value="Industrial Safety">Industrial Safety</option>
                    <option value="Power & Utilities">Power & Utilities</option>
                    <option value="Local Governance">Local Governance</option>
                    <option value="Sector Specific">Sector Specific</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#344054] mb-1">Rule Name</label>
                <input
                  type="text"
                  required
                  value={newRule.name}
                  onChange={e => setNewRule({ ...newRule, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#344054] mb-1">Evaluation Condition Logic (Boolean Expression)</label>
                <input
                  type="text"
                  required
                  value={newRule.conditionsSummary}
                  onChange={e => setNewRule({ ...newRule, conditionsSummary: e.target.value })}
                  placeholder="e.g. Manufacturing = true AND Water Usage = true"
                  className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#344054] mb-1">Regulatory Authority</label>
                  <input
                    type="text"
                    required
                    value={newRule.authority}
                    onChange={e => setNewRule({ ...newRule, authority: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#344054] mb-1">Legal Section / Act Reference</label>
                  <input
                    type="text"
                    required
                    value={newRule.legalReference}
                    onChange={e => setNewRule({ ...newRule, legalReference: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#D9E1E8] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white font-semibold shadow-xs"
                >
                  Commit Rule to Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
