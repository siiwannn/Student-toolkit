import React from 'react';

export default function DangerZoneCard({ title, description, children, className = '' }) {
    return (
        <div className={`bg-white shadow-sm sm:rounded-[12px] p-6 border border-red-100 ${className}`}>
            <header className="mb-6">
                <h2 className="text-lg font-medium text-red-600 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    {title}
                </h2>
                {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
            </header>
            <div>{children}</div>
        </div>
    );
}
