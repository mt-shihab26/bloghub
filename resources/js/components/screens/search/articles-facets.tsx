import type { TFacetCount, THit, TSearchParams, TSearchPost } from '@/types/search';
import type { LucideIcon } from 'lucide-react';

import { searchRoute } from '@/lib/search';
import { useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { FolderIcon, TagIcon, UserIcon } from 'lucide-react';

type TItem = {
    value: string;
    label: string;
    count: number;
};

const ArticlesFacetsItems = ({
    icon: Icon,
    title,
    field,
    items,
    selects,
    params,
}: {
    icon: LucideIcon;
    title: string;
    field: string;
    items: TItem[];
    selects: string[];
    params: TSearchParams;
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="h-4 w-4" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {items.map((item) => {
                    const selected = selects.includes(item.value) ?? false;
                    const newSelects = selected
                        ? (selects.filter((s) => s !== item.value) ?? [])
                        : [...(selects ?? []), item.value];
                    const value = newSelects.length > 0 ? newSelects : null;

                    return (
                        <Link
                            key={`${field}-${item.value}`}
                            href={searchRoute({ ...params, [field]: value })}
                            preserveState={true}
                            preserveScroll={true}
                            className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                        >
                            <div className="flex items-center gap-3">
                                <Checkbox checked={selected} />
                                <span className="truncate">{item.label}</span>
                            </div>
                            <Badge variant="outline" className="ml-2 shrink-0">
                                {item.count}
                            </Badge>
                        </Link>
                    );
                })}
            </CardContent>
        </Card>
    );
};

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

        hits.forEach((hit) => {
            const doc = hit.document;

            if (doc.user?.username) usersList.push({ username: doc.user.username, name: doc.user.name });
            if (doc.category?.slug) categoriesList.push({ slug: doc.category.slug, name: doc.category.name });
            if (doc.tags) doc.tags.forEach((tag) => tag?.slug && tagsList.push({ slug: tag.slug, name: tag.name }));
        });

        const userFacet = facets.find((f) => f.field_name === 'user.username');
        const categoryFacet = facets.find((f) => f.field_name === 'category.slug');
        const tagFacet = facets.find((f) => f.field_name === 'tags.slug');

        const authors: TItem[] =
            userFacet?.counts
                .map((single) => {
                    const user = usersList.find((u) => u.username === single.value);
                    return user ? { value: user.username, label: user.name, count: single.count } : null;
                })
                .filter((item) => item !== null) || [];

        const categories: TItem[] =
            categoryFacet?.counts
                .map((single) => {
                    const category = categoriesList.find((c) => c.slug === single.value);
                    return category ? { value: category.slug, label: category.name, count: single.count } : null;
                })
                .filter((item) => item !== null) || [];

        const tags: TItem[] =
            tagFacet?.counts
                .map((single) => {
                    const tag = tagsList.find((t) => t.slug === single.value);
                    return tag ? { value: tag.slug, label: tag.name, count: single.count } : null;
                })
                .filter((item) => item !== null) || [];

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
