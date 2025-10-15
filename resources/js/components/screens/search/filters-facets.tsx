import type { TSearchFacets, TSearchParams } from '@/types/search';

import { performSearch } from '@/lib/search';
import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FolderIcon, TagIcon, UserIcon } from 'lucide-react';

export const FiltersFacets = ({ params, facets }: { params: TSearchParams; facets: TSearchFacets }) => {
    return (
        <div className="space-y-4">
            {facets?.authors && facets.authors.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <UserIcon className="h-4 w-4" />
                            Authors
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        {facets.authors.map((a) => {
                            const selected = params.author === a.username;

                            return (
                                <button
                                    key={a.id}
                                    onClick={() => performSearch({ ...params, author: selected ? null : a.username })}
                                    className={cn(
                                        'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                                        selected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                                    )}
                                >
                                    <span className="truncate">{a.name}</span>
                                    <Badge
                                        variant={selected ? 'secondary' : 'outline'}
                                        className={cn(
                                            'ml-2 shrink-0',
                                            selected && 'bg-primary-foreground/20 text-primary-foreground',
                                        )}
                                    >
                                        {a.count}
                                    </Badge>
                                </button>
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
                    <CardContent className="space-y-1">
                        {facets.categories.map((c) => {
                            const selected = params.category === c.slug;

                            return (
                                <button
                                    key={c.id}
                                    onClick={() => performSearch({ ...params, category: selected ? null : c.slug })}
                                    className={cn(
                                        'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                                        selected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                                    )}
                                >
                                    <span className="truncate">{c.name}</span>
                                    <Badge
                                        variant={selected ? 'secondary' : 'outline'}
                                        className={cn(
                                            'ml-2 shrink-0',
                                            selected && 'bg-primary-foreground/20 text-primary-foreground',
                                        )}
                                    >
                                        {c.count}
                                    </Badge>
                                </button>
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
                    <CardContent className="space-y-1">
                        {facets.tags.map((t) => {
                            const selected = params.tag === t.slug;

                            return (
                                <button
                                    key={t.id}
                                    onClick={() => performSearch({ ...params, tag: selected ? null : t.slug })}
                                    className={cn(
                                        'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                                        selected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                                    )}
                                >
                                    <span className="truncate">{t.name}</span>
                                    <Badge
                                        variant={selected ? 'secondary' : 'outline'}
                                        className={cn(
                                            'ml-2 shrink-0',
                                            selected && 'bg-primary-foreground/20 text-primary-foreground',
                                        )}
                                    >
                                        {t.count}
                                    </Badge>
                                </button>
                            );
                        })}
                    </CardContent>
                </Card>
            )}

            {(params.author || params.category || params.tag) && (
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
