import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { Calendar, FileText, Search, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

const categories = [
    {
        name: 'Web Development',
        slug: 'web-development',
        description:
            'Everything about building modern web applications, from frontend frameworks to backend technologies.',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: '💻',
        totalPosts: 156,
        followers: 2341,
        weeklyGrowth: '+12',
        trending: true,
    },
    {
        name: 'Mobile Development',
        slug: 'mobile-development',
        description: 'Native and cross-platform mobile app development tutorials and insights.',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: '📱',
        totalPosts: 89,
        followers: 1876,
        weeklyGrowth: '+8',
        trending: false,
    },
    {
        name: 'Data Science',
        slug: 'data-science',
        description: 'Data analysis, machine learning, and AI-related articles and tutorials.',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: '📊',
        totalPosts: 134,
        followers: 2156,
        weeklyGrowth: '+15',
        trending: true,
    },
    {
        name: 'DevOps',
        slug: 'devops',
        description: 'Infrastructure, deployment, monitoring, and automation best practices.',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: '⚙️',
        totalPosts: 67,
        followers: 1234,
        weeklyGrowth: '+5',
        trending: false,
    },
    {
        name: 'Design',
        slug: 'design',
        description: 'UI/UX design, visual design principles, and design system insights.',
        color: 'bg-pink-100 text-pink-800 border-pink-200',
        icon: '🎨',
        totalPosts: 78,
        followers: 1567,
        weeklyGrowth: '+7',
        trending: false,
    },
    {
        name: 'Career',
        slug: 'career',
        description: 'Professional development, job hunting tips, and career advancement strategies.',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: '💼',
        totalPosts: 45,
        followers: 987,
        weeklyGrowth: '+3',
        trending: false,
    },
    {
        name: 'Tutorial',
        slug: 'tutorial',
        description: 'Step-by-step guides and hands-on tutorials for various technologies.',
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        icon: '📚',
        totalPosts: 123,
        followers: 1789,
        weeklyGrowth: '+9',
        trending: true,
    },
    {
        name: 'Open Source',
        slug: 'open-source',
        description: 'Open source projects, contributions, and community-driven development.',
        color: 'bg-teal-100 text-teal-800 border-teal-200',
        icon: '🌟',
        totalPosts: 56,
        followers: 1345,
        weeklyGrowth: '+6',
        trending: false,
    },
];

export default function CategoriesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [followedCategories, setFollowedCategories] = useState<Set<string>>(new Set());

    const handleFollow = (slug: string) => {
        setFollowedCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(slug)) {
                newSet.delete(slug);
            } else {
                newSet.add(slug);
            }
            return newSet;
        });
    };

    const filteredCategories = categories.filter(
        (category) =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const trendingCategories = categories.filter((cat) => cat.trending);

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
                    <h1 className="mb-4 text-4xl font-bold">Explore Categories</h1>
                    <p className="mb-6 text-xl text-muted-foreground">
                        Discover content organized by topics that interest you most
                    </p>

                    {/* Search */}
                    <div className="relative max-w-md">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Trending Categories */}
                {!searchQuery && (
                    <div className="mb-8">
                        <h2 className="mb-4 flex items-center text-2xl font-bold">
                            <TrendingUp className="mr-2 h-6 w-6" />
                            Trending This Week
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {trendingCategories.map((category) => (
                                <Card
                                    key={category.slug}
                                    className={`border-2 ${category.color.split(' ')[2]} transition-all duration-200 hover:shadow-lg`}
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl">{category.icon}</span>
                                                <div>
                                                    <CardTitle className="text-lg">
                                                        <Link
                                                            href={`/category/${category.slug}`}
                                                            className="hover:underline"
                                                        >
                                                            {category.name}
                                                        </Link>
                                                    </CardTitle>
                                                    <Badge className="mt-1 bg-red-100 text-red-800">Trending</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center space-x-4">
                                                <span className="flex items-center">
                                                    <FileText className="mr-1 h-4 w-4" />
                                                    {category.totalPosts}
                                                </span>
                                                <span className="flex items-center">
                                                    <Users className="mr-1 h-4 w-4" />
                                                    {category.followers}
                                                </span>
                                            </div>
                                            <span className="font-medium text-green-600">{category.weeklyGrowth}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Categories */}
                <div className="mb-8">
                    <h2 className="mb-6 text-2xl font-bold">
                        {searchQuery ? `Search Results (${filteredCategories.length})` : 'All Categories'}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {filteredCategories.map((category) => (
                            <Card key={category.slug} className="transition-all duration-200 hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-3xl">{category.icon}</span>
                                            <div>
                                                <CardTitle className="mb-2 text-xl">
                                                    <Link
                                                        href={`/category/${category.slug}`}
                                                        className="hover:underline"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                </CardTitle>
                                                {category.trending && (
                                                    <Badge className="mb-2 bg-red-100 text-red-800">
                                                        <TrendingUp className="mr-1 h-3 w-3" />
                                                        Trending
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            variant={followedCategories.has(category.slug) ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => handleFollow(category.slug)}
                                        >
                                            {followedCategories.has(category.slug) ? 'Following' : 'Follow'}
                                        </Button>
                                    </div>
                                    <CardDescription className="text-base">{category.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center">
                                                <FileText className="mr-1 h-4 w-4" />
                                                {category.totalPosts} posts
                                            </span>
                                            <span className="flex items-center">
                                                <Users className="mr-1 h-4 w-4" />
                                                {category.followers} followers
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4" />
                                            <span className="font-medium text-green-600">
                                                {category.weeklyGrowth} this week
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Link href={`/category/${category.slug}`}>
                                            <Button variant="ghost" className="w-full">
                                                Explore {category.name}
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* No Results */}
                {searchQuery && filteredCategories.length === 0 && (
                    <div className="py-12 text-center">
                        <h3 className="mb-2 text-xl font-semibold">No categories found</h3>
                        <p className="text-muted-foreground">
                            Try searching with different keywords or browse all categories above.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
