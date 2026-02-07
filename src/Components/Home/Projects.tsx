"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProject } from "@/app/admin/actions";

const Projects = ({ projects, isFallback, isAdmin = false }: { projects: any[], isFallback: boolean, isAdmin?: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".project-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            await deleteProject(id);
        }
    };

    return (
        <section id="projects" ref={containerRef} className="py-32 bg-background">
            <div className="custom-container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-primary border-primary/20 tracking-widest uppercase text-[10px] py-1">
                                Portfolio
                            </Badge>
                            {isFallback ? (
                                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 uppercase text-[10px]">
                                    Demo Mode
                                </Badge>
                            ) : (
                                <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 uppercase text-[10px]">
                                    Live
                                </Badge>
                            )}
                        </div>

                        <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Featured <span className="text-gradient">Projects</span>
                        </h3>

                        <p className="text-muted-foreground text-lg leading-relaxed">
                            A selection of my recent work where I've combined design and
                            engineering to solve real-world problems.
                        </p>
                    </div>
                    <Button variant="outline" asChild className="rounded-full px-8 h-14 text-base font-medium group">
                        <Link href="https://github.com/sajib689" target="_blank">
                            View More on GitHub
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects?.map((project, i) => (
                        <Card
                            key={project.id || i}
                            className="project-card group border-none bg-card/50 backdrop-blur-sm premium-shadow overflow-hidden transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                                    <Button size="icon" variant="secondary" asChild className="rounded-full w-12 h-12 bg-white/20 backdrop-blur-md border-white/30 hover:bg-white hover:text-black transition-all duration-300">
                                        <Link href={project.github} target="_blank">
                                            <Github size={20} />
                                        </Link>
                                    </Button>
                                    <Button size="icon" variant="secondary" asChild className="rounded-full w-12 h-12 bg-white/20 backdrop-blur-md border-white/30 hover:bg-white hover:text-black transition-all duration-300">
                                        <Link href={project.live} target="_blank">
                                            <ExternalLink size={20} />
                                        </Link>
                                    </Button>
                                    {isAdmin && (
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => handleDelete(project.id)}
                                            className="rounded-full w-12 h-12 shadow-xl"
                                        >
                                            <Trash2 size={20} />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <CardHeader className="p-6 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag: string, j: number) => (
                                        <Badge key={j} variant="outline" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground border-border/50">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <h4 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                                    {project.title}
                                </h4>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                                    {project.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                    {projects?.length === 0 && (
                        <div className="col-span-full py-24 text-center border-2 border-dashed border-border rounded-[2rem] bg-muted/20">
                            <p className="text-muted-foreground text-lg">No projects found. Add some to get started!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};


export default Projects;

