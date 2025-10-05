import React from 'react';

export const ScissorsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
    <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
    <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.25c.48 0 .93.2 1.28.54l2.45 2.45c.18.18.38.33.6.45l3.22 1.61c.8.4 1.12 1.37.79 2.18l-1.61 3.22c-.12.22-.27.42-.45.6l-2.45 2.45c-.34.34-.54.79-.54 1.28v3.42c0 .97-.78 1.75-1.75 1.75s-1.75-.78-1.75-1.75V17c0-.48-.2-.93-.54-1.28l-2.45-2.45c-.18-.18-.38-.33-.6-.45l-3.22-1.61c-.8-.4-1.12-1.37-.79-2.18l1.61-3.22c.12-.22.27.42.45-.6l2.45-2.45c.34-.34.54-.79.54-1.28V2.25z" />
  </svg>
);


export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`w-10 h-10 mb-3 text-gray-400 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);
