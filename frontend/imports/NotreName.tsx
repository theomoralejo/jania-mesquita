import React from 'react';

export default function NotreName() {
  return (
    <div className="relative size-full flex items-center justify-center" data-name="NotreName">
      <img
        src="/assets/img/notrename.webp"
        alt="Notre Dame"
        className="w-full h-full object-contain"
        style={{ objectFit: 'contain', objectPosition: 'center center' }}
      />
    </div>
  );
}
