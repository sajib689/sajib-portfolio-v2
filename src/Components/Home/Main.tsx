"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import img from "@/src/assets/3.png"
import img2 from "@/src/assets/2.webp"
const Main = () => {
  const boxOne = useRef<HTMLDivElement>(null);
  const boxTwo = useRef<HTMLDivElement>(null);
  const boxThree = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxOne.current) {
      gsap.from(boxOne.current, {
        x: 300,
        duration: 2,
        ease: "linear",
        repeat: -1,
        yoyo: true,
      });
    }

    if (boxTwo.current) {
      gsap.from(boxTwo.current, {
        x: -300,
        duration: 2,
        ease: "linear",
        repeat: -1,
        yoyo: true,
      });
    }

    if (boxThree.current) {
      gsap.from(boxThree.current, {
        y: 200,
        duration: 2,
        ease: "linear",
        repeat: -1,
        yoyo: true,
      });
    }

  }, []);

  return (
    <div className="flex justify-center items-center gap-6 h-screen bg-white">
      <div
        ref={boxOne}
        className="rounded-xl shadow-lg"
      >
         <Image src={img2} width={300} height={250} alt="box" />
      </div>
      <div
        ref={boxTwo}
        className="rounded-xl shadow-lg"
      >
        <Image src={img} width={300} height={250} alt="box" className="object-fill object-center"/>
      </div>
      <div
        ref={boxThree}
        className=" rounded-xl shadow-lg"
      >
        <h1 className="text-black text-4xl">Pola da sundor toa</h1>
      </div>
    </div>
  );
};

export default Main;
