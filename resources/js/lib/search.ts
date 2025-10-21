import type { TSearchParams } from '@/types/search';

export const searchRoute = ({
    query = '',
    type = 'articles',
    sort = 'relevant',
    author = null,
    category = null,
    tag = null,
}: TSearchParams) => {
    return route('site.search.index', {
        query,
        type: type !== 'articles' ? type : undefined,
        sort: sort !== 'relevant' ? sort : undefined,
        author: author && author.length > 0 ? author.join(',') : undefined,
        category: category && category.length > 0 ? category.join(',') : undefined,
        tag: tag && tag.length > 0 ? tag.join(',') : undefined,
    });
};
