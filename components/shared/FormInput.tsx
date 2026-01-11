interface FormInputProps {
  label: string;
  type?: 'text' | 'email' | 'tel';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  variant?: 'underline' | 'bordered';
}

export function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  placeholder,
  variant = 'underline'
}: FormInputProps) {
  const baseInputClasses = 'w-full transition-colors bg-transparent';
  
  const variantClasses = {
    underline: 'px-[10px] py-[12px] border-0 border-b-2 border-[#385443]/20 focus:border-[#385443] focus:outline-none text-[#385443] placeholder:text-[#385443]/50',
    bordered: 'px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none text-[#232323] placeholder:text-[#696969]/60'
  };

  return (
    <div>
      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#385443]">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`${baseInputClasses} ${variantClasses[variant]}`}
      />
    </div>
  );
}
