import type { TCategory, TComment, TImage, TPost, TTag, TUser } from '@/types/models';

import { router } from '@inertiajs/react';

export const authorLink = (user?: TUser | null): string => {
    if (!user) {
        return '';
    }
    return route('site.profile.show', { user });
};

export const profileMeLink = (): string => {
    return route('site.profile.me');
};

export const profileWriteLink = (): string => {
    return route('site.profile.write');
};

export const profileSettingsLink = (): string => {
    return route('site.profile.settings');
};

export const postLink = (user: TUser, post: TPost, extra?: string): string => {
    const link = route('site.home.show', { user, post });
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

export const postLikes = (post: (TPost & { likes_count?: number }) | null | undefined): number => {
    return post?.likes_count || 0;
};

export const postComments = (post: (TPost & { comments_count?: number }) | null | undefined): number => {
    return post?.comments_count || 0;
};

export const categoryLink = (category: TCategory, extra?: string): string => {
    const link = route('site.categories.show', { category });
    if (!extra) {
        return link;
    }
    return `${link}${extra}`;
};

export const tagLink = (tag: TTag, extra?: string): string => {
    const link = route('site.tags.show', { tag });
    if (!extra) {
        return link;
    }
    return `${link}${extra}`;
};

export const toggleFollowLink = (user: TUser, authUser?: TUser | null): void => {
    if (!authUser?.id) {
        return router.visit(route('login'));
    }
    return router.patch(route('site.users.follow', user), undefined, { preserveScroll: true });
};

export const togglePostLike = (post: TPost): void => {
    return router.patch(route('site.posts.like', post), undefined, {
        preserveScroll: true,
    });
};

export const togglePostBookmark = (post: TPost): void => {
    return router.patch(route('site.posts.bookmark', post), undefined, {
        preserveScroll: true,
    });
};

export const toggleCommentLike = (comment: TComment): void => {
    return router.patch(route('site.comments.like', comment), undefined, {
        preserveScroll: true,
    });
};
