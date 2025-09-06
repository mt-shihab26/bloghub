import type { TPost } from '@/types/models';

import { formatDateTime } from '@/lib/format';
import { isScheduled } from '@/lib/post';
import { cn } from '@/lib/utils';

export const PostStatus = ({ post, className }: { post: TPost; className?: string }) => {
    return (
        <span
            className={cn(
                'px-2 py-1 capitalize text-xs font-medium rounded-full whitespace-nowrap',
                post.status === 'published'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : post.status === 'archived'
                      ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                className,
            )}
        >
            {isScheduled(post as TPost)
                ? `Scheduled for ${formatDateTime(post.published_at)}`
                : post.status}
        </span>
    );
};
