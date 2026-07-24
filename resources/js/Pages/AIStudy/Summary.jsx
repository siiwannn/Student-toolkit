import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Sparkles, RefreshCw, Copy, CheckCircle2 } from 'lucide-react';

export default function Summary() {
    const [text, setText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleProcess = async () => {
        if (text.length < 50) {
            setError('Please enter at least 50 characters.');
            return;
        }

        setIsProcessing(true);
        setError(null);
        setResult('');

        try {
            const response = await axios.post(route('ai.summary.process'), { text });

            if (response.data.success) {
                setResult(response.data.summary);
            } else {
                setError(response.data.message || 'An error occurred.');
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
            <Head title="AI Summary" />

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
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#101114] tracking-tight mb-3">
                                AI Summary
                            </h1>
                            <p className="text-[#9497A9] text-lg">Paste a long article, essay, or study material to get a quick, accurate summary.</p>
                        </div>
                        
                        <div className="mb-8">
                            <label htmlFor="text-input" className="block text-sm font-semibold text-[#101114] mb-2">
                                Enter your text below (min 50 characters)
                            </label>
                            <textarea
                                id="text-input"
                                rows="8"
                                className="w-full rounded-xl border-[#DEDEE5] shadow-sm focus:border-[#7132F5] focus:ring-[#7132F5] p-4 text-[#101114] bg-[#F8F9FC] transition-colors resize-y"
                                placeholder="Paste the long article, essay, or study material you want to summarize here..."
                                value={text}
                                onChange={(e) => {
                                    setText(e.target.value);
                                    if (error) setError(null);
                                }}
                                disabled={isProcessing}
                            ></textarea>
                            <div className="mt-2 text-sm font-medium text-[#9497A9] flex justify-end">
                                {text.length} characters
                            </div>
                        </div>

                        {error && (
                            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-center mb-10">
                            <button 
                                onClick={handleProcess} 
                                disabled={text.length < 50 || isProcessing}
                                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#7132F5] hover:bg-[#5a27c4] disabled:bg-[#DEDEE5] disabled:cursor-not-allowed text-white text-base font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm"
                            >
                                {isProcessing ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                        Generating Summary...
                                    </>
                                ) : 'Generate Summary'}
                            </button>
                        </div>

                        {result && (
                            <div className="pt-10 border-t border-[#DEDEE5] animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-[#101114]">Summary Result</h3>
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
                                            <><Copy className="w-4 h-4 mr-2" /> Copy to Clipboard</>
                                        )}
                                    </button>
                                </div>
                                <div className="bg-[#F8F9FC] rounded-xl p-6 text-[#101114] leading-relaxed whitespace-pre-wrap border border-[#DEDEE5] shadow-inner text-[15px]">
                                    {result}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
