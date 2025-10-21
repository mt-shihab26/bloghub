import type { TIndexDiscussion } from '@/types/home';

import { postLink } from '@/lib/links';

import { Link } from '@inertiajs/react';

export const Discussions = ({ posts }: { posts: TIndexDiscussion[] }) => {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <div className="overflow-hidden rounded-lg border p-5">
            <h2 className="mb-4 text-lg font-semibold">Active Discussions</h2>
            <div className="space-y-3">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={postLink(post.user, post)}
                        className="group -mx-2 block rounded-md p-2 transition-colors hover:bg-muted/50"
                    >
                        <h3 className="mb-2 line-clamp-2 text-sm leading-snug font-medium transition-colors group-hover:text-primary">
                            {post.title}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="text-xs font-medium">{post.comments_count} comments</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
