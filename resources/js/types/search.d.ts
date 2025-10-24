import type { TCategory, TFile, TPost, TTag, TUser } from './models';

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

type THighlightSnippet = {
    snippet: string;
};

type TDeepHighlight<T> = T extends (infer U)[]
    ? TDeepHighlight<U>[]
    : T extends object
      ? { [K in keyof T]?: TDeepHighlight<T[K]> }
      : THighlightSnippet;

export type THighlight<T> = {
    [K in keyof T]?: TDeepHighlight<T[K]>;
};

export type TFacetCount = {
    counts: { count: number; highlighted: string; value: string }[];
    field_name: string;
    sampled: boolean;
    stats: { total_values: number };
};

export type THit<T> = {
    document: T;
    highlight: THighlight<T> | Record<string, any> | null;
};

export type TSearchPaginated<T> = {
    data: {
        facet_counts: TFacetCount[];
        hits: THit<T>[];
    };
    from: number;
    to: number;
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
    first_page_url: string | null;
    last_page_url: string | null;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: {
        url: string | null;
        label: string;
        page: number | null;
        active: boolean;
    }[];
};

export type TSearchPost = Pick<TPost, 'id' | 'slug' | 'title' | 'excerpt' | 'content' | 'status' | 'published_at'> & {
    user: (Pick<TUser, 'id' | 'username' | 'name'> & { image?: Pick<TFile, 'id', 'name'> | null }) | null;
    category: Pick<TCategory, 'id' | 'slug' | 'name'> | null;
    tags: Pick<TTag, 'id' | 'name' | 'slug'>[];
};

export type TFacetsPost = {
    authors: (TUser & { count: number })[];
    categories: (TCategory & { count: number })[];
    tags: (TTag & { count: number })[];
};

export type TSearchUser = Pick<TUser, 'id' | 'name' | 'username' | 'bio' | 'created_at'> & {
    image?: Pick<TFile, 'id', 'name'> | null;
};

export type TSearchCategory = Pick<TCategory, 'id' | 'name' | 'slug' | 'description'> & {
    posts_count?: number;
};

export type TSearchTag = Pick<TTag, 'id' | 'name' | 'slug'> & {
    posts_count?: number;
};
