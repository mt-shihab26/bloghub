import type { TSearchParams } from '@/types/search';

import { router } from '@inertiajs/react';

export const searchRoute = ({
    query = '',
    type = 'articles',
    sort = 'relevant',
    author = null,
    category = null,
    tag = null,
}: TSearchParams) => {
    return route('site.search.index', {
        q: query,
        type: type !== 'articles' ? type : undefined,
        sort: sort !== 'relevant' ? sort : undefined,
        author: author && author.length > 0 ? author.join(',') : undefined,
        category: category && category.length > 0 ? category.join(',') : undefined,
        tag: tag && tag.length > 0 ? tag.join(',') : undefined,
    });
};

export const performSearch = (params: TSearchParams) => {
    const query = params.query?.trim();
    if (query) {
        router.get(
            searchRoute({ ...params, query }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }
};
