interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  variant?: 'underline' | 'bordered';
}

export function FormTextarea({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  rows = 4,
  variant = 'underline'
}: FormTextareaProps) {
  const baseClasses = 'w-full transition-colors bg-transparent resize-none';
  
  const variantClasses = {
    underline: 'px-[10px] py-[12px] border-0 border-b-2 border-[#385443]/20 focus:border-[#385443] focus:outline-none text-[#385443] placeholder:text-[#385443]/50',
    bordered: 'px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none text-[#232323] placeholder:text-[#696969]/60'
  };

  return (
    <div>
      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#385443]">
        {label} {required && '*'}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={`${baseClasses} ${variantClasses[variant]}`}
      />
    </div>
  );
}
