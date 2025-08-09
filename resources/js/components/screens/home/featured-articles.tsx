import type { TPost } from '@/types/models';

import { formatInitials } from '@/lib/format';
import { postLink } from '@/lib/links';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Bookmark, Clock, Heart, MessageCircle } from 'lucide-react';

export const FeaturedArticles = ({ posts }: { posts: TPost[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const post = posts[currentIndex];

    if (!post) {
        return null;
    }

    return (
        <section className="mb-8 overflow-hidden rounded-lg border border-gray-200">
            <div className="relative">
                <a href={postLink(post.user, post)}>
                    <img src={post.image?.name} alt={post.title} width={800} height={300} className="h-64 w-full rounded-t-lg object-cover" />
                </a>
                <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                    {posts.map((_, idx) => (
                        <button
                            key={idx}
                            className={`h-3 w-3 rounded-full transition-colors ${idx === currentIndex ? 'bg-primary' : 'bg-muted'}`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Show featured post ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
            <header className="p-4">
                <div className="mb-2 flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={''} />
                        <AvatarFallback>{formatInitials(post.user.name)}</AvatarFallback>
                    </Avatar>
                    <Link href={`/author/${post.user.id}`} className="text-sm font-medium hover:underline">
                        {post.user.name}
                    </Link>
                    <span className="text-sm text-muted-foreground">•</span>
                    <time className="text-sm text-muted-foreground">{post.published_at}</time>
                </div>
                <h2 className="mb-2 text-2xl font-semibold">
                    <Link href={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                    </Link>
                </h2>
                <p className="text-base text-muted-foreground">{post.excerpt}</p>
            </header>
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className={'text-red-500'}>
                            <Heart className="mr-1 h-4 w-4" />0
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blog/${post.id}#comments`}>
                                <MessageCircle className="mr-1 h-4 w-4" />0
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className={'text-blue-500'}>
                            <Bookmark className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>2</span>
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <Badge key={tag.slug} variant="secondary">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
            </div>
        </section>
    );
};
