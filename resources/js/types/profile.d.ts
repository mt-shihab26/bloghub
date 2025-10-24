import type { TFile, TPost, TTag, TUser } from './models';

export type TShowPost = TPost & {
    image?: TFile | null;
    tags?: TTag[] | null;

    likes_count: number;
    comments_count: number;

    liked_by_user: boolean;
    commented_by_user: boolean;
    bookmarked_by_user: boolean;
};

export type TShowUser = TUser & {
    image?: TFile | null;
    posts: TShowPost[];
    tags?: TTag[] | null;

    following_count: number;
    followers_count: number;
    likes_count: number;

    followed_by_user: boolean;
};
