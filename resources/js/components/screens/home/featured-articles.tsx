import { useState } from 'react';
import { recommendedBlogs } from './data';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Bookmark, Clock, Heart, MessageCircle } from 'lucide-react';

export const FeaturedArticles = () => {
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
        <>
            {recommendedBlogs[0] && (
                <Card className="mb-8 overflow-hidden">
                    <div className="relative">
                        <img
                            src={recommendedBlogs[0].image || '/placeholder.svg'}
                            alt={recommendedBlogs[0].title}
                            width={800}
                            height={300}
                            className="h-64 w-full object-cover"
                        />
                        <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
                    </div>
                    <CardHeader>
                        <div className="mb-2 flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={recommendedBlogs[0].author.avatar || '/placeholder.svg'} />
                                <AvatarFallback>{recommendedBlogs[0].author.name[0]}</AvatarFallback>
                            </Avatar>
                            <Link href={`/author/${recommendedBlogs[0].author.username}`} className="text-sm font-medium hover:underline">
                                {recommendedBlogs[0].author.name}
                            </Link>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{recommendedBlogs[0].publishedAt}</span>
                        </div>
                        <CardTitle className="mb-2 text-2xl">
                            <Link href={`/blog/${recommendedBlogs[0].id}`} className="hover:underline">
                                {recommendedBlogs[0].title}
                            </Link>
                        </CardTitle>
                        <CardDescription className="text-base">{recommendedBlogs[0].excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleLike(recommendedBlogs[0].id)}
                                    className={likedPosts.has(recommendedBlogs[0].id) ? 'text-red-500' : ''}
                                >
                                    <Heart className="mr-1 h-4 w-4" />
                                    {recommendedBlogs[0].likes}
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/blog/${recommendedBlogs[0].id}#comments`}>
                                        <MessageCircle className="mr-1 h-4 w-4" />
                                        {recommendedBlogs[0].comments}
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleBookmark(recommendedBlogs[0].id)}
                                    className={bookmarkedPosts.has(recommendedBlogs[0].id) ? 'text-blue-500' : ''}
                                >
                                    <Bookmark className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{recommendedBlogs[0].readTime}</span>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {recommendedBlogs[0].tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
};
