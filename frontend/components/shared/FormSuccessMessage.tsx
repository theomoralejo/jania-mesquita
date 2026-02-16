import React from 'react';

import { CheckCircle2 } from 'lucide-react';

interface FormSuccessMessageProps {
  title?: string;
  message: string;
  email?: string;
  onReset?: () => void;
  resetButtonText?: string;
}

export function FormSuccessMessage({
  title = 'Solicitação Recebida!',
  message,
  email,
  onReset,
  resetButtonText = 'Enviar nova solicitação'
}: FormSuccessMessageProps) {
  return (
    <div className="bg-white text-[#232323] rounded-[7px] p-12 text-center shadow-2xl">
      <div className="w-20 h-20 bg-[#385443] rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={1.5} />
      </div>
      
      <h3 className="font-serif text-3xl mb-6 tracking-tight text-[#232323]">
        {title}
      </h3>
      
      <p className="text-lg text-[#696969] leading-relaxed mb-6">
        {message}
      </p>
      
      {email && (
        <p className="text-sm text-[#696969]">
          Confirmação enviada para <span className="font-medium text-[#232323]">{email}</span>
        </p>
      )}
      
      {onReset && (
        <button
          onClick={onReset}
          className="mt-8 text-[#385443] hover:text-[#4a6655] font-medium transition-colors duration-300 underline"
        >
          {resetButtonText}
        </button>
      )}
    </div>
  );
}
