import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const tools = [
    {
        name: 'AI Summary',
        description: 'Generate concise summaries from long texts instantly.',
        href: route('ai.summary'),
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
        ),
        color: 'bg-purple-50 text-purple-600'
    },
    {
        name: 'Quiz Generator',
        description: 'Automatically generate multiple-choice quizzes from your study material.',
        href: route('ai.quiz'),
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: 'bg-yellow-50 text-yellow-600'
    },
    {
        name: 'Audio to Text',
        description: 'Transcribe your recorded lectures or voice notes accurately.',
        href: route('ai.audio'),
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        ),
        color: 'bg-blue-50 text-blue-600'
    }
];

export default function Index() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">AI Study Tools</h2>}
        >
            <Head title="AI Study Tools" />

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
