import React from 'react';

type ButtonProps = {
    label: string;
    variant: 'primary' | 'secondary';
    onClick?: () => void;
    fullWidth?: boolean; // Optional prop for full-width control
};

const Button: React.FC<ButtonProps> = ({ label, variant, onClick, fullWidth = false }) => {
    const baseStyles = `px-6 py-3 rounded-lg font-medium transition duration-300 ${fullWidth ? 'w-full' : 'w-auto'}`;
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'border border-gray-400 text-gray-800 hover:bg-gray-100'
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]}`}
        >
            {label}
        </button>
    );
};

export default Button;
