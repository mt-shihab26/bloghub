import type { TSearchPaginated, TSearchPost } from '@/types/search';

import { InfiniteScroll } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { ArticleCard } from './article-card';

export const ArticlesList = ({ articles }: { articles: TSearchPaginated<TSearchPost> }) => {
    console.log(articles);

    return (
        <>
            {articles.data.hits.length > 0 ? (
                <InfiniteScroll data="articles" preserveUrl={false}>
                    <div className="space-y-6">
                        {articles.data.hits.map((post, index) => (
                            <ArticleCard ith={index + 1} key={post.document.id} post={post} />
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
