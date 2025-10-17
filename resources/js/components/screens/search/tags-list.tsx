import type { TSearchPaginated, TSearchTag } from '@/types/search';

import { tagLink } from '@/lib/links';

import { InfiniteScroll, Link } from '@inertiajs/react';
import { HashIcon, SearchIcon } from 'lucide-react';

export const TagsList = ({ tags }: { tags: TSearchPaginated<TSearchTag> }) => {
    return (
        <>
            {tags.data.length > 0 ? (
                <InfiniteScroll data="tags" preserveUrl>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {tags.data.map((tag) => (
                            <Link
                                key={tag.id}
                                href={tagLink(tag)}
                                className="group overflow-hidden rounded-lg border p-6 transition-colors hover:border-primary"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <HashIcon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold group-hover:text-primary">#{tag.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {tag.posts_count || 0} {tag.posts_count === 1 ? 'post' : 'posts'}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </InfiniteScroll>
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
