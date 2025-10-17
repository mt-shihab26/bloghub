import type { TPostCard } from '@/components/composite/article-card';
import type { TSearchPaginated } from '@/types/search';

import { ArticleCard } from '@/components/composite/article-card';
import { InfiniteScroll } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';

export const ArticlesList = ({ articles }: { articles: TSearchPaginated<TPostCard> }) => {
    return (
        <>
            {articles.data.length > 0 ? (
                <InfiniteScroll data="articles">
                    <div className="space-y-6">
                        {articles.data.map((post, index) => (
                            <div key={post.id}>
                                {index + 1}
                                <ArticleCard key={post.id} post={post} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
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
