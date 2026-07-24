import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const tools = [
    {
        name: 'PDF to Word',
        description: 'Convert PDF documents to editable Word files.',
        href: route('document.tool.show', 'pdf-to-word'),
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        color: 'bg-blue-50 text-blue-600'
    },
    {
        name: 'Word to PDF',
        description: 'Convert Word documents to PDF format.',
        href: route('document.tool.show', 'word-to-pdf'),
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        color: 'bg-red-50 text-red-600'
    },
    {
        name: 'Compress PDF',
        description: 'Reduce the file size of your PDF documents.',
        href: route('document.tool.show', 'compress-pdf'),
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
        ),
        color: 'bg-green-50 text-green-600'
    },
    // Merge, Split, Image to PDF, PDF to Image can be added similarly
];

export default function Index() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Document Tools</h2>}
        >
            <Head title="Document Tools" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool) => (
                            <Link 
                                key={tool.name} 
                                href={tool.href}
                                className="block bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100 hover:border-[#7132F5]/50 hover:shadow-md transition-all group"
                            >
                                <div className="p-6">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${tool.color}`}>
                                        {tool.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#7132F5] transition-colors">{tool.name}</h3>
                                    <p className="text-gray-500 text-sm">{tool.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
