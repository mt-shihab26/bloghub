import type {
    TSearchCategory,
    TSearchFacets,
    TSearchPaginated,
    TSearchParams,
    TSearchTag,
    TSearchUser,
} from '@/types/search';

import type { TIndexPost } from '@/types/home';

import { cn } from '@/lib/utils';

import { CategoriesList } from '@/components/screens/search/categories-list';
import { FiltersFacets } from '@/components/screens/search/filters-facets';
import { FiltersType } from '@/components/screens/search/filters-type';
import { PeopleList } from '@/components/screens/search/people-list';
import { PostsList } from '@/components/screens/search/posts-list';
import { SortTabs } from '@/components/screens/search/sort-tabs';
import { TagsList } from '@/components/screens/search/tags-list';
import { SiteLayout } from '@/layouts/site-layout';
import { SearchIcon } from 'lucide-react';

const Search = ({
    params,
    facets,
    articles,
    authors,
    categories,
    tags,
}: {
    params: TSearchParams;
    facets?: TSearchFacets;
    articles?: TSearchPaginated<TIndexPost>;
    authors?: TSearchPaginated<TSearchUser>;
    categories?: TSearchPaginated<TSearchCategory>;
    tags?: TSearchPaginated<TSearchTag>;
}) => {
    return (
        <SiteLayout title={params.query ? `Search results for "${params.query}"` : 'Search'} footer={false}>
            <div className="w-full space-y-6">
                <FiltersType params={params} />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <aside className="space-y-4">{facets && <FiltersFacets params={params} facets={facets} />}</aside>

                    <div
                        className={cn(
                            params.type === 'articles' || params.type === 'my-articles'
                                ? 'lg:col-span-3'
                                : 'lg:col-span-4',
                        )}
                    >
                        {params.query ? (
                            <>
                                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold">
                                            Search results for &quot;{params.query}&quot;
                                        </h1>
                                        <p className="mt-2 text-muted-foreground">
                                            Found{' '}
                                            {params.type === 'articles' || params.type === 'my-articles'
                                                ? articles?.total || 0
                                                : params.type === 'authors'
                                                  ? authors?.total || 0
                                                  : params.type === 'categories'
                                                    ? categories?.total || 0
                                                    : tags?.total || 0}{' '}
                                            {(params.type === 'articles' || params.type === 'my-articles'
                                                ? articles?.total || 0
                                                : params.type === 'authors'
                                                  ? authors?.total || 0
                                                  : params.type === 'categories'
                                                    ? categories?.total || 0
                                                    : tags?.total || 0) === 1
                                                ? 'result'
                                                : 'results'}
                                        </p>
                                    </div>

                                    <SortTabs params={params} />
                                </div>

                                {(params.type === 'articles' || params.type === 'my-articles') && articles && (
                                    <PostsList articles={articles} />
                                )}
                                {params.type === 'authors' && authors && <PeopleList authors={authors} />}
                                {params.type === 'categories' && categories && (
                                    <CategoriesList categories={categories} />
                                )}
                                {params.type === 'tags' && tags && <TagsList tags={tags} />}
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
            </div>
        </SiteLayout>
    );
};

export default Search;
