"use client";

import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { sendMessage } from "@/app/admin/actions";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const result = await sendMessage(formData);

        if (result.success) {
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } else {
            setError(result.error || "Something went wrong. Please try again.");
        }
        setLoading(false);
    };

    return (
        <section id="contact" ref={containerRef} className="py-32 bg-muted/20">
            <div className="custom-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <Badge variant="outline" className="text-primary border-primary/20 tracking-widest uppercase text-[10px] py-1">
                                Get In Touch
                            </Badge>
                            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
                                Let's Build Something <br />
                                <span className="text-gradient">Extraordinary</span> Together.
                            </h3>
                            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                                Have a project in mind or just want to say hi? I'm always open
                                to discussing new opportunities and creative ideas.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Mail, label: "Email", value: "hello@sajib.dev" },
                                { icon: Phone, label: "Phone", value: "+880 123 456 789" },
                                { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-5 group">
                                    <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center text-primary premium-shadow border border-border/50 group-hover:scale-110 transition-transform duration-300">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-xl font-bold italic group-hover:text-primary transition-colors">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Card className="border-none bg-card/50 backdrop-blur-sm p-2 md:p-4 premium-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-10" />

                        {success ? (
                            <CardContent className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20 animate-in fade-in zoom-in duration-500">
                                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                                    <CheckCircle2 size={48} />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-3xl font-bold">Message Sent!</h4>
                                    <p className="text-muted-foreground max-w-xs mx-auto">
                                        Thank you for reaching out. I'll get back to you as soon as possible.
                                    </p>
                                </div>
                                <Button
                                    variant="link"
                                    onClick={() => setSuccess(false)}
                                    className="text-primary font-bold text-lg"
                                >
                                    Send another message
                                </Button>
                            </CardContent>
                        ) : (
                            <CardContent className="p-8 md:p-10">
                                <form className="space-y-8" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2.5">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Name</label>
                                            <Input
                                                name="name"
                                                required
                                                placeholder="John Doe"
                                                className="bg-muted/30 h-12 rounded-xl border-border/50 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div className="space-y-2.5">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                                            <Input
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="john@example.com"
                                                className="bg-muted/30 h-12 rounded-xl border-border/50 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
                                        <Input
                                            name="subject"
                                            required
                                            placeholder="Project Inquiry"
                                            className="bg-muted/30 h-12 rounded-xl border-border/50 focus:ring-primary/20"
                                        />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</label>
                                        <Textarea
                                            name="message"
                                            required
                                            placeholder="Tell me about your project..."
                                            rows={5}
                                            className="bg-muted/30 rounded-xl border-border/50 focus:ring-primary/20 resize-none"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 ml-1">
                                        <input type="checkbox" name="isAppointment" id="isAppointment" className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50 accent-primary" />
                                        <label htmlFor="isAppointment" className="text-sm font-semibold text-muted-foreground cursor-pointer">Request a Video Call Appointment</label>
                                    </div>

                                    {error && (
                                        <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-sm font-medium border border-destructive/20">
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        disabled={loading}
                                        className="w-full h-14 text-lg font-bold rounded-xl premium-shadow group transition-all"
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                        {!loading && <Send className="w-5 h-5 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />}
                                    </Button>
                                </form>
                            </CardContent>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Contact;
