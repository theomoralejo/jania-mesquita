import React from 'react';


// import imgJaniaEvento from "figma:asset/f0d58dd034beefcde6ef8f99b3d5d3a7ebf48f20.png";
const videoJaniaEvento = `${import.meta.env.BASE_URL}assets/img/palestrasherogifmudoloop.MP4`;

export function PalestrasHeroImage() {
  return (
    <div className="relative w-full h-full min-h-[500px]">
      <video
        src={videoJaniaEvento}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
  );
}