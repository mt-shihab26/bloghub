import type { TIndexPost } from '@/types/home';

import { Article } from './article';

export const Articles = ({ posts }: { posts: TIndexPost[] }) => {
    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <Article key={post.id} post={post} />
            ))}
        </div>
    );
};
