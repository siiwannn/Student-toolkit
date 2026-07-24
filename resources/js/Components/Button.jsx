import React from 'react';

export default function Button({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center px-4 py-2 bg-[#7132F5] border border-transparent rounded-[12px] font-semibold text-white uppercase tracking-widest hover:bg-[#5a27c4] focus:bg-[#5a27c4] active:bg-[#431d93] focus:outline-none focus:ring-2 focus:ring-[#7132F5] focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-50 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
