import React from 'react';

import { ArrowRight } from 'lucide-react';

interface FormButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function FormButton({
  children,
  type = 'submit',
  variant = 'primary',
  fullWidth = true,
  showArrow = true,
  onClick,
  disabled = false,
  loading = false
}: FormButtonProps) {
  const baseClasses = 'px-10 py-5 rounded-[7px] transition-all duration-300 font-bold tracking-wide flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-[#385443] text-white hover:bg-[#4a6655] hover:shadow-xl disabled:hover:bg-[#385443]',
    secondary: 'bg-white text-[#385443] border-2 border-[#385443] hover:bg-[#385443] hover:text-white disabled:hover:bg-white disabled:hover:text-[#385443]'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
    >
      <span>{loading ? 'Enviando...' : children}</span>
      {showArrow && !loading && (
        <ArrowRight
          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
          strokeWidth={2.5}
        />
      )}
    </button>
  );
}
