import React, { useState } from 'react';
import { generateRecruitmentAssets } from './services/geminiService';
import { RecruitmentPackage, AppState } from './types';
import LoadingState from './components/LoadingState';
import JobDescriptionView from './components/JobDescriptionView';
import InterviewGuideView from './components/InterviewGuideView';

const PRESET_NOTES = `Software Engineer needed for a fintech startup. 
Needs to know Python and React. 
We work fast, lots of ambiguity. 
Ideally someone who has led a team before but is still hands-on. 
Hybrid role in NYC. 
We value "radical candor" and people who ship code daily.`;

const App: React.FC = () => {
  const [notes, setNotes] = useState(PRESET_NOTES);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<RecruitmentPackage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jd' | 'interview'>('jd');

  const handleGenerate = async () => {
    if (!notes.trim()) return;
    
    setAppState(AppState.GENERATING);
    setError(null);
    
    try {
      const data = await generateRecruitmentAssets(notes);
      setResult(data);
      setAppState(AppState.SUCCESS);
      setActiveTab('jd');
    } catch (e: any) {
      setError(e.message || "An error occurred while generating content.");
      setAppState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">RecruitMind AI</h1>
          </div>
          <div className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
            Powered by Gemini 2.5 & 3 Pro
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Role Context</h2>
              <p className="text-slate-500 text-sm mb-4">Paste your raw notes, rough bullet points, or meeting transcript below.</p>
              
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Hiring a Senior Product Designer, needs Figma expertise, experience with B2B SaaS, remote friendly..."
                className="flex-grow w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed transition-all outline-none min-h-[300px]"
              />
              
              <div className="mt-6">
                <button 
                  onClick={handleGenerate}
                  disabled={appState === AppState.GENERATING || !notes.trim()}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  {appState === AppState.GENERATING ? (
                    <span>Generating...</span>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Generate Package</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
              <h3 className="text-sm font-bold text-indigo-900 mb-2">Pro Tips</h3>
              <ul className="text-xs text-indigo-800 space-y-2 list-disc list-inside">
                <li>Mention company culture and values.</li>
                <li>Include specific tech stack or tools.</li>
                <li>Note if it's a leadership or individual contributor role.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-8">
            {appState === AppState.ERROR && (
               <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
                 <strong>Error:</strong> {error}
               </div>
            )}

            {appState === AppState.IDLE && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-12 min-h-[500px]">
                <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium">Ready to create your recruitment assets</p>
                <p className="text-sm mt-1">Enter details on the left to begin.</p>
              </div>
            )}

            {appState === AppState.GENERATING && (
              <div className="h-full flex items-center justify-center min-h-[500px] bg-white rounded-xl border border-slate-200 shadow-sm">
                <LoadingState />
              </div>
            )}

            {appState === AppState.SUCCESS && result && (
              <div className="flex flex-col h-full">
                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-200/50 p-1 rounded-lg mb-6 w-fit">
                  <button
                    onClick={() => setActiveTab('jd')}
                    className={`px-6 py-2 text-sm font-semibold rounded-md transition-all ${
                      activeTab === 'jd' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    Job Description
                  </button>
                  <button
                    onClick={() => setActiveTab('interview')}
                    className={`px-6 py-2 text-sm font-semibold rounded-md transition-all ${
                      activeTab === 'interview' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    Interview Guide
                  </button>
                </div>

                {/* Content Area */}
                <div className="animate-fade-in">
                  {activeTab === 'jd' ? (
                    <JobDescriptionView data={result.jobDescription} />
                  ) : (
                    <InterviewGuideView data={result.interviewGuide} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;