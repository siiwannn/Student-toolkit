import React from 'react';

export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-[#7132F5] shadow-sm focus:ring-[#7132F5] ' +
                className
            }
        />
    );
}
