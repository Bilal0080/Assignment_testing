import React from 'react';
import { InterviewQuestion } from '../types';

interface Props {
  data: InterviewQuestion[];
}

const InterviewGuideView: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Structured Interview Guide</h2>
        <p className="text-slate-500 text-sm">
          Use these behavioral questions to assess candidate fit based on the core competencies defined in the job description.
        </p>
      </div>

      <div className="grid gap-6">
        {data.map((q, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide rounded-full">
                Question {idx + 1}
              </span>
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Focus: {q.focusArea}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-4 leading-snug">
              "{q.question}"
            </h3>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h4 className="text-xs font-bold text-green-800 uppercase mb-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What to look for
              </h4>
              <p className="text-sm text-green-900 leading-relaxed">
                {q.evaluationCriteria}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewGuideView;