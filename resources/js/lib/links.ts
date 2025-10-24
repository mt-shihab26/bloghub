import type { TCategory, TComment, TFile, TPost, TTag, TUser } from '@/types/models';

import { router } from '@inertiajs/react';

export const authorLink = (user?: Pick<TUser, 'username'> | null): string => {
    if (!user) {
        return '';
    }
    return route('site.profile.show', { user });
};

export const postLink = (
    user: Pick<TUser, 'username'> | undefined | null,
    post: Pick<TPost, 'slug'> | undefined | null,
    extra?: string,
): string => {
    const link = route('site.post', { user, post });
    if (!extra) {
        return link;
    }
    return `${link}${extra}`;
};

export const imageLink = (image: Pick<TFile, 'name'> | null | undefined): string => {
    if (!image) {
        return '';
    }
    return image?.name;
};

export const categoryName = (category: Pick<TCategory, 'name'> | null | undefined): string => {
    return category?.name || 'Uncategorized';
};

export const postLikes = (post: { likes_count?: number } | null | undefined): number => {
    return post?.likes_count || 0;
};

export const postComments = (post: { comments_count?: number } | null | undefined): number => {
    return post?.comments_count || 0;
};

export const categoryLink = (category: Pick<TCategory, 'slug'>, extra?: string): string => {
    const link = route('site.categories.show', { category });
    if (!extra) {
        return link;
    }
    return `${link}${extra}`;
};

export const tagLink = (tag: Pick<TTag, 'slug'>, extra?: string): string => {
    const link = route('site.tags.show', { tag });
    if (!extra) {
        return link;
    }
    return `${link}${extra}`;
};

export const toggleFollowLink = (user: Pick<TUser, 'id'>, authUser?: Pick<TUser, 'id'> | null): void => {
    if (!authUser?.id) {
        return router.visit(route('login'));
    }
    return router.patch(route('site.users.follow', user), undefined, { preserveScroll: true });
};

export const togglePostLike = (post: Pick<TPost, 'id'>): void => {
    return router.patch(route('site.posts.like', post), undefined, {
        preserveScroll: true,
    });
};

export const togglePostBookmark = (post: Pick<TPost, 'id'>): void => {
    return router.patch(route('site.posts.bookmark', post), undefined, {
        preserveScroll: true,
    });
};

export const toggleCommentLike = (comment: TComment): void => {
    return router.patch(route('site.comments.like', comment), undefined, {
        preserveScroll: true,
    });
};

export const savePost = (post: TPost) => {
    if (post.id) {
        router.patch(route('site.write.update', post), post, {
            preserveState: false,
            preserveScroll: true,
        });
    } else {
        router.post(route('site.write.store'), post, {
            preserveState: false,
            preserveScroll: true,
        });
    }
};
