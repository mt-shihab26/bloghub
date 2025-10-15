import {
    BookmarkIcon,
    ClockIcon,
    FileTextIcon,
    FolderIcon,
    SearchIcon,
    SparklesIcon,
    TagIcon,
    UserIcon,
} from 'lucide-react';

import type { TIndexPost } from '@/types/home';
import type { TPaginated } from '@/types/utils';

import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';

import { Articles } from '@/components/screens/home/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteLayout } from '@/layouts/site-layout';

const Search = ({
    posts,
    query,
    sort,
    type,
}: {
    posts: TPaginated<TIndexPost>;
    query: string;
    sort?: string;
    type?: string;
}) => {
    const { auth } = usePage<{ auth: { user: any } }>().props;

    const currentSort = sort || 'relevant';
    const currentType = type || 'posts';

    const handleSortChange = (sort: string) => {
        router.get(
            route('site.search.index'),
            {
                q: query,
                sort: sort !== 'relevant' ? sort : undefined,
                type: currentType !== 'posts' ? currentType : undefined,
            },
            {
                preserveState: true,
            },
        );
    };

    const handleTypeChange = (type: string) => {
        router.get(
            route('site.search.index'),
            {
                q: query,
                sort: currentSort !== 'relevant' ? currentSort : undefined,
                type: type !== 'posts' ? type : undefined,
            },
            {
                preserveState: true,
            },
        );
    };

    const handleLoadMore = () => {
        if (posts.next_page_url) {
            router.get(
                posts.next_page_url,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['posts'],
                },
            );
        }
    };

    const filterOptions = [
        { type: 'posts', label: 'Posts', icon: FileTextIcon, description: 'Search all posts' },
        { type: 'people', label: 'People', icon: UserIcon, description: 'Find users' },
        { type: 'tags', label: 'Tags', icon: TagIcon, description: 'Browse tags' },
        { type: 'categories', label: 'Categories', icon: FolderIcon, description: 'Explore categories' },
        ...(auth?.user
            ? [
                  {
                      type: 'my-posts',
                      label: 'My Posts',
                      icon: BookmarkIcon,
                      description: 'Only your posts',
                  },
              ]
            : []),
    ];

    return (
        <SiteLayout title={query ? `Search results for "${query}"` : 'Search'} footer={false}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Filter by Type</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {filterOptions.map((option) => {
                                const Icon = option.icon;
                                const isActive = currentType === option.type;

                                return (
                                    <button
                                        key={option.type}
                                        onClick={() => handleTypeChange(option.type)}
                                        className={cn(
                                            'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors',
                                            isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                                        )}
                                    >
                                        <Icon className={cn('mt-0.5 h-5 w-5 shrink-0')} />
                                        <div className="flex-1">
                                            <div className="font-medium">{option.label}</div>
                                            <div
                                                className={cn(
                                                    'text-sm',
                                                    isActive ? 'text-primary-foreground/80' : 'text-muted-foreground',
                                                )}
                                            >
                                                {option.description}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </CardContent>
                    </Card>
                </aside>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    {/* Search Results */}
                    {query ? (
                        <>
                            {/* Header with Sort Tabs */}
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold">Search results for &quot;{query}&quot;</h1>
                                    <p className="mt-2 text-muted-foreground">
                                        Found {posts.total} {posts.total === 1 ? 'result' : 'results'}
                                    </p>
                                </div>

                                {/* Sort Tabs */}
                                <Tabs value={currentSort} onValueChange={handleSortChange} className="w-full sm:w-auto">
                                    <TabsList>
                                        <TabsTrigger value="relevant">
                                            <SparklesIcon className="h-4 w-4" />
                                            Most Relevant
                                        </TabsTrigger>
                                        <TabsTrigger value="newest">
                                            <ClockIcon className="h-4 w-4" />
                                            Newest
                                        </TabsTrigger>
                                        <TabsTrigger value="oldest">
                                            <ClockIcon className="h-4 w-4" />
                                            Oldest
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            {posts.data.length > 0 ? (
                                <>
                                    <Articles posts={posts.data} />

                                    {/* Load More Button */}
                                    {posts.next_page_url && (
                                        <div className="mt-8 flex justify-center">
                                            <Button onClick={handleLoadMore} variant="outline" size="lg">
                                                Load More
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="rounded-lg border border-dashed p-12 text-center">
                                    <SearchIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                    <h2 className="mb-2 text-xl font-semibold">No results found</h2>
                                    <p className="text-muted-foreground">
                                        Try different keywords or check your spelling
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-lg border border-dashed p-12 text-center">
                            <SearchIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                            <h2 className="mb-2 text-xl font-semibold">Search for articles</h2>
                            <p className="text-muted-foreground">
                                Enter keywords to find articles by title, content, or excerpt
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </SiteLayout>
    );
};

export default Search;
