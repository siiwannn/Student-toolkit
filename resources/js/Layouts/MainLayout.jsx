import React from 'react';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <main>{children}</main>
            {/* Footer */}
        </div>
    );
}
