import { TCategory, TComment, TImage, TPost, TTag, TUser } from './models';

export type THomePost = TPost & {
    user: TUser & { image?: TImage | null };
    image?: TImage | null;
    category?: TCategory | null;
    tags?: TTag[];

    likes_count: number;
    liked_by_user: boolean;
    comments_count: number;
    commented_by_user: boolean;
    bookmarked_by_user: boolean;
};

export type THomeCategory = TCategory & {
    posts_count?: number | null;
};

export type THomeUser = TUser & {
    image?: TImage | null;
};

export type TShowComment = TComment & {
    user?: (TUser & { image?: TImage | null }) | null;
    comments?: TShowComment[];

    likes_count: number; // TODO
    liked_by_user: boolean; // TODO
};

export type TShowPost = TPost & {
    user: TUser & { image?: TImage | null };
    image?: TImage | null;
    tags?: TTag[];
    comments?: TShowComment[];

    likes_count: number;
    liked_by_user: boolean;
    bookmarked_by_user: boolean;

    followed_by_user?: boolean; // TODO
};
