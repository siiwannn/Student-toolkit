import React from 'react';

export default function ProfileCard({ title, description, children, className = '' }) {
    return (
        <div className={`bg-white shadow-sm sm:rounded-[12px] p-6 border border-gray-100 ${className}`}>
            <header className="mb-6">
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
            </header>
            <div>{children}</div>
        </div>
    );
}
