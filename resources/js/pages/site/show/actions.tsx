import type { TShowPost } from '@/types/site';

import { togglePostBookmark, togglePostLike } from '@/lib/links';

import { Button } from '@/components/ui/button';
import { BookmarkIcon, HeartIcon, MessageCircleIcon } from 'lucide-react';
import { Share } from './share';

export const Actions = ({ post }: { post: TShowPost }) => {
    return (
        <div className="flex items-center justify-between border-y py-6">
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    className={post.liked_by_user ? 'text-red-500' : ''}
                    onClick={() => togglePostLike(post)}
                >
                    <HeartIcon className="mr-2 h-5 w-5" />
                    {post.likes_count}
                </Button>
                <Button variant="ghost" asChild>
                    <a href="#comments">
                        <MessageCircleIcon className="mr-2 h-5 w-5" />
                        {post.comments_count}
                    </a>
                </Button>
                <Button
                    variant="ghost"
                    className={post.bookmarked_by_user ? 'text-blue-500' : ''}
                    onClick={() => togglePostBookmark(post)}
                >
                    <BookmarkIcon className="mr-2 h-5 w-5" />
                    {post.bookmarked_by_user ? 'Bookmarked' : 'Bookmark'}
                </Button>
            </div>
            <Share post={post} />
        </div>
    );
};
