import type { TCategory, TTag, TUser } from './models';

export type TSearchSort = 'relevant' | 'newest' | 'oldest';
export type TSearchType = 'posts' | 'people' | 'tags' | 'categories' | 'my-posts';

export type TFacetUser = Pick<TUser, 'id' | 'name' | 'username'> & { count: number };
export type TFacetCategory = Pick<TCategory, 'id' | 'name' | 'slug'> & { count: number };
export type TFacetTag = Pick<TTag, 'id' | 'name' | 'slug'> & { count: number };

export type TSearchParams = {
    query?: string;
    type?: TSearchType;
    sort?: TSearchSort;
    author?: string | null;
    category?: string | null;
    tag?: string | null;
};

export type TSearchFacets = {
    authors?: TFacetUser[];
    categories?: TFacetCategory[];
    tags?: TFacetTag[];
};

export type TSearchPaginated<T> = {
    data: T[];
    total: number;
    next_page_url: string | null;
};
