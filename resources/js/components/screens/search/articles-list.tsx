import type { TPostCard } from '@/components/composite/article-card';
import type { TSearchPaginated } from '@/types/search';

import { router } from '@inertiajs/react';

import { ArticleCard } from '@/components/composite/article-card';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

export const ArticlesList = ({ articles }: { articles: TSearchPaginated<TPostCard> }) => {
    const handleLoadMore = () => {
        if (articles.next_page_url) {
            router.get(
                articles.next_page_url,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['articles'],
                },
            );
        }
    };

    return (
        <>
            {articles.data.length > 0 ? (
                <>
                    <div className="space-y-6">
                        {articles.data.map((post) => (
                            <ArticleCard key={post.id} post={post} />
                        ))}
                    </div>
                    {articles.next_page_url && (
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
                    <h2 className="mb-2 text-xl font-semibold">No results found</h2>
                    <p className="text-muted-foreground">Try different keywords or check your spelling</p>
                </div>
            )}
        </>
    );
};
