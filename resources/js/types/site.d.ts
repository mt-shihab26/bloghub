import { TCategory, TImage, TPost, TTag, TUser } from './models';

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
