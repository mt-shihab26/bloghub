import type { TSearchCategory, TSearchPaginated } from '@/types/search';

import { categoryLink } from '@/lib/links';
import { router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { FolderIcon, SearchIcon } from 'lucide-react';

export const CategoriesList = ({ categories }: { categories: TSearchPaginated<TSearchCategory> }) => {
    const handleLoadMore = () => {
        if (categories.next_page_url) {
            router.get(
                categories.next_page_url,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['categories'],
                },
            );
        }
    };

    return (
        <>
            {categories.data.length > 0 ? (
                <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {categories.data.map((category) => (
                            <Link
                                key={category.id}
                                href={categoryLink(category)}
                                className="group overflow-hidden rounded-lg border p-6 transition-colors hover:border-primary"
                            >
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

                    {categories.next_page_url && (
                        <div className="mt-8 flex justify-center">
                            <Button onClick={handleLoadMore} variant="outline" size="lg">
                                Load More
                            </Button>
                        </div>
                    )}
                </>
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
