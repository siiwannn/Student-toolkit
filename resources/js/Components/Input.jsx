import React, { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Input(
    { type = 'text', className = '', isFocused = false, ...props },
    ref
) {
    const localRef = useRef(null);

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 focus:border-[#7132F5] focus:ring-[#7132F5] rounded-[12px] shadow-sm ' +
                className
            }
            ref={ref ? ref : localRef}
        />
    );
});
