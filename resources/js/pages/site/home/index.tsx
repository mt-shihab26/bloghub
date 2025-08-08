import { useState } from 'react';

import { recommendedBlogs, trendingTopics } from './data';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SiteLayout } from '@/layouts/site-layout';
import { Link } from '@inertiajs/react';
import { Bookmark, Clock, Heart, MessageCircle, TrendingUp } from 'lucide-react';

const Index = () => {
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
        <SiteLayout title="Home">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Main Content */}
                <div className="lg:col-span-3">
                    {/* Featured Article */}
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

                    {/* Recommended Articles */}
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
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Trending Topics */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Trending Topics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {trendingTopics.map((topic) => (
                                    <Button key={topic} variant="ghost" className="w-full justify-start text-sm" asChild>
                                        <Link href={`/topic/${topic.toLowerCase().replace(/\s+/g, '-')}`}>{topic}</Link>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Popular Authors */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Popular Authors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recommendedBlogs.slice(0, 3).map((blog) => (
                                    <div key={blog.author.username} className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={blog.author.avatar || '/placeholder.svg'} />
                                            <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <Link href={`/author/${blog.author.username}`} className="font-medium hover:underline">
                                                {blog.author.name}
                                            </Link>
                                            <p className="text-sm text-muted-foreground">@{blog.author.username}</p>
                                        </div>
                                        <Button size="sm" variant="outline">
                                            Follow
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Categories */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {[
                                    { name: 'Web Development', count: 45, color: 'bg-blue-100 text-blue-800' },
                                    { name: 'Mobile Development', count: 23, color: 'bg-green-100 text-green-800' },
                                    { name: 'Data Science', count: 18, color: 'bg-purple-100 text-purple-800' },
                                    { name: 'DevOps', count: 15, color: 'bg-orange-100 text-orange-800' },
                                    { name: 'Design', count: 12, color: 'bg-pink-100 text-pink-800' },
                                    { name: 'Career', count: 8, color: 'bg-yellow-100 text-yellow-800' },
                                ].map((category) => (
                                    <Link
                                        key={category.name}
                                        href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted"
                                    >
                                        <span className="text-sm font-medium">{category.name}</span>
                                        <Badge className={`text-xs ${category.color}`}>{category.count}</Badge>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Popular Tags */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Popular Tags</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'React',
                                    'JavaScript',
                                    'TypeScript',
                                    'Next.js',
                                    'Node.js',
                                    'Python',
                                    'CSS',
                                    'HTML',
                                    'Database',
                                    'API',
                                    'Tutorial',
                                    'Best Practices',
                                ].map((tag) => (
                                    <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                                        <Badge
                                            variant="outline"
                                            className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                                        >
                                            #{tag}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Newsletter Signup */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Stay Updated</CardTitle>
                            <CardDescription>Get the latest articles delivered to your inbox</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Input placeholder="Enter your email" type="email" />
                                <Button className="w-full">Subscribe</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SiteLayout>
    );
};
export default Index;
