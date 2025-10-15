import { SearchIcon } from 'lucide-react';

import type { TSearchSort, TSearchType } from '@/types/header';
import type { TIndexPost } from '@/types/home';
import type { TPaginated } from '@/types/utils';

import { router } from '@inertiajs/react';

import { Articles } from '@/components/screens/home/articles';
import { FiltersType } from '@/components/screens/search/filters-type';
import { SortTabs } from '@/components/screens/search/sort-tabs';
import { Button } from '@/components/ui/button';
import { SiteLayout } from '@/layouts/site-layout';

type TProps = { posts: TPaginated<TIndexPost>; query: string; sort?: TSearchSort; type?: TSearchType };

const Search = ({ posts, query = '', sort = 'relevant', type = 'posts' }: TProps) => {
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
        <SiteLayout title={query ? `Search results for "${query}"` : 'Search'} footer={false}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <FiltersType query={query} sort={sort} type={type} />

                <div className="lg:col-span-3">
                    {query ? (
                        <>
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold">Search results for &quot;{query}&quot;</h1>
                                    <p className="mt-2 text-muted-foreground">
                                        Found {posts.total} {posts.total === 1 ? 'result' : 'results'}
                                    </p>
                                </div>

                                <SortTabs query={query} sort={sort} type={type} />
                            </div>

                            {posts.data.length > 0 ? (
                                <>
                                    <Articles posts={posts.data} />

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
