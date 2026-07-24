import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Brain, RefreshCw, Eye, EyeOff } from 'lucide-react';

export default function Quiz() {
    const [text, setText] = useState('');
    const [questionCount, setQuestionCount] = useState(5);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showAnswers, setShowAnswers] = useState(false);

    const handleProcess = async () => {
        if (text.length < 50) {
            setError('Please enter at least 50 characters.');
            return;
        }

        setIsProcessing(true);
        setError(null);
        setResult(null);
        setShowAnswers(false);

        try {
            const response = await axios.post(route('ai.quiz.process'), { text, question_count: questionCount });

            if (response.data.success) {
                setResult(response.data.questions);
            } else {
                setError(response.data.message || 'An error occurred.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to connect to the server.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <FrontendLayout>
            <Head title="Quiz Generator" />

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
                                <Brain className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#101114] tracking-tight mb-3">
                                Quiz Generator
                            </h1>
                            <p className="text-[#9497A9] text-lg">Test your knowledge by generating a multiple-choice quiz from your study material.</p>
                        </div>
                        
                        <div className="mb-8">
                            <label htmlFor="text-input" className="block text-sm font-semibold text-[#101114] mb-2">
                                Study Material (min 50 characters)
                            </label>
                            <textarea
                                id="text-input"
                                rows="6"
                                className="w-full rounded-xl border-[#DEDEE5] shadow-sm focus:border-[#7132F5] focus:ring-[#7132F5] p-4 text-[#101114] bg-[#F8F9FC] transition-colors resize-y"
                                placeholder="Paste your study material here to generate a multiple-choice quiz..."
                                value={text}
                                onChange={(e) => {
                                    setText(e.target.value);
                                    if (error) setError(null);
                                }}
                                disabled={isProcessing}
                            ></textarea>
                            
                            <div className="mt-6 flex flex-col sm:flex-row sm:items-center bg-[#F8F9FC] p-4 rounded-xl border border-[#DEDEE5]">
                                <label htmlFor="question-count" className="text-sm font-semibold text-[#101114] mb-2 sm:mb-0 sm:mr-4">
                                    Number of Questions:
                                </label>
                                <select 
                                    id="question-count"
                                    value={questionCount}
                                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                                    className="rounded-lg border-[#DEDEE5] shadow-sm focus:border-[#7132F5] focus:ring-[#7132F5] bg-white text-[#101114]"
                                    disabled={isProcessing}
                                >
                                    <option value={3}>3 Questions</option>
                                    <option value={5}>5 Questions</option>
                                    <option value={10}>10 Questions</option>
                                    <option value={15}>15 Questions</option>
                                </select>
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
                                        Generating Quiz...
                                    </>
                                ) : 'Generate Quiz'}
                            </button>
                        </div>

                        {result && (
                            <div className="pt-10 border-t border-[#DEDEE5] animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-bold text-[#101114]">Generated Quiz</h3>
                                    <button
                                        onClick={() => setShowAnswers(!showAnswers)}
                                        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                                            showAnswers 
                                                ? 'bg-purple-100 text-[#5B1ECF] border border-purple-200'
                                                : 'bg-[#F8F9FC] text-[#7132F5] hover:bg-purple-50 border border-transparent'
                                        }`}
                                    >
                                        {showAnswers ? (
                                            <><EyeOff className="w-4 h-4 mr-2" /> Hide Answers</>
                                        ) : (
                                            <><Eye className="w-4 h-4 mr-2" /> Show Answers</>
                                        )}
                                    </button>
                                </div>
                                
                                <div className="space-y-8">
                                    {result.map((q, index) => (
                                        <div key={index} className="bg-[#F8F9FC] rounded-2xl p-6 md:p-8 border border-[#DEDEE5] shadow-sm">
                                            <h4 className="font-bold text-lg text-[#101114] mb-5 leading-relaxed">
                                                <span className="text-[#7132F5] mr-2">Q{index + 1}.</span> 
                                                {q.question}
                                            </h4>
                                            <div className="space-y-3">
                                                {q.options.map((opt, optIndex) => {
                                                    const isCorrect = q.correct_answer === optIndex;
                                                    const showCorrect = showAnswers && isCorrect;
                                                    
                                                    return (
                                                        <div 
                                                            key={optIndex}
                                                            className={`p-4 rounded-xl border transition-all ${
                                                                showCorrect
                                                                    ? 'bg-green-50 border-green-300 text-green-900 font-medium ring-1 ring-green-300' 
                                                                    : 'bg-white border-[#DEDEE5] text-[#101114] hover:border-[#7132F5] hover:shadow-sm'
                                                            }`}
                                                        >
                                                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md mr-3 text-sm font-bold ${
                                                                showCorrect ? 'bg-green-200 text-green-900' : 'bg-[#F8F9FC] text-[#9497A9]'
                                                            }`}>
                                                                {String.fromCharCode(65 + optIndex)}
                                                            </span>
                                                            {opt}
                                                            {showCorrect && (
                                                                <CheckCircle2 className="w-5 h-5 inline-block ml-auto float-right text-green-600" />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
