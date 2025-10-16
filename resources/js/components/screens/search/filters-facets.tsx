import type { TSearchFacets, TSearchParams } from '@/types/search';

import { performSearch } from '@/lib/search';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { FolderIcon, TagIcon, UserIcon } from 'lucide-react';

export const FiltersFacets = ({ params, facets }: { params: TSearchParams; facets: TSearchFacets }) => {
    return (
        <div className="space-y-4">
            {facets?.authors && params.type !== 'my-articles' && facets.authors.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <UserIcon className="h-4 w-4" />
                            Authors
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {facets.authors.map((a) => {
                            const selected = params.author?.includes(a.username) ?? false;
                            const newAuthors = selected
                                ? (params.author?.filter((username) => username !== a.username) ?? [])
                                : [...(params.author ?? []), a.username];

                            return (
                                <label
                                    key={a.id}
                                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                                >
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            checked={selected}
                                            onCheckedChange={() =>
                                                performSearch({
                                                    ...params,
                                                    author: newAuthors.length > 0 ? newAuthors : null,
                                                })
                                            }
                                        />
                                        <span className="truncate">{a.name}</span>
                                    </div>
                                    <Badge variant="outline" className="ml-2 shrink-0">
                                        {a.count}
                                    </Badge>
                                </label>
                            );
                        })}
                    </CardContent>
                </Card>
            )}

            {facets?.categories && facets.categories.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <FolderIcon className="h-4 w-4" />
                            Categories
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {facets.categories.map((c) => {
                            const selected = params.category?.includes(c.slug) ?? false;
                            const newCategories = selected
                                ? (params.category?.filter((slug) => slug !== c.slug) ?? [])
                                : [...(params.category ?? []), c.slug];

                            return (
                                <label
                                    key={c.id}
                                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                                >
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            checked={selected}
                                            onCheckedChange={() =>
                                                performSearch({
                                                    ...params,
                                                    category: newCategories.length > 0 ? newCategories : null,
                                                })
                                            }
                                        />
                                        <span className="truncate">{c.name}</span>
                                    </div>
                                    <Badge variant="outline" className="ml-2 shrink-0">
                                        {c.count}
                                    </Badge>
                                </label>
                            );
                        })}
                    </CardContent>
                </Card>
            )}

            {facets?.tags && facets.tags.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <TagIcon className="h-4 w-4" />
                            Tags
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {facets.tags.map((t) => {
                            const selected = params.tag?.includes(t.slug) ?? false;
                            const newTags = selected
                                ? (params.tag?.filter((slug) => slug !== t.slug) ?? [])
                                : [...(params.tag ?? []), t.slug];

                            return (
                                <label
                                    key={t.id}
                                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                                >
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            checked={selected}
                                            onCheckedChange={() =>
                                                performSearch({
                                                    ...params,
                                                    tag: newTags.length > 0 ? newTags : null,
                                                })
                                            }
                                        />
                                        <span className="truncate">{t.name}</span>
                                    </div>
                                    <Badge variant="outline" className="ml-2 shrink-0">
                                        {t.count}
                                    </Badge>
                                </label>
                            );
                        })}
                    </CardContent>
                </Card>
            )}

            {((params.author && params.author.length > 0) ||
                (params.category && params.category.length > 0) ||
                (params.tag && params.tag.length > 0)) && (
                <>
                    <Separator />
                    <button
                        onClick={() => performSearch({ ...params, author: null, category: null, tag: null })}
                        className="w-full rounded-lg border border-dashed px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-solid hover:bg-muted"
                    >
                        Clear all filters
                    </button>
                </>
            )}
        </div>
    );
};
