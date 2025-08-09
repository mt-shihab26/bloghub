import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';
import { Bookmark, Clock, Filter, Heart, MessageCircle, Search, TrendingUp } from 'lucide-react';
import { useState } from 'react';

// Mock category data
const categoryData = {
    'web-development': {
        name: 'Web Development',
        description:
            'Everything about building modern web applications, from frontend frameworks to backend technologies.',
        color: 'bg-blue-100 text-blue-800',
        totalPosts: 45,
        followers: 1234,
    },
    'mobile-development': {
        name: 'Mobile Development',
        description: 'Native and cross-platform mobile app development tutorials and insights.',
        color: 'bg-green-100 text-green-800',
        totalPosts: 23,
        followers: 856,
    },
    'data-science': {
        name: 'Data Science',
        description: 'Data analysis, machine learning, and AI-related articles and tutorials.',
        color: 'bg-purple-100 text-purple-800',
        totalPosts: 18,
        followers: 967,
    },
};

const categoryPosts = [
    {
        id: 1,
        title: "The Future of Web Development: What's Coming in 2024",
        excerpt: 'Exploring the latest trends and technologies that will shape web development in the coming year...',
        author: {
            name: 'Sarah Chen',
            avatar: '/woman-developer.png',
            username: 'sarahchen',
        },
        publishedAt: '2 hours ago',
        readTime: '5 min read',
        likes: 124,
        comments: 18,
        tags: ['Web Development', 'Technology', 'Future'],
        image: '/futuristic-web-development.png',
        featured: true,
    },
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
    },
    {
        id: 7,
        title: 'Modern CSS Techniques for Better Web Design',
        excerpt: 'Discover the latest CSS features and techniques to create stunning web interfaces...',
        author: {
            name: 'Emily Rodriguez',
            avatar: '/woman-writer.png',
            username: 'emilyrod',
        },
        publishedAt: '1 day ago',
        readTime: '6 min read',
        likes: 156,
        comments: 24,
        tags: ['CSS', 'Design', 'Frontend'],
        image: '/css-grid-layout.png',
    },
    {
        id: 8,
        title: 'JavaScript Performance Optimization Tips',
        excerpt: 'Essential techniques to make your JavaScript applications faster and more efficient...',
        author: {
            name: 'David Kim',
            avatar: '/man-database-engineer.png',
            username: 'davidkim',
        },
        publishedAt: '2 days ago',
        readTime: '10 min read',
        likes: 203,
        comments: 31,
        tags: ['JavaScript', 'Performance', 'Optimization'],
        image: '/react-state-management.png',
    },
];

const relatedCategories = [
    { name: 'Frontend Development', slug: 'frontend-development', count: 32 },
    { name: 'Backend Development', slug: 'backend-development', count: 28 },
    { name: 'Full Stack', slug: 'full-stack', count: 19 },
    { name: 'DevOps', slug: 'devops', count: 15 },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());
    const [isFollowing, setIsFollowing] = useState(false);

    const category = categoryData[params.slug as keyof typeof categoryData] || categoryData['web-development'];

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
                {/* Category Header */}
                <div className="mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
                                <div className="flex-1">
                                    <div className="mb-4 flex items-center space-x-3">
                                        <Badge className={`px-4 py-2 text-lg ${category.color}`}>{category.name}</Badge>
                                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                            <span>{category.totalPosts} posts</span>
                                            <span>•</span>
                                            <span>{category.followers} followers</span>
                                        </div>
                                    </div>
                                    <p className="mb-4 text-lg text-muted-foreground">{category.description}</p>
                                </div>
                                <Button
                                    onClick={() => setIsFollowing(!isFollowing)}
                                    variant={isFollowing ? 'outline' : 'default'}
                                >
                                    {isFollowing ? 'Following' : 'Follow Category'}
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
                                    placeholder={`Search in ${category.name}...`}
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

                        {/* Featured Post */}
                        {categoryPosts[0] && (
                            <Card className="mb-8 overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={categoryPosts[0].image || '/placeholder.svg'}
                                        alt={categoryPosts[0].title}
                                        width={800}
                                        height={300}
                                        className="h-64 w-full object-cover"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-primary">
                                        Featured in {category.name}
                                    </Badge>
                                </div>
                                <CardHeader>
                                    <div className="mb-2 flex items-center space-x-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={categoryPosts[0].author.avatar || '/placeholder.svg'} />
                                            <AvatarFallback>{categoryPosts[0].author.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <Link
                                            href={`/author/${categoryPosts[0].author.username}`}
                                            className="text-sm font-medium hover:underline"
                                        >
                                            {categoryPosts[0].author.name}
                                        </Link>
                                        <span className="text-sm text-muted-foreground">•</span>
                                        <span className="text-sm text-muted-foreground">
                                            {categoryPosts[0].publishedAt}
                                        </span>
                                    </div>
                                    <CardTitle className="mb-2 text-2xl">
                                        <Link href={`/blog/${categoryPosts[0].id}`} className="hover:underline">
                                            {categoryPosts[0].title}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription className="text-base">{categoryPosts[0].excerpt}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleLike(categoryPosts[0].id)}
                                                className={likedPosts.has(categoryPosts[0].id) ? 'text-red-500' : ''}
                                            >
                                                <Heart className="mr-1 h-4 w-4" />
                                                {categoryPosts[0].likes}
                                            </Button>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/blog/${categoryPosts[0].id}#comments`}>
                                                    <MessageCircle className="mr-1 h-4 w-4" />
                                                    {categoryPosts[0].comments}
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleBookmark(categoryPosts[0].id)}
                                                className={
                                                    bookmarkedPosts.has(categoryPosts[0].id) ? 'text-blue-500' : ''
                                                }
                                            >
                                                <Bookmark className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>{categoryPosts[0].readTime}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {categoryPosts[0].tags.map((tag) => (
                                            <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                                                <Badge
                                                    variant="secondary"
                                                    className="transition-colors hover:bg-primary hover:text-primary-foreground"
                                                >
                                                    #{tag}
                                                </Badge>
                                            </Link>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Category Posts */}
                        <div className="space-y-6">
                            <h2 className="flex items-center text-2xl font-bold">
                                <TrendingUp className="mr-2 h-6 w-6" />
                                Latest in {category.name}
                            </h2>
                            {categoryPosts.slice(1).map((post) => (
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
                                                    {post.tags.map((tag) => (
                                                        <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                                                            <Badge
                                                                variant="secondary"
                                                                className="text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
                                                            >
                                                                #{tag}
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
                        {/* Related Categories */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Related Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {relatedCategories.map((relatedCategory) => (
                                        <Link
                                            key={relatedCategory.slug}
                                            href={`/category/${relatedCategory.slug}`}
                                            className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted"
                                        >
                                            <span className="text-sm font-medium">{relatedCategory.name}</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {relatedCategory.count}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Popular Tags in Category */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Popular Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'React',
                                        'JavaScript',
                                        'CSS',
                                        'HTML',
                                        'Next.js',
                                        'TypeScript',
                                        'Node.js',
                                        'API',
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

                        {/* Top Contributors */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Top Contributors</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {categoryPosts.slice(0, 3).map((post) => (
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
                    </div>
                </div>
            </div>
        </div>
    );
}
