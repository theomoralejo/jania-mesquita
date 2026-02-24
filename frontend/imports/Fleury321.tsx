import React from 'react';

export default function Fleury() {
  return (
    <div className="relative size-full flex items-center justify-center" data-name="Fleury-32 1">
      <img
        src={`${import.meta.env.BASE_URL}assets/img/fleury.webp`}
        alt="Fleury"
        className="w-full h-full object-contain"
        style={{ objectFit: 'contain', objectPosition: 'center center' }}
      />
    </div>
  );
}
