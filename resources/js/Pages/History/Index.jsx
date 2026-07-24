import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

export default function Index({ history }) {
    const [selectedAI, setSelectedAI] = useState(null);

    const handleDelete = (id, type) => {
        if (confirm('Are you sure you want to delete this item?')) {
            const routeName = type === 'ai_tool' ? 'history.destroy.ai' : 'history.destroy';
            router.delete(route(routeName, id), {
                preserveScroll: true
            });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'processing': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderAction = (item) => {
        if (item.type === 'document_tool' && item.status === 'completed') {
            return (
                <a 
                    href={item.download_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#7132F5] text-white text-sm font-medium rounded-lg hover:bg-[#5a27c4] transition-colors"
                >
                    Download
                </a>
            );
        } else if (item.type === 'ai_tool' && item.status === 'completed') {
            return (
                <button 
                    onClick={() => setSelectedAI(item)}
                    className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200 transition-colors"
                >
                    View Result
                </button>
            );
        }
        return null;
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Your History</h2>}
        >
            <Head title="History" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl">
                        
                        <div className="p-6">
                            {history.length > 0 ? (
                                <div className="divide-y divide-gray-100">
                                    {history.map((item) => (
                                        <div key={`${item.type}-${item.id}`} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                                            <div className="flex items-start flex-1 min-w-0">
                                                <div className={`mt-1 shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                                                    item.type === 'ai_tool' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                    {item.type === 'ai_tool' ? (
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="ml-4 truncate">
                                                    <div className="flex items-center space-x-3 mb-1">
                                                        <h4 className="text-lg font-semibold text-gray-900 capitalize truncate">
                                                            {item.title.replace(/-/g, ' ')}
                                                        </h4>
                                                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 truncate mb-1">{item.file_name}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3 sm:ml-4">
                                                {renderAction(item)}
                                                
                                                <button
                                                    onClick={() => handleDelete(item.id, item.type)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete from history"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No history</h3>
                                    <p className="mt-1 text-sm text-gray-500">Get started by using one of our tools.</p>
                                    <div className="mt-6">
                                        <Link
                                            href={route('document.tools')}
                                            className="inline-flex items-center rounded-md bg-[#7132F5] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5a27c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7132F5]"
                                        >
                                            Go to Tools
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Result Modal */}
            {selectedAI && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedAI(null)}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 capitalize" id="modal-title">
                                            {selectedAI.title.replace(/-/g, ' ')} Result
                                        </h3>
                                        <div className="mt-2 bg-gray-50 p-4 rounded-lg max-h-[60vh] overflow-y-auto">
                                            {selectedAI.title === 'quiz' ? (
                                                <div className="space-y-4">
                                                    {(() => {
                                                        try {
                                                            const qs = JSON.parse(selectedAI.content);
                                                            return qs.map((q, i) => (
                                                                <div key={i} className="mb-4">
                                                                    <p className="font-semibold text-gray-800">Q{i+1}: {q.question}</p>
                                                                    <p className="text-gray-600 mt-1">Answer: {q.options[q.correct_answer]}</p>
                                                                </div>
                                                            ));
                                                        } catch(e) {
                                                            return <p>{selectedAI.content}</p>;
                                                        }
                                                    })()}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 whitespace-pre-wrap">
                                                    {selectedAI.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-[#7132F5] text-base font-medium text-white hover:bg-[#5a27c4] focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setSelectedAI(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
