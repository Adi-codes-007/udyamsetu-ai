'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { queryRegulatoryCopilot } from '@/services/rag';
import { CopilotMessage } from '@/types';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle, 
  ExternalLink, 
  ArrowRight,
  Info,
  Clock,
  Layers,
  Building2
} from 'lucide-react';

function RegulatoryCopilotContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q');

  const { businessProfile, approvals } = useAppStore();

  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      timestamp: 'Just now',
      content: 'Hello Rahul. I am the Regulatory Copilot for UdyamSetu AI. I am grounded in your business profile (Shree Foods & Agro Processing, MIDC Waluj) and statutory state regulatory frameworks.',
      structuredResponse: {
        answer: 'I am ready to assist with statutory queries regarding MPCB pollution consents, Fire safety norms, DISH factory building plans, and Maharashtra PSI 2025 incentives.',
        reasoning: 'Your unit is currently tracked across 12 statutory clearances with 2 high-priority action requirements.',
        recommendedNextStep: 'You can ask any of the suggested questions below or enter a custom query.',
        source: 'MAITRI Single Window Knowledge Base & Maharashtra State Gazettes',
        lastVerified: '2026-09-28',
      },
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    'Why is MPCB Consent to Establish included?',
    'What documents are missing?',
    'What should I complete next?',
    'Which approvals are blocking my project?',
    'What government support may be relevant?',
  ];

  const handleSend = (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: CopilotMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      content: queryText.trim(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    setTimeout(() => {
      const structured = queryRegulatoryCopilot(queryText, businessProfile, approvals);
      const assistantMsg: CopilotMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        content: structured.answer,
        structuredResponse: structured,
      };
      setMessages(prev => [...prev, assistantMsg]);
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    if (initialQ && messages.length === 1) {
      handleSend(initialQ);
    }
  }, [initialQ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Regulatory Copilot Console</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#17324D] text-white font-bold">
              GROUNDED RAG ENGINE
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            AI-assisted compliance guidance grounded in your business profile and verified state regulatory databases.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#1F4E79] bg-[#edf4fa] border border-[#c8dced] px-3 py-1.5 rounded">
          <ShieldCheck className="w-4 h-4 text-[#16855b]" />
          <span>Profile Context: <strong>Shree Foods (₹4.2 Cr, Orange Category)</strong></span>
        </div>
      </div>

      {/* Suggested Questions Ribbon */}
      <div className="bg-white border border-[#D9E1E8] rounded p-3 shadow-xs space-y-1.5">
        <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider block">
          Suggested Compliance Queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs text-[#1F4E79] bg-[#F5F7FA] hover:bg-[#edf2f7] border border-[#D9E1E8] px-2.5 py-1 rounded transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {msg.sender === 'user' ? (
              <div className="max-w-xl bg-[#1F4E79] text-white rounded p-3 text-xs shadow-xs">
                <p className="font-medium">{msg.content}</p>
                <span className="text-[9px] text-slate-300 mt-1 block text-right">{msg.timestamp}</span>
              </div>
            ) : (
              <div className="w-full max-w-3xl bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-3.5 text-xs text-[#17202A]">
                <div className="flex items-center justify-between pb-2 border-b border-[#D9E1E8]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#1F4E79]" />
                    <span className="font-bold text-xs text-[#17324D]">Regulatory Copilot Response</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#667085]">{msg.timestamp}</span>
                </div>

                {msg.structuredResponse ? (
                  <div className="space-y-3">
                    {/* Section 1: Direct Answer */}
                    <div>
                      <h4 className="font-bold text-[#17324D] text-xs uppercase tracking-wider mb-1">
                        Direct Regulatory Answer
                      </h4>
                      <p className="text-[#344054] leading-relaxed whitespace-pre-line">
                        {msg.structuredResponse.answer}
                      </p>
                    </div>

                    {/* Section 2: Reasoning & Legal Context */}
                    <div className="p-3 rounded bg-[#F5F7FA] border border-[#D9E1E8]">
                      <h4 className="font-bold text-[#17324D] text-xs uppercase tracking-wider mb-1">
                        Reasoning & Operational Context
                      </h4>
                      <p className="text-[#475467] leading-relaxed">
                        {msg.structuredResponse.reasoning}
                      </p>
                    </div>

                    {/* Section 3: Recommended Next Step */}
                    <div className="p-3 rounded bg-[#edf4fa] border border-[#c8dced] text-[#1F4E79]">
                      <h4 className="font-bold text-xs uppercase tracking-wider mb-1">
                        Recommended Next Action Step
                      </h4>
                      <p className="leading-relaxed whitespace-pre-line">
                        {msg.structuredResponse.recommendedNextStep}
                      </p>
                    </div>

                    {/* Section 4 & 5: Source & Last Verified */}
                    <div className="pt-2 border-t border-[#D9E1E8] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#667085]">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#1F4E79]" />
                        <span>Source: <strong>{msg.structuredResponse.source}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#667085]" />
                        <span>Last Verified: {msg.structuredResponse.lastVerified}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#344054] leading-relaxed">{msg.content}</p>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="bg-white border border-[#D9E1E8] rounded p-4 max-w-sm text-xs text-[#667085] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1F4E79] animate-ping" />
            <span>Consulting regulatory knowledge base and business profile...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="bg-white border border-[#D9E1E8] rounded p-3 shadow-xs">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Ask about approvals, documents, deadlines, or incentives..."
            className="flex-1 px-3 py-2 text-xs bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="px-4 py-2 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 transition-colors"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-[10px] text-[#667085] mt-2 text-center">
          Regulatory Copilot citations are drawn from official Maharashtra acts and state department circulars. Verify final requirements with the competent authority.
        </p>
      </div>
    </div>
  );
}

export default function RegulatoryCopilotPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-[#667085]">Loading Regulatory Copilot Console...</div>}>
      <RegulatoryCopilotContent />
    </React.Suspense>
  );
}
