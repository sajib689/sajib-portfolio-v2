"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Code, Heart, Coffee } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-animate", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-32 bg-muted/30">
            <div className="custom-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 about-animate">
                        <div className="space-y-4">
                            <h2 className="text-primary font-semibold tracking-wider uppercase text-sm">
                                About Me
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">
                                Passion for Building <br />
                                <span className="text-gradient">Innovative</span> Solutions.
                            </h3>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            I'm a Full-Stack Developer with a deep-rooted passion for creating
                            elegant, efficient, and scalable web applications. My journey in
                            the world of tech has been driven by an insatiable curiosity and
                            a desire to solve complex problems through code.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { icon: User, label: "Detail Oriented", desc: "Focus on every pixel" },
                                { icon: Code, label: "Clean Code", desc: "Maintainable & Scalable" },
                                { icon: Heart, label: "User Focused", desc: "Experience is everything" },
                                { icon: Coffee, label: "Quick Learner", desc: "Always evolving" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{item.label}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative about-animate">
                        <div className="aspect-square bg-gradient-to-br from-primary to-chart-1 rounded-[2rem] rotate-3 opacity-10 absolute inset-0 -z-10" />
                        <div className="aspect-square bg-card border border-border rounded-[2rem] p-8 space-y-8 premium-shadow glass">
                            <div className="space-y-4">
                                <h4 className="text-2xl font-bold">What I Do Best</h4>
                                <p className="text-muted-foreground italic">
                                    "Turning complex ideas into simple, beautiful digital realities."
                                </p>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    "Architecting scalable frontend architectures with Next.js",
                                    "Building robust backend systems with Node.js & Go",
                                    "Designing intuitive user interfaces that drive engagement",
                                    "Optimizing performance for seamless user experiences"
                                ].map((text, i) => (
                                    <li key={i} className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                                        <span className="text-sm font-medium">{text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8 border-t border-border flex justify-between items-center text-sm font-semibold">
                                <span>Experience: 4.5 Years</span>
                                <span>Location: Dhaka, BD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
