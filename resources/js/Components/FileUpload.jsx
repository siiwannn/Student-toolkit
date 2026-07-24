import React, { useCallback, useState } from 'react';

export default function FileUpload({ onFileSelect, accept, maxSizeMB = 25, isProcessing }) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState(null);

    const validateFile = (file) => {
        setError(null);
        if (!file) return false;

        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            setError(`File size exceeds ${maxSizeMB}MB limit.`);
            return false;
        }

        if (accept) {
            const acceptedTypes = accept.split(',').map(type => type.trim());
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            const isValidType = acceptedTypes.some(type => {
                if (type.startsWith('.')) {
                    return fileExtension === type.toLowerCase();
                }
                return file.type.match(new RegExp(type.replace('*', '.*')));
            });

            if (!isValidType) {
                setError(`Invalid file type. Accepted types: ${accept}`);
                return false;
            }
        }

        return true;
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (isProcessing) return;

        const file = e.dataTransfer.files[0];
        if (validateFile(file)) {
            onFileSelect(file);
        }
    }, [onFileSelect, accept, maxSizeMB, isProcessing]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (validateFile(file)) {
            onFileSelect(file);
        }
    };

    return (
        <div className="w-full">
            <div
                className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-colors ${
                    isDragging 
                        ? 'border-[#7132F5] bg-[#7132F5]/5' 
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-[#7132F5]/50'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => !isProcessing && document.getElementById('file-upload').click()}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold text-[#7132F5]">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">{accept ? accept.replace(/,/g, ', ') : 'Any file'} (MAX. {maxSizeMB}MB)</p>
                </div>
                <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    accept={accept}
                    onChange={handleChange}
                    disabled={isProcessing}
                />
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
