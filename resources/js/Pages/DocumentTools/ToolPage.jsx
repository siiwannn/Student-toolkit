import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import FileUpload from '@/Components/FileUpload';
import { ArrowLeft, CheckCircle2, Download, RefreshCw, FileText, X } from 'lucide-react';

export default function ToolPage({ tool }) {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // Map tool slugs to titles and descriptions
    const toolDetails = {
        'pdf-to-word': { title: 'PDF to Word', desc: 'Convert PDF to editable DOCX instantly.', accept: '.pdf' },
        'word-to-pdf': { title: 'Word to PDF', desc: 'Convert DOC/DOCX to PDF with high fidelity.', accept: '.doc,.docx' },
        'compress-pdf': { title: 'Compress PDF', desc: 'Reduce PDF file size without losing quality.', accept: '.pdf' },
        'merge-pdf': { title: 'Merge PDF', desc: 'Combine multiple PDFs into one document.', accept: '.pdf' },
        'split-pdf': { title: 'Split PDF', desc: 'Extract pages from PDF quickly.', accept: '.pdf' },
        'image-to-pdf': { title: 'Image to PDF', desc: 'Convert images to PDF documents.', accept: 'image/*' },
        'pdf-to-image': { title: 'PDF to Image', desc: 'Convert PDF pages to JPG/PNG images.', accept: '.pdf' },
    };

    const details = toolDetails[tool] || { title: 'Document Tool', desc: 'Convert your document easily.', accept: '*/*' };

    const handleProcess = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);
        
        if (tool === 'compress-pdf') {
            formData.append('quality', 'medium');
        }

        try {
            const response = await axios.post(route('document.tool.process', tool), formData);
            
            if (response.data.success) {
                setResult(response.data.data);
            } else {
                setError(response.data.message || 'An error occurred during conversion.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to connect to the server.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <FrontendLayout>
            <Head title={details.title} />

            <div className="py-12 md:py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Back Link */}
                    <div className="mb-6">
                        <Link 
                            href="/#tools" 
                            className="inline-flex items-center text-[#9497A9] hover:text-[#101114] font-medium transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Tools
                        </Link>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] rounded-[16px] border border-[#DEDEE5] p-8 md:p-12">
                        
                        <div className="mb-10 text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-[#101114] tracking-tight mb-3">
                                {details.title}
                            </h1>
                            <p className="text-[#9497A9] text-lg">{details.desc}</p>
                        </div>

                        {!result ? (
                            <div className="space-y-8">
                                <FileUpload 
                                    accept={details.accept}
                                    onFileSelect={(f) => { setFile(f); setError(null); }}
                                    isProcessing={isProcessing}
                                />
                                
                                {file && (
                                    <div className="flex items-center justify-between p-4 bg-[#F8F9FC] rounded-xl border border-[#DEDEE5] transition-all">
                                        <div className="flex items-center space-x-4 overflow-hidden">
                                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                                <FileText className="w-6 h-6 text-[#7132F5]" />
                                            </div>
                                            <div className="truncate">
                                                <p className="text-sm font-semibold text-[#101114] truncate">{file.name}</p>
                                                <p className="text-xs text-[#9497A9]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setFile(null)}
                                            disabled={isProcessing}
                                            className="text-[#9497A9] hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                                        {error}
                                    </div>
                                )}

                                <div className="flex justify-center pt-2">
                                    <button 
                                        onClick={handleProcess} 
                                        disabled={!file || isProcessing}
                                        className="w-full sm:w-auto inline-flex items-center justify-center bg-[#7132F5] hover:bg-[#5a27c4] disabled:bg-[#DEDEE5] disabled:cursor-not-allowed text-white text-base font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                                Processing...
                                            </>
                                        ) : 'Convert Now'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="w-20 h-20 bg-green-50 text-[#149E61] rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50/50">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-[#101114] mb-2">Conversion Complete!</h4>
                                    <p className="text-[#9497A9] text-lg">Your document has been successfully processed and is ready.</p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                                    <a 
                                        href={result.download_url}
                                        className="inline-flex items-center justify-center px-8 py-3.5 bg-[#7132F5] rounded-xl font-semibold text-white hover:bg-[#5a27c4] transition-all shadow-sm w-full sm:w-auto hover:shadow-md hover:-translate-y-0.5"
                                        download
                                    >
                                        <Download className="w-5 h-5 mr-2" />
                                        Download Result
                                    </a>
                                    <button 
                                        onClick={() => { setFile(null); setResult(null); }}
                                        className="inline-flex items-center justify-center px-8 py-3.5 bg-white border border-[#DEDEE5] rounded-xl font-semibold text-[#101114] hover:bg-[#F8F9FC] transition-colors w-full sm:w-auto"
                                    >
                                        <RefreshCw className="w-5 h-5 mr-2" />
                                        Process Another
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
