import type { TCategory, TComment, TFile, TPost, TTag, TUser } from './models';

export type TIndexPost = TPost & {
    user: TUser & { image?: TFile | null };
    image?: TFile | null;
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
    image?: TFile | null;
};

export type TShowComment = TComment & {
    user?: (TUser & { image?: TFile | null }) | null;
    comments?: TShowComment[];

    likes_count: number;
    liked_by_user: boolean;
};

export type TShowPost = TPost & {
    user: TUser & { image?: TFile | null };
    image?: TFile | null;
    category?: TCategory | null;
    tags?: TTag[];
    comments?: TShowComment[];

    likes_count: number;
    comments_count: number;

    liked_by_user: boolean;
    bookmarked_by_user: boolean;
    followed_by_user?: boolean;
};

export type TIndexDiscussion = Pick<TPost, 'id' | 'title' | 'slug' | 'user_id'> & {
    user: Pick<TUser, 'id' | 'username'>;
    comments_count: number;
};
