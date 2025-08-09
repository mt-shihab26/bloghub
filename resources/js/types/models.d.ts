import type { TPostStatus, TUserRole } from './enums';
import type { TId } from './utils';

export type TUser = {
    id: TId;
    role: TUserRole;
    name: string;
    email: string;
    email_verified_at?: string | null;
    created_at: string;
    updated_at: string;
};

export type TImage = {
    id: TId;
    user_id?: TId | null;
    name: string;
    alt?: string | null;
    memtype: string;
    created_at: string;
    updated_at: string;
};

export type TCategory = {
    id: TId;
    user_id?: TId | null;
    category_id?: TId | null;

    name: string;
    slug: string;
    description?: string | null;

    created_at: string;
    updated_at: string;
};

export type TTag = {
    id: TId;
    user_id?: TId | null;

    name: string;
    slug: string;

    created_at: string;
    updated_at: string;
};

export type TPost = {
    id: TId;
    user_id: TId;
    image_id?: TId | null;
    category_id?: TId | null;

    title: string;
    slug: string;
    content: string;
    excerpt: string;
    status: TPostStatus;
    published_at: string;

    created_at: string;
    updated_at: string;

    user: TUser;
    image: TImage;
    category: TCategory;
    tags: TTag[];
};
