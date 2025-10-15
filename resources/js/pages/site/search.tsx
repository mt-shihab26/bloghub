import type { TIndexPost } from '@/types/home';
import type { TPaginated } from '@/types/utils';

import { router } from '@inertiajs/react';
import { useState } from 'react';

import { Articles } from '@/components/screens/home/articles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SiteLayout } from '@/layouts/site-layout';
import { SearchIcon, X } from 'lucide-react';

const Search = ({ posts, query: initialQuery }: { posts: TPaginated<TIndexPost>; query: string }) => {
    const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route('site.search.index'), { q: searchQuery });
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        router.get(route('site.search.index'));
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

    return (
        <SiteLayout title={initialQuery ? `Search results for "${initialQuery}"` : 'Search'} footer={false}>
            <div className="mx-auto max-w-4xl">
                {/* Search Bar */}
                <div className="mb-8">
                    <form onSubmit={handleSearch} className="relative">
                        <SearchIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                            placeholder="Search articles by title, content, or excerpt..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-14 pr-12 pl-12 text-lg"
                            autoFocus
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute top-1/2 right-4 -translate-y-1/2 transform text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </form>
                </div>

                {/* Search Results */}
                {initialQuery ? (
                    <>
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold">Search results for &quot;{initialQuery}&quot;</h1>
                            <p className="mt-2 text-muted-foreground">
                                Found {posts.total} {posts.total === 1 ? 'article' : 'articles'}
                            </p>
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
                                <p className="text-muted-foreground">Try different keywords or check your spelling</p>
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
        </SiteLayout>
    );
};

export default Search;
