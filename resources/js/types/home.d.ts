import type { TCategory, TComment, TImage, TPost, TTag, TUser } from './models';

export type TIndexPost = TPost & {
    user: TUser & { image?: TImage | null };
    image?: TImage | null;
    category?: TCategory | null;
    tags?: TTag[] | null;

    likes_count: number;
    comments_count: number;

    liked_by_user: boolean;
    commented_by_user: boolean;
    bookmarked_by_user: boolean;
};

export type TIndexCategory = TCategory & {
    posts_count?: number | null;
};

export type TIndexUser = TUser & {
    image?: TImage | null;
};

export type TShowComment = TComment & {
    user?: (TUser & { image?: TImage | null }) | null;
    comments?: TShowComment[];

    likes_count: number;
    liked_by_user: boolean;
};

export type TShowPost = TPost & {
    user: TUser & { image?: TImage | null };
    image?: TImage | null;
    tags?: TTag[];
    comments?: TShowComment[];

    likes_count: number;
    comments_count: number;

    liked_by_user: boolean;
    bookmarked_by_user: boolean;
    followed_by_user?: boolean;
};
