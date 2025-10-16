import type { TSearchFacets, TSearchParams } from '@/types/search';

import { searchRoute } from '@/lib/search';

import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { FolderIcon, TagIcon, UserIcon } from 'lucide-react';
import { FiltersFacetsItems } from './filters-facets-items';

export const FiltersFacets = ({ params, facets }: { params: TSearchParams; facets: TSearchFacets }) => {
    return (
        <div className="space-y-4">
            {facets?.authors && params.type !== 'my-articles' && facets.authors.length > 0 && (
                <FiltersFacetsItems
                    icon={UserIcon}
                    title="Authors"
                    field="author"
                    items={facets.authors?.map((a) => ({ value: a.username, label: a.name, count: a.count })) || []}
                    selects={params.author || []}
                    params={params}
                />
            )}

            {facets?.categories && facets.categories.length > 0 && (
                <FiltersFacetsItems
                    icon={FolderIcon}
                    title="Categories"
                    field="category"
                    items={facets.categories?.map((a) => ({ value: a.slug, label: a.name, count: a.count })) || []}
                    selects={params.category || []}
                    params={params}
                />
            )}

            {facets?.tags && facets.tags.length > 0 && (
                <FiltersFacetsItems
                    icon={TagIcon}
                    title="Tags"
                    field="tag"
                    items={facets.tags?.map((a) => ({ value: a.slug, label: a.name, count: a.count })) || []}
                    selects={params.tag || []}
                    params={params}
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
