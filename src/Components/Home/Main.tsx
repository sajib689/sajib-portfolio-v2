"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import img from "@/src/assets/image.png";
import img2 from "@/src/assets/2.webp";

const Main = () => {
  const boxOne = useRef<HTMLDivElement>(null);
  const boxTwo = useRef<HTMLDivElement>(null);
  const boxThree = useRef<HTMLDivElement>(null);
  const boxFour = useRef<HTMLDivElement>(null);
  const boxFive = useRef<HTMLDivElement>(null);
  const boxSix = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 🔹 Independent Animations
    gsap.from(boxOne.current, {
      x: 300,
      duration: 2,
      ease: "linear",
      repeat: -1,
      yoyo: true,
    });

    gsap.from(boxTwo.current, {
      x: -300,
      duration: 2,
      ease: "linear",
      repeat: -1,
      yoyo: true,
    });

    gsap.from(boxThree.current, {
      y: 200,
      duration: 2,
      ease: "linear",
      repeat: -1,
      yoyo: true,
    });

    // 🔹 Timeline Animation (runs in sequence)
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(boxFour.current, { x: 600, duration: 1, ease: "linear" })
      .to(boxFive.current, { x: 900, duration: 2, ease: "linear" })
      .to(boxSix.current, { x: 1000, duration: 3, ease: "linear" });
  }, []);

  return (
    <div className="flex flex-col  gap-8 bg-white">
      {/* Top Row */}
      <div className="flex gap-6">
        <div ref={boxOne} className="rounded-xl shadow-lg overflow-hidden">
          <Image src={img2} width={300} height={250} alt="box" />
        </div>

        <div ref={boxTwo} className="rounded-xl shadow-lg overflow-hidden">
          <Image
            src={img}
            width={300}
            height={250}
            alt="box"
            className="object-cover"
          />
        </div>

        <div ref={boxThree} className="rounded-xl shadow-lg flex items-center justify-center w-[300px] h-[250px] bg-gray-100">
          <h1 className="text-black text-2xl font-semibold text-center">
            Pola da sundor toa 😄
          </h1>
        </div>
      </div>

      {/* Bottom Row (timeline boxes) */}
      <div className="flex gap-6">
        <div
          ref={boxFour}
          className="w-24 h-24 bg-yellow-400 rounded-lg shadow-md"
        ></div>
        <div
          ref={boxFive}
          className="w-24 h-24 bg-yellow-400 rounded-lg shadow-md"
        ></div>
        <div
          ref={boxSix}
          className="w-24 h-24 bg-yellow-400 rounded-lg shadow-md"
        ></div>
      </div>
    </div>
  );
};

export default Main;
