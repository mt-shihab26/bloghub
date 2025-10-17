import type { TSearchCategory, TSearchPaginated } from '@/types/search';

import { categoryLink } from '@/lib/links';

import { InfiniteScroll, Link } from '@inertiajs/react';
import { FolderIcon, SearchIcon } from 'lucide-react';

export const CategoriesList = ({ categories }: { categories: TSearchPaginated<TSearchCategory> }) => {
    return (
        <>
            {categories.data.length > 0 ? (
                <InfiniteScroll data="categories" preserveUrl>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {categories.data.map((category, index) => (
                            <Link
                                key={category.id}
                                href={categoryLink(category)}
                                className="group relative overflow-hidden rounded-lg border p-6 transition-colors hover:border-primary"
                            >
                                <div className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-sm font-semibold text-white">
                                    {index + 1}
                                </div>
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <FolderIcon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold group-hover:text-primary">{category.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {category.posts_count || 0}{' '}
                                                {category.posts_count === 1 ? 'post' : 'posts'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {category.description && (
                                    <p className="line-clamp-2 text-sm text-muted-foreground">{category.description}</p>
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
