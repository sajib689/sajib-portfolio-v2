"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    FileCode,
    Layers,
    Smartphone,
    Database,
    Globe,
    Cpu,
    Framer,
    Container
} from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const skills = [
    { name: "React / Next.js", icon: FileCode, group: "Frontend" },
    { name: "TypeScript", icon: Layers, group: "Frontend" },
    { name: "Tailwind CSS", icon: Globe, group: "Frontend" },
    { name: "Three.js / GSAP", icon: Framer, group: "Motion" },
    { name: "Node.js", icon: Database, group: "Backend" },
    { name: "Go / Phoenix", icon: Cpu, group: "Backend" },
    { name: "PostgreSQL / Redis", icon: Database, group: "Database" },
    { name: "Docker / CI/CD", icon: Container, group: "DevOps" },
];

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".skill-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" ref={containerRef} className="py-32">
            <div className="custom-container">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h2 className="text-primary font-semibold tracking-wider uppercase text-sm">
                        Technical Stack
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Technologies I use to <br />
                        <span className="text-gradient">Empower</span> my products.
                    </h3>
                    <p className="text-muted-foreground text-lg">
                        A curated list of tools and technologies I've mastered to deliver
                        high-quality digital solutions.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skills.map((skill, i) => (
                        <div
                            key={i}
                            className="skill-card p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all hover:scale-[1.02] premium-shadow group cursor-default"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <skill.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <h4 className="font-bold text-lg mb-1">{skill.name}</h4>
                            <p className="text-sm text-muted-foreground">{skill.group}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
