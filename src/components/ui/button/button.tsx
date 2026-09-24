import React from 'react';
import './button.scss';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

export default function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false }: ButtonProps): React.JSX.Element {
    const buttonClass = `btn ${variant} ${size}`;

    return (
        <button onClick={onClick} className={buttonClass} disabled={disabled}>
            {children}
        </button>
    );
}