import type { TPost } from '@/types/models';

import { TrendingUpIcon } from 'lucide-react';
import { Article } from './article';

export const RecommendedArticles = ({ posts }: { posts: TPost[] }) => {
    return (
        <div className="space-y-6">
            <h2 className="flex items-center text-2xl font-bold">
                <TrendingUpIcon className="mr-2 h-6 w-6" />
                Recommended for You
            </h2>
            {posts.map((post) => (
                <Article key={post.id} post={post} />
            ))}
        </div>
    );
};
