import React from 'react';

export default function PreventSenior() {
  return (
    <div className="relative size-full flex items-center justify-center" data-name="PreventSenior">
      <img
        src={`${import.meta.env.BASE_URL}assets/img/prevent-senior.webp`}
        alt="Prevent Senior"
        className="w-full h-full object-contain"
        style={{ objectFit: 'contain', objectPosition: 'center center' }}
      />
    </div>
  );
}
