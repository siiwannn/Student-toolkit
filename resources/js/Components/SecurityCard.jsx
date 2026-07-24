import React from 'react';

export default function SecurityCard({ title, description, children, className = '' }) {
    return (
        <div className={`bg-white shadow-sm sm:rounded-[12px] p-6 border border-gray-100 ${className}`}>
            <header className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#7132F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    {title}
                </h2>
                {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
            </header>
            <div>{children}</div>
        </div>
    );
}
