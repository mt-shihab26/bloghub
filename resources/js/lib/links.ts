import type { TImage, TPost, TUser } from '@/types/models';

export const authorLink = (user: TUser): string => {
    return route('site.authors.show', { user });
};

export const postLink = (user: TUser, post: TPost): string => {
    return route('site.authors.posts.show', { user, post });
};

export const imageLink = (image: TImage | null | undefined): string => {
    if (!image) {
        return '';
    }
    return image?.name;
};
