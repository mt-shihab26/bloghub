import type { TSearchCategory, TSearchPaginated } from '@/types/search';

import { categoryLink } from '@/lib/links';

import { Highlight } from '@/components/elements/highlight';
import { Badge } from '@/components/ui/badge';
import { InfiniteScroll, Link } from '@inertiajs/react';
import { FolderIcon, SearchIcon } from 'lucide-react';

export const CategoriesList = ({ categories }: { categories: TSearchPaginated<TSearchCategory> }) => {
    return (
        <>
            {categories.data.hits.length > 0 ? (
                <InfiniteScroll data="categories" preserveUrl>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {categories.data.hits.map((hit, index) => (
                            <Link
                                key={hit.document.id}
                                href={categoryLink(hit.document)}
                                className="group space-y-3 overflow-hidden rounded-lg border p-4 transition-colors hover:border-primary"
                            >
                                <div className="flex justify-between">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-primary/10 p-2">
                                                <FolderIcon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold group-hover:text-primary">
                                                    <Highlight hit={hit} field="name" />
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Badge variant="outline">{index + 1}</Badge>
                                    </div>
                                </div>
                                {hit.document.description && (
                                    <p className="line-clamp-2 text-sm text-muted-foreground">
                                        <Highlight hit={hit} field="description" />
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                </InfiniteScroll>
            ) : (
                <div className="rounded-lg border border-dashed p-12 text-center">
                    <SearchIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h2 className="mb-2 text-xl font-semibold">No categories found</h2>
                    <p className="text-muted-foreground">Try different keywords or check your spelling</p>
                </div>
            )}
        </>
    );
};
