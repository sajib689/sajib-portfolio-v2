"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="py-20 border-t border-border">
            <div className="custom-container">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="space-y-6 text-center md:text-left">
                        <Link href="/" className="text-3xl font-bold tracking-tighter">
                            Sajib.
                        </Link>
                        <p className="text-muted-foreground max-w-xs mx-auto md:mx-0">
                            Building the future of the web, one pixel at a time.
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-12 sm:gap-24 text-center md:text-left justify-center md:justify-start">
                        <div className="space-y-4">
                            <h4 className="font-bold uppercase tracking-widest text-xs opacity-50">Navigation</h4>
                            <ul className="space-y-2">
                                {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                                    <li key={item}>
                                        <Link href={`#${item.toLowerCase()}`} className="text-sm hover:text-primary transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold uppercase tracking-widest text-xs opacity-50">Legals</h4>
                            <ul className="space-y-2">
                                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm hover:text-primary transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="w-12 h-12 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all premium-shadow group"
                    >
                        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

                <div className="mt-20 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Sajib. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
