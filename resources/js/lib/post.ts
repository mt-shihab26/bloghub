import type { TPost } from '@/types/models';

import { isFuture } from './utils';

export const isScheduled = (post: TPost) => {
    return post.status === 'published' && isFuture(post.published_at);
};
