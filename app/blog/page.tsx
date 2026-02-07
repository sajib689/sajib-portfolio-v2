import { getPosts } from "../admin/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main className="min-h-screen bg-background py-20 px-4 md:px-0">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-4">
                        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent group">
                            <Link href="/" className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                                <ArrowLeft size={16} />
                                Back to Portfolio
                            </Link>
                        </Button>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Latest <span className="text-gradient">Insights</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Thoughts on design, development, and the future of technology.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post: any) => (
                        <Card key={post.id} className="border-none bg-card/50 backdrop-blur-sm premium-shadow group overflow-hidden flex flex-col">
                            <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                                {post.image ? (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                        <Tag size={40} className="text-muted-foreground/20" />
                                    </div>
                                )}
                            </Link>
                            <CardHeader className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-primary border-primary/20">
                                        Post
                                    </Badge>
                                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                        <Clock size={12} />
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <Link href={`/blog/${post.slug}`}>
                                    <CardTitle className="text-2xl group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </CardTitle>
                                </Link>
                                <CardDescription className="line-clamp-3 mt-4 leading-relaxed">
                                    {post.content}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="p-6 pt-0 flex flex-wrap gap-2">
                                {post.tags?.map((tag: string, i: number) => (
                                    <Badge key={i} variant="secondary" className="text-[9px] bg-muted/50 border-none text-muted-foreground">
                                        {tag}
                                    </Badge>
                                ))}
                            </CardFooter>
                        </Card>
                    ))}

                    {posts.length === 0 && (
                        <div className="col-span-full py-32 text-center border-2 border-dashed border-border rounded-[2rem] bg-muted/20">
                            <h3 className="text-xl font-bold mb-2">No articles found</h3>
                            <p className="text-muted-foreground">Stay tuned for upcoming insights and tutorials.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
