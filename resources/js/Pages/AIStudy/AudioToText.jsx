import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import FileUpload from '@/Components/FileUpload';
import { ArrowLeft, Mic, RefreshCw, Copy, CheckCircle2, FileAudio, X } from 'lucide-react';

export default function AudioToText() {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleProcess = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        setResult('');

        const formData = new FormData();
        formData.append('audio', file);

        try {
            const response = await axios.post(route('ai.audio.process'), formData);

            if (response.data.success) {
                setResult(response.data.transcript);
            } else {
                setError(response.data.message || 'An error occurred during transcription.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to connect to the server.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <FrontendLayout>
            <Head title="Audio to Text" />

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

                    <div className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] rounded-[16px] border border-[#DEDEE5] p-8 md:p-12">
                        
                        <div className="mb-10 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 text-[#7132F5] mb-4">
                                <Mic className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#101114] tracking-tight mb-3">
                                Audio to Text
                            </h1>
                            <p className="text-[#9497A9] text-lg">Upload your lecture or voice notes (.mp3, .wav, .m4a) to generate text instantly.</p>
                        </div>

                        {!result ? (
                            <div className="space-y-8">
                                <FileUpload 
                                    accept=".mp3,.wav,.m4a,audio/*"
                                    onFileSelect={(f) => { setFile(f); setError(null); }}
                                    isProcessing={isProcessing}
                                />
                                
                                {file && (
                                    <div className="flex items-center justify-between p-4 bg-[#F8F9FC] rounded-xl border border-[#DEDEE5]">
                                        <div className="flex items-center space-x-4 overflow-hidden">
                                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                                <FileAudio className="w-6 h-6 text-[#7132F5]" />
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
                                                Transcribing...
                                            </>
                                        ) : 'Start Transcription'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-[#101114]">Transcript Result</h3>
                                    <button
                                        onClick={handleCopy}
                                        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                                            copied 
                                                ? 'bg-green-50 text-[#149E61] border border-green-200'
                                                : 'bg-[#F8F9FC] text-[#7132F5] hover:bg-purple-50 border border-transparent'
                                        }`}
                                    >
                                        {copied ? (
                                            <><CheckCircle2 className="w-4 h-4 mr-2" /> Copied!</>
                                        ) : (
                                            <><Copy className="w-4 h-4 mr-2" /> Copy text</>
                                        )}
                                    </button>
                                </div>
                                <div className="bg-[#F8F9FC] rounded-xl p-6 text-[#101114] leading-relaxed whitespace-pre-wrap border border-[#DEDEE5] min-h-[250px] shadow-inner text-[15px]">
                                    {result}
                                </div>
                                <div className="flex justify-center pt-6">
                                    <button 
                                        onClick={() => { setFile(null); setResult(''); }}
                                        className="inline-flex items-center justify-center px-8 py-3.5 bg-white border border-[#DEDEE5] rounded-xl font-semibold text-[#101114] hover:bg-[#F8F9FC] transition-colors w-full sm:w-auto"
                                    >
                                        <RefreshCw className="w-5 h-5 mr-2" />
                                        Transcribe Another Audio
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
