"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import img from "@/src/assets/3.png"
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5
      });

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="custom-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div ref={textRef} className="space-y-8">
          <div className="space-y-4">
            <h2 className="hero-text text-primary font-semibold tracking-wider uppercase text-sm">
              Available for Freelance Work
            </h2>
            <h1 className="hero-text text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
              Crafting Digital <br />
              <span className="text-gradient">Experiences</span> that Matter.
            </h1>
            <p className="hero-text text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Hi, I'm Sajib. A passionate Full-Stack Developer dedicated to building
              high-performance, beautiful, and user-centric web applications.
            </p>
          </div>

          <div className="hero-text flex flex-wrap gap-4 items-center">
            <Link
              href="#projects"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-all premium-shadow group"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Twitter, href: "https://twitter.com" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="p-3 border border-border rounded-full hover:bg-muted transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="hero-text pt-8 flex items-center gap-12 border-t border-border w-fit">
            <div>
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-muted-foreground">Projects Done</p>
            </div>
            <div>
              <p className="text-2xl font-bold">4+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div ref={imageRef} className="relative z-10 w-full max-w-md aspect-square bg-gradient-to-br from-primary/20 to-chart-1/20 rounded-3xl overflow-hidden premium-shadow border border-white/10 glass">
            <Image
              src={img}
              alt="Sajib"
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              priority
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-chart-1/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
