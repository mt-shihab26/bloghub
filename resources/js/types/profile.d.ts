import type { TImage, TPost, TTag, TUser } from './models';

export type TShowPost = TPost & {
    image?: TImage | null;
    tags?: TTag[];

    likes_count: number;
    comments_count: number;

    liked_by_user: boolean;
    commented_by_user: boolean;
    bookmarked_by_user: boolean;
};

export type TShowUser = TUser & {
    image?: TImage | null;
    posts: TShowPost[];

    following_count: number;
    followers_count: number;
    likes_count: number;

    followed_by_user: boolean;
};
