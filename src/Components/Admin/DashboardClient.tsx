"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { deleteProject, addProject, deleteMessage, addPost, deletePost, getPosts } from "@/app/admin/actions";
import { Plus, Trash2, ExternalLink, Github, LayoutGrid, LogOut, MessageSquare, User, Mail, Calendar, Users, Zap, Video, VideoOff, Clock, FileText, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

let socket: any;

export default function DashboardClient({ initialProjects, initialMessages, initialAppointments, initialPosts }: any) {
    const [projects, setProjects] = useState(initialProjects);
    const [messages, setMessages] = useState(initialMessages);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [posts, setPosts] = useState(initialPosts);
    const [activeVisitors, setActiveVisitors] = useState<any[]>([]);

    const handleAddPost = async (formData: FormData) => {
        const res = await addPost(formData);
        if (res?.error) alert(res.error);
        else setPosts(await getPosts());
    };

    const handleDeletePost = async (id: string | undefined) => {
        if (!id) return;
        if (confirm("Are you sure you want to delete this post?")) {
            await deletePost(id);
            setPosts(await getPosts());
        }
    };


    useEffect(() => {
        const socketInitializer = async () => {
            await fetch("/api/socket");
            socket = io();

            socket.on("admin-visitor-update", (data: any) => {
                setActiveVisitors(prev => {
                    const filtered = prev.filter(v => v.socketId !== data.socketId);
                    return [...filtered, data];
                });
            });

            socket.on("visitor-disconnected", (socketId: string) => {
                setActiveVisitors(prev => prev.filter(v => v.socketId !== socketId));
            });
        };

        socketInitializer();
        return () => {
            if (socket) socket.disconnect();
        };
    }, []);

    const handleLogout = async () => {
        // We'll use a form-based logout or a simple route call
        const resp = await fetch("/api/logout", { method: "POST" });
        if (resp.ok) window.location.href = "/admin/login";
    };

    return (
        <div className="min-h-screen bg-muted/30 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header with Stats */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-card p-6 border border-border rounded-3xl premium-shadow glass">
                    <div className="flex items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tighter">Command Center</h1>
                            <p className="text-muted-foreground text-sm">Real-time portfolio management.</p>
                        </div>
                        <div className="h-10 w-[1px] bg-border hidden md:block" />
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active Users</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-2xl font-bold">{activeVisitors.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Link href="/" className="flex-1 md:flex-none px-6 py-2 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors text-center">
                            View Site
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex-1 md:flex-none px-6 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-full text-sm font-medium hover:bg-destructive hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Visitor Logs */}
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 ml-2">
                            <Users size={20} className="text-primary" />
                            Live Visitors
                        </h2>
                        <div className="space-y-4">
                            {activeVisitors.map((v) => (
                                <div key={v.socketId} className="bg-card border border-border rounded-2xl p-4 premium-shadow glass animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-primary truncate max-w-[100px]">ID: {v.socketId.slice(-4)}</span>
                                        <span className="text-[10px] text-muted-foreground">{new Date(v.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-sm font-medium truncate">{v.userAgent.split("/")[0]}</p>
                                    <p className="text-[10px] text-muted-foreground font-mono truncate">{v.path}</p>
                                </div>
                            ))}
                            {activeVisitors.length === 0 && (
                                <div className="py-12 text-center border-2 border-dashed border-border rounded-3xl opacity-50">
                                    <p className="text-xs text-muted-foreground">No active visitors</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-12">
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                            {/* Add Project Form */}
                            <div className="xl:col-span-1 bg-card border border-border rounded-3xl p-8 premium-shadow glass h-fit">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Plus size={20} className="text-primary" />
                                    New Project
                                </h2>
                                <form action={addProject} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Title</label>
                                        <input name="title" required className="w-full px-4 py-2 bg-muted/50 border border-border rounded-xl focus:outline-hidden" placeholder="Project Name" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Description</label>
                                        <textarea name="desc" required rows={3} className="w-full px-4 py-2 bg-muted/50 border border-border rounded-xl focus:outline-hidden resize-none" placeholder="Brief overview..." />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Image URL</label>
                                        <input name="image" required className="w-full px-4 py-2 bg-muted/50 border border-border rounded-xl focus:outline-hidden" placeholder="https://..." />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Tags (comma separated)</label>
                                        <input name="tags" required className="w-full px-4 py-2 bg-muted/50 border border-border rounded-xl focus:outline-hidden" placeholder="Next.js, Tailwind, etc" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">GitHub</label>
                                            <input name="github" className="w-full px-4 py-2 bg-muted/50 border border-border rounded-xl focus:outline-hidden" placeholder="#" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Live Demo</label>
                                            <input name="live" className="w-full px-4 py-2 bg-muted/50 border border-border rounded-xl focus:outline-hidden" placeholder="#" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold mt-4 hover:opacity-90 transition-opacity">
                                        Deploy Project
                                    </button>
                                </form>
                            </div>

                            {/* Project List */}
                            <div className="xl:col-span-2 space-y-6">
                                <h2 className="text-xl font-bold flex items-center gap-2 ml-2">
                                    <LayoutGrid size={20} className="text-primary" />
                                    Existing Projects ({projects.length})
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.map((project: any) => (
                                        <div key={project._id} className="bg-card border border-border rounded-2xl overflow-hidden premium-shadow group">
                                            <div className="aspect-video relative overflow-hidden">
                                                <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                                <form action={async (formData) => { await deleteProject(project._id); }}>
                                                    <button className="absolute top-2 right-2 p-2 bg-destructive/10 text-destructive backdrop-blur-md border border-destructive/20 rounded-full hover:bg-destructive hover:text-white transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </form>
                                            </div>
                                            <div className="p-4 space-y-2">
                                                <h3 className="font-bold truncate">{project.title}</h3>
                                                <div className="flex gap-2">
                                                    <Link href={project.live} target="_blank" className="p-1.5 border border-border rounded-md hover:bg-muted transition-colors">
                                                        <ExternalLink size={14} />
                                                    </Link>
                                                    <Link href={project.github} target="_blank" className="p-1.5 border border-border rounded-md hover:bg-muted transition-colors">
                                                        <Github size={14} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                            {/* Add Blog Form */}
                            <Card className="xl:col-span-1 border-none bg-card/50 backdrop-blur-sm premium-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText size={20} className="text-primary" />
                                        New Blog Post
                                    </CardTitle>
                                    <CardDescription>Create a new article for your blog.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form action={handleAddPost} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Title</label>
                                            <Input name="title" required placeholder="Post Title" className="bg-muted/30" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Content (Markdown/Text)</label>
                                            <Textarea name="content" required rows={5} placeholder="Write your post content here..." className="bg-muted/30 resize-none" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Image URL</label>
                                            <div className="relative">
                                                <ImageIcon size={14} className="absolute left-3 top-3 text-muted-foreground" />
                                                <Input name="image" placeholder="https://..." className="bg-muted/30 pl-10" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Tags (comma separated)</label>
                                            <Input name="tags" placeholder="Tech, Life, Coding" className="bg-muted/30" />
                                        </div>
                                        <Button type="submit" className="w-full mt-4 font-bold h-12">
                                            Publish Post
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Blog Post List */}
                            <div className="xl:col-span-2 space-y-6">
                                <h2 className="text-xl font-bold flex items-center gap-2 ml-2">
                                    <FileText size={20} className="text-primary" />
                                    Managed Posts ({posts.length})
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {posts.map((post: any) => (
                                        <Card key={post.id} className="border-none bg-card/50 backdrop-blur-sm premium-shadow group overflow-hidden">
                                            <div className="aspect-video relative overflow-hidden">
                                                {post.image ? (
                                                    <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                                ) : (
                                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                                        <ImageIcon size={40} className="text-muted-foreground/20" />
                                                    </div>
                                                )}
                                                <div className="absolute top-2 right-2 flex gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="destructive"
                                                        onClick={() => handleDeletePost(post.id)}
                                                        className="rounded-full h-8 w-8 shadow-lg"
                                                    >
                                                        <Trash2 size={14} />
                                                    </Button>
                                                </div>
                                            </div>
                                            <CardHeader className="p-4">
                                                <CardTitle className="text-base truncate">{post.title}</CardTitle>
                                                <CardDescription className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-[10px] py-0">{new Date(post.createdAt).toLocaleDateString()}</Badge>
                                                    <span className="text-[10px] text-muted-foreground">{post.tags?.length || 0} Tags</span>
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                    {posts.length === 0 && (
                                        <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl bg-muted/10">
                                            <p className="text-muted-foreground">No posts yet. Write your first one!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Appointments Section */}
                        <section className="space-y-6 pt-12 border-t border-border/50">
                            <h2 className="text-xl font-bold flex items-center gap-2 ml-2">
                                <Video size={20} className="text-primary" />
                                Upcoming Appointments ({appointments.length})
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {appointments.map((app: any) => (
                                    <Card key={app.id} className="border-none bg-card/50 backdrop-blur-sm premium-shadow group">
                                        <CardHeader className="p-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2 text-primary">
                                                    <Clock size={16} />
                                                    <span className="text-xs font-bold uppercase">{new Date(app.time).toLocaleDateString()}</span>
                                                </div>
                                                <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px]">
                                                    {app.status || "Scheduled"}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-lg">{app.name}</CardTitle>
                                            <CardDescription>{app.email}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-6 pb-6">
                                            <Button asChild className="w-full gap-2 font-bold rounded-xl">
                                                <Link href={`/admin/video/${app.roomId}`} target="_blank">
                                                    <Video size={16} />
                                                    Join Video Call
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                                {appointments.length === 0 && (
                                    <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-3xl bg-muted/10 text-muted-foreground">
                                        No appointments scheduled
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Messages Section */}
                        <section className="space-y-6 pt-12 border-t border-border/50">
                            <h2 className="text-xl font-bold flex items-center gap-2 ml-2">
                                <MessageSquare size={20} className="text-primary" />
                                Inquiries ({messages.length})
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {messages.map((msg: any) => (
                                    <Card key={msg.id} className="border-none bg-card/50 backdrop-blur-sm premium-shadow group relative">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute top-4 right-4 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-full"
                                            onClick={async () => { if (confirm("Delete message?")) await deleteMessage(msg.id); }}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                        <CardHeader className="p-6 space-y-4">
                                            <div className="flex flex-wrap gap-4 text-xs font-medium text-muted-foreground border-b border-border/50 pb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <User size={14} className="text-primary" />
                                                    <span className="text-foreground">{msg.name}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Mail size={14} className="text-primary" />
                                                    <span>{msg.email}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={14} className="text-primary" />
                                                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <CardTitle className="text-lg">{msg.subject}</CardTitle>
                                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
