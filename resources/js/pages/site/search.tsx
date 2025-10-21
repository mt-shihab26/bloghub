import type {
    TSearchCategory,
    TSearchPaginated,
    TSearchParams,
    TSearchPost,
    TSearchTag,
    TSearchUser,
} from '@/types/search';

import { cn } from '@/lib/utils';

import { ArticlesList } from '@/components/screens/search/articles-list';
import { AuthorsList } from '@/components/screens/search/authors-list';
import { CategoriesList } from '@/components/screens/search/categories-list';
import { FiltersType } from '@/components/screens/search/filters-type';
import { SortTabs } from '@/components/screens/search/sort-tabs';
import { TagsList } from '@/components/screens/search/tags-list';
import { SiteLayout } from '@/layouts/site-layout';
import { SearchIcon } from 'lucide-react';

const Search = ({
    params,
    articles,
    authors,
    categories,
    tags,
}: {
    params: TSearchParams;
    articles?: TSearchPaginated<TSearchPost>;
    authors?: TSearchPaginated<TSearchUser>;
    categories?: TSearchPaginated<TSearchCategory>;
    tags?: TSearchPaginated<TSearchTag>;
}) => {
    const total = articles?.total || authors?.total || categories?.total || tags?.total || 0;

    return (
        <SiteLayout title={params.query ? `Search results for "${params.query}"` : 'Search'} footer={false}>
            <div className="w-full space-y-6">
                <FiltersType params={params} />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <aside className="space-y-4">
                        {/* {(params.type === 'articles' || params.type === 'my-articles') && facets && ( */}
                        {/*     <ArticlesFacets params={params} facets={facets} /> */}
                        {/* )} */}
                    </aside>
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
                                            Found {total} {total === 1 ? 'result' : 'results'}
                                        </p>
                                    </div>
                                    <SortTabs params={params} />
                                </div>
                                {(params.type === 'articles' || params.type === 'my-articles') && articles && (
                                    <ArticlesList articles={articles} />
                                )}
                                {params.type === 'authors' && authors && <AuthorsList authors={authors} />}
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
                                    Enter keywords to find articles, authors, categories or tags.
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
