import React from 'react';

type ButtonProps = {

};

const Button = ({ label, variant }: { label: string; variant: 'primary' | 'secondary' }) => {
    const baseStyles = 'px-6 py-3 rounded-lg font-medium transition duration-300';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'border border-gray-400 text-gray-800 hover:bg-gray-100'
    };

    return <button className={`${baseStyles} ${variants[variant]}`}>{label}</button>;
};

export default Button;