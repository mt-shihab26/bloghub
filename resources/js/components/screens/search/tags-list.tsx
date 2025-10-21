import type { TSearchPaginated, TSearchTag } from '@/types/search';

import { tagLink } from '@/lib/links';

import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';

export const TagsList = ({ tags }: { tags: TSearchPaginated<TSearchTag> }) => {
    return (
        <>
            {tags.data.hits.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
                    {tags.data.hits.map((hit, index) => (
                        <Link
                            key={hit.document.id}
                            href={tagLink(hit.document)}
                            className="group flex justify-between space-x-3 overflow-hidden rounded-lg border p-4 transition-colors hover:border-primary"
                        >
                            <div>
                                <h3 className="font-semibold group-hover:text-primary">#{hit.document.name}</h3>
                            </div>
                            <div>
                                <Badge variant="outline" className="rounded-full">
                                    {index + 1}
                                </Badge>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-dashed p-12 text-center">
                    <SearchIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h2 className="mb-2 text-xl font-semibold">No tags found</h2>
                    <p className="text-muted-foreground">Try different keywords or check your spelling</p>
                </div>
            )}
        </>
    );
};
