import type { TShowPost } from '@/types/site';

import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { BookmarkIcon, HeartIcon, MessageCircleIcon, Share2Icon } from 'lucide-react';

export const Actions = ({ post }: { post: TShowPost }) => {
    return (
        <div className="flex items-center justify-between border-y py-6">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" className={post.liked_by_user ? 'text-red-500' : ''}>
                    <HeartIcon className="mr-2 h-5 w-5" />
                    {post.likes_count}
                </Button>
                <Button variant="ghost" asChild>
                    <Link href="#comments">
                        <MessageCircleIcon className="mr-2 h-5 w-5" />
                        {post.comments_count}
                    </Link>
                </Button>
                <Button variant="ghost" className={post.bookmarked_by_user ? 'text-blue-500' : ''}>
                    <BookmarkIcon className="mr-2 h-5 w-5" />
                    {post.bookmarked_by_user ? 'Bookmarked' : 'Bookmark'}
                </Button>
            </div>
            <Button variant="ghost">
                <Share2Icon className="mr-2 h-5 w-5" />
                Share
            </Button>
        </div>
    );
};
