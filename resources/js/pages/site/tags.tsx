import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { FileText, Hash, Search, Star, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

const tags = [
    {
        name: 'React',
        slug: 'react',
        description: 'A JavaScript library for building user interfaces',
        color: 'bg-blue-500',
        totalPosts: 234,
        followers: 3456,
        weeklyGrowth: '+18',
        trending: true,
        category: 'Web Development',
    },
    {
        name: 'JavaScript',
        slug: 'javascript',
        description: 'The programming language of the web',
        color: 'bg-yellow-500',
        totalPosts: 345,
        followers: 4567,
        weeklyGrowth: '+22',
        trending: true,
        category: 'Web Development',
    },
    {
        name: 'TypeScript',
        slug: 'typescript',
        description: 'Typed superset of JavaScript',
        color: 'bg-blue-600',
        totalPosts: 156,
        followers: 2341,
        weeklyGrowth: '+12',
        trending: true,
        category: 'Web Development',
    },
    {
        name: 'Next.js',
        slug: 'nextjs',
        description: 'React framework for production',
        color: 'bg-black',
        totalPosts: 123,
        followers: 1987,
        weeklyGrowth: '+15',
        trending: true,
        category: 'Web Development',
    },
    {
        name: 'Node.js',
        slug: 'nodejs',
        description: 'JavaScript runtime for server-side development',
        color: 'bg-green-600',
        totalPosts: 189,
        followers: 2876,
        weeklyGrowth: '+9',
        trending: false,
        category: 'Backend Development',
    },
    {
        name: 'Python',
        slug: 'python',
        description: 'High-level programming language',
        color: 'bg-blue-700',
        totalPosts: 267,
        followers: 3789,
        weeklyGrowth: '+14',
        trending: false,
        category: 'Data Science',
    },
    {
        name: 'CSS',
        slug: 'css',
        description: 'Styling language for web pages',
        color: 'bg-blue-400',
        totalPosts: 198,
        followers: 2654,
        weeklyGrowth: '+7',
        trending: false,
        category: 'Web Development',
    },
    {
        name: 'Machine Learning',
        slug: 'machine-learning',
        description: 'AI and predictive modeling',
        color: 'bg-purple-600',
        totalPosts: 145,
        followers: 2123,
        weeklyGrowth: '+11',
        trending: false,
        category: 'Data Science',
    },
    {
        name: 'Docker',
        slug: 'docker',
        description: 'Containerization platform',
        color: 'bg-blue-500',
        totalPosts: 89,
        followers: 1456,
        weeklyGrowth: '+6',
        trending: false,
        category: 'DevOps',
    },
    {
        name: 'AWS',
        slug: 'aws',
        description: 'Amazon Web Services cloud platform',
        color: 'bg-orange-500',
        totalPosts: 134,
        followers: 1876,
        weeklyGrowth: '+8',
        trending: false,
        category: 'DevOps',
    },
    {
        name: 'Vue.js',
        slug: 'vuejs',
        description: 'Progressive JavaScript framework',
        color: 'bg-green-500',
        totalPosts: 98,
        followers: 1234,
        weeklyGrowth: '+5',
        trending: false,
        category: 'Web Development',
    },
    {
        name: 'GraphQL',
        slug: 'graphql',
        description: 'Query language for APIs',
        color: 'bg-pink-500',
        totalPosts: 76,
        followers: 987,
        weeklyGrowth: '+4',
        trending: false,
        category: 'Backend Development',
    },
];

export default function TagsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [followedTags, setFollowedTags] = useState<Set<string>>(new Set());

    const handleFollow = (slug: string) => {
        setFollowedTags((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(slug)) {
                newSet.delete(slug);
            } else {
                newSet.add(slug);
            }
            return newSet;
        });
    };

    const filteredTags = tags.filter(
        (tag) =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tag.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tag.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const trendingTags = tags.filter((tag) => tag.trending);
    const popularTags = tags.sort((a, b) => b.followers - a.followers).slice(0, 6);

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
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="mb-4 text-4xl font-bold">Explore Tags</h1>
                    <p className="mb-6 text-xl text-muted-foreground">
                        Follow tags to customize your feed and discover content that matches your interests
                    </p>

                    {/* Search */}
                    <div className="relative max-w-md">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                            placeholder="Search tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Trending Tags */}
                {!searchQuery && (
                    <div className="mb-8">
                        <h2 className="mb-4 flex items-center text-2xl font-bold">
                            <TrendingUp className="mr-2 h-6 w-6" />
                            Trending This Week
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {trendingTags.map((tag) => (
                                <Link key={tag.slug} href={`/tag/${tag.slug}`}>
                                    <Card className="cursor-pointer border-2 border-red-200 transition-all duration-200 hover:shadow-lg">
                                        <CardContent className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`h-10 w-10 rounded-lg ${tag.color} flex items-center justify-center`}
                                                >
                                                    <Hash className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <h3 className="font-semibold">#{tag.name}</h3>
                                                        <Badge className="bg-red-100 text-xs text-red-800">
                                                            Trending
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                                        <span>{tag.totalPosts} posts</span>
                                                        <span className="font-medium text-green-600">
                                                            {tag.weeklyGrowth}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Popular Tags */}
                {!searchQuery && (
                    <div className="mb-8">
                        <h2 className="mb-4 flex items-center text-2xl font-bold">
                            <Star className="mr-2 h-6 w-6" />
                            Most Popular
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {popularTags.map((tag) => (
                                <Card key={tag.slug} className="transition-all duration-200 hover:shadow-lg">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`h-12 w-12 rounded-lg ${tag.color} flex items-center justify-center`}
                                                >
                                                    <Hash className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">
                                                        <Link href={`/tag/${tag.slug}`} className="hover:underline">
                                                            #{tag.name}
                                                        </Link>
                                                    </CardTitle>
                                                    <Badge variant="outline" className="mt-1 text-xs">
                                                        {tag.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <Button
                                                variant={followedTags.has(tag.slug) ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => handleFollow(tag.slug)}
                                            >
                                                {followedTags.has(tag.slug) ? 'Following' : 'Follow'}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="mb-3">{tag.description}</CardDescription>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center space-x-4">
                                                <span className="flex items-center">
                                                    <FileText className="mr-1 h-4 w-4" />
                                                    {tag.totalPosts} posts
                                                </span>
                                                <span className="flex items-center">
                                                    <Users className="mr-1 h-4 w-4" />
                                                    {tag.followers} followers
                                                </span>
                                            </div>
                                            <span className="font-medium text-green-600">
                                                {tag.weeklyGrowth} this week
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Tags */}
                <div className="mb-8">
                    <h2 className="mb-6 text-2xl font-bold">
                        {searchQuery ? `Search Results (${filteredTags.length})` : 'All Tags'}
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredTags.map((tag) => (
                            <Card key={tag.slug} className="transition-all duration-200 hover:shadow-lg">
                                <CardContent className="p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`h-10 w-10 rounded-lg ${tag.color} flex items-center justify-center`}
                                            >
                                                <Hash className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">
                                                    <Link href={`/tag/${tag.slug}`} className="hover:underline">
                                                        #{tag.name}
                                                    </Link>
                                                </h3>
                                                {tag.trending && (
                                                    <Badge className="mt-1 bg-red-100 text-xs text-red-800">
                                                        Trending
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-3 text-sm text-muted-foreground">{tag.description}</p>
                                    <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{tag.totalPosts} posts</span>
                                        <span>{tag.followers} followers</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="text-xs">
                                            {tag.category}
                                        </Badge>
                                        <Button
                                            variant={followedTags.has(tag.slug) ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => handleFollow(tag.slug)}
                                        >
                                            {followedTags.has(tag.slug) ? 'Following' : 'Follow'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* No Results */}
                {searchQuery && filteredTags.length === 0 && (
                    <div className="py-12 text-center">
                        <Hash className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                        <h3 className="mb-2 text-xl font-semibold">No tags found</h3>
                        <p className="text-muted-foreground">
                            Try searching with different keywords or browse all tags above.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
