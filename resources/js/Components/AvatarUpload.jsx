import React, { useRef, useState } from 'react';

export default function AvatarUpload({ initialAvatar, onAvatarChange, className = '' }) {
    const [preview, setPreview] = useState(initialAvatar || null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            if (onAvatarChange) {
                onAvatarChange(file);
            }
        }
    };

    return (
        <div className={`flex items-center space-x-6 ${className}`}>
            <div className="shrink-0">
                {preview ? (
                    <img className="h-16 w-16 object-cover rounded-full shadow-sm" src={preview} alt="Current profile photo" />
                ) : (
                    <span className="inline-block h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                )}
            </div>
            <div className="flex flex-col space-y-2">
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-[12px] file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#7132F5] file:text-white
                        hover:file:bg-[#5a27c4]
                        cursor-pointer"
                    />
                </label>
                {onAvatarRemove && initialAvatar && (
                    <button
                        type="button"
                        onClick={onAvatarRemove}
                        className="text-sm text-red-600 hover:text-red-800 text-left w-fit"
                    >
                        Remove Avatar
                    </button>
                )}
            </div>
        </div>
    );
}
