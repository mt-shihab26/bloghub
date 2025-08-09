import type { TPost } from '@/types/models';

import { formatInitials } from '@/lib/format';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Bookmark, Clock, Heart, MessageCircle } from 'lucide-react';

export const FeaturedArticles = ({ posts }: { posts: TPost[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const post = posts[currentIndex];

    if (!post) {
        return null;
    }

    return (
        <Card className="mb-8 overflow-hidden">
            <div className="relative">
                <img src={post.image?.name || '/placeholder.svg'} alt={post.title} width={800} height={300} className="h-64 w-full object-cover" />
                <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>

                {/* Pagination dots */}
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

            <CardHeader>
                <div className="mb-2 flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={''} />
                        <AvatarFallback>{formatInitials(post.user.name)}</AvatarFallback>
                    </Avatar>
                    <Link href={`/author/${post.user.id}`} className="text-sm font-medium hover:underline">
                        {post.user.name}
                    </Link>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.published_at}</span>
                </div>
                <CardTitle className="mb-2 text-2xl">
                    <Link href={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                    </Link>
                </CardTitle>
                <CardDescription className="text-base">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className={true ? 'text-red-500' : ''}>
                            <Heart className="mr-1 h-4 w-4" />0
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blog/${post.id}#comments`}>
                                <MessageCircle className="mr-1 h-4 w-4" />0
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className={true ? 'text-blue-500' : ''}>
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
            </CardContent>
        </Card>
    );
};
