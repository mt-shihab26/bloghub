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

type THighlightItem<T> = Record<keyof T, { snippet: string }>;

export type THighlight<T> = THighlightItem<T> | THighlightItem<T>[];

export type THit<T> = {
    document: T;
    highlight: THighlight<T> | null;
};

export type TSearchPaginated<T> = {
    data: { hits: THit<T>[] };
    total: number;
    next_page_url: string | null;
};

export type TSearchPost = Pick<TPost, 'id' | 'slug' | 'title' | 'excerpt' | 'content' | 'status' | 'published_at'> & {
    'user.id': TUser['id'];
    'user.username': TUser['username'];
    'user.name': TUser['name'];

    'user.image.id': TUser['image'] extends TImage ? TImage['id'] : null;
    'user.image.name': TUser['image'] extends TImage ? TImage['name'] : null;

    'category.id': TCategory['id'];
    'category.slug': TCategory['slug'];
    'category.name': TCategory['name'];

    'tags.id': TTag['id'][];
    'tags.name': TTag['name'][];
    'tags.slug': TTag['slug'][];
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
