import type { TSearchFacets, TSearchParams } from '@/types/search';

import { searchRoute } from '@/lib/search';

import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { FolderIcon, TagIcon, UserIcon } from 'lucide-react';
import { FiltersFacetsItems } from './filters-facets-items';

export const FiltersFacets = ({ params, facets }: { params: TSearchParams; facets: TSearchFacets }) => {
    return (
        <div className="space-y-4">
            {params.type !== 'my-articles' && facets?.articles?.authors && facets?.articles?.authors.length > 0 && (
                <FiltersFacetsItems
                    icon={UserIcon}
                    title="Authors"
                    field="author"
                    params={params}
                    selects={params.author || []}
                    items={facets.articles.authors.map((a) => ({ value: a.id, label: a.name, count: a.count })) || []}
                />
            )}

            {facets?.articles?.categories && facets?.articles?.categories.length > 0 && (
                <FiltersFacetsItems
                    icon={FolderIcon}
                    title="Categories"
                    field="category"
                    params={params}
                    selects={params.category || []}
                    items={
                        facets.articles.categories.map((c) => ({ value: c.id, label: c.name, count: c.count })) || []
                    }
                />
            )}

            {facets?.articles?.tags && facets.articles.tags.length > 0 && (
                <FiltersFacetsItems
                    icon={TagIcon}
                    title="Tags"
                    field="tag"
                    params={params}
                    selects={params.tag || []}
                    items={facets.articles.tags.map((t) => ({ value: t.id, label: t.name, count: t.count })) || []}
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
