import { useRef, useEffect, ChangeEvent } from 'react';

interface AutoGrowTextareaProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: () => void;
    name?: string;
    id?: string;
    placeholder?: string;
    maxLength?: number;
    className?: string;
    rows?: number;
    minHeight?: string | number;
    maxHeight?: string | number;
}

export default function AutoGrowTextarea({
    value,
    onChange,
    onBlur,
    name,
    id,
    placeholder,
    maxLength,
    className = '',
    rows = 1,
    minHeight = '40px',
    maxHeight = '128px', // Tailwind max-h-32 = 8rem = 128px
}: AutoGrowTextareaProps) {
    const ref = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const ta = ref.current;
        if (ta) {
            ta.style.height = 'auto';
            ta.style.height = `${ta.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            id={id}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={rows}
            className={`text-3xl focus:outline-none resize-none overflow-hidden w-full max-h-32 ${className}`}
            style={{
                minHeight,
                maxHeight,
                overflow: 'hidden',
            }}
        />
    );
}
