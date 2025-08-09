import { useState } from 'react';

import { recommendedBlogs } from './data';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Bookmark, Clock, Heart, MessageCircle, TrendingUp } from 'lucide-react';

export const RecommendedArticles = () => {
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());

    const handleLike = (postId: number) => {
        setLikedPosts((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const handleBookmark = (postId: number) => {
        setBookmarkedPosts((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    return (
        <div className="space-y-6">
            <h2 className="flex items-center text-2xl font-bold">
                <TrendingUp className="mr-2 h-6 w-6" />
                Recommended for You
            </h2>
            {recommendedBlogs.slice(1).map((blog) => (
                <Card key={blog.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                            <img
                                src={blog.image || '/placeholder.svg'}
                                alt={blog.title}
                                width={300}
                                height={200}
                                className="h-48 w-full object-cover md:h-full"
                            />
                        </div>
                        <div className="md:w-2/3">
                            <CardHeader>
                                <div className="mb-2 flex items-center space-x-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={blog.author.avatar || '/placeholder.svg'} />
                                        <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <Link href={`/author/${blog.author.username}`} className="text-sm font-medium hover:underline">
                                        {blog.author.name}
                                    </Link>
                                    <span className="text-sm text-muted-foreground">•</span>
                                    <span className="text-sm text-muted-foreground">{blog.publishedAt}</span>
                                </div>
                                <CardTitle className="mb-2 text-xl">
                                    <Link href={`/blog/${blog.id}`} className="hover:underline">
                                        {blog.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription>{blog.excerpt}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleLike(blog.id)}
                                            className={likedPosts.has(blog.id) ? 'text-red-500' : ''}
                                        >
                                            <Heart className="mr-1 h-4 w-4" />
                                            {blog.likes}
                                        </Button>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/blog/${blog.id}#comments`}>
                                                <MessageCircle className="mr-1 h-4 w-4" />
                                                {blog.comments}
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleBookmark(blog.id)}
                                            className={bookmarkedPosts.has(blog.id) ? 'text-blue-500' : ''}
                                        >
                                            <Bookmark className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>{blog.readTime}</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {blog.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
