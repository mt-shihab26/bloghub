import type { TShowUser } from '@/types/profile';

import { formatInitials } from '@/lib/format';
import { imageLink } from '@/lib/links';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { Bookmark, Calendar, Clock, FileText, Heart, LinkIcon, MapPin, MessageCircle, Users } from 'lucide-react';

const Show = ({ user }: { user: TShowUser }) => {
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
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            BlogHub
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" asChild>
                                <Link href="/write">Write</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Author Header */}
                <div className="mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={imageLink(user.image)} />
                                    <AvatarFallback className="text-2xl">{formatInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h1 className="mb-2 text-3xl font-bold">{user.name}</h1>
                                    <p className="mb-4 text-muted-foreground">@{user.username}</p>
                                    <p className="mb-4 text-lg">{user.bio}</p>
                                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center">
                                            <MapPin className="mr-1 h-4 w-4" />
                                            {user.location}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="mr-1 h-4 w-4" />
                                            Joined {user.created_at}
                                        </div>
                                        <div className="flex items-center">
                                            <LinkIcon className="mr-1 h-4 w-4" />
                                            <a
                                                href={user.website}
                                                className="hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                user.website
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mb-4 flex items-center space-x-6">
                                        <div className="flex items-center">
                                            <Users className="mr-1 h-4 w-4" />
                                            <span className="font-semibold">{user.followers_count}</span>
                                            <span className="ml-1 text-muted-foreground">followers</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold">{user.following_count}</span>
                                            <span className="ml-1 text-muted-foreground">following</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FileText className="mr-1 h-4 w-4" />
                                            <span className="font-semibold">{user.posts.length}</span>
                                            <span className="ml-1 text-muted-foreground">posts</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Heart className="mr-1 h-4 w-4" />
                                            <span className="font-semibold">{user.total_likes}</span>
                                            <span className="ml-1 text-muted-foreground">likes</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant={user.follo ? 'outline' : 'default'}>
                                        {user.followed_by_user ? 'Following' : 'Follow'}
                                    </Button>
                                    <Button variant="outline">Message</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Tabs */}
                <Tabs defaultValue="posts" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>

                    <TabsContent value="posts" className="mt-6 space-y-6">
                        {user.posts?.map((post) => (
                            <Card key={post.id} className="overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3">
                                        <img
                                            src={post.image || '/placeholder.svg'}
                                            alt={post.title}
                                            width={300}
                                            height={200}
                                            className="h-48 w-full object-cover md:h-full"
                                        />
                                    </div>
                                    <div className="md:w-2/3">
                                        <CardHeader>
                                            <div className="mb-2 flex items-center space-x-2 text-sm text-muted-foreground">
                                                <span>{post.publishedAt}</span>
                                                <span>•</span>
                                                <div className="flex items-center">
                                                    <Clock className="mr-1 h-4 w-4" />
                                                    {post.readTime}
                                                </div>
                                            </div>
                                            <CardTitle className="mb-2 text-xl">
                                                <Link href={`/blog/${post.id}`} className="hover:underline">
                                                    {post.title}
                                                </Link>
                                            </CardTitle>
                                            <CardDescription>{post.excerpt}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleLike(post.id)}
                                                        className={likedPosts.has(post.id) ? 'text-red-500' : ''}
                                                    >
                                                        <Heart className="mr-1 h-4 w-4" />
                                                        {post.likes}
                                                    </Button>
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={`/blog/${post.id}#comments`}>
                                                            <MessageCircle className="mr-1 h-4 w-4" />
                                                            {post.comments}
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleBookmark(post.id)}
                                                        className={bookmarkedPosts.has(post.id) ? 'text-blue-500' : ''}
                                                    >
                                                        <Bookmark className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {post.tags.map((tag) => (
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
                    </TabsContent>

                    <TabsContent value="about" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>About {user.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>{user.bio}</p>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-2 font-semibold">Expertise</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge>React</Badge>
                                            <Badge>Next.js</Badge>
                                            <Badge>TypeScript</Badge>
                                            <Badge>Node.js</Badge>
                                            <Badge>CSS</Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Interests</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline">Web Development</Badge>
                                            <Badge variant="outline">UI/UX Design</Badge>
                                            <Badge variant="outline">Open Source</Badge>
                                            <Badge variant="outline">Teaching</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm">
                                            Published "The Future of Web Development: What's Coming in 2024"
                                        </span>
                                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm">
                                            Liked "Understanding Database Design Patterns" by David Kim
                                        </span>
                                        <span className="text-xs text-muted-foreground">1 day ago</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                        <span className="text-sm">Started following Mike Johnson</span>
                                        <span className="text-xs text-muted-foreground">2 days ago</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm">
                                            Published "Building Responsive Layouts with CSS Grid"
                                        </span>
                                        <span className="text-xs text-muted-foreground">3 days ago</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Show;
