import type { TShowPost } from '@/types/home';

import { useAuthUser } from '@/hooks/use-auth-user';
import { togglePostBookmark, togglePostLike } from '@/lib/links';

import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, Edit, HeartIcon, MessageCircleIcon } from 'lucide-react';
import { Share } from './share';

export const Actions = ({ post }: { post: TShowPost }) => {
    const { user } = useAuthUser();

    return (
        <div className="flex items-center justify-between border-y py-6">
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    className={post.liked_by_user ? 'text-red-500 hover:text-red-500' : ''}
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
                    className={post.bookmarked_by_user ? 'text-blue-500 hover:text-blue-500' : ''}
                    onClick={() => togglePostBookmark(post)}
                >
                    <BookmarkIcon className="mr-2 h-5 w-5" />
                    {post.bookmarked_by_user ? 'Bookmarked' : 'Bookmark'}
                </Button>
                {user && user.id === post.user.id && (
                    <Button variant="ghost" asChild>
                        <Link href={route('site.write.edit', { post })}>
                            <Edit className="mr-2 h-5 w-5" />
                            Edit
                        </Link>
                    </Button>
                )}
            </div>
            <Share post={post} />
        </div>
    );
};
