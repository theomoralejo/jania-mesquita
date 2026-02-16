import React from 'react';


interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: FormSelectOption[];
  placeholder?: string;
  variant?: 'underline' | 'bordered';
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  required = false,
  options,
  placeholder = 'Selecione...',
  variant = 'underline'
}: FormSelectProps) {
  const baseClasses = 'w-full transition-colors bg-transparent';
  
  const variantClasses = {
    underline: 'px-0 py-3 border-0 border-b-2 border-[#385443]/20 focus:border-[#385443] focus:outline-none text-[#385443]',
    bordered: 'px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none text-[#232323]'
  };

  return (
    <div>
      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#385443]">
        {label} {required && '*'}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${baseClasses} ${variantClasses[variant]}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
