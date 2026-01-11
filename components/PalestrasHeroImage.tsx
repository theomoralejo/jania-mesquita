import imgJaniaEvento from "figma:asset/f0d58dd034beefcde6ef8f99b3d5d3a7ebf48f20.png";

export function PalestrasHeroImage() {
  return (
    <div className="relative w-full h-full min-h-[500px]">
      <img 
        src={imgJaniaEvento} 
        alt="Jania Mesquita em evento" 
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
  );
}