import type { TCategory, TImage, TPost, TTag, TUser } from '@/types/models';

export const authorLink = (user: TUser): string => {
    return route('site.authors.profile', { user });
};

export const profileWriteLink = (): string => {
    return route('site.profile.write');
};

export const profileSettingsLink = (): string => {
    return route('site.profile.settings');
};

export const postLink = (user: TUser, post: TPost, extra?: string): string => {
    const link = route('site.authors.posts.show', { user, post });
    if (!extra) {
        return link;
    }
    return `${link}${extra}`;
};

export const imageLink = (image: TImage | null | undefined): string => {
    if (!image) {
        return '';
    }
    return image?.name;
};

export const categoryName = (category: TCategory | null | undefined): string => {
    return category?.name || 'Uncategorized';
};

export const postLikes = (post: TPost | null | undefined): number => {
    return post?.likes_count || 0;
};

export const postComments = (post: TPost | null | undefined): number => {
    return post?.comments_count || 0;
};

export const tagLink = (tag: TTag, extra?: string): string => {
    const link = route('site.tags.show', { tag });
    if (!extra) {
        return link;
    }
    return `${link}${extra}`;
};
