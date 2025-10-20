import type { TCategory, TImage, TPost, TTag, TUser } from './models';

export type TSearchType = 'articles' | 'authors' | 'tags' | 'categories' | 'my-articles';
export type TSearchSort = 'relevant' | 'newest' | 'oldest';

export type TSearchParams = {
    query?: string;
    type?: TSearchType;
    sort?: TSearchSort;
    author?: string[] | null;
    category?: string[] | null;
    tag?: string[] | null;
};

export type TSearchFacets = {
    articles?: {
        authors?: (Pick<TUser, 'id' | 'name'> & { count: number })[];
        categories?: (Pick<TCategory, 'id' | 'name'> & { count: number })[];
        tags?: (Pick<TTag, 'id' | 'name'> & { count: number })[];
    };
    authors?: null;
    categories?: null;
    tags?: null;
};

export type TSearchPaginated<T> = {
    data: T[];
    total: number;
    next_page_url: string | null;
};

export type TSearchPost = Pick<TPost, 'id' | 'slug' | 'title' | 'published_at' | 'excerpt' | 'content'> & {
    user: Pick<TUser, 'id', 'username' | 'name'> & { image?: Pick<TImage, 'id', 'name'> | null };
    category?: Pick<TCategory, 'id' | 'slug' | 'name'> | null;
    tags?: Pick<TTag, 'id' | 'slug' | 'name'>[] | null;
};

export type TSearchUser = Pick<TUser, 'id' | 'name' | 'username' | 'bio'> & {
    image?: TUser['image'];
    posts_count?: number;
    followers_count?: number;
};

export type TSearchCategory = Pick<TCategory, 'id' | 'name' | 'slug' | 'description'> & {
    posts_count?: number;
};

export type TSearchTag = Pick<TTag, 'id' | 'name' | 'slug'> & {
    posts_count?: number;
};

export type TSearchLists = {
    articles?: TSearchPaginated<TPostCard>;
    authors?: TSearchPaginated<TSearchUser>;
    categories?: TSearchPaginated<TSearchCategory>;
    tags?: TSearchPaginated<TSearchTag>;
};
