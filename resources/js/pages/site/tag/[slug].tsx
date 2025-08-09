import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';
import { Bookmark, Clock, Filter, Hash, Heart, MessageCircle, Search, TrendingUp } from 'lucide-react';
import { useState } from 'react';

// Mock tag data
const tagData = {
    react: {
        name: 'React',
        description: 'A JavaScript library for building user interfaces, maintained by Facebook and the community.',
        totalPosts: 156,
        followers: 2341,
        color: 'bg-blue-500',
    },
    javascript: {
        name: 'JavaScript',
        description: 'The programming language of the web, enabling interactive and dynamic web applications.',
        totalPosts: 234,
        followers: 3456,
        color: 'bg-yellow-500',
    },
    typescript: {
        name: 'TypeScript',
        description: 'A typed superset of JavaScript that compiles to plain JavaScript.',
        totalPosts: 89,
        followers: 1876,
        color: 'bg-blue-600',
    },
};

const tagPosts = [
    {
        id: 2,
        title: 'Building Scalable React Applications: Best Practices',
        excerpt: 'Learn how to structure your React applications for maximum scalability and maintainability...',
        author: {
            name: 'Mike Johnson',
            avatar: '/man-programmer.png',
            username: 'mikej',
        },
        publishedAt: '4 hours ago',
        readTime: '8 min read',
        likes: 89,
        comments: 12,
        tags: ['React', 'JavaScript', 'Best Practices'],
        image: '/react-code-architecture.png',
        category: 'Web Development',
    },
    {
        id: 6,
        title: 'State Management in React: A Complete Guide',
        excerpt: 'Everything you need to know about managing state in React applications...',
        author: {
            name: 'Sarah Chen',
            avatar: '/woman-developer.png',
            username: 'sarahchen',
        },
        publishedAt: '1 week ago',
        readTime: '12 min read',
        likes: 203,
        comments: 31,
        tags: ['React', 'State Management', 'JavaScript'],
        image: '/react-state-management.png',
        category: 'Web Development',
    },
    {
        id: 9,
        title: 'React Hooks: Advanced Patterns and Techniques',
        excerpt: 'Master advanced React Hooks patterns to write cleaner, more efficient components...',
        author: {
            name: 'Emily Rodriguez',
            avatar: '/woman-writer.png',
            username: 'emilyrod',
        },
        publishedAt: '3 days ago',
        readTime: '9 min read',
        likes: 145,
        comments: 22,
        tags: ['React', 'Hooks', 'Advanced'],
        image: '/css-grid-layout.png',
        category: 'Web Development',
    },
    {
        id: 10,
        title: 'Testing React Components with Jest and React Testing Library',
        excerpt: 'A comprehensive guide to testing your React components effectively...',
        author: {
            name: 'David Kim',
            avatar: '/man-database-engineer.png',
            username: 'davidkim',
        },
        publishedAt: '5 days ago',
        readTime: '11 min read',
        likes: 167,
        comments: 28,
        tags: ['React', 'Testing', 'Jest'],
        image: '/database-schema.png',
        category: 'Web Development',
    },
];

const relatedTags = [
    { name: 'JavaScript', slug: 'javascript', count: 234 },
    { name: 'TypeScript', slug: 'typescript', count: 89 },
    { name: 'Next.js', slug: 'nextjs', count: 67 },
    { name: 'Redux', slug: 'redux', count: 45 },
    { name: 'Hooks', slug: 'hooks', count: 78 },
    { name: 'Components', slug: 'components', count: 92 },
];

export default function TagPage({ params }: { params: { slug: string } }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());
    const [isFollowing, setIsFollowing] = useState(false);

    const tag = tagData[params.slug as keyof typeof tagData] || tagData['react'];

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
                {/* Tag Header */}
                <div className="mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
                                <div className="flex-1">
                                    <div className="mb-4 flex items-center space-x-3">
                                        <div
                                            className={`h-12 w-12 rounded-lg ${tag.color} flex items-center justify-center`}
                                        >
                                            <Hash className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-bold">#{tag.name}</h1>
                                            <div className="mt-1 flex items-center space-x-4 text-sm text-muted-foreground">
                                                <span>{tag.totalPosts} posts</span>
                                                <span>•</span>
                                                <span>{tag.followers} followers</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-4 text-lg text-muted-foreground">{tag.description}</p>
                                </div>
                                <Button
                                    onClick={() => setIsFollowing(!isFollowing)}
                                    variant={isFollowing ? 'outline' : 'default'}
                                >
                                    {isFollowing ? 'Following' : 'Follow Tag'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Filters and Search */}
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                <Input
                                    placeholder={`Search posts tagged with #${tag.name}...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <Filter className="mr-2 h-4 w-4" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">Latest</SelectItem>
                                    <SelectItem value="popular">Most Popular</SelectItem>
                                    <SelectItem value="trending">Trending</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tag Posts */}
                        <div className="space-y-6">
                            <h2 className="flex items-center text-2xl font-bold">
                                <TrendingUp className="mr-2 h-6 w-6" />
                                Posts tagged with #{tag.name}
                            </h2>
                            {tagPosts.map((post) => (
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
                                                <div className="mb-2 flex items-center space-x-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={post.author.avatar || '/placeholder.svg'} />
                                                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <Link
                                                        href={`/author/${post.author.username}`}
                                                        className="text-sm font-medium hover:underline"
                                                    >
                                                        {post.author.name}
                                                    </Link>
                                                    <span className="text-sm text-muted-foreground">•</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {post.publishedAt}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">•</span>
                                                    <Link
                                                        href={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                                                    >
                                                        <Badge variant="outline" className="text-xs hover:bg-muted">
                                                            {post.category}
                                                        </Badge>
                                                    </Link>
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
                                                            className={
                                                                bookmarkedPosts.has(post.id) ? 'text-blue-500' : ''
                                                            }
                                                        >
                                                            <Bookmark className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{post.readTime}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {post.tags.map((postTag) => (
                                                        <Link key={postTag} href={`/tag/${postTag.toLowerCase()}`}>
                                                            <Badge
                                                                variant={
                                                                    postTag.toLowerCase() === tag.name.toLowerCase()
                                                                        ? 'default'
                                                                        : 'secondary'
                                                                }
                                                                className="text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
                                                            >
                                                                #{postTag}
                                                            </Badge>
                                                        </Link>
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
                        {/* Related Tags */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Related Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {relatedTags.map((relatedTag) => (
                                        <Link key={relatedTag.slug} href={`/tag/${relatedTag.slug}`}>
                                            <Badge
                                                variant="outline"
                                                className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                                            >
                                                #{relatedTag.name}
                                                <span className="ml-1 text-xs">({relatedTag.count})</span>
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tag Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Tag Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Total Posts</span>
                                    <span className="font-semibold">{tag.totalPosts}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Followers</span>
                                    <span className="font-semibold">{tag.followers}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">This Week</span>
                                    <span className="font-semibold text-green-600">+12 posts</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Trending</span>
                                    <Badge variant="secondary" className="text-xs">
                                        #3 this week
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Contributors for this Tag */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Top Contributors</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {tagPosts.slice(0, 3).map((post) => (
                                        <div key={post.author.username} className="flex items-center space-x-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={post.author.avatar || '/placeholder.svg'} />
                                                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <Link
                                                    href={`/author/${post.author.username}`}
                                                    className="font-medium hover:underline"
                                                >
                                                    {post.author.name}
                                                </Link>
                                                <p className="text-sm text-muted-foreground">@{post.author.username}</p>
                                            </div>
                                            <Button size="sm" variant="outline">
                                                Follow
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Categories using this tag */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Popular Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {[
                                        { name: 'Web Development', count: 89 },
                                        { name: 'Frontend Development', count: 45 },
                                        { name: 'Tutorial', count: 23 },
                                        { name: 'Best Practices', count: 18 },
                                    ].map((category) => (
                                        <Link
                                            key={category.name}
                                            href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted"
                                        >
                                            <span className="text-sm font-medium">{category.name}</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {category.count}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
