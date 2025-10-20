import type { TPost } from '@/types/models';

import { useAuthUser } from '@/hooks/use-auth-user';
import { togglePostBookmark } from '@/lib/links';

import { IconButton } from '@/components/elements/icon-button';
import { BookmarkIcon } from 'lucide-react';

export const BookmarkButton = ({ post }: { post: Pick<TPost, 'id'> }) => {
    const { bookmarks } = useAuthUser();

    return (
        <IconButton
            active={!!bookmarks?.find((p) => p.id === post.id)}
            icon={BookmarkIcon}
            activeColorClass="text-blue-500 hover:text-blue-500"
            onClick={() => togglePostBookmark(post)}
        />
    );
};
