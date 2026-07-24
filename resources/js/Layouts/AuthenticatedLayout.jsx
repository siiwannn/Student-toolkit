import React from 'react';
import FrontendLayout from './FrontendLayout';

export default function AuthenticatedLayout({ user, header, children }) {
    return (
        <FrontendLayout>
            {header && (
                <header className="bg-white shadow-sm border-b border-[#DEDEE5]">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}
            <main className="flex-1 py-8">{children}</main>
        </FrontendLayout>
    );
}
