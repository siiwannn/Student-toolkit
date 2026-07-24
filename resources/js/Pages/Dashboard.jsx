import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard({ stats, recent_activity }) {
    const quickLinks = [
        { name: 'PDF to Word', href: route('document.tool.show', 'pdf-to-word'), icon: '📝', color: 'bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-300' },
        { name: 'AI Summary', href: route('ai.summary'), icon: '✨', color: 'bg-purple-50 text-purple-600 border-purple-100 hover:border-purple-300' },
        { name: 'Quiz Generator', href: route('ai.quiz'), icon: '🎯', color: 'bg-yellow-50 text-yellow-600 border-yellow-100 hover:border-yellow-300' },
        { name: 'Audio to Text', href: route('ai.audio'), icon: '🎤', color: 'bg-green-50 text-green-600 border-green-100 hover:border-green-300' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'processing': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl p-6 border border-gray-100 flex items-center">
                            <div className="p-4 bg-blue-50 rounded-lg mr-4">
                                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Documents Processed</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_files}</p>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl p-6 border border-gray-100 flex items-center">
                            <div className="p-4 bg-purple-50 rounded-lg mr-4">
                                <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total AI Tasks Completed</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_ai_tasks}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                                    <Link href={route('history.index')} className="text-sm font-medium text-[#7132F5] hover:text-[#5a27c4]">
                                        View All
                                    </Link>
                                </div>
                                <div className="p-6">
                                    {recent_activity.length > 0 ? (
                                        <div className="space-y-6">
                                            {recent_activity.map((item, index) => (
                                                <div key={index} className="flex items-start">
                                                    <div className={`mt-1 rounded-full p-2 ${item.type === 'ai_tool' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                                                        {item.type === 'ai_tool' ? (
                                                            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-semibold text-gray-900 capitalize">
                                                                {item.title.replace(/-/g, ' ')}
                                                            </p>
                                                            <span className="text-xs text-gray-500">
                                                                {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <p className="text-sm text-gray-500 truncate max-w-xs">{item.file_name}</p>
                                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                                                {item.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">No recent activity found.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="lg:col-span-1">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900">Favorite Tools</h3>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 gap-4">
                                        {quickLinks.map((link, idx) => (
                                            <Link 
                                                key={idx} 
                                                href={link.href}
                                                className={`flex items-center p-4 rounded-xl border transition-all ${link.color}`}
                                            >
                                                <span className="text-2xl mr-4">{link.icon}</span>
                                                <span className="font-semibold">{link.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
