import React, { useState, useEffect } from 'react';

const LoadingState: React.FC = () => {
  const [message, setMessage] = useState("Initializing analysis...");

  useEffect(() => {
    const messages = [
      "Analyzing raw notes...",
      "Identifying key competencies...",
      "Structuring job requirements...",
      "Drafting behavioral questions...",
      "Refining language for impact...",
      "Finalizing recruitment package..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setMessage(messages[i]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center animate-fade-in">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-slate-800">Gemini is Thinking</h3>
        <p className="text-slate-500 mt-2 text-sm font-medium uppercase tracking-wide">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;