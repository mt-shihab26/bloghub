import { SearchIcon } from 'lucide-react';

import type { TIndexPost } from '@/types/home';
import type { TSearchFacets, TSearchParams } from '@/types/search';
import type { TPaginated } from '@/types/utils';

import { router } from '@inertiajs/react';

import { Articles } from '@/components/screens/home/articles';
import { FiltersFacets } from '@/components/screens/search/filters-facets';
import { FiltersType } from '@/components/screens/search/filters-type';
import { SortTabs } from '@/components/screens/search/sort-tabs';
import { Button } from '@/components/ui/button';
import { SiteLayout } from '@/layouts/site-layout';

const Search = ({
    params,
    facets,
    posts,
}: {
    params: TSearchParams;
    facets: TSearchFacets;
    posts: TPaginated<TIndexPost>;
}) => {
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
        <SiteLayout title={params.query ? `Search results for "${params.query}"` : 'Search'} footer={false}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <aside className="space-y-4">
                    <FiltersType params={params} />
                    {params.type === 'posts' && <FiltersFacets params={params} facets={facets} />}
                </aside>

                <div className="lg:col-span-3">
                    {params.query ? (
                        <>
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        Search results for &quot;{params.query}&quot;
                                    </h1>
                                    <p className="mt-2 text-muted-foreground">
                                        Found {posts.total} {posts.total === 1 ? 'result' : 'results'}
                                    </p>
                                </div>

                                <SortTabs params={params} />
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
