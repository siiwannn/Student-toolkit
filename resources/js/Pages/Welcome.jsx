import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }) {
    const documentTools = [
        { name: 'PDF to Word', desc: 'Convert PDF to editable DOCX.', url: route('document.tool.show', 'pdf-to-word'), icon: '📝' },
        { name: 'Word to PDF', desc: 'Convert DOC/DOCX to PDF.', url: route('document.tool.show', 'word-to-pdf'), icon: '📄' },
        { name: 'Compress PDF', desc: 'Reduce PDF file size.', url: route('document.tool.show', 'compress-pdf'), icon: '🗜️' },
        { name: 'Merge PDF', desc: 'Combine multiple PDFs.', url: route('document.tool.show', 'merge-pdf'), icon: '🔗' },
        { name: 'Split PDF', desc: 'Extract pages from PDF.', url: route('document.tool.show', 'split-pdf'), icon: '✂️' },
        { name: 'Image to PDF', desc: 'Convert images to PDF.', url: route('document.tool.show', 'image-to-pdf'), icon: '🖼️' },
        { name: 'PDF to Image', desc: 'Convert PDF pages to JPG/PNG.', url: route('document.tool.show', 'pdf-to-image'), icon: '📸' },
    ];

    const aiTools = [
        { name: 'Audio to Text', desc: 'Transcribe your lectures.', url: route('ai.audio'), icon: '🎙️' },
        { name: 'AI Summary', desc: 'Summarize long texts.', url: route('ai.summary'), icon: '✨' },
        { name: 'Quiz Generator', desc: 'Test your knowledge.', url: route('ai.quiz'), icon: '🧠' },
    ];

    return (
        <>
            <Head title="Welcome to Student Toolkit" />

            <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-[#7132F5] selection:text-white">
                {/* Navbar */}
                <nav className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center gap-2">
                                    <ApplicationLogo className="block h-8 w-auto fill-current text-[#7132F5]" />
                                    <span className="font-bold text-xl text-gray-900 tracking-tight">Student Toolkit</span>
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-[#7132F5] hover:bg-[#5a27c4] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-40 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            All your academic tools in one place
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Convert documents, summarize long readings, and generate quizzes instantly. Built for students to save time and study smarter.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#tools"
                                className="rounded-xl bg-[#7132F5] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#5a27c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7132F5] transition-colors"
                            >
                                Explore Tools
                            </a>
                            {!auth.user && (
                                <Link href={route('register')} className="text-sm font-semibold leading-6 text-gray-900 flex items-center group">
                                    Create Free Account <span aria-hidden="true" className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    
                    {/* Document Tools */}
                    <div className="mb-20">
                        <div className="mb-10 text-center sm:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Free Document Tools</h2>
                            <p className="mt-2 text-lg text-gray-600">No login required for basic document conversions.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {documentTools.map((tool) => (
                                <Link 
                                    key={tool.name} 
                                    href={tool.url}
                                    className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#7132F5]/30 transition-all group"
                                >
                                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">{tool.icon}</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                                    <p className="text-sm text-gray-500">{tool.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* AI Tools */}
                    <div className="mb-20">
                        <div className="mb-10 text-center sm:text-left flex items-end justify-between">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                                    <span className="text-[#7132F5]">AI</span> Study Tools
                                </h2>
                                <p className="mt-2 text-lg text-gray-600">Guests can try limited AI tools. Login to save history and unlock more.</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {aiTools.map((tool) => (
                                <Link 
                                    key={tool.name} 
                                    href={tool.url}
                                    className="block p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-sm border border-purple-100 hover:shadow-md hover:border-[#7132F5]/50 transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform">{tool.icon}</div>
                                    <div className="text-3xl mb-4 relative z-10">{tool.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 relative z-10">{tool.name}</h3>
                                    <p className="text-sm text-gray-600 relative z-10">{tool.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <footer className="bg-white border-t border-gray-100 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Student Toolkit. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
