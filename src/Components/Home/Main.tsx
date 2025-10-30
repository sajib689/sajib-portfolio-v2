"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import img from "@/src/assets/3.png"
import Image from "next/image";
const Main = () => {
  const boxOne = useRef<HTMLDivElement>(null); 
  const boxTwo = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (boxOne.current) {
      gsap.from(boxOne.current, {
        y: -200,       
        opacity: 0,   
        duration: 1,  
        ease: "bounce",
      });
    }
    if(boxTwo.current) {
      gsap.from(boxTwo.current, {
        y: -200,  
        opacity: 0,
        duration: 1,
        ease: "bounce",
        yoyo: true,
        borderRadius: "50%",
        repeat: -1
        
      })
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 custom-container mt-10">
      <div ref={boxOne} className="bg-red-500 w-48 h-48 rounded-full"></div>
      <div  className="bg-red-500 w-48 h-48 rounded-full"></div>
      <div className="bg-red-500 w-48 h-48 rounded-full"></div>
      <div ref={boxTwo} className="bg-accent  w-48 h-48 !rounded-full flex flex-col justify-center items-center">
        <Image className="rounded-full" src={img} width={120} height={120} alt="img"/>
      </div>
    </div>
  );
};

export default Main;
