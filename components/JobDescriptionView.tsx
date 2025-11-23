import React from 'react';
import { JobDescription } from '../types';

interface Props {
  data: JobDescription;
}

const JobDescriptionView: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">{data.title}</h2>
        <p className="mt-2 text-slate-600 leading-relaxed">{data.summary}</p>
      </div>
      
      <div className="p-8 space-y-8">
        <section>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4">Responsibilities</h3>
          <ul className="space-y-3">
            {data.responsibilities.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="h-px bg-slate-100 w-full"></div>

        <section>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4">Qualifications</h3>
          <ul className="space-y-3">
            {data.qualifications.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <svg className="w-5 h-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="h-px bg-slate-100 w-full"></div>

        <section>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4">Benefits & Perks</h3>
          <div className="flex flex-wrap gap-2">
            {data.benefits.map((item, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full font-medium">
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobDescriptionView;