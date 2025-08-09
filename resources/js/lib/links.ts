import type { TPost, TUser } from '@/types/models';

export const postLink = (user: TUser, post: TPost): string => {
    return route('site.authors.posts.show', { user, post });
};
