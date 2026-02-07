import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug }
    });

    if (!post) notFound();

    return (
        <main className="min-h-screen bg-background py-20 px-4 md:px-0">
            <article className="max-w-3xl mx-auto space-y-12">
                <Button variant="ghost" asChild className="pl-0 hover:bg-transparent group">
                    <Link href="/blog" className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                        <ArrowLeft size={16} />
                        Back to Articles
                    </Link>
                </Button>

                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-widest text-[10px] py-1">
                            Insights
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar size={14} />
                            {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                        {post.title}
                    </h1>
                </div>

                {post.image && (
                    <div className="aspect-video relative rounded-3xl overflow-hidden premium-shadow">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                )}

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    {post.content.split('\n').map((para: string, i: number) => (
                        <p key={i} className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-wrap">
                            {para}
                        </p>
                    ))}
                </div>

                <div className="pt-12 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string, i: number) => (
                            <Badge key={i} variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-medium bg-muted/50">
                                <Tag size={12} className="mr-2 opacity-50" />
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </article>
        </main>
    );
}
