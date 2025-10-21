import type { TFacetCount, THit, TSearchParams, TSearchPost } from '@/types/search';

import { searchRoute } from '@/lib/search';
import { useMemo } from 'react';

import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { FolderIcon, TagIcon, UserIcon } from 'lucide-react';
import { ArticlesFacetsItems, TItem } from './articles-facets-items';

export const ArticlesFacets = ({
    params,
    facets,
    hits,
}: {
    params: TSearchParams;
    facets: TFacetCount[];
    hits: THit<TSearchPost>[];
}) => {
    const transformedFacets = useMemo(() => {
        if (!facets || !hits) return { authors: [], categories: [], tags: [] };

        const usersList: { username: string; name: string }[] = [];
        const categoriesList: { slug: string; name: string }[] = [];
        const tagsList: { slug: string; name: string }[] = [];

        for (const hit of hits) {
            const doc = hit.document;
            if (doc.user?.username) {
                usersList.push({ username: doc.user.username, name: doc.user?.name });
            }
            if (doc.category?.slug) {
                categoriesList.push({ slug: doc.category.slug, name: doc.category.name });
            }
            if (doc.tags) {
                for (const tag of doc.tags) {
                    if (tag?.slug) {
                        tagsList.push({ slug: tag.slug, name: tag.name });
                    }
                }
            }
        }

        const userFacet = facets.find((f) => f.field_name === 'user.username');
        const categoryFacet = facets.find((f) => f.field_name === 'category.slug');
        const tagFacet = facets.find((f) => f.field_name === 'tags.slug');

        const authors: TItem[] = [];
        if (userFacet) {
            for (const single of userFacet.counts) {
                const user = usersList.find((u) => u.username === single.value);
                if (user) {
                    authors.push({ value: user.username, label: user.name, count: single.count });
                }
            }
        }

        const categories: TItem[] = [];
        if (categoryFacet) {
            for (const single of categoryFacet.counts) {
                const category = categoriesList.find((c) => c.slug === single.value);
                if (category) {
                    categories.push({ value: category.slug, label: category.name, count: single.count });
                }
            }
        }

        const tags: TItem[] = [];
        if (tagFacet) {
            for (const single of tagFacet.counts) {
                const tag = tagsList.find((t) => t.slug === single.value);
                if (tag) {
                    tags.push({ value: tag.slug, label: tag.name, count: single.count });
                }
            }
        }

        return { authors, categories, tags };
    }, [facets, hits]);

    return (
        <div className="space-y-4">
            {params.type !== 'my-articles' && transformedFacets.authors.length > 0 && (
                <ArticlesFacetsItems
                    icon={UserIcon}
                    title="Authors"
                    field="author"
                    params={params}
                    selects={params.author || []}
                    items={transformedFacets.authors}
                />
            )}

            {transformedFacets.categories.length > 0 && (
                <ArticlesFacetsItems
                    icon={FolderIcon}
                    title="Categories"
                    field="category"
                    params={params}
                    selects={params.category || []}
                    items={transformedFacets.categories}
                />
            )}

            {transformedFacets.tags.length > 0 && (
                <ArticlesFacetsItems
                    icon={TagIcon}
                    title="Tags"
                    field="tag"
                    params={params}
                    selects={params.tag || []}
                    items={transformedFacets.tags}
                />
            )}

            {((params.author && params.author.length > 0) ||
                (params.category && params.category.length > 0) ||
                (params.tag && params.tag.length > 0)) && (
                <>
                    <Separator />
                    <Link
                        href={searchRoute({ ...params, author: null, category: null, tag: null })}
                        preserveState={true}
                        preserveScroll={true}
                        className="w-full rounded-lg border border-dashed px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-solid hover:bg-muted"
                    >
                        Clear all filters
                    </Link>
                </>
            )}
        </div>
    );
};
