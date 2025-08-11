import type { TPost } from './models';

export type TShowUser = TUser & {
    image?: TImage | null;
    posts?: TPost[] | null;

    followed_by_user?: boolean;
};
