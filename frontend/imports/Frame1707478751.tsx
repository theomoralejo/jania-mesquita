import React from 'react';
import imgMask from "figma:asset/d47f9f5af24fd7129274afad903571dd3819a330.png";
import imgBitmap from "figma:asset/18240d8c88b474ac593e68ffda3575628f29ad55.png";
import imgBitmap1 from "figma:asset/50764eaa6d056ba033d05278d4b48e9eaaa3bd8c.png";
import imgBitmap3 from "figma:asset/01601d872850a3fa543369c48eafb174e13bae22.png";
import imgBitmap4 from "figma:asset/47f97bc053d14e17d82211c965f105bd0fcf415d.png";
import { imgBitmap2 } from "./svg-uo6to";

function Bitmap() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Bitmap">
      <div className="absolute h-[499.769px] left-0 rounded-[7.65px] top-[60.04px] w-[469.176px]" data-name="Mask">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[7.65px]">
          <div className="absolute bg-[#c1c1c1] inset-0 rounded-[7.65px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[7.65px] size-full" src={imgMask} />
        </div>
      </div>
      <div className="absolute h-[692px] left-[0.46px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.786px] mask-size-[469px_685px] top-[-0.79px] w-[469.176px]" data-name="Bitmap" style={{ maskImage: `url('${imgBitmap}')` }}>
        <img alt="" className="block max-w-none size-full" height="692" src={imgBitmap1} width="469.176" />
      </div>
    </div>
  );
}

function Bitmap1() {
  return (
    <div className="absolute contents left-[396.82px] top-[187.47px]" data-name="Bitmap">
      <div className="absolute h-[275.128px] left-[396.82px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[178.645px_275.128px] rounded-[7.65px] top-[187.47px] w-[178.645px]" data-name="Bitmap" style={{ maskImage: `url('${imgBitmap2}')` }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[7.65px]">
          <div className="absolute bg-[#c1c1c1] inset-0 rounded-[7.65px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[7.65px] size-full" src={imgMask} />
          <div className="absolute inset-0 overflow-hidden rounded-[7.65px]">
            <img alt="" className="absolute h-[164.11%] left-[-56.96%] max-w-none top-[-3.45%] w-[168.52%]" src={imgBitmap3} />
          </div>
          <div className="absolute inset-0 overflow-hidden rounded-[7.65px]">
            <img alt="" className="absolute h-full left-[-14.38%] max-w-none top-0 w-[214.71%]" src={imgBitmap4} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#42331c] h-[246px] left-[404.46px] rounded-[7.65px] top-[33.67px] w-[130px]" data-name="Rectangle" />
      <Bitmap />
      <Bitmap1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <Group />
    </div>
  );
}