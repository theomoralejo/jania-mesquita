import React from 'react';

export function PageLoader() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-[#122A2F]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
                <span className="text-sm text-[#122A2F]/60 uppercase tracking-widest font-sans">Carregando...</span>
            </div>
        </div>
    );
}
