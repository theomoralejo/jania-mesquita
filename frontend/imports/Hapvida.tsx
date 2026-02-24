import React from 'react';

export default function Hapvida() {
  return (
    <div className="relative size-full flex items-center justify-center" data-name="Hapvida">
      <img
        src={`${import.meta.env.BASE_URL}assets/img/hapvida.webp`}
        alt="Hapvida"
        className="w-full h-full object-contain"
        style={{ objectFit: 'contain', objectPosition: 'center center' }}
      />
    </div>
  );
}
