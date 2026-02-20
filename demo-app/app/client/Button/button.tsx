'use client';
import React from 'react';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    className?: string;
}

export function Button({
    label,
    onClick,
    variant = 'primary',
    disabled = false,
    className = '',
}: ButtonProps) {
    const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
    
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {label}
        </button>
    );
}